"""MCP Client for Elastic Agent Builder.

This module provides a client for interacting with Elastic's Agent Builder
MCP server to generate and execute ES|QL queries.

Based on: https://www.elastic.co/docs/solutions/search/agent-builder/mcp-server
"""

import os
import json
import httpx
from pathlib import Path
from typing import Dict, Any, Optional, List
from dotenv import load_dotenv


# Load .env from project root
project_root = Path(__file__).parent.parent.parent
load_dotenv(project_root / ".env")


class MCPClient:
    """Client for Elastic Agent Builder MCP server.
    
    This client provides access to the Agent Builder tools including:
    - generate_esql: Generate ES|QL queries from natural language
    - execute_esql: Execute ES|QL queries and return results
    
    The MCP server provides better ES|QL query generation than generic LLMs
    because it's trained specifically on Elasticsearch and has access to 
    index mappings.
    """
    
    def __init__(
        self,
        server_url: Optional[str] = None,
        api_key: Optional[str] = None
    ):
        """Initialize MCP client.
        
        Args:
            server_url: MCP server URL (defaults to MCP_SERVER_URL env var)
            api_key: API key for authentication (defaults to MCP_API_KEY env var)
        """
        self.server_url = server_url or os.getenv("MCP_SERVER_URL")
        self.api_key = api_key or os.getenv("MCP_API_KEY")
        
        if not self.server_url:
            raise ValueError(
                "MCP_SERVER_URL must be set in .env or passed to constructor. "
                "Get your URL from Kibana: Tools GUI > Copy MCP Server URL"
            )
        
        if not self.api_key:
            raise ValueError(
                "MCP_API_KEY must be set in .env or passed to constructor. "
                "Create an API key with appropriate permissions."
            )
        
        self.headers = {
            "Authorization": f"ApiKey {self.api_key}",
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        
        # HTTP client with reasonable timeouts
        self.client = httpx.Client(
            headers=self.headers,
            timeout=httpx.Timeout(60.0, connect=10.0)
        )
    
    def _call_tool(
        self,
        tool_name: str,
        arguments: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Call an MCP tool.
        
        Args:
            tool_name: Name of the tool (e.g., "platform.core.generate_esql")
            arguments: Tool arguments
            
        Returns:
            Tool response
        """
        # MCP uses JSON-RPC 2.0 style requests
        payload = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "tools/call",
            "params": {
                "name": tool_name,
                "arguments": arguments
            }
        }
        
        try:
            response = self.client.post(self.server_url, json=payload)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            raise RuntimeError(
                f"MCP request failed with status {e.response.status_code}: "
                f"{e.response.text}"
            )
        except httpx.RequestError as e:
            raise RuntimeError(f"MCP request error: {e}")
    
    def generate_esql(
        self,
        query: str,
        index: Optional[str] = None,
        context: Optional[str] = None
    ) -> str:
        """Generate an ES|QL query from natural language.
        
        This uses Elastic's trained ES|QL generation model which produces
        significantly better queries than generic LLMs:
        - Uses proper MATCH() for full-text search
        - Includes METADATA _score for relevance
        - Knows ES|QL syntax and functions
        - Has access to index mappings
        
        Args:
            query: Natural language query description
            index: Optional index to search (if not provided, uses index explorer)
            context: Optional additional context
            
        Returns:
            Generated ES|QL query string
        """
        arguments = {
            "query": query
        }
        
        if index:
            arguments["index"] = index
        
        if context:
            arguments["context"] = context
        
        result = self._call_tool("platform.core.generate_esql", arguments)
        
        # Extract ES|QL from response
        # Response format: {"results": [{"type": "query", "data": {"esql": "..."}}]}
        try:
            if "result" in result:
                # Standard MCP response
                content = result["result"]
                if isinstance(content, dict) and "results" in content:
                    for item in content["results"]:
                        if item.get("type") == "query" and "data" in item:
                            return item["data"].get("esql", "")
                elif isinstance(content, str):
                    return content
            
            # Direct results format (observed in testing)
            if "results" in result:
                for item in result["results"]:
                    if item.get("type") == "query" and "data" in item:
                        return item["data"].get("esql", "")
            
            # Fallback: return raw if it looks like ES|QL
            raw = json.dumps(result)
            if "FROM " in raw:
                # Try to extract the query
                import re
                match = re.search(r'FROM\s+\w+[^"]*', raw)
                if match:
                    return match.group(0)
            
            raise ValueError(f"Could not extract ES|QL from response: {result}")
            
        except Exception as e:
            raise RuntimeError(f"Failed to parse generate_esql response: {e}")
    
    def execute_esql(
        self,
        query: str
    ) -> Dict[str, Any]:
        """Execute an ES|QL query and return results.
        
        Args:
            query: ES|QL query string
            
        Returns:
            Query results in tabular format
        """
        arguments = {
            "query": query
        }
        
        result = self._call_tool("platform.core.execute_esql", arguments)
        
        # Extract results
        try:
            if "result" in result:
                return result["result"]
            return result
        except Exception as e:
            raise RuntimeError(f"Failed to parse execute_esql response: {e}")
    
    def generate_and_validate_esql(
        self,
        description: str,
        index: str,
        context: Optional[str] = None,
        max_retries: int = 3
    ) -> tuple[str, int]:
        """Generate ES|QL and validate it returns results.
        
        Args:
            description: Natural language description of what to search
            index: Target index
            context: Optional additional context
            max_retries: Maximum generation attempts
            
        Returns:
            Tuple of (esql_query, row_count)
        """
        for attempt in range(max_retries):
            try:
                # Generate query
                esql = self.generate_esql(
                    query=description,
                    index=index,
                    context=context
                )
                
                # Execute to validate
                result = self.execute_esql(esql)
                
                # Check for results
                row_count = 0
                if isinstance(result, dict):
                    if "values" in result:
                        row_count = len(result.get("values", []))
                    elif "results" in result:
                        for item in result["results"]:
                            if "data" in item and "values" in item["data"]:
                                row_count = len(item["data"]["values"])
                                break
                
                if row_count > 0:
                    return esql, row_count
                
                # No results, retry with modified context
                context = f"{context or ''} The previous query returned 0 results. Generate a query that will return results."
                
            except Exception as e:
                if attempt == max_retries - 1:
                    raise
                print(f"[MCP] Attempt {attempt + 1} failed: {e}, retrying...")
        
        raise RuntimeError(f"Failed to generate valid ES|QL after {max_retries} attempts")
    
    def is_available(self) -> bool:
        """Check if MCP server is available.
        
        Returns:
            True if server responds, False otherwise
        """
        try:
            # Try a simple tool list request
            payload = {
                "jsonrpc": "2.0",
                "id": 1,
                "method": "tools/list"
            }
            response = self.client.post(self.server_url, json=payload)
            return response.status_code == 200
        except Exception:
            return False
    
    def close(self):
        """Close the HTTP client."""
        self.client.close()
    
    def __enter__(self):
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.close()


def get_mcp_client() -> Optional[MCPClient]:
    """Get MCP client if configured.
    
    Returns:
        MCPClient instance or None if not configured
    """
    server_url = os.getenv("MCP_SERVER_URL")
    api_key = os.getenv("MCP_API_KEY")
    
    if server_url and api_key:
        try:
            return MCPClient(server_url, api_key)
        except Exception as e:
            print(f"[MCP] Warning: Could not initialize MCP client: {e}")
            return None
    
    return None

