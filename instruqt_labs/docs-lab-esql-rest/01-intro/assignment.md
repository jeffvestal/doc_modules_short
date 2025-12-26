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


### Filter Products by Category
Find all products in the 'Electronics' category and display their names, brands, and prices.


**Try This:**

- Change 'Electronics' to another category like 'Books' or 'Clothing' to see different results.




### Sort Products by Price
Retrieve product names and prices, sorted by price in descending order.


**Try This:**

- Change 'DESC' to 'ASC' to sort prices in ascending order.




### Search Reviews by Keywords
Find reviews that mention 'durable' or 'comfortable', displaying their titles and ratings.


**Try This:**

- Try searching for other keywords like 'stylish' or 'functional'.




### Filter Verified Purchases
Retrieve verified purchase reviews with a rating of 5, sorted by helpful votes.


**Try This:**

- Change 'review_rating == 5' to another rating (e.g., 4) to find reviews with different ratings.




### Find Users by Interest
Retrieve usernames and interests of users who are interested in 'Books' or 'Electronics'.


**Try This:**

- Add another interest to the WHERE clause, like 'Sports', to see additional results.




### Top Reviewers by Trust Score
List the top 5 users with the highest trust scores.


**Try This:**

- Change the limit to 10 or sort in ascending order to see different results.





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
