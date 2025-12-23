#!/usr/bin/env python3
"""Main CLI script for automated lab generation."""

import argparse
import json
import os
import subprocess
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from typing import List, Dict, Any, Optional

# Add lib to path
lib_path = os.path.join(os.path.dirname(__file__), 'lib')
sys.path.insert(0, lib_path)

# Project root (parent of scripts directory)
PROJECT_ROOT = Path(__file__).parent.parent

from cache_manager import CacheManager
from doc_parser import parse_documentation, normalize_url, extract_slug_from_url
from es_validator import ESValidator
from example_generator import ExampleGenerator
from preflight import run_all_checks
from quality_checker import QualityChecker
from report_generator import ReportGenerator
from state_manager import StateManager
from track_builder import TrackBuilder


def load_dataset_schemas() -> Dict[str, Any]:
    """Load dataset schemas from JSON file.
    
    Returns:
        Dataset schemas dict
    """
    schemas_path = Path(__file__).parent / "data" / "dataset_schemas.json"
    with open(schemas_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def check_existing_lab(slug: str, base_dir: str = "instruqt_labs") -> bool:
    """Check if a lab already exists.
    
    Args:
        slug: Lab slug
        base_dir: Base directory for tracks
        
    Returns:
        True if lab exists
    """
    track_dir = PROJECT_ROOT / base_dir / f"docs-lab-{slug}"
    config_path = Path("shared") / "frontend" / "src" / "config" / "labs" / f"{slug}Config.ts"
    return track_dir.exists() or config_path.exists()


def process_single_url(
    url: str,
    args: argparse.Namespace,
    dataset_schemas: Dict[str, Any],
    cache_manager: CacheManager,
    state_manager: StateManager,
    report: ReportGenerator
) -> Dict[str, Any]:
    """Process a single URL to generate a lab.
    
    Args:
        url: Documentation URL
        args: CLI arguments
        dataset_schemas: Dataset schema information
        cache_manager: Cache manager
        state_manager: State manager
        report: Report generator
        
    Returns:
        Result dict with status and details
    """
    try:
        # Normalize URL and get slug
        normalized_url = normalize_url(url)
        try:
            parsed_doc_temp = parse_documentation(url, markdown=None)
            slug = parsed_doc_temp.get('slug', extract_slug_from_url(url))
        except Exception:
            slug = extract_slug_from_url(url)
        
        # Check if lab exists
        if check_existing_lab(slug):
            if not args.regenerate and not args.yolo:
                report.add_skipped_lab(slug, url, "Already exists (use --regenerate)")
                return {'status': 'skipped', 'slug': slug, 'url': url}
        
        # Update state
        state_manager.set_in_progress(url)
        
        # Parse documentation
        cached_markdown = cache_manager.get_markdown(url)
        parsed_doc = cache_manager.get_parsed_doc(url)
        
        if parsed_doc is None:
            if cached_markdown is None:
                markdown = parse_documentation(url, markdown=None).get('raw_markdown', '')
                cache_manager.set_markdown(url, markdown)
            else:
                markdown = cached_markdown
            
            parsed_doc = parse_documentation(url, markdown=markdown)
            cache_manager.set_parsed_doc(url, parsed_doc)
        
        # Generate examples
        example_generator = ExampleGenerator(cache_manager)
        lab_config = example_generator.generate_lab_config(
            parsed_doc,
            dataset_schemas,
            parsed_doc.get('code_examples', [])
        )
        
        # Validate examples
        es_validator = ESValidator(example_generator, dataset_schemas)
        query_language = lab_config.get('queryLanguage', 'query_dsl')
        validation_results = es_validator.validate_all_examples(
            lab_config.get('examples', []),
            max_retries=5,
            query_language=query_language
        )
        
        # Quality checks
        quality_checker = QualityChecker(min_hits=args.min_hits if hasattr(args, 'min_hits') else 3)
        quality_results = quality_checker.run_all_checks(lab_config, validation_results['results'])
        
        # Add validation warnings to report
        for warning in quality_results.get('warnings', []):
            report.add_validation_warning(
                slug,
                warning.get('example_id', 'unknown'),
                warning.get('type', 'unknown'),
                warning.get('message', '')
            )
        
        # Build track structure
        track_builder = TrackBuilder()
        files_created = track_builder.build_track_structure(
            lab_config,
            slug,
            "instruqt_labs"
        )
        
        # Build frontend assets
        if not args.dry_run:
            # Map slug to lab type for build script
            # The build script is now fully dynamic and auto-detects configs
            # Our slugs are like: match-query, query-string-query, bool-query, range-query
            lab_type = slug
            if slug.endswith('-query'):
                lab_type = slug[:-6]  # Remove "-query" suffix
            
            build_result = subprocess.run(
                ["./scripts/build-lab.sh", lab_type],
                capture_output=True,
                text=True,
                cwd=Path(__file__).parent.parent
            )
            
            if build_result.returncode != 0:
                raise RuntimeError(f"Build failed: {build_result.stderr}")
        
        # Mark as completed
        state_manager.mark_completed(url)
        
        # Add to report
        report.add_created_lab(
            slug,
            url,
            len(lab_config.get('examples', [])),
            validation_results['invalid'] == 0
        )
        
        return {
            'status': 'success',
            'slug': slug,
            'url': url,
            'example_count': len(lab_config.get('examples', []))
        }
        
    except Exception as e:
        error_msg = str(e)
        slug = parse_documentation(url, markdown=None).get('slug', 'unknown')
        state_manager.mark_failed(url, error_msg)
        report.add_failed_lab(slug, url, error_msg)
        return {'status': 'failed', 'slug': slug, 'url': url, 'error': error_msg}


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description="Generate interactive Elasticsearch query labs from documentation pages"
    )
    
    # Input options
    parser.add_argument(
        'urls_file',
        nargs='?',
        help='File containing URLs (one per line)'
    )
    parser.add_argument(
        '--url',
        help='Single URL to process'
    )
    
    # Flags
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Preview what would be created without writing files'
    )
    parser.add_argument(
        '--skip-review',
        action='store_true',
        help='Skip review step and auto-deploy (skip existing tracks)'
    )
    parser.add_argument(
        '--push',
        action='store_true',
        help='Skip review and push directly to GitHub and Instruqt'
    )
    parser.add_argument(
        '--regenerate',
        action='store_true',
        help='Regenerate existing labs (overwrites)'
    )
    parser.add_argument(
        '--yolo',
        action='store_true',
        help='Full automation (skip-review + regenerate)'
    )
    parser.add_argument(
        '--parallel',
        type=int,
        default=1,
        help='Number of parallel workers (default: 1, max recommended: 5)'
    )
    parser.add_argument(
        '--resume',
        action='store_true',
        help='Resume from state file'
    )
    parser.add_argument(
        '--no-cache',
        action='store_true',
        help='Bypass cache'
    )
    parser.add_argument(
        '--verbose',
        action='store_true',
        help='Verbose output'
    )
    parser.add_argument(
        '--min-hits',
        type=int,
        default=3,
        help='Minimum hits required per example (default: 3)'
    )
    
    args = parser.parse_args()
    
    # Handle yolo flag
    if args.yolo:
        args.skip_review = True
        args.regenerate = True
    
    # Handle push flag
    if args.push:
        args.skip_review = True
    
    # Get URLs
    urls = []
    if args.url:
        urls = [args.url]
    elif args.urls_file:
        with open(args.urls_file, 'r', encoding='utf-8') as f:
            urls = [line.strip() for line in f if line.strip() and not line.startswith('#')]
    else:
        parser.error("Must provide either --url or urls_file")
    
    # Initialize components
    cache_manager = CacheManager(use_cache=not args.no_cache)
    state_manager = StateManager()
    report = ReportGenerator()
    dataset_schemas = load_dataset_schemas()
    
    # Pre-flight checks
    if not args.dry_run:
        print("[Preflight] Running health checks...")
        all_passed, check_results = run_all_checks()
        
        for name, passed, message in check_results:
            status = "✓" if passed else "✗"
            print(f"[Preflight] {status} {name}: {message}")
        
        if not all_passed:
            print("\n[Preflight] ✗ Some checks failed. Aborting.")
            sys.exit(1)
        
        print("[Preflight] ✓ All checks passed\n")
    
    # Resume capability
    if args.resume or (args.urls_file and state_manager.load()):
        state = state_manager.load()
        if state:
            print(f"[Resume] Resuming from batch: {state.get('batch_id', 'unknown')}")
            pending = state.get('pending', [])
            if pending:
                urls = [url for url in urls if url in pending]
                print(f"[Resume] Processing {len(urls)} remaining URLs")
            else:
                print("[Resume] No pending URLs, starting fresh")
                state_manager.clear()
                state = state_manager.create_batch(args.urls_file or '--url', urls)
                state_manager.save(state)  # Save state to disk
        else:
            state = state_manager.create_batch(args.urls_file or '--url', urls)
            state_manager.save(state)  # Save state to disk
    else:
        state = state_manager.create_batch(args.urls_file or '--url', urls)
        state_manager.save(state)  # Save state to disk
    
    # Process URLs
    start_time = time.time()
    results = []
    
    if args.parallel > 1:
        # Parallel processing
        with ThreadPoolExecutor(max_workers=args.parallel) as executor:
            futures = {
                executor.submit(
                    process_single_url,
                    url,
                    args,
                    dataset_schemas,
                    cache_manager,
                    state_manager,
                    report
                ): url
                for url in urls
            }
            
            for future in as_completed(futures):
                url = futures[future]
                try:
                    result = future.result()
                    results.append(result)
                except Exception as e:
                    try:
                        slug = parse_documentation(url, markdown=None).get('slug', extract_slug_from_url(url))
                    except:
                        slug = extract_slug_from_url(url)
                    report.add_failed_lab(slug, url, str(e))
                    results.append({'status': 'failed', 'slug': slug, 'url': url, 'error': str(e)})
    else:
        # Sequential processing
        for url in urls:
            result = process_single_url(
                url,
                args,
                dataset_schemas,
                cache_manager,
                state_manager,
                report
            )
            results.append(result)
    
    elapsed_time = time.time() - start_time
    
    # Set summary
    report.set_summary(len(urls), elapsed_time)
    
    # Print report
    report.print_report()
    
    # Save JSON report
    if not args.dry_run:
        report_path = report.save_json()
        print(f"\nFull report saved to: {report_path}", flush=True)
    
    # Batch operations (if not dry-run)
    if not args.dry_run and results:
        created_slugs = [r['slug'] for r in results if r.get('status') == 'success']
        skipped_slugs = [r['slug'] for r in results if r.get('status') == 'skipped']
        
        # Determine which labs to push
        if args.push:
            # Push both created and existing labs
            slugs_to_push = created_slugs + skipped_slugs
        else:
            slugs_to_push = created_slugs
        
        if created_slugs and not args.skip_review and not args.yolo and not args.push:
            # Pause for review
            print(f"\n[Review] {len(created_slugs)} labs created.", flush=True)
            response = input("Deploy to GitHub and Instruqt? (Y/n): ").strip().lower()
            if response and response != 'y':
                print("[Review] Deployment cancelled.", flush=True)
                sys.exit(0)
        
        if slugs_to_push:
            # Track deployment results
            deploy_results = []
            
            # Git commit and push
            print("\n[Deploy] Committing changes...", flush=True)
            commit_message = f"Auto-generated labs: {', '.join(slugs_to_push)}"
            
            github_success = False
            github_error = None
            try:
                subprocess.run(['git', 'add', '-A'], cwd=PROJECT_ROOT, check=True)
                subprocess.run(['git', 'commit', '-m', commit_message], cwd=PROJECT_ROOT, check=True)
                subprocess.run(['git', 'push', '--force', 'origin', 'main'], cwd=PROJECT_ROOT, check=True)
                print("[Deploy] ✓ Changes pushed to GitHub", flush=True)
                github_success = True
            except subprocess.CalledProcessError as e:
                github_error = str(e)
                print(f"[Deploy] ✗ Failed to push to GitHub: {github_error}", flush=True)
            
            # Git push succeeded - mark all labs as pushed (git is source of truth)
            if github_success:
                for slug in slugs_to_push:
                    report.mark_lab_pushed(slug)
            
            # Push to Instruqt
            print("[Deploy] Pushing tracks to Instruqt...", flush=True)
            for slug in slugs_to_push:
                inst_success = False
                inst_error = None
                track_dir = PROJECT_ROOT / "instruqt_labs" / f"docs-lab-{slug}"
                
                if track_dir.exists():
                    try:
                        # Validate first (run FROM the track directory)
                        subprocess.run(
                            ['instruqt', 'track', 'validate'],
                            cwd=track_dir,
                            check=True
                        )
                        # Push (run FROM the track directory)
                        push_result = subprocess.run(
                            ['instruqt', 'track', 'push', '--force'],
                            cwd=track_dir,
                            capture_output=True,
                            text=True
                        )
                        if push_result.returncode != 0:
                            error_output = push_result.stderr or push_result.stdout or ""
                            if 'already exists' in error_output.lower():
                                # Track already exists in Instruqt - this is OK for regenerated tracks
                                inst_error = "Track already exists (may need manual update)"
                                print(f"[Deploy] ⚠ Track docs-lab-{slug} already exists in Instruqt", flush=True)
                            else:
                                # Extract error message (first line or truncated)
                                inst_error = error_output.strip().split('\n')[0][:80]
                                if len(error_output.strip().split('\n')[0]) > 80:
                                    inst_error += "..."
                                print(f"[Deploy] ⚠ Failed to push docs-lab-{slug} to Instruqt: {inst_error}", flush=True)
                        else:
                            inst_success = True
                            print(f"[Deploy] ✓ Pushed docs-lab-{slug} to Instruqt", flush=True)
                    except subprocess.CalledProcessError as e:
                        inst_error = str(e)[:80]
                        print(f"[Deploy] ⚠ Failed to push docs-lab-{slug} to Instruqt: {inst_error}", flush=True)
                else:
                    inst_error = "Track directory not found"
                    print(f"[Deploy] ⚠ Track directory not found for docs-lab-{slug}", flush=True)
                
                # Record result for this lab
                deploy_results.append({
                    'slug': slug,
                    'github_success': github_success,
                    'github_error': github_error,
                    'instruqt_success': inst_success,
                    'instruqt_error': inst_error
                })
            
            # Print deployment summary
            if deploy_results:
                from rich.table import Table as RichTable
                from rich.panel import Panel as RichPanel
                from rich.console import Console
                
                console = Console()
                console.print()
                
                deploy_table = RichTable(title="Deployment Summary", show_header=True, header_style="bold")
                deploy_table.add_column("Lab", style="cyan")
                deploy_table.add_column("GitHub", style="green", justify="center")
                deploy_table.add_column("Instruqt", style="green", justify="center")
                deploy_table.add_column("Notes", style="yellow")
                
                github_count = 0
                instruqt_count = 0
                failed_count = 0
                
                for result in deploy_results:
                    github_status = "[green]✓[/green]" if result['github_success'] else "[red]✗[/red]"
                    if result['github_success']:
                        github_count += 1
                    
                    if result['instruqt_success']:
                        inst_status = "[green]✓[/green]"
                        instruqt_count += 1
                    elif result['instruqt_error']:
                        inst_status = "[red]✗[/red]"
                        failed_count += 1
                    else:
                        inst_status = "[yellow]—[/yellow]"
                    
                    notes = result['instruqt_error'] or result['github_error'] or ""
                    if len(notes) > 60:
                        notes = notes[:57] + "..."
                    
                    deploy_table.add_row(
                        f"docs-lab-{result['slug']}",
                        github_status,
                        inst_status,
                        notes
                    )
                
                console.print(deploy_table)
                console.print()
                
                # Summary line
                summary_parts = []
                if github_count > 0:
                    summary_parts.append(f"{github_count} pushed to GitHub")
                if instruqt_count > 0:
                    summary_parts.append(f"{instruqt_count} pushed to Instruqt")
                if failed_count > 0:
                    summary_parts.append(f"{failed_count} failed")
                
                if summary_parts:
                    summary_text = "Summary: " + ", ".join(summary_parts)
                    console.print(f"[bold]{summary_text}[/bold]")
    
    # Clear state on success
    if all(r.get('status') in ('success', 'skipped') for r in results):
        state_manager.clear()
    
    # Exit with error code if any failed
    if any(r.get('status') == 'failed' for r in results):
        sys.exit(1)


if __name__ == '__main__':
    main()

