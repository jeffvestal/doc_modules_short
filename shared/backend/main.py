#!/usr/bin/env python3
"""
Minimal FastAPI backend for unified serving in Instruqt.
Serves frontend static files and proxies Elasticsearch requests.
"""

import os
import json
from fastapi import FastAPI, Request, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, Response
from starlette.middleware.base import BaseHTTPMiddleware
import httpx

app = FastAPI()

# Environment variables
ELASTICSEARCH_URL = os.getenv("ELASTICSEARCH_URL", "http://kubernetes-vm:30920")
ELASTICSEARCH_APIKEY = os.getenv("ELASTICSEARCH_APIKEY", "")

# Static directory for frontend build output
static_dir = os.path.join(os.path.dirname(__file__), "static")
assets_dir = os.path.join(static_dir, "assets")

# Middleware to log requests to stdout for Instruqt terminal debugging
class RequestLogger(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        print(f"[Backend] {request.method} {request.url.path} - {response.status_code}")
        return response

app.add_middleware(RequestLogger)

@app.api_route("/api/elasticsearch/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH"])
async def proxy_elasticsearch(path: str, request: Request):
    """Proxy Elasticsearch API requests with ApiKey authentication"""
    if not ELASTICSEARCH_APIKEY:
        raise HTTPException(status_code=500, detail="ELASTICSEARCH_APIKEY not configured")
    
    body = None
    if request.method in ["POST", "PUT", "PATCH"]:
        body = await request.body()
    
    target_url = f"{ELASTICSEARCH_URL}/{path}"
    
    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            response = await client.request(
                method=request.method,
                url=target_url,
                headers={
                    "Authorization": f"ApiKey {ELASTICSEARCH_APIKEY}",
                    "Content-Type": "application/json",
                },
                params=dict(request.query_params),
                content=body,
            )
            # Try to return JSON, fallback to raw response for binary/text
            try:
                return response.json()
            except json.JSONDecodeError:
                return Response(
                    content=response.text, 
                    status_code=response.status_code, 
                    media_type=response.headers.get("content-type")
                )
        except Exception as e:
            print(f"[Backend] Proxy error: {str(e)}")
            raise HTTPException(status_code=502, detail=f"Elasticsearch proxy error: {str(e)}")

@app.get("/health")
async def health():
    """Health check for Instruqt setup verification"""
    return {"status": "ok", "static_exists": os.path.exists(static_dir)}

@app.get("/")
async def serve_index():
    """Explicitly serve index.html for the root path"""
    index_path = os.path.join(static_dir, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return Response(content="Frontend not built. index.html missing.", status_code=404)

# Always mount static directories. Ensure assets folder exists so mount doesn't fail.
os.makedirs(assets_dir, exist_ok=True)
app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")
app.mount("/", StaticFiles(directory=static_dir), name="static")
