#!/bin/bash
# Deploy script for Query Lab - builds frontend and pushes to Instruqt
# Usage: ./scripts/deploy-to-instruqt.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "========================================"
echo "  Query Lab Deploy Script"
echo "========================================"

# Step 1: Build frontend
echo ""
echo "[1/5] Building frontend..."
cd "$PROJECT_ROOT/shared/frontend"
npm run build

if [ ! -f "dist/index.html" ]; then
  echo "ERROR: Frontend build failed - dist/index.html not found"
  exit 1
fi
echo "✓ Frontend built successfully"

# Step 2: Copy to backend/static
echo ""
echo "[2/5] Copying build to backend/static..."
rm -rf "$PROJECT_ROOT/shared/backend/static/assets"
cp -r dist/* "$PROJECT_ROOT/shared/backend/static/"
echo "✓ Files copied to shared/backend/static/"

# Step 3: Git add and commit
echo ""
echo "[3/5] Committing changes..."
cd "$PROJECT_ROOT"
git add shared/backend/static/
git add -A  # Also add any other changes

if git diff --staged --quiet; then
  echo "No changes to commit"
else
  git commit -m "Build and deploy frontend to Instruqt"
  echo "✓ Changes committed"
fi

# Step 4: Push to GitHub
echo ""
echo "[4/5] Pushing to GitHub..."
git push origin main
echo "✓ Pushed to GitHub"

# Step 5: Push to Instruqt
echo ""
echo "[5/5] Pushing to Instruqt..."
cd "$PROJECT_ROOT/instruqt_labs/match-query"
instruqt track push --force
echo "✓ Pushed to Instruqt"

echo ""
echo "========================================"
echo "  Deploy complete!"
echo "========================================"

