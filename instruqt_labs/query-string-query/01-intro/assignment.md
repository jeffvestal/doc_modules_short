---
slug: intro
id: atoi3n7frg3r
type: challenge
title: Understanding the Query String Query
teaser: Learn how the query_string query parses and searches text
tabs:
- id: 8rn8hpxwd2ow
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- id: 8cah3rdzkcay
  title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- id: vvwosmrx60yr
  title: Terminal
  type: terminal
  hostname: host-1
- id: huedjksnnury
  title: Dataset
  type: service
  hostname: host-1
  path: /dataset.html
  port: 8000
difficulty: basic
timelimit: 180
enhanced_loading: null
---

# Learn: The Query String Query

Read the official Elastic documentation to understand how the query_string query works:

**[📖 Query String Query Documentation](https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-query-string-query)**

**Key concepts** (2-minute read):
- The query_string query uses a **strict syntax parser** to parse query strings
- Supports **operators** (AND, OR, NOT) and **wildcards** (*, ?)
- Can search **multiple fields** using the `fields` parameter
- Returns errors for invalid syntax (unlike match query)

---

# Test It Out

Open the [button label="Query Lab"](tab-0) tab to explore the interactive query lab. The [button label="Query Lab (Full)"](tab-1) tab opens in a new window for a larger view. The [button label="Dataset"](tab-3) tab shows information about available indices, fields, and mappings.

## Query Editor

Each example includes a pre-loaded query that you can:
- **Run as-is** by clicking "Run Query" (or press **Cmd/Ctrl+Enter**)
- **Edit** the JSON to modify the query parameters
- **Reset** to restore the original query template
- **Dataset** dropdown (left of Highlighting) to switch which index all examples query against
- **Add Highlighting** toggle to highlight matched terms in results (yellow highlights)
- **Copy Query** button to copy the query JSON to your clipboard

## Results Panel

After running a query, you'll see:

**Results Tab** (default):
- Top 5 matching documents with relevance scores
- Click any result row to view the full document JSON in a popup
- **"Why?" button** on each result shows a simplified explanation of why it matched (score breakdown by term)
- Yellow highlighted terms show where matches occurred (when highlighting is enabled)

**RAW JSON Tab**:
- Full Elasticsearch response with all metadata
- Copy button to copy the raw response

**Tokens Tab**:
- Shows how your search text was analyzed into tokens
- Useful for understanding how Elasticsearch processes your query

## Try This

Below each example, you'll find **"Try This"** suggestions with ideas for experimenting:
- Modify query operators (AND, OR, NOT)
- Try wildcard patterns (*, ?)
- Search multiple fields
- Use field-specific syntax (`field:value`)
- Observe how changes affect results

---

# Explore the Examples

The lab includes multiple examples demonstrating different query_string features. Each example is interactive—modify the queries and see how results change in real-time.

