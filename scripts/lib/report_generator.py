"""Report generator with rich formatted output."""

import json
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Any, Optional
from rich.console import Console
from rich.table import Table
from rich.panel import Panel
from rich.text import Text


class ReportGenerator:
    """Generates formatted reports for lab generation."""
    
    def __init__(self):
        """Initialize report generator."""
        self.console = Console()
        self.report_data = {
            'timestamp': datetime.utcnow().isoformat() + 'Z',
            'summary': {
                'total_urls': 0,
                'successfully_created': 0,
                'skipped': 0,
                'failed': 0,
                'total_time_seconds': 0
            },
            'created_labs': [],
            'skipped_labs': [],
            'failed_labs': [],
            'validation_warnings': []
        }
    
    def add_created_lab(
        self,
        slug: str,
        url: str,
        example_count: int,
        validation_passed: bool = True
    ) -> None:
        """Add a successfully created lab.
        
        Args:
            slug: Lab slug
            url: Source URL
            example_count: Number of examples
            validation_passed: Whether validation passed
        """
        self.report_data['created_labs'].append({
            'slug': slug,
            'url': url,
            'example_count': example_count,
            'validation_passed': validation_passed,
            'pushed': False
        })
        self.report_data['summary']['successfully_created'] += 1
    
    def add_skipped_lab(
        self,
        slug: str,
        url: str,
        reason: str = "Already exists"
    ) -> None:
        """Add a skipped lab.
        
        Args:
            slug: Lab slug
            url: Source URL
            reason: Reason for skipping
        """
        self.report_data['skipped_labs'].append({
            'slug': slug,
            'url': url,
            'reason': reason,
            'pushed': False
        })
        self.report_data['summary']['skipped'] += 1
    
    def add_failed_lab(
        self,
        slug: str,
        url: str,
        error: str,
        details: Optional[Dict[str, Any]] = None
    ) -> None:
        """Add a failed lab.
        
        Args:
            slug: Lab slug
            url: Source URL
            error: Error message
            details: Optional error details
        """
        entry = {
            'slug': slug,
            'url': url,
            'error': error
        }
        if details:
            entry['details'] = details
        
        self.report_data['failed_labs'].append(entry)
        self.report_data['summary']['failed'] += 1
    
    def mark_lab_pushed(self, slug: str) -> None:
        """Mark a lab as successfully pushed.
        
        Args:
            slug: Lab slug
        """
        # Mark in created labs
        for lab in self.report_data['created_labs']:
            if lab['slug'] == slug:
                lab['pushed'] = True
                return
        
        # Mark in skipped labs
        for lab in self.report_data['skipped_labs']:
            if lab['slug'] == slug:
                lab['pushed'] = True
                return
    
    def add_validation_warning(
        self,
        lab_slug: str,
        example_id: str,
        warning_type: str,
        message: str,
        details: Optional[Dict[str, Any]] = None
    ) -> None:
        """Add a validation warning.
        
        Args:
            lab_slug: Lab slug
            example_id: Example ID
            warning_type: Type of warning
            message: Warning message
            details: Optional details
        """
        entry = {
            'lab_slug': lab_slug,
            'example_id': example_id,
            'warning_type': warning_type,
            'message': message
        }
        if details:
            entry['details'] = details
        
        self.report_data['validation_warnings'].append(entry)
    
    def set_summary(
        self,
        total_urls: int,
        total_time_seconds: float
    ) -> None:
        """Set summary statistics.
        
        Args:
            total_urls: Total URLs processed
            total_time_seconds: Total processing time
        """
        self.report_data['summary']['total_urls'] = total_urls
        self.report_data['summary']['total_time_seconds'] = total_time_seconds
    
    def format_time(self, seconds: float) -> str:
        """Format seconds as human-readable time.
        
        Args:
            seconds: Time in seconds
            
        Returns:
            Formatted time string
        """
        if seconds < 60:
            return f"{seconds:.1f}s"
        elif seconds < 3600:
            minutes = int(seconds // 60)
            secs = int(seconds % 60)
            return f"{minutes}m {secs}s"
        else:
            hours = int(seconds // 3600)
            minutes = int((seconds % 3600) // 60)
            return f"{hours}h {minutes}m"
    
    def print_report(self) -> None:
        """Print formatted report to console."""
        summary = self.report_data['summary']
        timestamp = datetime.fromisoformat(self.report_data['timestamp'].replace('Z', '+00:00'))
        
        # Header
        header = Panel(
            f"[bold]Lab Generation Report - {timestamp.strftime('%Y-%m-%d %H:%M:%S')}[/bold]",
            border_style="blue"
        )
        self.console.print(header)
        self.console.print()
        
        # Summary table
        summary_table = Table(title="Summary", show_header=True, header_style="bold")
        summary_table.add_column("Metric", style="cyan")
        summary_table.add_column("Value", style="green")
        
        summary_table.add_row("Total URLs processed", str(summary['total_urls']))
        summary_table.add_row("Successfully created", f"[green]{summary['successfully_created']}[/green]")
        summary_table.add_row("Skipped (existing)", f"[yellow]{summary['skipped']}[/yellow]")
        summary_table.add_row("Failed", f"[red]{summary['failed']}[/red]")
        summary_table.add_row("Total time", self.format_time(summary['total_time_seconds']))
        
        self.console.print(summary_table)
        self.console.print()
        
        # Created labs
        if self.report_data['created_labs']:
            created_table = Table(title="Created Labs", show_header=True, header_style="bold")
            created_table.add_column("Lab", style="cyan")
            created_table.add_column("Examples", style="green")
            created_table.add_column("Status", style="green")
            created_table.add_column("Pushed", style="green")
            
            for lab in self.report_data['created_labs']:
                status = "✓ Validated" if lab['validation_passed'] else "⚠️  Warnings"
                pushed = "✓" if lab.get('pushed', False) else "—"
                created_table.add_row(
                    f"[green]✓[/green] docs-lab-{lab['slug']}",
                    str(lab['example_count']),
                    status,
                    pushed
                )
            
            self.console.print(created_table)
            self.console.print()
        
        # Skipped labs
        if self.report_data['skipped_labs']:
            skipped_table = Table(title="Skipped Labs", show_header=True, header_style="bold")
            skipped_table.add_column("Lab", style="cyan")
            skipped_table.add_column("Reason", style="yellow")
            skipped_table.add_column("Pushed", style="green")
            
            for lab in self.report_data['skipped_labs']:
                pushed = "✓" if lab.get('pushed', False) else "—"
                skipped_table.add_row(
                    f"[yellow]⊘[/yellow] docs-lab-{lab['slug']}",
                    lab['reason'],
                    pushed
                )
            
            self.console.print(skipped_table)
            self.console.print()
        
        # Failed labs
        if self.report_data['failed_labs']:
            failed_table = Table(title="Failed Labs", show_header=True, header_style="bold")
            failed_table.add_column("Lab", style="cyan")
            failed_table.add_column("Error", style="red")
            
            for lab in self.report_data['failed_labs']:
                error_text = lab['error']
                if len(error_text) > 80:
                    error_text = error_text[:77] + "..."
                failed_table.add_row(
                    f"[red]✗[/red] docs-lab-{lab['slug']}",
                    error_text
                )
            
            self.console.print(failed_table)
            self.console.print()
        
        # Validation warnings
        if self.report_data['validation_warnings']:
            warnings_table = Table(title="Validation Warnings", show_header=True, header_style="bold")
            warnings_table.add_column("Lab", style="cyan")
            warnings_table.add_column("Example", style="yellow")
            warnings_table.add_column("Warning", style="yellow")
            
            for warning in self.report_data['validation_warnings']:
                warnings_table.add_row(
                    f"[yellow]⚠[/yellow] docs-lab-{warning['lab_slug']}",
                    warning['example_id'],
                    warning['message']
                )
            
            self.console.print(warnings_table)
            self.console.print()
    
    def save_json(self, output_dir: str = "reports") -> str:
        """Save report as JSON file.
        
        Args:
            output_dir: Output directory
            
        Returns:
            Path to saved file
        """
        Path(output_dir).mkdir(parents=True, exist_ok=True)
        
        timestamp_str = datetime.fromisoformat(
            self.report_data['timestamp'].replace('Z', '+00:00')
        ).strftime('%Y-%m-%dT%H-%M-%S')
        
        filename = f"generate-labs-{timestamp_str}.json"
        filepath = Path(output_dir) / filename
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(self.report_data, f, indent=2)
        
        return str(filepath)

