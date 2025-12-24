---
slug: intro
id: jxjwf0mvi19t
type: challenge
title: Multi-match Query Lab
teaser: Learn how to use the multi_match_query query in Elasticsearch
notes:
- type: text
  contents: |
    # Multi-match Query Lab

    Welcome to the interactive lab for the multi_match_query query!

    The multi_match query builds on the match query to allow multi-field queries.
tabs:
- id: 0wjxl0xwdsno
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- id: 4xkq9cfygq6b
  title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- id: m9opy8yqbrp9
  title: Terminal
  type: terminal
  hostname: host-1
- id: vdvyzoekbx6z
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

The multi_match query builds on the match query to allow multi-field queries.

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


### Search multiple fields for product descriptions
Find products that match the query 'wireless headphones' in the fields 'product_name' and 'product_description'.


**Try This:**

- Try changing the query to 'premium speakers' or add weighting to fields using the '^' operator (e.g., 'product_name^2').




### Find product reviews mentioning durability and comfort
Search for reviews that mention both 'durable' and 'comfortable' in 'review_title' and 'review_text' fields.


**Try This:**

- Try searching for 'easy to use' or 'highly recommended' to see different results.




### Search user interests for matches
Find users interested in 'Electronics enthusiast' by searching the 'interests' field.


**Try This:**

- Try searching for 'Books lover' or 'Sports fan' to find users with those interests.




### Boosted field search in product descriptions
Search for 'premium quality' in 'product_name' and 'product_description', giving extra weight to 'product_name'.


**Try This:**

- Experiment with different boosts (e.g., 'product_description^3') or search for 'affordable price'.




### Cross-field search with tie breaker
Search for 'comfortable durable' in 'review_title' and 'review_text', using a tie breaker for better scoring.


**Try This:**

- Modify the query to 'lightweight portable' or test different tie breaker values (e.g., 0.5).





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
