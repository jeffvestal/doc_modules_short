# Elastic Docs Labs

Short interactive training modules (< 5 minutes) for Elasticsearch query types, designed to be embedded in Elastic.co documentation pages.

## Current Labs

### Query DSL Labs (16)
- Bool Query
- Boosting Query
- Constant Score Query
- Dis Max Query
- Exists Query
- Fuzzy Query
- Match Query
- Multi Match Query
- Prefix Query
- Query String Query
- Range Query
- Regexp Query
- Simple Query String Query
- Term Query
- Terms Query
- Wildcard Query

### ES|QL Labs (3)
- ES|QL Commands
- ES|QL REST API
- ES|QL Syntax

All labs are automatically generated from Elastic documentation pages and validated to ensure queries return meaningful results (minimum 3 documents per query).

## Project Structure

```
doc_modules_short/
├── shared/
│   ├── frontend/                    # React + TypeScript + EUI frontend
│   │   └── src/
│   │       ├── config/labs/         # Lab-specific configurations (auto-generated)
│   │       ├── components/          # React components (Monaco Editor, Results)
│   │       └── types/               # TypeScript type definitions
│   └── backend/
│       ├── main.py                  # FastAPI backend (proxies to ES)
│       └── static-*/                # Pre-built frontends per lab (auto-generated)
├── instruqt_labs/
│   ├── docs-lab-bool-query/         # 19 Query DSL + ES|QL labs
│   ├── docs-lab-match-query/        # Each contains track.yml and setup scripts
│   └── ...                          # (auto-generated via generate-labs.py)
├── scripts/
│   ├── generate-labs.py             # Automated lab generation CLI ⭐
│   ├── urls.txt                     # List of doc pages to generate labs from
│   ├── lib/
│   │   ├── doc_parser.py            # Parse documentation pages
│   │   ├── example_generator.py    # LLM-powered example generation
│   │   ├── es_validator.py          # Query validation & auto-fixing
│   │   ├── mcp_client.py            # Elastic Agent Builder MCP integration
│   │   ├── track_builder.py         # Instruqt track file generation
│   │   ├── quality_checker.py       # Ensure diverse, non-duplicate examples
│   │   └── report_generator.py      # Generate deployment reports
│   ├── templates/                   # Jinja2 templates for code generation
│   ├── data/                        # Dataset schemas and configs
│   └── reports/                     # Generated lab reports (JSON)
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
   
   # Elastic Agent Builder MCP (optional, for ES|QL generation)
   MCP_SERVER_URL=https://your-mcp-server.elastic.co
   MCP_API_KEY=your-mcp-api-key
   ```

### Usage

```bash
# Basic usage - generate labs from URLs in file
python generate-labs.py urls.txt

# Process a single URL
python generate-labs.py --url https://elastic.co/docs/reference/query-languages/query-dsl/query-dsl-match-query

# Preview what would be created (no file writes)
python generate-labs.py urls.txt --dry-run

# Push existing labs without regenerating
python generate-labs.py urls.txt --push-only

# Update only titles/display names without regeneration
python generate-labs.py --url https://elastic.co/docs/reference/query-languages/esql/esql-commands --update-title-only

# Deploy changes to GitHub and Instruqt
python generate-labs.py urls.txt --push

# Full automation - regenerate all and auto-deploy
python generate-labs.py urls.txt --regenerate --push
```

### CLI Flags

| Flag | Description |
|------|-------------|
| `--url URL` | Process a single URL instead of a file |
| `--dry-run` | Preview what would be created without writing files |
| `--regenerate` | Regenerate existing labs (overwrites) |
| `--push` | Deploy to GitHub and Instruqt after generation |
| `--push-only` | Push existing labs without regenerating |
| `--update-title-only` | Update displayName and title without regenerating examples |
| `--no-cache` | Bypass cache, fetch fresh content |
| `--verbose` | Enable verbose debug output |
| `--min-hits N` | Minimum hits required per example (default: 3) |

### Example Workflows

**Generate a single new lab:**
```bash
python generate-labs.py --url https://elastic.co/docs/reference/query-languages/query-dsl/query-dsl-term-query
```

