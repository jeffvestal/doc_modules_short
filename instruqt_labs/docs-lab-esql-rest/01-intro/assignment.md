---
slug: intro
id: autovacyml8c
type: challenge
title: ES|QL Query Lab
teaser: Learn how to use the esql_rest query in Elasticsearch
notes:
- type: text
  contents: |
    # ES|QL Query Lab

    Welcome to the interactive lab for the esql_rest query!

    The [Search and filter with ES|QL](https://www.elastic.co/docs/reference/query-languages/esql/esql-search-tutorial) tutorial provides a hands-on introduction to the ES|QL `_query` API.
tabs:
- id: nnpnimwbnena
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- id: 7wlmfynozyq1
  title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- id: umjxcuu3ysry
  title: Terminal
  type: terminal
  hostname: host-1
- id: kyyysdga3q8t
  title: Dataset
  type: service
  hostname: host-1
  path: /dataset.html
  port: 8000
difficulty: ""
enhanced_loading: null
---

# ES|QL Query Lab

Welcome to the interactive ES|QL Query lab! This lab teaches you how to use the esql_rest query in Elasticsearch.

## Overview

The [Search and filter with ES|QL](https://www.elastic.co/docs/reference/query-languages/esql/esql-search-tutorial) tutorial provides a hands-on introduction to the ES|QL `_query` API.

## What You'll Learn

- How to construct esql_rest queries
- Understanding query parameters and options
- How to interpret search results
- Best practices for using esql_rest queries

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

This lab includes 5 examples demonstrating different aspects of the esql_rest query:


### Find Wireless Products
Search for products where the description contains the word 'wireless'.


**Try This:**

- Change 'wireless' to another term like 'portable' or 'smart'

- Experiment with LIMIT to adjust the number of results returned.




### Top Rated Durable Reviews
Find reviews mentioning 'durable' or 'comfortable', sorted by rating in descending order.


**Try This:**

- Change the keywords in the WHERE clause to find reviews mentioning other terms.

- Try removing the OR condition to focus on one keyword.




### Electronics Enthusiasts
Find users with interests in 'Electronics'.


**Try This:**

- Replace 'Electronics' with another interest like 'Books' or 'Sports'.

- Increase the LIMIT to see more results.




### Premium Products by Price
Find premium products and display their name and price, sorted by price in descending order.


**Try This:**

- Change 'premium' to another term like 'luxury' or 'classic'.

- Sort the results in ascending order by replacing DESC with ASC.




### Top Verified Reviews
Retrieve reviews from verified purchases with a high number of helpful votes.


**Try This:**

- Change the helpful_votes threshold to 10 or 20.

- Experiment with sorting in ascending order instead.





## Getting Started

1. Review the first example query
2. Click "Run Query" to see the results
3. Try modifying the query to see how results change
4. Explore the other examples to learn different features
5. Use the "Try This" suggestions to experiment further

## View Official Documentation

For complete documentation, visit: https://www.elastic.co/docs/reference/query-languages/esql/esql-rest

## Need Help?

- Check the "Dataset" tab for information about available fields
- Use the "Why?" button on results to understand matching
- Review the "Tokens" tab to see how your query is analyzed

Happy querying!
