# Elastic Docs Labs

Short interactive training modules (< 5 minutes) for Elasticsearch query types, designed to be embedded in Elastic.co documentation pages.

## Current Labs

| Lab | Slug | Description |
|-----|------|-------------|
| **Match Query** | `docs-lab-match-query` | Learn the fundamentals of full-text search |
| **Query String** | `docs-lab-query-string` | Advanced search with operators, wildcards, and field-specific syntax |
| **Bool Query** | `docs-lab-bool-query` | Combine multiple queries with must, should, must_not, and filter |

## Project Structure

```
doc_modules_short/
├── shared/
│   ├── frontend/                    # React + EUI frontend application
│   │   └── src/config/labs/         # Lab-specific configurations
│   └── backend/
│       ├── main.py                  # FastAPI backend (proxies to ES)
│       ├── static-match/            # Pre-built frontend for match query
│       ├── static-query-string/     # Pre-built frontend for query string
│       └── static-bool/             # Pre-built frontend for bool query
├── instruqt_labs/
│   ├── match-query/                 # Match query Instruqt track
│   ├── query-string-query/          # Query string Instruqt track
│   └── bool-query/                  # Bool query Instruqt track
├── scripts/
│   ├── build-lab.sh                 # Build individual lab frontends
│   └── deploy-to-instruqt.sh        # Deploy match query lab
└── docs/                            # Documentation
```

## Quick Start

### Prerequisites

- Node.js 20+
- Python 3.10+
- Elasticsearch cluster (or use Instruqt sandbox)
- Instruqt CLI (for deploying labs)

### Local Development

1. **Install frontend dependencies:**
   ```bash
   cd shared/frontend
   npm install
   ```

2. **Configure Elasticsearch connection:**
   
   Create `.env` in `shared/backend/`:
   ```bash
   ELASTICSEARCH_URL=https://your-deployment.es.us-central1.gcp.cloud.es.io
   ELASTICSEARCH_APIKEY=your-api-key-here
   ```

3. **Run the backend:**
   ```bash
   cd shared/backend
   python3 -m venv venv && source venv/bin/activate
   pip install -r requirements.txt
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```

4. **Run the frontend (dev mode):**
   ```bash
   cd shared/frontend
   npm run dev
   ```

## Building Labs

Each lab has its own pre-built frontend with lab-specific configuration.

### Build a Specific Lab

```bash
./scripts/build-lab.sh match         # Build match query lab
./scripts/build-lab.sh query-string  # Build query string lab
./scripts/build-lab.sh bool          # Build bool query lab
```

This builds the frontend with the appropriate config and copies it to `shared/backend/static-<lab>/`.

### Build All Labs

```bash
./scripts/build-lab.sh match
./scripts/build-lab.sh query-string
./scripts/build-lab.sh bool
```

## Deploying to Instruqt

### Deploy All Labs

```bash
# Commit and push first
git add -A && git commit -m "Update labs" && git push origin main

# Deploy each lab
cd instruqt_labs/match-query && instruqt track push --force
cd ../query-string-query && instruqt track push --force
cd ../bool-query && instruqt track push --force
```

### Quick Deploy (Match Query Only)

```bash
./scripts/deploy-to-instruqt.sh
```

This script builds the match query frontend, commits, pushes to GitHub, and deploys to Instruqt.

## Features

- **Modern UI**: Built with Elastic EUI, styled to match Agent Builder aesthetic
- **Monaco Editor**: VS Code-like query editing with autocomplete and tooltips
- **Real-time Results**: Execute queries and see results instantly
- **Dataset Switching**: Switch between products, reviews, and users indices
- **Highlighting**: Toggle search term highlighting in results
- **Why Matched**: Click "Why?" on any result to see score breakdown
- **Tokens View**: See how your search text is analyzed
- **Try This**: Suggestions for experimenting with each example
- **Keyboard Shortcuts**: Cmd/Ctrl+Enter to run queries

## Dataset

All labs use a shared dataset from [generated_reviews](https://github.com/jeffvestal/generated_reviews):

| Index | Records | Key Fields |
|-------|---------|------------|
| `products` | 100 | `product_name`, `product_description`, `product_category` |
| `product_reviews` | 5,000 | `review_title`, `review_text`, `review_rating` |
| `product_users` | 1,000 | `username`, `interests`, `location` |

## Creating a New Lab

1. Create lab config in `shared/frontend/src/config/labs/yourLabConfig.ts`
2. Update `scripts/build-lab.sh` to handle the new lab type
3. Create Instruqt track in `instruqt_labs/your-lab/`
4. Copy and modify `track_scripts/setup-host-1` to use your static folder
5. Build and deploy

See [docs/CREATING_LABS.md](docs/CREATING_LABS.md) for detailed instructions.

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Instruqt      │     │   FastAPI       │     │  Elasticsearch  │
│   Sandbox       │────▶│   Backend       │────▶│   (Serverless)  │
│                 │     │   :8000         │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │
        │                       │
        ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│  Pre-built      │     │   Dataset       │
│  React Frontend │     │   Snapshot      │
│  (per lab)      │     │                 │
└─────────────────┘     └─────────────────┘
```

Each lab's setup script:
1. Clones the repo (sparse checkout of `shared/backend/`)
2. Moves the lab-specific static folder to `static/`
3. Starts the FastAPI backend
4. Backend serves the frontend and proxies ES requests

## Documentation

- [Creating Labs](docs/CREATING_LABS.md) - How to create new query type labs
- [Deployment Guide](docs/DEPLOYMENT.md) - Deploying to Instruqt
- [Project Summary](docs/PROJECT_SUMMARY.md) - Architecture decisions and overview
- [Doc Page Structure](docs/DOC_PAGE_STRUCTURE.md) - How to parse doc pages for examples

## License

See LICENSE file.
