---
slug: intro
id: placeholder-boolquery
type: challenge
title: Boolean Query Lab
teaser: Learn how to use the bool_query query in Elasticsearch
tabs:
- id: tab-querylab-boolquery
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- id: tab-querylabfull-boolquery
  title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- id: tab-terminal-boolquery
  title: Terminal
  type: terminal
  hostname: host-1
- id: tab-dataset-boolquery
  title: Dataset
  type: service
  hostname: host-1
  path: /dataset.html
  port: 8000
notes:
- type: text
  contents: |
    # Boolean Query Lab
    
    Welcome to the interactive lab for the bool_query query!
    
    A query that matches documents matching boolean combinations of other queries. The bool query maps to Lucene `BooleanQuery`. It is built using one or more boolean clauses, each clause with a typed occurrence. The occurrence types are:
---

# Boolean Query Lab

Welcome to the interactive Boolean Query lab! This lab teaches you how to use the bool_query query in Elasticsearch.

## Overview

A query that matches documents matching boolean combinations of other queries. The bool query maps to Lucene `BooleanQuery`. It is built using one or more boolean clauses, each clause with a typed occurrence. The occurrence types are:

## What You'll Learn

- How to construct bool_query queries
- Understanding query parameters and options
- How to interpret search results
- Best practices for using bool_query queries

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

This lab includes 4 examples demonstrating different aspects of the bool_query query:


### Filter products by category and price range
This query retrieves products in the 'Electronics' category with a price between $50 and $100.


**Try This:**

- Try changing the product_category to 'Home and Kitchen' or modifying the price range.




### Search for reviews containing specific words
This query finds reviews that mention either 'comfortable' or 'durable'.


**Try This:**

- Try adding more terms to the 'should' clause, such as 'high quality' or 'affordable'.




### Exclude products with a specific brand and price range
This query retrieves products that are not from the 'PlaySmart' brand and have a price outside the $30-$70 range.


**Try This:**

- Try changing the product_brand to another value like 'AudioMax' or adjusting the price range.




### Combine multiple conditions for product reviews
This query retrieves reviews for verified purchases with a rating of 4 or higher and filters out reviews with less than 10 helpful votes.


**Try This:**

- Try changing the review_rating range or the minimum helpful_votes.





## Getting Started

1. Review the first example query
2. Click "Run Query" to see the results
3. Try modifying the query to see how results change
4. Explore the other examples to learn different features
5. Use the "Try This" suggestions to experiment further

## View Official Documentation

For complete documentation, visit: https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-bool-query

## Need Help?

- Check the "Dataset" tab for information about available fields
- Use the "Why?" button on results to understand matching
- Review the "Tokens" tab to see how your query is analyzed

Happy querying!
