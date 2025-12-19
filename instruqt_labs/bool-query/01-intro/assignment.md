---
slug: intro
id: ke9qcf8mngwj
type: challenge
title: Understanding the Bool Query
teaser: Learn how the bool query combines multiple queries
tabs:
- id: dchzc590irrm
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- id: uan6cz25oac4
  title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- id: ngmvmyrpsetv
  title: Terminal
  type: terminal
  hostname: host-1
- id: bc4vdop4yuyw
  title: Dataset
  type: service
  hostname: host-1
  path: /dataset.html
  port: 8000
difficulty: basic
timelimit: 180
enhanced_loading: null
---

# Learn: The Bool Query

Read the official Elastic documentation to understand how the bool query works:

**[📖 Bool Query Documentation](https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-bool-query)**

**Key concepts** (2-minute read):
- The bool query combines **multiple queries** using boolean logic
- **must** clause: All queries must match (AND logic, affects score)
- **should** clause: At least one query should match (OR logic, boosts score)
- **must_not** clause: Documents matching these queries are excluded
- **filter** clause: Like must, but doesn't affect scoring

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
- Add or remove queries from different clauses
- Combine must, should, must_not, and filter clauses
- Try different minimum_should_match values
- Compare scoring with filter vs must clauses
- Observe how changes affect results

---

# Explore the Examples

The lab includes multiple examples demonstrating different bool query features. Each example is interactive—modify the queries and see how results change in real-time.

