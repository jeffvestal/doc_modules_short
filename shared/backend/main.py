#!/usr/bin/env python3
"""
Minimal FastAPI backend for unified serving in Instruqt.
Serves frontend static files and proxies Elasticsearch requests.
"""

import os
from fastapi import FastAPI, Request, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import httpx

app = FastAPI()

# Environment variables
ELASTICSEARCH_URL = os.getenv("ELASTICSEARCH_URL", "http://kubernetes-vm:30920")
ELASTICSEARCH_APIKEY = os.getenv("ELASTICSEARCH_APIKEY", "")

# Mount static files (frontend build output)
static_dir = os.path.join(os.path.dirname(__file__), "static")
if os.path.exists(static_dir):
    app.mount("/static", StaticFiles(directory=static_dir), name="static")


@app.get("/")
async def serve_index():
    """Serve the frontend index.html"""
    index_path = os.path.join(static_dir, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"error": "Frontend not built. Run 'npm run build' in frontend directory."}


@app.api_route("/api/elasticsearch/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH"])
async def proxy_elasticsearch(path: str, request: Request):
    """Proxy Elasticsearch API requests"""
    if not ELASTICSEARCH_APIKEY:
        raise HTTPException(status_code=500, detail="ELASTICSEARCH_APIKEY not configured")
    
    # Get request body if present
    body = None
    if request.method in ["POST", "PUT", "PATCH"]:
        body = await request.body()
    
    # Build target URL
    target_url = f"{ELASTICSEARCH_URL}/{path}"
    
    # Forward query parameters
    query_params = dict(request.query_params)
    
    # Make request to Elasticsearch
    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            response = await client.request(
                method=request.method,
                url=target_url,
                headers={
                    "Authorization": f"ApiKey {ELASTICSEARCH_APIKEY}",
                    "Content-Type": "application/json",
                },
                params=query_params,
                content=body,
            )
            return response.json()
        except httpx.RequestError as e:
            raise HTTPException(status_code=502, detail=f"Elasticsearch proxy error: {str(e)}")


@app.get("/health")
async def health():
    """Health check endpoint"""
    return {
        "status": "ok",
        "elasticsearch_url": ELASTICSEARCH_URL,
        "has_apikey": bool(ELASTICSEARCH_APIKEY),
    }

