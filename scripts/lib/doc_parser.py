"""Documentation parser for Elastic docs."""

import re
import json
from typing import Dict, List, Optional
from urllib.parse import urlparse
import requests


def normalize_url(url: str) -> str:
    """Normalize URL to markdown format.
    
    Args:
        url: Original URL
        
    Returns:
        URL with .md extension if needed
    """
    if url.endswith('.md'):
        return url
    return url + '.md'


def extract_slug_from_url(url: str) -> str:
    """Extract lab slug from URL.
    
    Args:
        url: Documentation URL
        
    Returns:
        Slug (e.g., 'match-query' from '.../query-dsl-match-query')
    """
    # Remove .md if present
    url = url.replace('.md', '')
    
    # Extract the last path component
    parsed = urlparse(url)
    path_parts = [p for p in parsed.path.split('/') if p]
    
    if not path_parts:
        return "unknown"
    
    # Get the last part (e.g., 'query-dsl-match-query')
    last_part = path_parts[-1]
    
    # Remove 'query-dsl-' prefix if present
    if last_part.startswith('query-dsl-'):
        slug = last_part.replace('query-dsl-', '')
    else:
        slug = last_part
    
    return slug


def extract_query_type_from_url(url: str) -> str:
    """Extract query type from URL.
    
    Args:
        url: Documentation URL
        
    Returns:
        Query type (e.g., 'match', 'bool', 'query_string')
    """
    slug = extract_slug_from_url(url)
    # Convert kebab-case to snake_case for query type
    return slug.replace('-', '_')


def fetch_markdown(url: str) -> str:
    """Fetch markdown content from URL.
    
    Args:
        url: URL to fetch
        
    Returns:
        Markdown content
        
    Raises:
        requests.RequestException: If fetch fails
    """
    normalized = normalize_url(url)
    headers = {
        'User-Agent': 'Mozilla/5.0 (compatible; LabGenerator/1.0)'
    }
    response = requests.get(normalized, timeout=30, headers=headers)
    response.raise_for_status()
    return response.text


def extract_title(markdown: str) -> str:
    """Extract title from markdown (first H1).
    
    Args:
        markdown: Markdown content
        
    Returns:
        Title or empty string
    """
    match = re.search(r'^#\s+(.+)$', markdown, re.MULTILINE)
    if match:
        return match.group(1).strip()
    return ""


def extract_description(markdown: str) -> str:
    """Extract description (first paragraph after title).
    
    Args:
        markdown: Markdown content
        
    Returns:
        Description text
    """
    # Remove title
    lines = markdown.split('\n')
    start_idx = 0
    for i, line in enumerate(lines):
        if line.startswith('# '):
            start_idx = i + 1
            break
    
    # Find first paragraph
    description_parts = []
    for line in lines[start_idx:]:
        line = line.strip()
        if not line:
            if description_parts:
                break
            continue
        if line.startswith('#'):
            break
        description_parts.append(line)
    
    return ' '.join(description_parts).strip()


def extract_code_examples(markdown: str) -> List[Dict[str, str]]:
    """Extract code examples from markdown.
    
    Args:
        markdown: Markdown content
        
    Returns:
        List of code example dicts with 'code' and 'language' keys
    """
    examples = []
    
    # Match fenced code blocks
    pattern = r'```(\w+)?\n(.*?)```'
    matches = re.finditer(pattern, markdown, re.DOTALL | re.MULTILINE)
    
    for match in matches:
        language = match.group(1) or ''
        code = match.group(2).strip()
        
        # Filter for JSON examples (likely Elasticsearch queries)
        if language.lower() in ['json', ''] and ('query' in code.lower() or '{' in code):
            examples.append({
                'code': code,
                'language': language or 'json'
            })
    
    return examples


def identify_missing_examples(markdown: str, existing_examples: List[Dict[str, str]]) -> List[str]:
    """Identify documented parameters without examples.
    
    This is a simplified version - in practice, we'd parse the doc more carefully
    to identify parameter sections and check if examples exist.
    
    Args:
        markdown: Markdown content
        existing_examples: List of existing code examples
        
    Returns:
        List of parameter names that might need examples
    """
    # Look for parameter sections (e.g., "### Parameters", "#### Options")
    # This is a heuristic - the LLM will do better analysis
    missing = []
    
    # Common parameter patterns
    param_patterns = [
        r'###\s+(\w+)\s+parameter',
        r'####\s+(\w+)',
        r'`(\w+)`\s+\(.*?\)',
    ]
    
    found_params = set()
    for pattern in param_patterns:
        matches = re.finditer(pattern, markdown, re.IGNORECASE)
        for match in matches:
            param = match.group(1).lower()
            found_params.add(param)
    
    # Check if we have examples for these params
    example_text = ' '.join([ex['code'] for ex in existing_examples])
    
    for param in found_params:
        if param not in example_text.lower():
            missing.append(param)
    
    return missing


def parse_documentation(url: str, markdown: Optional[str] = None) -> Dict:
    """Parse documentation page.
    
    Args:
        url: Documentation URL
        markdown: Optional pre-fetched markdown (if None, will fetch)
        
    Returns:
        Parsed document structure with:
        - url: Original URL
        - normalized_url: URL with .md
        - slug: Lab slug
        - query_type: Query type
        - title: Page title
        - description: Page description
        - doc_url: Original URL (without .md)
        - code_examples: List of code examples
        - missing_examples: List of parameters needing examples
    """
    if markdown is None:
        markdown = fetch_markdown(url)
    
    normalized_url = normalize_url(url)
    slug = extract_slug_from_url(url)
    query_type = extract_query_type_from_url(url)
    title = extract_title(markdown)
    description = extract_description(markdown)
    code_examples = extract_code_examples(markdown)
    missing_examples = identify_missing_examples(markdown, code_examples)
    
    return {
        'url': url,
        'normalized_url': normalized_url,
        'slug': slug,
        'query_type': query_type,
        'title': title,
        'description': description,
        'doc_url': url.replace('.md', ''),  # Original URL without .md
        'code_examples': code_examples,
        'missing_examples': missing_examples,
        'raw_markdown': markdown
    }

