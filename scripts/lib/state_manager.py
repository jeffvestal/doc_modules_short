"""State manager for resume capability."""

import json
from datetime import datetime
from pathlib import Path
from typing import Optional, List, Dict, Any


class StateManager:
    """Manages state for resuming interrupted batch processing."""
    
    def __init__(self, state_file: str = ".generate-labs-state.json"):
        """Initialize state manager.
        
        Args:
            state_file: Path to state file
        """
        self.state_file = Path(state_file)
    
    def load(self) -> Optional[Dict[str, Any]]:
        """Load state from file.
        
        Returns:
            State dict or None if file doesn't exist
        """
        if not self.state_file.exists():
            return None
        
        try:
            return json.loads(self.state_file.read_text(encoding='utf-8'))
        except (json.JSONDecodeError, IOError):
            return None
    
    def save(self, state: Dict[str, Any]) -> None:
        """Save state to file.
        
        Args:
            state: State dict to save
        """
        self.state_file.write_text(json.dumps(state, indent=2), encoding='utf-8')
    
    def create_batch(self, input_file: str, urls: List[str]) -> Dict[str, Any]:
        """Create a new batch state.
        
        Args:
            input_file: Path to input file
            urls: List of URLs to process
            
        Returns:
            New state dict
        """
        return {
            "batch_id": datetime.utcnow().isoformat() + "Z",
            "input_file": input_file,
            "total_urls": len(urls),
            "urls": urls,
            "completed": [],
            "in_progress": None,
            "pending": urls.copy(),
            "failed": []
        }
    
    def mark_completed(self, url: str, state: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Mark a URL as completed.
        
        Args:
            url: The completed URL
            state: Optional state dict (if None, loads from file)
            
        Returns:
            Updated state dict
        """
        if state is None:
            state = self.load()
            if state is None:
                raise ValueError("No state to update")
        
        if url in state["pending"]:
            state["pending"].remove(url)
        if url == state.get("in_progress"):
            state["in_progress"] = None
        
        if url not in state["completed"]:
            state["completed"].append(url)
        
        self.save(state)
        return state
    
    def mark_failed(self, url: str, error: str, state: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Mark a URL as failed.
        
        Args:
            url: The failed URL
            error: Error message
            state: Optional state dict (if None, loads from file)
            
        Returns:
            Updated state dict
        """
        if state is None:
            state = self.load()
            if state is None:
                raise ValueError("No state to update")
        
        if url in state["pending"]:
            state["pending"].remove(url)
        if url == state.get("in_progress"):
            state["in_progress"] = None
        
        failed_entry = {"url": url, "error": error}
        if failed_entry not in state["failed"]:
            state["failed"].append(failed_entry)
        
        self.save(state)
        return state
    
    def set_in_progress(self, url: str, state: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Set a URL as in progress.
        
        Args:
            url: The URL being processed
            state: Optional state dict (if None, loads from file)
            
        Returns:
            Updated state dict
        """
        if state is None:
            state = self.load()
            if state is None:
                raise ValueError("No state to update")
        
        state["in_progress"] = url
        self.save(state)
        return state
    
    def get_pending(self, state: Optional[Dict[str, Any]] = None) -> List[str]:
        """Get list of pending URLs.
        
        Args:
            state: Optional state dict (if None, loads from file)
            
        Returns:
            List of pending URLs
        """
        if state is None:
            state = self.load()
        
        if state is None:
            return []
        
        return state.get("pending", [])
    
    def clear(self) -> None:
        """Clear state file."""
        if self.state_file.exists():
            self.state_file.unlink()

