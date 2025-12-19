---
slug: intro
id: o7wtzu5g4opi
type: challenge
title: Understanding the Match Query
teaser: Learn how the match query analyzes and searches text
tabs:
- id: 23pj26vwp3qk
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- id: bqxfgs10fdz6
  title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- id: 5fx0zjow7txm
  title: Terminal
  type: terminal
  hostname: host-1
- id: 8e47jgx1wd0e
  title: Dataset
  type: service
  hostname: host-1
  path: /dataset.html
  port: 8000
difficulty: basic
timelimit: 180
enhanced_loading: null
---

# Learn: The Match Query

Read the official Elastic documentation to understand how the match query works:

**[📖 Match Query Documentation](https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-match-query)**

**Key concepts** (2-minute read):
- The match query **analyzes** your search text before searching
- It finds documents containing **any** of the analyzed terms (by default)
- Perfect for user-facing search where you want flexible, relevant results

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
- Modify query parameters
- Add or remove search terms
- Try different field names
- Observe how changes affect results

---

# Explore the Examples

The lab includes multiple examples demonstrating different match query features. Each example is interactive—modify the queries and see how results change in real-time.
