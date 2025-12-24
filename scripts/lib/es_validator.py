"""Elasticsearch validator with auto-fix capabilities."""

import json
import os
from pathlib import Path
from typing import Dict, Any, Tuple, Optional
from dotenv import load_dotenv
from elasticsearch import Elasticsearch
from example_generator import ExampleGenerator
from cache_manager import CacheManager


# Load .env from project root (parent of scripts directory)
project_root = Path(__file__).parent.parent.parent
load_dotenv(project_root / ".env")


class ESValidator:
    """Validates queries against Elasticsearch with auto-fix."""
    
    def __init__(
        self,
        example_generator: Optional[ExampleGenerator] = None,
        dataset_schemas: Optional[Dict[str, Any]] = None
    ):
        """Initialize ES validator.
        
        Args:
            example_generator: Optional generator for fixing queries
            dataset_schemas: Dataset schema information
        """
        self.example_generator = example_generator
        self.dataset_schemas = dataset_schemas or {}
        
        es_url = os.getenv("ELASTICSEARCH_URL")
        es_api_key = os.getenv("ELASTICSEARCH_APIKEY")
        
        if not es_url:
            raise ValueError("ELASTICSEARCH_URL not set in .env")
        
        es_config = {
            "hosts": [es_url]
        }
        if es_api_key:
            es_config["api_key"] = es_api_key
        
        self.es = Elasticsearch(**es_config)
    
    def validate_query(
        self,
        query: Dict[str, Any],
        index: str,
        max_retries: int = 5
    ) -> Tuple[bool, int, Optional[str], Optional[Dict[str, Any]]]:
        """Validate a query against Elasticsearch.
        
        Args:
            query: Query dict to validate
            index: Target index name
            max_retries: Maximum number of retry attempts
            
        Returns:
            Tuple of (success, hit_count, error_message, fixed_query)
        """
        current_query = query
        last_error = None
        
        for attempt in range(max_retries + 1):
            try:
                # Build search request
                search_body = {
                    "query": current_query.get("query", current_query),
                    "size": 100  # Get up to 100 results for validation
                }
                
                response = self.es.search(index=index, body=search_body)
                hit_count = response["hits"]["total"]["value"]
                
                if hit_count > 0:
                    return True, hit_count, None, current_query if attempt > 0 else None
                
                # If 0 hits and we have retries left, try to fix
                if attempt < max_retries and self.example_generator:
                    error_msg = f"Query returned 0 hits (attempt {attempt + 1}/{max_retries + 1})"
                    try:
                        fixed = self.example_generator.fix_query(
                            current_query,
                            error_msg,
                            self.dataset_schemas,
                            index
                        )
                        current_query = fixed
                        last_error = error_msg
                        continue
                    except Exception as fix_error:
                        last_error = f"{error_msg}; Fix failed: {str(fix_error)}"
                        break
                else:
                    last_error = f"Query returned 0 hits after {attempt + 1} attempts"
                    break
                    
            except Exception as e:
                error_msg = str(e)
                
                # Try to fix if we have retries left
                if attempt < max_retries and self.example_generator:
                    try:
                        fixed = self.example_generator.fix_query(
                            current_query,
                            error_msg,
                            self.dataset_schemas,
                            index
                        )
                        current_query = fixed
                        last_error = error_msg
                        continue
                    except Exception as fix_error:
                        last_error = f"{error_msg}; Fix failed: {str(fix_error)}"
                        break
                else:
                    last_error = error_msg
                    break
        
        return False, 0, last_error, current_query if attempt > 0 else None
    
    def validate_esql_query(
        self,
        query: str,
        index: str = 'products',
        max_retries: int = 3
    ) -> Tuple[bool, int, Optional[str], Optional[str]]:
        """Validate an ES|QL query with auto-fix retries.
        
        Args:
            query: ES|QL query string
            index: Target index name (for fixing)
            max_retries: Maximum retry attempts
            
        Returns:
            Tuple of (success, row_count, error_message, fixed_query)
        """
        current_query = query
        last_error = None
        
        for attempt in range(max_retries + 1):
            try:
                # Use the esql.query API
                response = self.es.esql.query(query=current_query)
                
                # ES|QL returns columns and values
                row_count = len(response.get('values', []))
                
                if row_count > 0:
                    return True, row_count, None, current_query if attempt > 0 else None
                
                # If 0 rows and we have retries left, try to fix
                if attempt < max_retries and self.example_generator:
                    error_msg = f"Query returned 0 rows (attempt {attempt + 1}/{max_retries + 1})"
                    try:
                        fixed = self.example_generator.fix_esql_query(
                            current_query,
                            error_msg,
                            self.dataset_schemas,
                            index
                        )
                        current_query = fixed
                        last_error = error_msg
                        continue
                    except Exception as fix_error:
                        last_error = f"{error_msg}; Fix failed: {str(fix_error)}"
                        break
                else:
                    last_error = f"Query returned 0 rows after {attempt + 1} attempts"
                    break
                    
            except Exception as e:
                error_msg = str(e)
                
                # Try to fix if we have retries left
                if attempt < max_retries and self.example_generator:
                    try:
                        fixed = self.example_generator.fix_esql_query(
                            current_query,
                            error_msg,
                            self.dataset_schemas,
                            index
                        )
                        current_query = fixed
                        last_error = error_msg
                        continue
                    except Exception as fix_error:
                        last_error = f"{error_msg}; Fix failed: {str(fix_error)}"
                        break
                else:
                    last_error = error_msg
                    break
        
        return False, 0, last_error, current_query if attempt > 0 else None
    
    def validate_example(
        self,
        example: Dict[str, Any],
        max_retries: int = 5,
        query_language: str = 'query_dsl'
    ) -> Dict[str, Any]:
        """Validate a single example.
        
        Args:
            example: Example dict with 'template' and 'index' keys
            max_retries: Maximum retry attempts
            query_language: 'query_dsl', 'esql', or 'eql'
            
        Returns:
            Validation result dict with:
            - valid: bool
            - hit_count: int
            - error: Optional[str]
            - fixed_template: Optional[str] or Optional[Dict[str, str]] for multi-index
        """
        try:
            template = example.get('template', '')
            index = example.get('index', 'product_reviews')
            
            # Handle ES|QL queries (plain text, not JSON)
            if query_language == 'esql':
                # Check if template is multi-index (dict)
                if isinstance(template, dict):
                    # Validate all index variations
                    indices = ['products', 'product_reviews', 'product_users']
                    all_valid = True
                    total_hits = 0
                    errors = []
                    fixed_templates = {}
                    
                    for idx in indices:
                        if idx not in template:
                            errors.append(f"Missing template for {idx}")
                            all_valid = False
                            continue
                        
                        idx_template = template[idx]
                        success, row_count, error, fixed_query = self.validate_esql_query(
                            idx_template,
                            index=idx,
                            max_retries=max_retries
                        )
                        
                        if success:
                            total_hits += row_count
                            if fixed_query:
                                fixed_templates[idx] = fixed_query
                        else:
                            all_valid = False
                            errors.append(f"{idx}: {error}")
                    
                    return {
                        'valid': all_valid,
                        'hit_count': total_hits,
                        'error': '; '.join(errors) if errors else None,
                        'fixed_template': fixed_templates if fixed_templates else None
                    }
                else:
                    # Single template (legacy or non-multi-index)
                    success, row_count, error, fixed_query = self.validate_esql_query(
                        template, 
                        index=index, 
                        max_retries=max_retries
                    )
                    return {
                        'valid': success,
                        'hit_count': row_count,
                        'error': error,
                        'fixed_template': fixed_query
                    }
            
            # Handle Query DSL (JSON format)
            if isinstance(template, str):
                query_obj = json.loads(template)
            else:
                query_obj = template
            
            index = example.get('index', 'product_reviews')
            
            success, hit_count, error, fixed_query = self.validate_query(
                query_obj,
                index,
                max_retries
            )
            
            result = {
                'valid': success,
                'hit_count': hit_count,
                'error': error,
                'fixed_template': json.dumps(fixed_query, indent=2) if fixed_query else None
            }
            
            return result
            
        except json.JSONDecodeError as e:
            return {
                'valid': False,
                'hit_count': 0,
                'error': f"Invalid JSON template: {str(e)}",
                'fixed_template': None
            }
        except Exception as e:
            return {
                'valid': False,
                'hit_count': 0,
                'error': f"Validation error: {str(e)}",
                'fixed_template': None
            }
    
    def validate_all_examples(
        self,
        examples: list,
        max_retries: int = 5,
        query_language: str = 'query_dsl'
    ) -> Dict[str, Any]:
        """Validate all examples in a lab config.
        
        Args:
            examples: List of example dicts
            max_retries: Maximum retry attempts per example
            query_language: 'query_dsl', 'esql', or 'eql'
            
        Returns:
            Validation summary with:
            - total: int
            - valid: int
            - invalid: int
            - results: List of validation results
        """
        results = []
        valid_count = 0
        invalid_count = 0
        
        for example in examples:
            result = self.validate_example(example, max_retries, query_language)
            results.append({
                'example_id': example.get('id', 'unknown'),
                **result
            })
            
            if result['valid']:
                valid_count += 1
            else:
                invalid_count += 1
        
        return {
            'total': len(examples),
            'valid': valid_count,
            'invalid': invalid_count,
            'results': results
        }

