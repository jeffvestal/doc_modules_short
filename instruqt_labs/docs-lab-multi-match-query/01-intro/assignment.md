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


### Search across multiple fields for a product
Search for products where the name or description contains the term 'wireless headphones'.


**Try This:**

- Change the query to 'noise cancelling' to find products with that phrase.

- Add more fields to the 'fields' array, such as 'product_category'.




### Search product reviews by title or text
Search for reviews mentioning 'excellent sound quality' in either the title or the review text.


**Try This:**

- Change the query to 'durable and comfortable' to find reviews with those terms.

- Experiment with different field weights by modifying the field names with '^' (e.g., 'review_title^2').




### Boost relevance of specific fields
Search for products with 'premium' in the name or description, giving higher weight to matches in the name.


**Try This:**

- Adjust the boost value for 'product_name' to see how it affects the results.

- Add more fields to the search, such as 'product_brand'.




### Cross-field search for user interests
Search for users interested in 'Books' or 'Electronics' using a cross-field strategy.


**Try This:**

- Change the query to include other interests, like 'Sports' or 'Fashion'.

- Test the 'AND' operator by adding 'operator': 'and' to the query.




### Find reviews with phrase matching
Search for reviews mentioning the phrase 'comfortable fit' in either the title or review text.


**Try This:**

- Change the phrase to 'easy to use' and see the results.

- Test the 'phrase_prefix' type to allow for partial matches.




### Search with tie-breaking for fields
Search for products with the term 'gaming' in either the name or description, using a tie-breaker for equal scores.


**Try This:**

- Change the query to 'portable' and observe the results.

- Adjust the tie_breaker value to see how it impacts the scoring.





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
