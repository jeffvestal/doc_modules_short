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
│   ├── generate-labs.py             # Automated lab generation CLI
│   ├── build-lab.sh                 # Build individual lab frontends
│   ├── deploy-to-instruqt.sh        # Deploy match query lab
│   ├── lib/                         # Python library modules
│   ├── templates/                   # Jinja2 templates for lab generation
│   └── data/                        # Dataset schemas and configs
├── reports/                         # Generated lab reports
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

2. **Configure environment:**
   
   Create `.env` in project root:
   ```bash
   # Elasticsearch connection
   ELASTICSEARCH_URL=https://your-deployment.us-central1.gcp.cloud.es.io:443
   ELASTICSEARCH_APIKEY=your-base64-api-key-here
   
   # OpenAI API (for automated lab generation)
   OPENAI_BASE_URL=https://api.openai.com/v1
   OPENAI_API_KEY=sk-your-api-key
   OPENAI_MODEL=gpt-4o
   ```
   
   Copy or symlink to `shared/backend/`:
   ```bash
   cp .env shared/backend/.env
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

---

## Automated Lab Generation

The `generate-labs.py` script automatically creates interactive labs from Elastic documentation pages using LLM-powered example generation.

### Setup

1. **Create and activate a Python virtual environment:**
   ```bash
   cd scripts
   python3 -m venv venv
   source venv/bin/activate  # On macOS/Linux
   # OR
   .\venv\Scripts\activate   # On Windows
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment variables** (in project root `.env`):
   ```bash
   # Elasticsearch (for validation)
   ELASTICSEARCH_URL=https://your-deployment.us-central1.gcp.cloud.es.io:443
   ELASTICSEARCH_APIKEY=your-base64-api-key-here
   
   # OpenAI API (for LLM generation)
   OPENAI_BASE_URL=https://api.openai.com/v1
   OPENAI_API_KEY=sk-your-api-key
   OPENAI_MODEL=gpt-4o
   ```

### Usage

```bash
# Basic usage - process URLs from file (with review step)
python generate-labs.py urls.txt

# Process a single URL
python generate-labs.py --url https://elastic.co/docs/reference/query-languages/query-dsl/query-dsl-match-query

# Preview what would be created (no file writes)
python generate-labs.py urls.txt --dry-run

# Full automation - skip review, regenerate existing, auto-deploy
python generate-labs.py urls.txt --yolo
```

### CLI Flags

| Flag | Description |
|------|-------------|
| `--url URL` | Process a single URL instead of a file |
| `--dry-run` | Preview what would be created without writing files |
| `--skip-review` | Skip human review step, auto-deploy, skip existing tracks |
| `--regenerate` | Regenerate existing labs (overwrites) |
| `--yolo` | Full automation (combines `--skip-review` and `--regenerate`) |
| `--parallel N` | Process N URLs concurrently (default: 1, max recommended: 5) |
| `--resume` | Resume from last interrupted batch |
| `--no-cache` | Bypass cache, fetch fresh content |
| `--verbose` | Enable verbose debug output |
| `--min-hits N` | Minimum hits required per example (default: 3) |

### Flag Combinations

| Flags | Behavior |
|-------|----------|
| (none) | Process all URLs, pause for review before deploy |
| `--skip-review` | Auto-deploy, skip existing tracks |
| `--regenerate` | Regenerate existing labs, pause for review |
| `--skip-review --regenerate` | Auto-deploy, regenerate existing |
| `--yolo` | Same as `--skip-review --regenerate` |
| `--dry-run` | Preview only, no file writes |

### Example Workflows

**Generate a single new lab:**
```bash
python generate-labs.py --url https://elastic.co/docs/reference/query-languages/query-dsl/query-dsl-term-query --dry-run
```

**Batch generate multiple labs:**
```bash
# Create urls.txt with one URL per line
cat > urls.txt << EOF
https://elastic.co/docs/reference/query-languages/query-dsl/query-dsl-term-query
https://elastic.co/docs/reference/query-languages/query-dsl/query-dsl-range-query
https://elastic.co/docs/reference/query-languages/query-dsl/query-dsl-fuzzy-query
EOF

# Generate with parallel processing
python generate-labs.py urls.txt --parallel 3
```

**Full automation for 50+ pages:**
```bash
python generate-labs.py all-query-dsl-pages.txt --yolo --parallel 5
```

### Pipeline Phases

1. **Pre-flight Checks** - Verify ES, OpenAI, Instruqt CLI, git status
2. **Parse Documentation** - Fetch markdown, extract title, description, examples
3. **Generate Examples** - Use LLM to create lab config with diverse examples
4. **Validate Examples** - Run queries against ES, auto-fix if 0 hits (up to 5 retries)
5. **Quality Gates** - Check min hits, diversity, duplicates
6. **Build Lab** - Create TypeScript config and Instruqt track structure
7. **Deploy** - Commit to git, push to Instruqt (if not `--dry-run`)
8. **Generate Report** - Output formatted summary and save JSON report

### Caching and Resume

- **Cache**: Markdown and LLM responses are cached in `.generate-labs-cache/`
- **Resume**: State saved to `.generate-labs-state.json` for interrupted batches
- Clear cache with `--no-cache` flag
- Explicitly resume with `--resume` flag

### Reports

Reports are saved to `reports/generate-labs-<timestamp>.json` and include:
- Summary (total, created, skipped, failed)
- Per-lab details with example counts
- Validation warnings
- Error details for failed labs

---

## Building Labs Manually

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

### Automated (Recommended)

```bash
cd scripts
source venv/bin/activate
python generate-labs.py --url https://elastic.co/docs/reference/query-languages/query-dsl/query-dsl-your-query
```

### Manual

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

### Lab Generation Pipeline

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Doc URLs   │────▶│   Parse &   │────▶│  Generate   │────▶│  Validate   │
│  (input)    │     │   Cache     │     │  Examples   │     │  vs ES      │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                                                   │
                                                                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Report    │◀────│   Deploy    │◀────│   Build     │◀────│  Quality    │
│   Output    │     │  Git/Instruqt│     │   Assets    │     │   Gates     │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

## Documentation

- [Creating Labs](docs/CREATING_LABS.md) - How to create new query type labs
- [Project Summary](docs/PROJECT_SUMMARY.md) - Architecture decisions and overview
- [Doc Page Structure](docs/DOC_PAGE_STRUCTURE.md) - How to parse doc pages for examples

## License

See LICENSE file.
