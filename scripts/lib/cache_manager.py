"""Cache manager for markdown fetches and LLM responses."""

import hashlib
import json
import os
from pathlib import Path
from typing import Optional, Any


class CacheManager:
    """Manages caching of markdown content and LLM responses."""
    
    def __init__(self, cache_dir: str = ".generate-labs-cache", use_cache: bool = True):
        """Initialize cache manager.
        
        Args:
            cache_dir: Directory to store cache files
            use_cache: Whether to use caching (False bypasses all cache operations)
        """
        self.cache_dir = Path(cache_dir)
        self.use_cache = use_cache
        self.markdown_dir = self.cache_dir / "markdown"
        self.llm_dir = self.cache_dir / "llm"
        
        if self.use_cache:
            self.markdown_dir.mkdir(parents=True, exist_ok=True)
            self.llm_dir.mkdir(parents=True, exist_ok=True)
    
    def _hash(self, content: str) -> str:
        """Generate SHA256 hash of content."""
        return hashlib.sha256(content.encode('utf-8')).hexdigest()
    
    def get_markdown(self, url: str) -> Optional[str]:
        """Get cached markdown content for a URL.
        
        Args:
            url: The URL to fetch markdown for
            
        Returns:
            Cached markdown content or None if not cached
        """
        if not self.use_cache:
            return None
        
        url_hash = self._hash(url)
        cache_file = self.markdown_dir / f"{url_hash}.md"
        
        if cache_file.exists():
            return cache_file.read_text(encoding='utf-8')
        return None
    
    def set_markdown(self, url: str, content: str) -> None:
        """Cache markdown content for a URL.
        
        Args:
            url: The URL
            content: The markdown content to cache
        """
        if not self.use_cache:
            return
        
        url_hash = self._hash(url)
        cache_file = self.markdown_dir / f"{url_hash}.md"
        cache_file.write_text(content, encoding='utf-8')
    
    def get_parsed_doc(self, url: str) -> Optional[dict]:
        """Get cached parsed document structure.
        
        Args:
            url: The URL
            
        Returns:
            Parsed document dict or None if not cached
        """
        if not self.use_cache:
            return None
        
        url_hash = self._hash(url)
        cache_file = self.markdown_dir / f"{url_hash}.parsed.json"
        
        if cache_file.exists():
            return json.loads(cache_file.read_text(encoding='utf-8'))
        return None
    
    def set_parsed_doc(self, url: str, parsed: dict) -> None:
        """Cache parsed document structure.
        
        Args:
            url: The URL
            parsed: The parsed document structure
        """
        if not self.use_cache:
            return
        
        url_hash = self._hash(url)
        cache_file = self.markdown_dir / f"{url_hash}.parsed.json"
        cache_file.write_text(json.dumps(parsed, indent=2), encoding='utf-8')
    
    def get_llm_response(self, content_hash: str) -> Optional[dict]:
        """Get cached LLM response.
        
        Args:
            content_hash: Hash of the content used to generate the response
            
        Returns:
            Cached LLM response dict or None if not cached
        """
        if not self.use_cache:
            return None
        
        cache_file = self.llm_dir / f"{content_hash}.json"
        
        if cache_file.exists():
            return json.loads(cache_file.read_text(encoding='utf-8'))
        return None
    
    def set_llm_response(self, content_hash: str, response: dict) -> None:
        """Cache LLM response.
        
        Args:
            content_hash: Hash of the content
            response: The LLM response to cache
        """
        if not self.use_cache:
            return
        
        cache_file = self.llm_dir / f"{content_hash}.json"
        cache_file.write_text(json.dumps(response, indent=2), encoding='utf-8')
    
    def compute_content_hash(self, doc_content: str, dataset_schemas: dict) -> str:
        """Compute hash for LLM content (doc + schemas).
        
        Args:
            doc_content: Document content
            dataset_schemas: Dataset schema dict
            
        Returns:
            Content hash string
        """
        combined = json.dumps({
            "doc": doc_content,
            "schemas": dataset_schemas
        }, sort_keys=True)
        return self._hash(combined)
    
    def clear(self) -> None:
        """Clear all cached content."""
        if self.cache_dir.exists():
            import shutil
            shutil.rmtree(self.cache_dir)
            self.markdown_dir.mkdir(parents=True, exist_ok=True)
            self.llm_dir.mkdir(parents=True, exist_ok=True)

