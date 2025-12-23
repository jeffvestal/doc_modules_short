"""Track builder for creating Instruqt track structures."""

import os
import json
import hashlib
from pathlib import Path
from typing import Dict, Any, Optional
from jinja2 import Environment, FileSystemLoader, select_autoescape


class TrackBuilder:
    """Builds Instruqt track structures from lab configs."""
    
    def __init__(self, templates_dir: Optional[str] = None):
        """Initialize track builder.
        
        Args:
            templates_dir: Directory containing Jinja2 templates
        """
        if templates_dir is None:
            templates_dir = os.path.join(
                os.path.dirname(__file__),
                "..",
                "templates"
            )
        
        self.templates_dir = Path(templates_dir)
        self.env = Environment(
            loader=FileSystemLoader(str(self.templates_dir)),
            autoescape=select_autoescape(['html', 'xml'])
        )
    
    def generate_checksum(self, content: str) -> str:
        """Generate checksum for track.yml.
        
        Args:
            content: Track.yml content
            
        Returns:
            Checksum string
        """
        return hashlib.md5(content.encode('utf-8')).hexdigest()
    
    def build_lab_config_file(
        self,
        lab_config: Dict[str, Any],
        slug: str,
        output_path: str
    ) -> None:
        """Build TypeScript lab config file.
        
        Args:
            lab_config: Lab config dict
            slug: Lab slug
            output_path: Output file path
        """
        template = self.env.get_template('lab_config.ts.j2')
        
        # Prepare template context
        context = {
            'slug': slug,
            'query_language': lab_config.get('queryLanguage', 'query_dsl'),
            'query_type': lab_config.get('queryType', ''),
            'display_name': lab_config.get('displayName', ''),
            'description': lab_config.get('description', ''),
            'doc_url': lab_config.get('docUrl', ''),
            'key_display_fields': lab_config.get('keyDisplayFields', {}),
            'search_fields': lab_config.get('searchFields', {}),
            'sample_queries': lab_config.get('sampleQueries', {}),
            'query_structure': lab_config.get('queryStructure', {}),
            'examples': lab_config.get('examples', [])
        }
        
        content = template.render(**context)
        
        # Write to file
        output_file = Path(output_path)
        output_file.parent.mkdir(parents=True, exist_ok=True)
        output_file.write_text(content, encoding='utf-8')
    
    def build_track_yml(
        self,
        lab_config: Dict[str, Any],
        slug: str,
        output_path: str
    ) -> None:
        """Build track.yml file.
        
        Args:
            lab_config: Lab config dict
            slug: Lab slug
            output_path: Output file path
        """
        template = self.env.get_template('track.yml.j2')
        
        # Prepare template context
        display_name = lab_config.get('displayName', '')
        description = lab_config.get('description', '')
        
        context = {
            'slug': slug,
            'display_name': display_name,
            'teaser': f"Learn how to use the {lab_config.get('queryType', '')} query in Elasticsearch",
            'description': description[:200] + "..." if len(description) > 200 else description,
            'checksum': self.generate_checksum(str(lab_config))
        }
        
        content = template.render(**context)
        
        # Write to file
        output_file = Path(output_path)
        output_file.parent.mkdir(parents=True, exist_ok=True)
        output_file.write_text(content, encoding='utf-8')
    
    def build_assignment_md(
        self,
        lab_config: Dict[str, Any],
        slug: str,
        output_path: str
    ) -> None:
        """Build assignment.md file.
        
        Args:
            lab_config: Lab config dict
            slug: Lab slug
            output_path: Output file path
        """
        template = self.env.get_template('assignment.md.j2')
        
        # Prepare template context
        context = {
            'slug': slug,
            'query_type': lab_config.get('queryType', ''),
            'display_name': lab_config.get('displayName', ''),
            'description': lab_config.get('description', ''),
            'doc_url': lab_config.get('docUrl', ''),
            'examples': lab_config.get('examples', [])
        }
        
        content = template.render(**context)
        
        # Write to file
        output_file = Path(output_path)
        output_file.parent.mkdir(parents=True, exist_ok=True)
        output_file.write_text(content, encoding='utf-8')
    
    def build_setup_script(
        self,
        lab_config: Dict[str, Any],
        slug: str,
        output_path: str
    ) -> None:
        """Build setup-host-1 script.
        
        Args:
            lab_config: Lab config dict
            slug: Lab slug
            output_path: Output file path
        """
        template = self.env.get_template('setup-host-1.j2')
        
        # Prepare template context
        context = {
            'display_name': lab_config.get('displayName', ''),
            'slug': slug
        }
        
        content = template.render(**context)
        
        # Write to file
        output_file = Path(output_path)
        output_file.parent.mkdir(parents=True, exist_ok=True)
        output_file.write_text(content, encoding='utf-8')
        # Make executable
        output_file.chmod(0o755)
    
    def build_track_structure(
        self,
        lab_config: Dict[str, Any],
        slug: str,
        base_dir: str
    ) -> Dict[str, str]:
        """Build complete track structure.
        
        Args:
            lab_config: Lab config dict
            slug: Lab slug
            base_dir: Base directory for tracks
            
        Returns:
            Dict mapping file type to path
        """
        # Use absolute path from project root
        project_root = Path(__file__).parent.parent.parent
        track_dir = project_root / base_dir / f"docs-lab-{slug}"
        
        # Create directory structure
        (track_dir / "01-intro").mkdir(parents=True, exist_ok=True)
        (track_dir / "track_scripts").mkdir(parents=True, exist_ok=True)
        
        # Build files
        files_created = {}
        
        # Lab config (TypeScript)
        # Create labs directory if it doesn't exist
        labs_dir = project_root / "shared" / "frontend" / "src" / "config" / "labs"
        labs_dir.mkdir(parents=True, exist_ok=True)
        
        # Convert slug to config name (remove -query suffix)
        # e.g., "fuzzy-query" → "fuzzy", "query-string-query" → "queryString"
        config_name = slug
        if config_name.endswith('-query'):
            config_name = config_name[:-6]  # Remove "-query" suffix
        # Convert kebab-case to camelCase for config name
        parts = config_name.split('-')
        config_name = parts[0] + ''.join(p.capitalize() for p in parts[1:])
        
        config_path = labs_dir / f"{config_name}Config.ts"
        self.build_lab_config_file(lab_config, config_name, str(config_path))
        files_created['config'] = str(config_path)
        
        # Track.yml
        track_yml_path = track_dir / "track.yml"
        self.build_track_yml(lab_config, slug, str(track_yml_path))
        files_created['track_yml'] = str(track_yml_path)
        
        # Config.yml (VM infrastructure)
        config_yml_path = track_dir / "config.yml"
        template = self.env.get_template('config.yml.j2')
        config_yml_path.write_text(template.render(), encoding='utf-8')
        files_created['config_yml'] = str(config_yml_path)
        
        # Assignment.md
        assignment_path = track_dir / "01-intro" / "assignment.md"
        self.build_assignment_md(lab_config, slug, str(assignment_path))
        files_created['assignment'] = str(assignment_path)
        
        # Setup script
        setup_path = track_dir / "track_scripts" / "setup-host-1"
        self.build_setup_script(lab_config, slug, str(setup_path))
        files_created['setup'] = str(setup_path)
        
        # Copy check script (use existing one as template)
        check_path = track_dir / "01-intro" / "check-host-1"
        # For now, create a simple check script
        check_content = """#!/bin/bash
# Check script - placeholder
echo "Check passed"
exit 0
"""
        check_path.write_text(check_content, encoding='utf-8')
        check_path.chmod(0o755)
        files_created['check'] = str(check_path)
        
        return files_created

