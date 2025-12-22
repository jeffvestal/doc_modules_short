"""Quality gates for lab examples."""

from typing import Dict, List, Any, Optional


class QualityChecker:
    """Checks quality of generated examples."""
    
    def __init__(self, min_hits: int = 3):
        """Initialize quality checker.
        
        Args:
            min_hits: Minimum number of hits required per example
        """
        self.min_hits = min_hits
    
    def check_min_hits(
        self,
        validation_results: List[Dict[str, Any]]
    ) -> List[Dict[str, Any]]:
        """Check if examples meet minimum hit threshold.
        
        Args:
            validation_results: List of validation result dicts
            
        Returns:
            List of warnings for examples below threshold
        """
        warnings = []
        
        for result in validation_results:
            hit_count = result.get('hit_count', 0)
            is_valid = result.get('valid', False)
            
            # Warn for invalid examples (0 hits)
            if not is_valid:
                error_msg = result.get('error', 'Query returned 0 hits')
                warnings.append({
                    'example_id': str(result.get('example_id', 'unknown')),
                    'type': 'validation_failed',
                    'message': f"Validation failed: {error_msg[:50]}..." if len(str(error_msg)) > 50 else f"Validation failed: {error_msg}",
                    'hit_count': hit_count
                })
            # Also warn for valid examples with low hits
            elif hit_count < self.min_hits:
                warnings.append({
                    'example_id': str(result.get('example_id', 'unknown')),
                    'type': 'min_hits',
                    'message': f"Only returned {hit_count} hits (min: {self.min_hits})",
                    'hit_count': hit_count
                })
        
        return warnings
    
    def check_diversity(
        self,
        examples: List[Dict[str, Any]]
    ) -> List[Dict[str, Any]]:
        """Check if examples are diverse (not all identical).
        
        Args:
            examples: List of example dicts
            
        Returns:
            List of warnings for duplicate examples
        """
        warnings = []
        seen_queries = {}
        
        for example in examples:
            template = example.get('template', '')
            # Normalize template for comparison (remove whitespace)
            normalized = ' '.join(template.split())
            
            if normalized in seen_queries:
                warnings.append({
                    'example_id': example.get('id', 'unknown'),
                    'type': 'duplicate',
                    'message': f"Duplicate query (same as example '{seen_queries[normalized]}')",
                    'duplicate_of': seen_queries[normalized]
                })
            else:
                seen_queries[normalized] = example.get('id', 'unknown')
        
        return warnings
    
    def check_duplicate_titles(
        self,
        examples: List[Dict[str, Any]]
    ) -> List[Dict[str, Any]]:
        """Check for duplicate example titles.
        
        Args:
            examples: List of example dicts
            
        Returns:
            List of warnings for duplicate titles
        """
        warnings = []
        seen_titles = {}
        
        for example in examples:
            title = example.get('title', '')
            if title in seen_titles:
                warnings.append({
                    'example_id': example.get('id', 'unknown'),
                    'type': 'duplicate_title',
                    'message': f"Duplicate title (same as example '{seen_titles[title]}')",
                    'duplicate_of': seen_titles[title]
                })
            else:
                seen_titles[title] = example.get('id', 'unknown')
        
        return warnings
    
    def check_required_fields(
        self,
        lab_config: Dict[str, Any]
    ) -> List[Dict[str, Any]]:
        """Check if all required fields are present in lab config.
        
        Args:
            lab_config: Lab config dict
            
        Returns:
            List of warnings for missing required fields
        """
        warnings = []
        required_fields = [
            'queryType',
            'displayName',
            'description',
            'docUrl',
            'keyDisplayFields',
            'searchFields',
            'sampleQueries',
            'queryStructure',
            'examples'
        ]
        
        for field in required_fields:
            if field not in lab_config:
                warnings.append({
                    'type': 'missing_field',
                    'field': field,
                    'message': f"Missing required field: {field}"
                })
        
        # Check examples have required fields
        examples = lab_config.get('examples', [])
        
        # Check minimum example count
        if len(examples) == 0:
            warnings.append({
                'type': 'no_examples',
                'message': "No examples generated - lab config has empty examples array"
            })
        example_required = ['id', 'title', 'description', 'template', 'index']
        
        for i, example in enumerate(examples):
            for field in example_required:
                if field not in example:
                    warnings.append({
                        'type': 'missing_example_field',
                        'example_index': i,
                        'example_id': example.get('id', 'unknown'),
                        'field': field,
                        'message': f"Example '{example.get('id', 'unknown')}' missing field: {field}"
                    })
        
        return warnings
    
    def run_all_checks(
        self,
        lab_config: Dict[str, Any],
        validation_results: Optional[List[Dict[str, Any]]] = None
    ) -> Dict[str, Any]:
        """Run all quality checks.
        
        Args:
            lab_config: Lab config dict
            validation_results: Optional validation results
            
        Returns:
            Quality check summary with all warnings
        """
        all_warnings = []
        
        # Check required fields
        all_warnings.extend(self.check_required_fields(lab_config))
        
        # Check duplicate titles
        all_warnings.extend(self.check_duplicate_titles(lab_config.get('examples', [])))
        
        # Check diversity
        all_warnings.extend(self.check_diversity(lab_config.get('examples', [])))
        
        # Check min hits if validation results provided
        if validation_results:
            all_warnings.extend(self.check_min_hits(validation_results))
        
        return {
            'passed': len(all_warnings) == 0,
            'warning_count': len(all_warnings),
            'warnings': all_warnings
        }

