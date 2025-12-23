"""LLM-powered example generator for lab configs."""

import json
import os
from pathlib import Path
from typing import Dict, List, Any, Optional
from dotenv import load_dotenv
from openai import OpenAI
from cache_manager import CacheManager


# Load .env from project root (parent of scripts directory)
project_root = Path(__file__).parent.parent.parent
load_dotenv(project_root / ".env")


class ExampleGenerator:
    """Generates lab examples using OpenAI."""
    
    def __init__(self, cache_manager: Optional[CacheManager] = None):
        """Initialize example generator.
        
        Args:
            cache_manager: Optional cache manager for LLM responses
        """
        self.cache_manager = cache_manager
        
        base_url = os.getenv("OPENAI_BASE_URL")
        api_key = os.getenv("OPENAI_API_KEY")
        model = os.getenv("OPENAI_MODEL", "gpt-4o")
        
        if not base_url or not api_key:
            raise ValueError("OPENAI_BASE_URL and OPENAI_API_KEY must be set in .env")
        
        self.client = OpenAI(
            base_url=base_url,
            api_key=api_key
        )
        self.model = model
    
    def _load_existing_config_example(self) -> str:
        """Load an existing lab config as a few-shot example.
        
        Returns:
            Example config as string
        """
        # Load match-query config as example
        example_path = os.path.join(
            os.path.dirname(__file__),
            "..",
            "..",
            "shared",
            "frontend",
            "src",
            "config",
            "labConfig.ts"
        )
        
        if os.path.exists(example_path):
            with open(example_path, 'r', encoding='utf-8') as f:
                return f.read()
        
        # Fallback to a minimal example
        return """
export const labConfig: LabConfig = {
  queryType: 'match',
  displayName: 'Match Query',
  description: 'Returns documents that match a provided text...',
  docUrl: 'https://www.elastic.co/docs/...',
  keyDisplayFields: {
    products: 'product_name',
    product_reviews: 'review_title',
    product_users: 'username',
  },
  searchFields: {
    products: 'product_description',
    product_reviews: 'review_text',
    product_users: 'interests',
  },
  sampleQueries: {
    products: 'premium wireless',
    product_reviews: 'comfortable durable',
    product_users: 'Electronics Books',
  },
  queryStructure: {
    type: 'match',
    fieldPath: 'inline',
  },
  examples: [
    {
      id: 'basic-match',
      title: 'Basic Match Query',
      description: 'Standard full-text search...',
      template: '{"query": {"match": {"review_text": {"query": "comfortable durable"}}}}',
      index: 'product_reviews',
      tryThis: ['Try changing the query text...'],
      tooltips: { query: 'The text to search for...' },
    },
  ],
};
"""
    
    def _detect_query_language(self, parsed_doc: Dict[str, Any]) -> str:
        """Detect query language from doc URL and content.
        
        Args:
            parsed_doc: Parsed documentation structure
            
        Returns:
            Query language: 'query_dsl', 'esql', or 'eql'
        """
        url = parsed_doc.get('doc_url', '').lower()
        title = parsed_doc.get('title', '').lower()
        description = parsed_doc.get('description', '').lower()
        content = parsed_doc.get('raw_markdown', '').lower()
        
        # Check for ES|QL indicators
        if 'esql' in url or 'esql' in title or 'es|ql' in content or 'esql' in description:
            return 'esql'
        
        # Check for EQL indicators
        if 'eql' in url and 'esql' not in url:
            if 'eql' in title or 'event query language' in description:
                return 'eql'
        
        # Default to Query DSL
        return 'query_dsl'
    
    def generate_lab_config(
        self,
        parsed_doc: Dict[str, Any],
        dataset_schemas: Dict[str, Any],
        existing_examples: Optional[List[Dict[str, str]]] = None
    ) -> Dict[str, Any]:
        """Generate lab config using LLM.
        
        Args:
            parsed_doc: Parsed documentation structure
            dataset_schemas: Dataset schema information
            existing_examples: Optional existing code examples from doc
            
        Returns:
            Generated LabConfig dict
        """
        # Check cache first
        if self.cache_manager:
            content_hash = self.cache_manager.compute_content_hash(
                parsed_doc.get('raw_markdown', ''),
                dataset_schemas
            )
            cached = self.cache_manager.get_llm_response(content_hash)
            if cached:
                return cached
        
        # Detect query language
        query_language = self._detect_query_language(parsed_doc)
        
        # Build prompt based on query language
        if query_language == 'esql':
            system_prompt = """You are an expert at creating interactive Elasticsearch ES|QL query lab examples.
Your task is to generate a LabConfig structure that will be used to create an interactive lab.

The LabConfig should:
1. Include 4-6 diverse examples that demonstrate different ES|QL commands (FROM, WHERE, KEEP, SORT, LIMIT, etc.)
2. Use realistic ES|QL queries that will return results from the provided datasets
3. Include helpful "tryThis" suggestions for each example
4. Include tooltips for key ES|QL commands and parameters
5. Use appropriate fields from the dataset schemas provided
6. For ES|QL, templates should be ES|QL query strings, not JSON

Return ONLY valid JSON matching the LabConfig structure. Do not include markdown code blocks or explanations."""
            
            user_prompt = f"""Generate a LabConfig for the following Elasticsearch ES|QL documentation page:

Title: {parsed_doc.get('title', '')}
Description: {parsed_doc.get('description', '')}
Query Type: {parsed_doc.get('query_type', '')}
URL: {parsed_doc.get('doc_url', '')}

Available Datasets:
{json.dumps(dataset_schemas, indent=2)}

ES|QL Query Examples for Datasets:
- products: FROM products | WHERE product_description LIKE '*wireless*' | LIMIT 10
- product_reviews: FROM product_reviews | WHERE review_text LIKE '*comfortable*' | LIMIT 10
- product_users: FROM product_users | WHERE interests LIKE '*Electronics*' | LIMIT 10

Existing Code Examples from Documentation:
{json.dumps(existing_examples or parsed_doc.get('code_examples', []), indent=2)}

Generate a complete LabConfig JSON object with:
- queryLanguage: "esql"
- queryType: "{parsed_doc.get('query_type', '')}"
- displayName: Human-readable name (e.g., "ES|QL Query")
- description: The description from the doc
- docUrl: The doc URL
- keyDisplayFields: Use the key_display_field from dataset_schemas
- searchFields: Use the searchable_text_fields from dataset_schemas (for reference, not used in ES|QL)
- sampleQueries: Realistic ES|QL query strings that will return results (e.g., "FROM product_reviews | WHERE review_text LIKE '*comfortable*'")
- examples: 4-6 diverse ES|QL examples with id, title, description, template (ES|QL query string, NOT JSON), index, tryThis, and tooltips

For ES|QL templates, use the ES|QL query string format directly, not wrapped in JSON.

Return ONLY the JSON object, no markdown formatting."""
        else:
            # Query DSL prompt (existing)
            system_prompt = """You are an expert at creating interactive Elasticsearch query lab examples.
Your task is to generate a LabConfig structure that will be used to create an interactive lab.

The LabConfig should:
1. Include 4-6 diverse examples that demonstrate different aspects of the query type
2. Use realistic queries that will return results from the provided datasets
3. Include helpful "tryThis" suggestions for each example
4. Include tooltips for key parameters
5. Use appropriate fields from the dataset schemas provided

Return ONLY valid JSON matching the LabConfig structure. Do not include markdown code blocks or explanations."""

            user_prompt = f"""Generate a LabConfig for the following Elasticsearch documentation page:

Title: {parsed_doc.get('title', '')}
Description: {parsed_doc.get('description', '')}
Query Type: {parsed_doc.get('query_type', '')}
URL: {parsed_doc.get('doc_url', '')}

Available Datasets:
{json.dumps(dataset_schemas, indent=2)}

Existing Code Examples from Documentation:
{json.dumps(existing_examples or parsed_doc.get('code_examples', []), indent=2)}

Example LabConfig Structure (for reference):
{self._load_existing_config_example()}

Generate a complete LabConfig JSON object with:
- queryLanguage: "query_dsl"
- queryType: "{parsed_doc.get('query_type', '')}"
- displayName: Human-readable name (e.g., "Match Query")
- description: The description from the doc
- docUrl: The doc URL
- keyDisplayFields: Use the key_display_field from dataset_schemas
- searchFields: Use the searchable_text_fields from dataset_schemas
- sampleQueries: Realistic query strings that will return results
- queryStructure: Determine the fieldPath based on query type (inline, default_field, fields, or nested)
- examples: 4-6 diverse examples with id, title, description, template (JSON string), index, tryThis, and tooltips

Return ONLY the JSON object, no markdown formatting."""

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.7,
                max_tokens=4000
            )
            
            content = response.choices[0].message.content.strip()
            
            # Remove markdown code blocks if present
            if content.startswith('```'):
                # Extract JSON from code block
                lines = content.split('\n')
                json_lines = []
                in_code_block = False
                for line in lines:
                    if line.strip().startswith('```'):
                        in_code_block = not in_code_block
                        continue
                    if in_code_block:
                        json_lines.append(line)
                content = '\n'.join(json_lines)
            
            # Parse JSON
            lab_config = json.loads(content)
            
            # #region agent log
            _log_path = "/Users/jeffvestal/repos/doc_modules_short/.cursor/debug.log"
            if query_language == 'esql':
                _examples = lab_config.get('examples', [])
                with open(_log_path, "a") as _f: _f.write(json.dumps({"location": "example_generator.py:generate_lab_config:parsed", "message": "ESQL examples from LLM", "data": {"example_count": len(_examples), "first_template": _examples[0].get('template', '')[:150] if _examples else None, "has_single_quotes": any("'" in ex.get('template', '') for ex in _examples)}, "hypothesisId": "A,B", "timestamp": __import__("time").time()}) + "\n")
            # #endregion
            
            # Post-process: ensure required fields exist with defaults
            if 'keyDisplayFields' not in lab_config or not lab_config['keyDisplayFields']:
                lab_config['keyDisplayFields'] = {
                    'products': 'product_name',
                    'product_reviews': 'review_title',
                    'product_users': 'username'
                }
            
            if 'searchFields' not in lab_config or not lab_config['searchFields']:
                lab_config['searchFields'] = {
                    'products': 'product_name',
                    'product_reviews': 'review_text',
                    'product_users': 'interests'
                }
            
            if 'sampleQueries' not in lab_config or not lab_config['sampleQueries']:
                lab_config['sampleQueries'] = {
                    'products': 'wireless',
                    'product_reviews': 'comfortable',
                    'product_users': 'Electronics'
                }
            
            if 'queryStructure' not in lab_config or not lab_config['queryStructure']:
                lab_config['queryStructure'] = {
                    'type': 'inline',
                    'fieldPath': ''
                }
            
            # Ensure examples field exists (even if empty)
            if 'examples' not in lab_config:
                lab_config['examples'] = []
            
            # Post-process: ensure tryThis is always an array of strings
            for example in lab_config.get('examples', []):
                if 'tryThis' in example:
                    try_this = example['tryThis']
                    if isinstance(try_this, str):
                        # LLM returned a single string - wrap in array
                        example['tryThis'] = [try_this]
                    elif isinstance(try_this, list):
                        # Filter out any single-character entries (LLM bug)
                        example['tryThis'] = [
                            s for s in try_this 
                            if isinstance(s, str) and len(s) > 5
                        ]
            
            # Post-process: Fix ES|QL queries - convert single quotes to double quotes
            # ES|QL requires double quotes for string literals, but LLMs often generate single quotes
            if query_language == 'esql':
                import re
                for example in lab_config.get('examples', []):
                    if 'template' in example and isinstance(example['template'], str):
                        # Replace single-quoted strings with double-quoted strings
                        # Match 'value' and replace with "value"
                        example['template'] = re.sub(r"'([^']*)'", r'"\1"', example['template'])
                # #region agent log
                _examples_after = lab_config.get('examples', [])
                with open(_log_path, "a") as _f: _f.write(json.dumps({"location": "example_generator.py:generate_lab_config:post_fix", "message": "ESQL templates after quote fix", "data": {"first_template": _examples_after[0].get('template', '')[:150] if _examples_after else None, "has_single_quotes": any("'" in ex.get('template', '') for ex in _examples_after), "has_double_quotes": any('"' in ex.get('template', '') for ex in _examples_after)}, "hypothesisId": "A", "timestamp": __import__("time").time()}) + "\n")
                # #endregion
            
            # RETRY IF NO EXAMPLES GENERATED
            examples = lab_config.get('examples', [])
            if len(examples) == 0:
                # Don't cache empty results - retry up to 3 times
                for retry in range(3):
                    print(f"[LLM] No examples generated, retrying ({retry + 1}/3)...")
                    retry_response = self.client.chat.completions.create(
                        model=self.model,
                        messages=[
                            {"role": "system", "content": system_prompt + "\n\nIMPORTANT: You MUST generate at least 4 examples. Do not return an empty examples array."},
                            {"role": "user", "content": user_prompt}
                        ],
                        temperature=0.8,  # Slightly higher temperature for variety
                        max_tokens=4000
                    )
                    retry_content = retry_response.choices[0].message.content.strip()
                    
                    # Remove markdown if present
                    if retry_content.startswith('```'):
                        lines = retry_content.split('\n')
                        json_lines = []
                        in_block = False
                        for line in lines:
                            if line.strip().startswith('```'):
                                in_block = not in_block
                                continue
                            if in_block:
                                json_lines.append(line)
                        retry_content = '\n'.join(json_lines)
                    
                    try:
                        retry_config = json.loads(retry_content)
                        if len(retry_config.get('examples', [])) > 0:
                            # Merge retry examples into lab_config
                            lab_config['examples'] = retry_config.get('examples', [])
                            print(f"[LLM] Retry successful - got {len(lab_config['examples'])} examples")
                            break
                    except json.JSONDecodeError:
                        continue
                
                # Final check - if still no examples, raise error
                if len(lab_config.get('examples', [])) == 0:
                    raise ValueError("LLM failed to generate examples after 3 retries")
            
            # Only cache if we have examples
            if self.cache_manager and len(lab_config.get('examples', [])) > 0:
                self.cache_manager.set_llm_response(content_hash, lab_config)
            
            return lab_config
            
        except json.JSONDecodeError as e:
            raise ValueError(f"Failed to parse LLM response as JSON: {e}\nResponse: {content}")
        except Exception as e:
            raise RuntimeError(f"LLM generation failed: {e}")
    
    def fix_query(
        self,
        query: Dict[str, Any],
        error_message: str,
        dataset_schemas: Dict[str, Any],
        target_index: str
    ) -> Dict[str, Any]:
        """Ask LLM to fix a query that returned 0 hits.
        
        Args:
            query: The query that failed
            error_message: Error message or description
            dataset_schemas: Dataset schema information
            target_index: Target index name
            
        Returns:
            Fixed query dict
        """
        system_prompt = """You are an expert at fixing Elasticsearch queries.
Your task is to fix queries that return 0 results by adjusting fields, query text, or structure."""

        user_prompt = f"""Fix this Elasticsearch query that returned 0 results:

Query:
{json.dumps(query, indent=2)}

Error/Issue: {error_message}

Target Index: {target_index}

Available Fields for {target_index}:
{json.dumps(dataset_schemas.get(target_index, {}), indent=2)}

Return ONLY the fixed query as a JSON object. Do not include explanations or markdown."""

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.3,
                max_tokens=2000
            )
            
            content = response.choices[0].message.content.strip()
            
            # Remove markdown code blocks if present
            if content.startswith('```'):
                lines = content.split('\n')
                json_lines = []
                in_code_block = False
                for line in lines:
                    if line.strip().startswith('```'):
                        in_code_block = not in_code_block
                        continue
                    if in_code_block:
                        json_lines.append(line)
                content = '\n'.join(json_lines)
            
            fixed_query = json.loads(content)
            return fixed_query
            
        except Exception as e:
            raise RuntimeError(f"Query fix failed: {e}")
    
    def fix_esql_query(
        self,
        query: str,
        error_message: str,
        dataset_schemas: Dict[str, Any],
        target_index: str
    ) -> str:
        """Ask LLM to fix an ES|QL query that returned 0 rows or had errors.
        
        Args:
            query: The ES|QL query string that failed
            error_message: Error message or description
            dataset_schemas: Dataset schema information
            target_index: Target index name
            
        Returns:
            Fixed ES|QL query string
        """
        import re
        
        schema_info = dataset_schemas.get(target_index, {})
        
        system_prompt = """You are an expert at fixing ES|QL queries.
Your task is to fix queries that return 0 results or have errors.

CRITICAL ES|QL RULES:
1. ES|QL uses DOUBLE QUOTES for string literals, NOT single quotes
2. Use LIKE with wildcards for text search: LIKE "*term*"
3. For exact matches on keyword fields, use == with double quotes
4. Check field names match the schema exactly

Return ONLY the fixed ES|QL query string. No explanations, no markdown, no code blocks."""

        user_prompt = f"""Fix this ES|QL query:

Query: {query}

Error/Issue: {error_message}

Target Index: {target_index}

Schema for {target_index}:
- Fields: {schema_info.get('fields', [])}
- Searchable text fields: {schema_info.get('searchable_text_fields', [])}
- Keyword field values: {json.dumps(schema_info.get('keyword_field_values', {}), indent=2)}
- Working ES|QL examples: {schema_info.get('esql_examples', [])}

Return ONLY the fixed ES|QL query string (no quotes around it, no explanations)."""

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.3,
                max_tokens=500
            )
            
            content = response.choices[0].message.content.strip()
            
            # Remove any markdown code blocks
            if content.startswith('```'):
                lines = content.split('\n')
                content_lines = []
                in_block = False
                for line in lines:
                    if line.strip().startswith('```'):
                        in_block = not in_block
                        continue
                    if in_block:
                        content_lines.append(line)
                content = '\n'.join(content_lines).strip()
            
            # Remove surrounding quotes if LLM added them
            if (content.startswith('"') and content.endswith('"')) or \
               (content.startswith("'") and content.endswith("'")):
                content = content[1:-1]
            
            # Ensure double quotes for string literals (fix any single quotes)
            content = re.sub(r"'([^']*)'", r'"\1"', content)
            
            return content
            
        except Exception as e:
            raise RuntimeError(f"ES|QL query fix failed: {e}")

