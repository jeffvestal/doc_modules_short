---
slug: intro
id: qqtawaconara
type: challenge
title: Multi-Match Query Lab
teaser: Learn how to use the multi_match_query query in Elasticsearch
notes:
- type: text
  contents: |
    # Multi-Match Query Lab

    Welcome to the interactive lab for the multi_match_query query!

    The `multi_match` query builds on the `match` query to allow multi-field queries.
tabs:
- id: fn0wetl2nxft
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- id: 863wfv7yjvol
  title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- id: qmtyeq90tc1n
  title: Terminal
  type: terminal
  hostname: host-1
- id: t5maq3bt9axx
  title: Dataset
  type: service
  hostname: host-1
  path: /dataset.html
  port: 8000
difficulty: ""
enhanced_loading: null
---

# Multi-Match Query Lab

Welcome to the interactive Multi-Match Query lab! This lab teaches you how to use the multi_match_query query in Elasticsearch.

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


### Search across multiple fields in products
Find products with 'wireless' in the name or description.


**Try This:**

- Try replacing 'wireless' with other keywords like 'premium' or 'durable' to see how it affects the results.




### Boost specific fields
Give more weight to matches in the product name field.


**Try This:**

- Try experimenting with different boost values, e.g., 'product_name^3', to see how boosting affects the ranking of results.




### Search product reviews
Find reviews mentioning 'comfortable' in the title or text.


**Try This:**

- Try replacing 'comfortable' with other terms, like 'durable' or 'easy setup', to find different reviews.




### Use the 'phrase_prefix' type
Search for reviews where the title or text starts with 'durable and'.


**Try This:**

- Try using different phrases like 'easy to' or 'great for' to explore the prefix search functionality.




### Search user interests
Find users interested in 'Books' and 'Electronics'.


**Try This:**

- Try changing the query to other combinations like 'Sports Outdoors' or 'Beauty' to see how it matches users.




### Use 'most_fields' type
Search for users where the text matches in most fields.


**Try This:**

- Try replacing 'outdoor enthusiast' with another phrase like 'tech lover' or 'avid reader' to observe field-matching behavior.





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
