---
slug: intro
id: fjzknof0epw3
type: challenge
title: Multi-match Query Lab
teaser: Learn how to use the multi_match_query query in Elasticsearch
notes:
- type: text
  contents: |
    # Multi-match Query Lab

    Welcome to the interactive lab for the multi_match_query query!

    The `multi_match` query builds on the `match` query to allow multi-field queries.
tabs:
- id: ycuztmsrw4cx
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- id: 8n9fhpon4yyg
  title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- id: ir2khxvjf0s2
  title: Terminal
  type: terminal
  hostname: host-1
- id: rof2n9j7m2ic
  title: Dataset
  type: service
  hostname: host-1
  path: /dataset.html
  port: 8000
difficulty: ""
enhanced_loading: null
---

# Multi-match Query Lab

Welcome to the interactive Multi-match Query lab! This lab teaches you how to use the multi_match_query query in Elasticsearch.

## Overview

The `multi_match` query builds on the `match` query to allow multi-field queries.

## What You'll Learn

- How to construct multi_match_query queries
- Understanding query parameters and options
- How to interpret search results
- Best practices for using multi_match_query queries

## Lab Features

### Query Editor
- **Edit Queries**: Modify the provided examples or write your own
- **Run Queries**: Execute queries and see results in real-time
- **Keyboard Shortcut**: Press `Cmd+Enter` (Mac) or `Ctrl+Enter` (Windows/Linux) to run queries
- **Copy Query**: Copy the current query to your clipboard
- **Add Highlighting**: Toggle highlighting to see matched terms in results

### Results Display
- **Results Tab**: View search results with key fields displayed
- **RAW JSON Tab**: See the complete Elasticsearch response
- **Tokens Tab**: Analyze how your query text is tokenized
- **Why? Button**: Click on any result to see why it matched

### Dataset Information
- **Dataset Tab**: View information about available indices and their fields
- **Index Selector**: Switch between different datasets to test your queries

## Examples

This lab includes 5 examples demonstrating different aspects of the multi_match_query query:


### Search products by name and description
Find products that mention 'wireless' in their name or description.


**Try This:**

- Try changing 'wireless' to 'premium' to see different results.




### Search reviews for specific keywords
Find reviews that mention 'comfortable' in their title or text.


**Try This:**

- Try searching for 'durable' instead of 'comfortable'.




### Search user interests for categories
Find users interested in 'Books'.


**Try This:**

- Try searching for 'Electronics' instead of 'Books'.




### Boost specific fields in product search
Search for 'audio' and prioritize matches in the product name over the description.


**Try This:**

- Change the boost factor (e.g., 'product_name^3') to prioritize name matches further.




### Search reviews with cross-fields type
Search for reviews mentioning 'durable' across multiple fields.


**Try This:**

- Try using the 'best_fields' type for comparison.





## Getting Started

1. Review the first example query
2. Click "Run Query" to see the results
3. Try modifying the query to see how results change
4. Explore the other examples to learn different features
5. Use the "Try This" suggestions to experiment further

## View Official Documentation

For complete documentation, visit: https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-multi-match-query

## Need Help?

- Check the "Dataset" tab for information about available fields
- Use the "Why?" button on results to understand matching
- Review the "Tokens" tab to see how your query is analyzed

Happy querying!
