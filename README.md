# Elastic Query Labs

Short training modules (< 5 minutes) for Elasticsearch query types, embedded in Elastic.co documentation pages.

## Project Structure

```
doc_modules_short/
├── shared/                    # Shared resources across all labs
│   └── frontend/             # React + EUI frontend application
├── instruqt_labs/            # Individual Instruqt tracks (one per query type)
│   └── match-query/          # Example: Match query lab
│       ├── track.yml
│       ├── config.yml
│       ├── track_scripts/
│       ├── 01-intro/
│       └── 02-challenge/
└── docs/                      # Documentation
```

## Quick Start

### Prerequisites

- Node.js 20+
- Elasticsearch cluster (or Instruqt sandbox)
- Instruqt account (for deploying labs)

### Local Development

1. **Install dependencies:**
   ```bash
   cd shared/frontend
   npm install
   ```

2. **Configure Elasticsearch connection:**
   
   Create a `.env` file in `shared/frontend/` with your Elasticsearch connection details:
   ```bash
   VITE_ELASTICSEARCH_URL=https://your-deployment.es.us-central1.gcp.cloud.es.io
   VITE_ELASTICSEARCH_APIKEY=your-api-key-here
   ```
   
   The dataset (products, reviews, users) should already be loaded in your Elasticsearch instance.

3. **Run the frontend:**
   ```bash
   npm run dev
   ```
   
   The frontend will connect to your configured Elasticsearch instance and query the appropriate indices based on the lab configuration.

### Creating a New Lab

See [docs/CREATING_LABS.md](docs/CREATING_LABS.md) for detailed instructions.

## Features

- **Modern UI**: Built with Elastic EUI, styled to match Agent Builder
- **Monaco Editor**: VS Code-like query editing experience
- **Real-time Results**: See search results as you type
- **Challenge Validation**: Built-in validation for learning exercises
- **Isolated Labs**: Each query type is a standalone Instruqt track

## Current Labs

- ✅ **Match Query** - Learn the fundamentals of full-text search

## Planned Labs

- Match Phrase Query
- Multi Match Query
- Query String Query
- And more...

## Dataset

All labs use a shared dataset from the [generated_reviews repository](https://github.com/jeffvestal/generated_reviews). The dataset includes:

- **products** index - Product catalog with names, descriptions, categories, brands, and prices
- **product_reviews** index - Customer reviews with titles, text, ratings, and metadata
- **product_users** index - User profiles with demographics, location, and review history

Each lab configures which index to query based on what best demonstrates the query type being taught.

## Architecture

Each lab consists of:

1. **Frontend Application**: React app with Monaco editor for query input
2. **Elasticsearch Backend**: Shared dataset with products, reviews, and users (restored from snapshot in Instruqt)
3. **Challenge System**: Two-part learning (intro + challenge)
4. **Validation**: Automatic query validation against requirements

The frontend is shared across all labs, with lab-specific configuration injected at build/deploy time. Each lab specifies which index to query and which fields to display.

## License

See LICENSE file.

