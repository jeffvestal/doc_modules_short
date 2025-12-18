# Deployment Guide

This guide covers deploying the query labs to Instruqt.

## Prerequisites

- Instruqt account with track creation permissions
- Instruqt CLI installed (optional, can use web UI)
- Access to Elasticsearch cluster in Instruqt sandbox

## Deployment Steps

### 1. Prepare Frontend Build

Each lab needs the frontend built with its specific lab config:

```bash
cd shared/frontend

# Option 1: Build with default config (match-query)
npm run build

# Option 2: Build with specific lab config
# Edit src/config/labConfig.ts to import the specific lab config
# Or use environment variable injection (see below)
npm run build
```

### 2. Copy Assets to Lab Directory

```bash
# Copy built frontend to lab directory
cp -r shared/frontend/dist/* instruqt_labs/match-query/assets/frontend/
```

### 3. Restore Elasticsearch Snapshot

The setup script restores the dataset from an Elasticsearch snapshot containing:
- `products` index
- `product_reviews` index  
- `product_users` index

The snapshot restore is handled in `track_scripts/setup-kubernetes-vm`. See that file for snapshot repository and snapshot name configuration.

### 4. Serve Frontend

The setup script serves the frontend from the assets directory:

```bash
# Serve frontend
cd /opt/lab-frontend
python3 -m http.server 3000 --bind 0.0.0.0 &
```

### 5. Deploy to Instruqt

#### Using Instruqt CLI:

```bash
instruqt track deploy instruqt_labs/match-query
```

#### Using Web UI:

1. Go to Instruqt dashboard
2. Create new track
3. Upload the `instruqt_labs/match-query` directory
4. Configure secrets (if needed)

### 6. Configure Environment Variables

The frontend needs these environment variables (set in Instruqt or via setup script):

```bash
VITE_ELASTICSEARCH_URL=http://elasticsearch:9200
VITE_ELASTICSEARCH_APIKEY=${ELASTICSEARCH_APIKEY}
```

## Lab Config Injection

To inject lab-specific config at build time:

### Option 1: Environment Variables

```bash
# Build with lab config via env var
VITE_LAB_CONFIG='{"queryType":"match-phrase",...}' npm run build
```

Then in `labConfig.ts`:
```typescript
const configFromEnv = import.meta.env.VITE_LAB_CONFIG;
export const labConfig = configFromEnv ? JSON.parse(configFromEnv) : defaultConfig;
```

### Option 2: Build Script Per Lab

Create `shared/scripts/build-lab.sh`:

```bash
#!/bin/bash
LAB_TYPE=$1

# Copy lab-specific config
cp "shared/frontend/src/config/labs/${LAB_TYPE}.ts" \
   "shared/frontend/src/config/labConfig.ts"

# Build
cd shared/frontend
npm run build

# Copy to lab directory
cp -r dist/* "../../instruqt_labs/${LAB_TYPE}/frontend/"
```

Usage:
```bash
./shared/scripts/build-lab.sh match-query
```

## Testing Locally

Before deploying, test locally:

1. **Connect to your Elasticsearch instance** (the dataset should already be loaded)
2. **Configure `.env` file** in `shared/frontend/` with your Elasticsearch connection details
3. **Run frontend:**
   ```bash
   cd shared/frontend
   npm run dev
   ```
4. **Test the lab flow:**
   - Complete intro challenge
   - Complete challenge 2
   - Verify validation works

## Troubleshooting

### Frontend can't connect to Elasticsearch

- Check `VITE_ELASTICSEARCH_URL` is set correctly
- Verify Elasticsearch is accessible from the frontend container/VM
- Check CORS settings if needed (shouldn't be needed for same-origin)

### Indices not found

- Verify snapshot restore completed successfully
- Check indices exist: `curl ${ES_URL}/_cat/indices/products,product_reviews,product_users`
- Verify snapshot repository is configured correctly in setup script

### Lab config not working

- Check that labConfig.ts is importing the correct config
- Verify build included the correct config
- Check browser console for errors

## Next Steps

After deploying:
1. Test the full lab flow in Instruqt
2. Verify both challenges work correctly
3. Check validation scripts pass
4. Update documentation with any issues found

