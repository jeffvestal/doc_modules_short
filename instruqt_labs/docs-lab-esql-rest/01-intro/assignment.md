---
slug: intro
id: placeholder-esqlrest
type: challenge
title: ES|QL Query Lab
teaser: Learn how to use the esql_rest query in Elasticsearch
tabs:
- id: tab-querylab-esqlrest
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- id: tab-querylabfull-esqlrest
  title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- id: tab-terminal-esqlrest
  title: Terminal
  type: terminal
  hostname: host-1
- id: tab-dataset-esqlrest
  title: Dataset
  type: service
  hostname: host-1
  path: /dataset.html
  port: 8000
notes:
- type: text
  contents: |
    # ES|QL Query Lab
    
    Welcome to the interactive lab for the esql_rest query!
    
    <tip> The [Search and filter with ES|QL](https://www.elastic.co/docs/reference/query-languages/esql/esql-search-tutorial) tutorial provides a hands-on introduction to the ES|QL `_query` API. </tip>
---

# ES|QL Query Lab

Welcome to the interactive ES|QL Query lab! This lab teaches you how to use the esql_rest query in Elasticsearch.

## Overview

<tip> The [Search and filter with ES|QL](https://www.elastic.co/docs/reference/query-languages/esql/esql-search-tutorial) tutorial provides a hands-on introduction to the ES|QL `_query` API. </tip>

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

This lab includes 6 examples demonstrating different aspects of the esql_rest query:


### Find wireless products
Search for products with 'wireless' in their description and show the first 10 results.


**Try This:**

- Modify the query to search for a different keyword, such as 'Bluetooth'.




### Sort premium products by price
Find products with 'premium' in their name, keep the name and price fields, and sort by price in descending order.


**Try This:**

- Change the sorting to ascending order or filter by another keyword like 'luxury'.




### Top-rated comfortable reviews
Search for reviews mentioning 'comfortable' and return the first 10 results.


**Try This:**

- Update the query to search for reviews mentioning 'durable' instead.




### Find users interested in Electronics
Search for users with interests related to 'Electronics' and return the first 10 results.


**Try This:**

- Experiment with different interest keywords, like 'Books' or 'Sports'.




### Top-rated reviews for durable and comfortable products
Find reviews mentioning 'durable' or 'comfortable', show the title and rating, and sort by rating in descending order.


**Try This:**

- Add another keyword to the filter, such as 'reliable'.




### Users with multiple interests
Find users interested in both 'Books' and 'Electronics', showing their username and interests.


**Try This:**

- Try changing the interests to 'Gaming' or 'Travel'.





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
