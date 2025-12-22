#!/bin/bash
# Build script for individual query lab types
# Usage: ./scripts/build-lab.sh <lab-type>
# Example: ./scripts/build-lab.sh query-string

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

LAB_TYPE=$1

if [ -z "$LAB_TYPE" ]; then
  echo "Error: Lab type required"
  echo "Usage: ./scripts/build-lab.sh <lab-type>"
  echo "Example: ./scripts/build-lab.sh match-query"
  exit 1
fi

# Convert lab type from kebab-case to camelCase for config file name
# e.g., "multi-match" → "multiMatch", "query-string" → "queryString"
# Use awk for portable case conversion (works on both BSD and GNU)
CONFIG_NAME=$(echo "$LAB_TYPE" | awk -F'-' '{
  for(i=1; i<=NF; i++) {
    if(i==1) printf "%s", $i
    else printf "%s%s", toupper(substr($i,1,1)), substr($i,2)
  }
}')

# Auto-detect config file (supports both old and new naming)
CONFIG_FILE="$PROJECT_ROOT/shared/frontend/src/config/labs/${CONFIG_NAME}Config.ts"
if [ ! -f "$CONFIG_FILE" ]; then
  # Try legacy location for match query
  if [ "$LAB_TYPE" = "match" ]; then
    CONFIG_FILE="$PROJECT_ROOT/shared/frontend/src/config/labConfig.ts"
    if [ ! -f "$CONFIG_FILE" ]; then
      echo "Error: Config not found for lab type: $LAB_TYPE"
      echo "Expected: shared/frontend/src/config/labs/${CONFIG_NAME}Config.ts"
      exit 1
    fi
    CONFIG_IMPORT="labConfig"
    CONFIG_SOURCE="./labConfig"
  else
    echo "Error: Config not found for lab type: $LAB_TYPE"
    echo "Expected: shared/frontend/src/config/labs/${CONFIG_NAME}Config.ts"
    exit 1
  fi
else
  # New naming convention: extract config name from file
  CONFIG_IMPORT="${CONFIG_NAME}Config"
  CONFIG_SOURCE="./labs/${CONFIG_NAME}Config"
fi

# Generate static folder name from lab type
STATIC_FOLDER="static-${LAB_TYPE}"

echo "========================================"
echo "  Building Lab: $LAB_TYPE"
echo "========================================"

# Step 1: Create temporary labConfig that re-exports the right config
echo ""
echo "[1/3] Setting up lab config for $LAB_TYPE..."
cd "$PROJECT_ROOT/shared/frontend/src/config"

# Backup original labConfig.ts
cp labConfig.ts labConfig.ts.backup

# Create new labConfig that imports from the right source
cat > labConfig.ts << EOF
// Auto-generated for $LAB_TYPE lab build
// This file re-exports the lab-specific config as labConfig

import type { LabConfig } from '../types';
import { $CONFIG_IMPORT as config } from '$CONFIG_SOURCE';
export const labConfig: LabConfig = config;
EOF

echo "✓ Config set to $LAB_TYPE"

# Step 2: Build frontend
echo ""
echo "[2/3] Building frontend..."
cd "$PROJECT_ROOT/shared/frontend"

if npm run build; then
  echo "✓ Frontend built successfully"
else
  echo "✗ Build failed, restoring original config"
  cd "$PROJECT_ROOT/shared/frontend/src/config"
  if [ -f labConfig.ts.backup ]; then
    mv labConfig.ts.backup labConfig.ts
  fi
  exit 1
fi

# Step 3: Copy to lab-specific static folder
echo ""
echo "[3/3] Copying build to backend/$STATIC_FOLDER/..."
mkdir -p "$PROJECT_ROOT/shared/backend/$STATIC_FOLDER"
rm -rf "$PROJECT_ROOT/shared/backend/$STATIC_FOLDER/"*
cp -r dist/* "$PROJECT_ROOT/shared/backend/$STATIC_FOLDER/"

# Copy dataset.html to the static folder
if [ -f "$PROJECT_ROOT/shared/backend/static/dataset.html" ]; then
  cp "$PROJECT_ROOT/shared/backend/static/dataset.html" "$PROJECT_ROOT/shared/backend/$STATIC_FOLDER/"
fi

echo "✓ Files copied to shared/backend/$STATIC_FOLDER/"

# Restore original labConfig.ts (if backup exists)
cd "$PROJECT_ROOT/shared/frontend/src/config"
if [ -f labConfig.ts.backup ]; then
  mv labConfig.ts.backup labConfig.ts
fi

echo ""
echo "========================================"
echo "  Build complete for $LAB_TYPE lab!"
echo "  Output: shared/backend/$STATIC_FOLDER/"
echo "========================================"
