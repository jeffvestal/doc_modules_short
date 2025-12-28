"""Elasticsearch validator with auto-fix capabilities."""

import json
import os
from pathlib import Path
from typing import Dict, Any, Tuple, Optional
from dotenv import load_dotenv
from elasticsearch import Elasticsearch
from example_generator import ExampleGenerator
from cache_manager import CacheManager
from mcp_client import MCPClient, get_mcp_client


# Load .env from project root (parent of scripts directory)
project_root = Path(__file__).parent.parent.parent
load_dotenv(project_root / ".env")


class ESValidator:
    """Validates queries against Elasticsearch with auto-fix."""
    
    def __init__(
        self,
        example_generator: Optional[ExampleGenerator] = None,
        dataset_schemas: Optional[Dict[str, Any]] = None,
        mcp_client: Optional[MCPClient] = None
    ):
        """Initialize ES validator.
        
        Args:
            example_generator: Optional generator for fixing queries
            dataset_schemas: Dataset schema information
            mcp_client: Optional MCP client for ES|QL validation
        """
        self.example_generator = example_generator
        self.dataset_schemas = dataset_schemas or {}
        self.mcp_client = mcp_client
        
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
        max_retries: int = 3,
        use_mcp: bool = True
    ) -> Tuple[bool, int, Optional[str], Optional[str]]:
        """Validate an ES|QL query with auto-fix retries.
        
        Args:
            query: ES|QL query string
            index: Target index name (for fixing)
            max_retries: Maximum retry attempts
            use_mcp: Whether to use MCP for validation (if available)
            
        Returns:
            Tuple of (success, row_count, error_message, fixed_query)
        """
        current_query = query
        last_error = None
        
        for attempt in range(max_retries + 1):
            try:
                # Use MCP's execute_esql if available (validates on serverless cluster)
                if use_mcp and self.mcp_client:
                    try:
                        result = self.mcp_client.execute_esql(current_query)
                        # #region agent log
                        log_path = "/Users/jeffvestal/repos/doc_modules_short/.cursor/debug.log"
                        with open(log_path, 'a') as f:
                            import time as t
                            f.write(json.dumps({"hypothesisId": "H_EXEC", "location": "es_validator.py:validate_esql_query", "message": "execute_esql result", "data": {"query": current_query[:100], "result_type": str(type(result)), "result_keys": list(result.keys()) if isinstance(result, dict) else None, "result_sample": str(result)[:500]}, "timestamp": t.time()}) + "\n")
                        # #endregion
                        # Parse MCP response - format is: {"content": [{"type": "text", "text": "{\"results\":[...]}"}]}
                        if isinstance(result, dict) and 'content' in result:
                            content = result.get('content', [])
                            if content and isinstance(content, list):
                                for item in content:
                                    if isinstance(item, dict) and item.get('type') == 'text':
                                        text = item.get('text', '{}')
                                        parsed = json.loads(text)
                                        if 'results' in parsed:
                                            for r in parsed['results']:
                                                # Check for tabular_data type (successful execution)
                                                if r.get('type') == 'tabular_data' and 'data' in r:
                                                    row_count = len(r['data'].get('values', []))
                                                    # #region agent log
                                                    with open(log_path, 'a') as f:
                                                        f.write(json.dumps({"hypothesisId": "H_EXEC", "location": "es_validator.py", "message": "tabular_data found", "data": {"row_count": row_count, "columns": len(r['data'].get('columns', []))}, "timestamp": t.time()}) + "\n")
                                                    # #endregion
                                                    if row_count > 0:
                                                        return True, row_count, None, current_query if attempt > 0 else None
                                                # Check for error type
                                                elif r.get('type') == 'error' and 'data' in r:
                                                    error_msg = r['data'].get('message', 'Unknown MCP error')
                                                    # #region agent log
                                                    with open(log_path, 'a') as f:
                                                        f.write(json.dumps({"hypothesisId": "H_EXEC", "location": "es_validator.py", "message": "MCP error", "data": {"error": error_msg[:200]}, "timestamp": t.time()}) + "\n")
                                                    # #endregion
                                                    raise Exception(f"MCP execute error: {error_msg}")
                    except Exception as mcp_error:
                        # If MCP fails, fall back to local ES
                        # #region agent log
                        with open(log_path, 'a') as f:
                            import time as t
                            f.write(json.dumps({"hypothesisId": "H_EXEC", "location": "es_validator.py", "message": "MCP fallback", "data": {"error": str(mcp_error)[:200]}, "timestamp": t.time()}) + "\n")
                        # #endregion
                        print(f"[MCP] execute_esql failed, falling back to local ES: {mcp_error}")
                
                # Fall back to local ES validation
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
                        
                        MIN_REQUIRED_DOCS = 3
                        if success:
                            if row_count < MIN_REQUIRED_DOCS:
                                # Each index must return at least 3 docs
                                all_valid = False
                                errors.append(f"{idx}: Query returned {row_count} rows (need >= {MIN_REQUIRED_DOCS})")
                            else:
                                total_hits += row_count
                            if fixed_query:
                                fixed_templates[idx] = fixed_query
                        else:
                            # Syntax/execution error is a real failure
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

