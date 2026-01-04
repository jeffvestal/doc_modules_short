---
slug: intro
id: placeholder-querystringquery
type: challenge
title: Query String Query Lab
teaser: Learn how to use the query_string_query query in Elasticsearch
tabs:
- id: tab-querylab-querystringquery
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- id: tab-querylabfull-querystringquery
  title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- id: tab-terminal-querystringquery
  title: Terminal
  type: terminal
  hostname: host-1
- id: tab-dataset-querystringquery
  title: Dataset
  type: service
  hostname: host-1
  path: /dataset.html
  port: 8000
notes:
- type: text
  contents: |
    # Query String Query Lab
    
    Welcome to the interactive lab for the query_string_query query!
    
    <tip> This page contains information about the `query_string` query type. For information about running a search query in Elasticsearch, see [*The search API*](https://www.elastic.co/docs/solutions/search/querying-for-search). </tip>
---

# Query String Query Lab

Welcome to the interactive Query String Query lab! This lab teaches you how to use the query_string_query query in Elasticsearch.

## Overview

<tip> This page contains information about the `query_string` query type. For information about running a search query in Elasticsearch, see [*The search API*](https://www.elastic.co/docs/solutions/search/querying-for-search). </tip>

## What You'll Learn

- How to construct query_string_query queries
- Understanding query parameters and options
- How to interpret search results
- Best practices for using query_string_query queries

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

This lab includes 6 examples demonstrating different aspects of the query_string_query query:


### Simple Keyword Search
Search for products that contain 'wireless' in the product name.


**Try This:**

- Change 'wireless' to another keyword like 'premium' or 'headphones'.

- Try searching in product_description instead of product_name.




### Boolean Search with Multiple Fields
Search for reviews that mention 'comfortable' or 'durable' in the review text.


**Try This:**

- Add another keyword like 'lightweight' using the OR operator.

- Replace OR with AND to narrow the results.




### Range Query on Numeric Field
Find products in the 'Electronics' category with prices between $50 and $100.


**Try This:**

- Change the price range to [30 TO 60] or [100 TO 200].

- Try searching in a different category like 'Clothing'.




### Phrase Search
Search for reviews that include the exact phrase 'highly recommended'.


**Try This:**

- Search for other phrases like 'great quality' or 'fast shipping'.

- Try adding a wildcard to your phrase like 'highly *'.




### Wildcard Search
Search for users with interests containing the word 'Electro' followed by any characters.


**Try This:**

- Replace 'Electro*' with 'Books*' to find users interested in books.

- Remove the wildcard (*) to search for an exact match instead.




### Combining Multiple Queries
Search for users who have 'Premium' accounts and are interested in 'Sports'.


**Try This:**

- Change 'Premium' to 'Free' or 'Enterprise'.

- Add another condition using OR, such as 'interests:Outdoors'.





## Getting Started

1. Review the first example query
2. Click "Run Query" to see the results
3. Try modifying the query to see how results change
4. Explore the other examples to learn different features
5. Use the "Try This" suggestions to experiment further

## View Official Documentation

For complete documentation, visit: https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-query-string-query

## Need Help?

- Check the "Dataset" tab for information about available fields
- Use the "Why?" button on results to understand matching
- Review the "Tokens" tab to see how your query is analyzed

Happy querying!
