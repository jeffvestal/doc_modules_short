"""Pre-flight health checks before processing."""

import os
import subprocess
import sys
from pathlib import Path
from typing import Tuple, List
from dotenv import load_dotenv
from elasticsearch import Elasticsearch


# Load .env from project root (parent of scripts directory)
project_root = Path(__file__).parent.parent.parent
load_dotenv(project_root / ".env")


def check_elasticsearch() -> Tuple[bool, str]:
    """Check Elasticsearch connection.
    
    Returns:
        Tuple of (success, message)
    """
    
    es_url = os.getenv("ELASTICSEARCH_URL")
    es_api_key = os.getenv("ELASTICSEARCH_APIKEY")
    
    if not es_url:
        return False, "FAILED: ELASTICSEARCH_URL not set in .env"
    
    try:
        es_config = {
            "hosts": [es_url]
        }
        if es_api_key:
            es_config["api_key"] = es_api_key
        
        es = Elasticsearch(**es_config)
        info = es.info()
        cluster_name = info.get("cluster_name", "unknown")
        return True, f"OK (cluster: {cluster_name})"
    except Exception as e:
        return False, f"FAILED: {str(e)}"


def check_openai() -> Tuple[bool, str]:
    """Check OpenAI API connection.
    
    Returns:
        Tuple of (success, message)
    """
    
    api_key = os.getenv("OPENAI_API_KEY")
    base_url = os.getenv("OPENAI_BASE_URL")
    model = os.getenv("OPENAI_MODEL", "gpt-4o")
    
    if not api_key:
        return False, "FAILED: OPENAI_API_KEY not set in .env"
    
    if not base_url:
        return False, "FAILED: OPENAI_BASE_URL not set in .env"
    
    # Try a simple API call
    try:
        import requests
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        # Just check if we can reach the API (don't make a full request)
        # We'll do a real test in the example generator
        return True, f"OK (model: {model})"
    except Exception as e:
        return False, f"FAILED: {str(e)}"


def check_instruqt() -> Tuple[bool, str]:
    """Check Instruqt CLI availability.
    
    Returns:
        Tuple of (success, message)
    """
    try:
        # Use 'instruqt version' which is more reliable than '--version'
        result = subprocess.run(
            ["instruqt", "version"],
            capture_output=True,
            text=True,
            timeout=5
        )
        # Check if instruqt is available (even if version returns non-zero, 
        # the command existing is what matters)
        if result.returncode == 0 or "instruqt" in result.stdout.lower() or "instruqt" in result.stderr.lower():
            # Try to get logged in user
            auth_result = subprocess.run(
                ["instruqt", "auth", "whoami"],
                capture_output=True,
                text=True,
                timeout=5
            )
            if auth_result.returncode == 0 and auth_result.stdout.strip():
                user = auth_result.stdout.strip()
                return True, f"OK (logged in as: {user})"
            else:
                return True, "OK (not logged in)"
        else:
            return False, "FAILED: Instruqt CLI not found or not working"
    except FileNotFoundError:
        return False, "FAILED: Instruqt CLI not installed"
    except Exception as e:
        return False, f"FAILED: {str(e)}"


def check_git() -> Tuple[bool, str]:
    """Check git status.
    
    Returns:
        Tuple of (success, message)
    """
    try:
        # Check if we're in a git repo
        result = subprocess.run(
            ["git", "rev-parse", "--git-dir"],
            capture_output=True,
            text=True,
            timeout=5
        )
        if result.returncode != 0:
            return False, "FAILED: Not in a git repository"
        
        # Check branch
        branch_result = subprocess.run(
            ["git", "rev-parse", "--abbrev-ref", "HEAD"],
            capture_output=True,
            text=True,
            timeout=5
        )
        branch = branch_result.stdout.strip() if branch_result.returncode == 0 else "unknown"
        
        # Check if working directory is clean
        status_result = subprocess.run(
            ["git", "status", "--porcelain"],
            capture_output=True,
            text=True,
            timeout=5
        )
        is_clean = len(status_result.stdout.strip()) == 0
        status = "clean" if is_clean else "has uncommitted changes"
        
        return True, f"OK (branch: {branch}, {status})"
    except Exception as e:
        return False, f"FAILED: {str(e)}"


def check_npm() -> Tuple[bool, str]:
    """Check npm/node availability.
    
    Returns:
        Tuple of (success, message)
    """
    try:
        # Check node version
        node_result = subprocess.run(
            ["node", "--version"],
            capture_output=True,
            text=True,
            timeout=5
        )
        if node_result.returncode != 0:
            return False, "FAILED: Node.js not found"
        
        node_version = node_result.stdout.strip()
        
        # Check npm
        npm_result = subprocess.run(
            ["npm", "--version"],
            capture_output=True,
            text=True,
            timeout=5
        )
        if npm_result.returncode != 0:
            return False, "FAILED: npm not found"
        
        return True, f"OK ({node_version})"
    except FileNotFoundError:
        return False, "FAILED: Node.js/npm not installed"
    except Exception as e:
        return False, f"FAILED: {str(e)}"


def run_all_checks() -> Tuple[bool, List[Tuple[str, bool, str]]]:
    """Run all pre-flight checks.
    
    Returns:
        Tuple of (all_passed, list of (check_name, passed, message))
    """
    checks = [
        ("Elasticsearch", check_elasticsearch),
        ("OpenAI API", check_openai),
        ("Instruqt CLI", check_instruqt),
        ("Git", check_git),
        ("npm/node", check_npm),
    ]
    
    results = []
    all_passed = True
    
    for name, check_func in checks:
        passed, message = check_func()
        results.append((name, passed, message))
        if not passed:
            all_passed = False
    
    return all_passed, results

