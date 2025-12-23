---
slug: intro
id: placeholder-multimatchquery
type: challenge
title: Multi-match Query Lab
teaser: Learn how to use the multi_match_query query in Elasticsearch
tabs:
- id: tab-querylab-multimatchquery
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- id: tab-querylabfull-multimatchquery
  title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- id: tab-terminal-multimatchquery
  title: Terminal
  type: terminal
  hostname: host-1
- id: tab-dataset-multimatchquery
  title: Dataset
  type: service
  hostname: host-1
  path: /dataset.html
  port: 8000
notes:
- type: text
  contents: |
    # Multi-match Query Lab
    
    Welcome to the interactive lab for the multi_match_query query!
    
    The `multi_match` query builds on the `match` query to allow multi-field queries.
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

This lab includes 6 examples demonstrating different aspects of the multi_match_query query:


### Search across product name and description
Fetch products with 'wireless' mentioned in either the name or description fields.


**Try This:**

- Try modifying the query to search for 'premium' or 'Bluetooth'.




### Search for reviews mentioning multiple terms
Find reviews that mention 'durable' or 'comfortable' in the title or text fields.


**Try This:**

- Change the query to look for 'amazing' or 'excellent'.




### Boost field relevance for product name
Search for 'wireless' in product fields, but prioritize matches in the name field.


**Try This:**

- Try adjusting the boost value (e.g., ^5) or adding more fields.




### Search for users with specific interests
Find users interested in 'Books' or 'Electronics'.


**Try This:**

- Modify the query to search for 'Sports' or 'Pet Supplies'.




### Phrase prefix search in product reviews
Search for reviews starting with 'great pr' in title and text fields.


**Try This:**

- Try searching for 'excellent ser' or 'comfortable ch'.




### Cross-field search for user interests
Search for users with interests in 'Books' and 'Electronics'.


**Try This:**

- Adjust the operator to 'or' and search for 'Sports' or 'Beauty'.





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
