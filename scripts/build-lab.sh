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
  echo "Available lab types: match, query-string, bool"
  exit 1
fi

# Map lab type to config file and static folder
case $LAB_TYPE in
  match)
    CONFIG_IMPORT="labConfig"
    CONFIG_SOURCE="./labConfig"
    STATIC_FOLDER="static-match"
    ;;
  query-string)
    CONFIG_IMPORT="queryStringConfig"
    CONFIG_SOURCE="./labs/queryStringConfig"
    STATIC_FOLDER="static-query-string"
    ;;
  bool)
    CONFIG_IMPORT="boolConfig"
    CONFIG_SOURCE="./labs/boolConfig"
    STATIC_FOLDER="static-bool"
    ;;
  *)
    echo "Error: Unknown lab type: $LAB_TYPE"
    echo "Available lab types: match, query-string, bool"
    exit 1
    ;;
esac

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
  mv labConfig.ts.backup labConfig.ts
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

# Restore original labConfig.ts
cd "$PROJECT_ROOT/shared/frontend/src/config"
mv labConfig.ts.backup labConfig.ts

echo ""
echo "========================================"
echo "  Build complete for $LAB_TYPE lab!"
echo "  Output: shared/backend/$STATIC_FOLDER/"
echo "========================================"