**Batch generate multiple labs from urls.txt:**
```bash
# Create scripts/urls.txt with one URL per line
cat > scripts/urls.txt << EOF
https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-term-query
https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-range-query
https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-fuzzy-query
EOF

# Generate labs
python generate-labs.py urls.txt
```

**Regenerate existing labs with new examples:**
```bash
python generate-labs.py urls.txt --regenerate
```

**Deploy to GitHub and Instruqt:**
```bash
python generate-labs.py urls.txt --push
```

**Update lab titles only (fast):**
```bash
python generate-labs.py --url https://elastic.co/docs/reference/query-languages/esql/esql-commands --update-title-only --push
```

### Pipeline Phases

1. **Pre-flight Checks** - Verify ES, OpenAI, MCP (optional), Instruqt CLI, git status
2. **Parse Documentation** - Fetch markdown, extract title, description, examples
3. **Generate Examples** - Use LLM (OpenAI or MCP for ES|QL) to create lab config with diverse examples
4. **Validate Examples** - Run queries against ES, auto-fix if 0 hits (up to 5 retries)
   - **ES|QL Multi-Index**: Each ES|QL example generates 3 queries (products, product_reviews, product_users), each must return ≥3 documents
   - **Quality Enforcement**: Labs with < 3 valid examples after fixes are blocked
5. **Quality Gates** - Check min hits, diversity, duplicates
6. **Build Lab** - Create TypeScript config, Instruqt track structure, and static assets
7. **Deploy** - Commit to git, push to Instruqt (if `--push` flag)
8. **Generate Report** - Output formatted summary and save JSON report to `scripts/reports/`

### Caching and State

- **Cache**: Markdown and LLM responses are cached in `.generate-labs-cache/`
- **State**: Generation state saved to `.generate-labs-state.json` for interrupted batches
- Clear cache with `--no-cache` flag

### Reports

Reports are saved to `scripts/reports/generate-labs-<timestamp>.json` and include:
- Summary (total URLs processed, labs created, skipped, pushed, failed)
- Per-lab details with validation status and example counts
- Validation warnings and error details for failed labs

---

## Key Features

### Automated Lab Generation
- **LLM-Powered**: Uses OpenAI GPT-4o to generate diverse, realistic query examples
- **ES|QL Integration**: Uses Elastic Agent Builder MCP for specialized ES|QL query generation
- **Multi-Index Support**: ES|QL labs automatically generate queries for all 3 dataset indices
- **Auto-Validation**: All queries validated against live Elasticsearch cluster
- **Auto-Fixing**: Failed queries automatically refined (up to 5 retries)
- **Quality Gates**: Ensures minimum 3 documents per query, checks for duplicates
- **Smart Caching**: Avoids redundant API calls for repeated generations

### Interactive Frontend
- **Modern UI**: Built with Elastic EUI, styled to match Agent Builder aesthetic
- **Monaco Editor**: VS Code-like query editing with autocomplete and tooltips
- **Real-time Results**: Execute queries and see results instantly
- **Dataset Switching**: Switch between products, reviews, and users indices (ES|QL labs only)
- **Highlighting**: Toggle search term highlighting in results
- **Why Matched**: Click "Why?" on any result to see score breakdown
- **Tokens View**: See how your search text is analyzed
- **Try This**: Suggestions for experimenting with each example
- **Keyboard Shortcuts**: Cmd/Ctrl+Enter to run queries

---

## Building Labs Manually

**Note**: Manual building is typically not required as `generate-labs.py` handles the full pipeline. However, if you need to rebuild a specific lab's frontend:

```bash
cd shared/frontend
npm run build

# Manually copy to backend static folder
cp -r dist ../backend/static-<lab-slug>/
```

## Deploying to Instruqt

### Deploy All Labs

```bash
cd scripts
python generate-labs.py urls.txt --push
```

This will:
1. Generate/regenerate labs from URLs
2. Commit changes to Git
3. Push to GitHub
4. Validate and push each track to Instruqt

### Deploy Single Lab

```bash
cd instruqt_labs/docs-lab-match-query
instruqt track validate
instruqt track push --force
```

---

## Dataset

