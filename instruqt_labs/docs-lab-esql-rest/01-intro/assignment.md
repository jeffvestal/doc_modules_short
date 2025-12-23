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


### Filter products by category and sort by price
Find products in the 'Electronics' category and sort them by price in descending order.


**Try This:**

- Change 'Electronics' to another category like 'Books' or 'Clothing' and observe the results.




### Retrieve top-rated product reviews
List reviews with a rating of 5, showing only the review title and rating.


**Try This:**

- Change the rating to 4 or 3 to see reviews with different ratings.




### Find users interested in specific topics
Find users whose interests include 'Books', displaying their username and interests.


**Try This:**

- Replace 'Books' with 'Electronics' or 'Sports' to find users with different interests.




### Search for products with a specific feature
Find products with 'wireless' in their description.


**Try This:**

- Change 'wireless' to another keyword like 'portable' or 'durable' to find different products.




### Filter verified reviews with helpful votes
Find reviews that are verified purchases and have at least 20 helpful votes, sorted by helpful votes descending.


**Try This:**

- Change the helpful votes threshold to 15 or 10 to include more reviews.




### List premium users by trust score
Find premium account users, sorted by trust score in descending order.


**Try This:**

- Change the account type to 'Free' or 'Enterprise' to explore other user types.





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
