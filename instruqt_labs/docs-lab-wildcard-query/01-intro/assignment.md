---
slug: intro
id: placeholder-wildcardquery
type: challenge
title: Wildcard Query Lab
teaser: Learn how to use the wildcard_query query in Elasticsearch
tabs:
- id: tab-querylab-wildcardquery
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- id: tab-querylabfull-wildcardquery
  title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- id: tab-terminal-wildcardquery
  title: Terminal
  type: terminal
  hostname: host-1
- id: tab-dataset-wildcardquery
  title: Dataset
  type: service
  hostname: host-1
  path: /dataset.html
  port: 8000
notes:
- type: text
  contents: |
    # Wildcard Query Lab
    
    Welcome to the interactive lab for the wildcard_query query!
    
    Returns documents that contain terms matching a wildcard pattern. A wildcard operator is a placeholder that matches one or more characters. For example, the `*` wildcard operator matches zero or more characters. You can combine wildcard operators with other characters to create a wildcard pattern.
---

# Wildcard Query Lab

Welcome to the interactive Wildcard Query lab! This lab teaches you how to use the wildcard_query query in Elasticsearch.

## Overview

Returns documents that contain terms matching a wildcard pattern. A wildcard operator is a placeholder that matches one or more characters. For example, the `*` wildcard operator matches zero or more characters. You can combine wildcard operators with other characters to create a wildcard pattern.

## What You'll Learn

- How to construct wildcard_query queries
- Understanding query parameters and options
- How to interpret search results
- Best practices for using wildcard_query queries

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

This lab includes 4 examples demonstrating different aspects of the wildcard_query query:


### Find products with a name containing 'wireless'
Search for products where the product name includes the word 'wireless', using the wildcard operator.


**Try This:**

- Change the wildcard value to '*smart*' to find products containing 'smart' in their name.

- Try searching in product_description instead of product_name.




### Search product descriptions ending with 'durable'
Retrieve products where the product description ends with 'durable'.


**Try This:**

- Modify the value to '*lightweight' to find descriptions ending with 'lightweight'.

- Experiment with different wildcard patterns like 'eco-*'.




### Find reviews mentioning 'comfortable' in the title
Search for product reviews where the review title includes the word 'comfortable'.


**Try This:**

- Change the wildcard pattern to '*amazing*' to find reviews with 'amazing' in the title.

- Try using a narrower pattern like '*easy to use*'.




### Find reviews mentioning 'great' at the start
Retrieve product reviews where the review text starts with 'great'.


**Try This:**

- Change the value to 'excellent*' to find reviews starting with 'excellent'.

- Try using a broader pattern like '*awesome*'.





## Getting Started

1. Review the first example query
2. Click "Run Query" to see the results
3. Try modifying the query to see how results change
4. Explore the other examples to learn different features
5. Use the "Try This" suggestions to experiment further

## View Official Documentation

For complete documentation, visit: https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-wildcard-query

## Need Help?

- Check the "Dataset" tab for information about available fields
- Use the "Why?" button on results to understand matching
- Review the "Tokens" tab to see how your query is analyzed

Happy querying!