All labs use a shared dataset from [generated_reviews](https://github.com/jeffvestal/generated_reviews):

| Index | Records | Key Fields |
|-------|---------|------------|
| `products` | 100 | `product_name`, `product_description`, `product_category`, `product_price` |
| `product_reviews` | 5,000 | `review_title`, `review_text`, `review_rating`, `reviewer_name` |
| `product_users` | 1,000 | `username`, `interests`, `location`, `occupation` |

The dataset is restored from an Elasticsearch snapshot during Instruqt setup.

## Creating a New Lab

### Automated (Recommended)

```bash
cd scripts
source venv/bin/activate

# Generate from a single URL
python generate-labs.py --url https://elastic.co/docs/reference/query-languages/query-dsl/query-dsl-your-query

# Or add to urls.txt and batch generate
echo "https://elastic.co/docs/reference/query-languages/query-dsl/query-dsl-your-query" >> urls.txt
python generate-labs.py urls.txt
```

The automated pipeline will:
1. Parse the documentation page
2. Generate 4-6 diverse query examples
3. Validate each query returns ≥3 documents
4. Auto-fix any failing queries
5. Create TypeScript config, Instruqt track, and static assets
6. Optionally deploy to GitHub and Instruqt (with `--push`)

### Manual (Not Recommended)

If you absolutely must create a lab manually:

1. Create lab config in `shared/frontend/src/config/labs/yourLabConfig.ts`
2. Build frontend: `cd shared/frontend && npm run build`
3. Copy static files: `cp -r dist ../backend/static-your-lab/`
4. Create Instruqt track in `instruqt_labs/docs-lab-your-lab/`
5. Create `track.yml` and setup scripts
6. Deploy with `instruqt track push --force`

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
│             │     │             │     │  (LLM/MCP)  │     │  (3+ docs)  │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                                                   │
                                                                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Report    │◀────│   Deploy    │◀────│   Build     │◀────│  Quality    │
│   Output    │     │  Git/Instruqt│     │   Assets    │     │   Gates     │
│   (JSON)    │     │  (optional)  │     │ (TS/YAML)   │     │ (diversity) │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

**Key Components:**
- **MCP Client** (`mcp_client.py`): Integrates with Elastic Agent Builder for ES|QL generation
- **ES Validator** (`es_validator.py`): Validates queries, attempts auto-fixes for 0-hit queries
- **Example Generator** (`example_generator.py`): LLM-powered example creation with quality checks
- **Track Builder** (`track_builder.py`): Generates Instruqt YAML and setup scripts from templates
- **Quality Checker** (`quality_checker.py`): Ensures no duplicate queries and diverse examples

## Documentation

- [Creating Labs](docs/CREATING_LABS.md) - How to create new query type labs (automated and manual)
- [Project Summary](docs/PROJECT_SUMMARY.md) - Architecture decisions and overview
- [Doc Page Structure](docs/DOC_PAGE_STRUCTURE.md) - How documentation pages are parsed

## Technical Stack

**Frontend:**
- React 18 + TypeScript
- Elastic UI (EUI) components
- Monaco Editor (VS Code editor)
- Vite build tool

**Backend:**
- FastAPI (Python)
- Elasticsearch Python client
- Sparse git checkout for efficient Instruqt setup

**Lab Generation:**
- OpenAI GPT-4o (Query DSL examples)
- Elastic Agent Builder MCP (ES|QL examples)
- Jinja2 templating
- Rich CLI output

**Infrastructure:**
- Instruqt (sandboxed lab environment)
- GitHub (version control and asset hosting)
- Elasticsearch Serverless (data layer)

## Troubleshooting

**Lab generation failing with 0 hits:**
- Check that your ES cluster has the dataset indices loaded
- Verify `ELASTICSEARCH_URL` and `ELASTICSEARCH_APIKEY` in `.env`
- For ES|QL labs, ensure `MCP_SERVER_URL` and `MCP_API_KEY` are configured

**Instruqt track push failing:**
- Run `instruqt track validate` first to see specific errors
- Check that `track.yml` syntax is valid YAML
- Ensure all referenced files (scripts, assignments) exist

**Frontend build errors:**
- Check TypeScript config files in `shared/frontend/src/config/labs/`
- Run `npm run build` in `shared/frontend/` to see detailed errors
- Verify all imports and type definitions are correct

## License

See LICENSE file.

---

**Last Updated:** January 8, 2026  
**Current Labs:** 19 (16 Query DSL + 3 ES|QL)  
**Generation Pipeline:** Fully automated with MCP integration
