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
    
    The [Search and filter with ES|QL](https://www.elastic.co/docs/reference/query-languages/esql/esql-search-tutorial) tutorial provides a hands-on introduction to the ES|QL `_query` API.
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

This lab includes 6 examples demonstrating different aspects of the esql_rest query:


### Find wireless products
Search for products with 'wireless' in their description.


**Try This:**

- Change 'wireless' to 'premium' to find products with 'premium' in their description.

- Add a condition to filter by product_category, e.g., `AND product_category == "Electronics"`.




### Top-rated reviews mentioning durability
Find product reviews mentioning 'durable' and sort them by rating in descending order.


**Try This:**

- Change 'durable' to 'comfortable' to find reviews mentioning 'comfortable'.

- Add a condition to include verified purchases only, e.g., `AND verified_purchase == "True"`.




### Users interested in Books and Electronics
Search for users with interests in both 'Books' and 'Electronics'.


**Try This:**

- Add another interest, e.g., `OR interests LIKE "*Sports*"`.

- Change the LIMIT value to display more or fewer results.




### Affordable products in Electronics
Find products in the 'Electronics' category with prices under $50.


**Try This:**

- Change the price filter to `product_price < 100` to include more products.

- Remove the category filter to see affordable products from all categories.




### Frequently reviewed users
Find users who have written the most reviews.


**Try This:**

- Add a condition to filter by account type, e.g., `WHERE account_type == "Premium"`.

- Change the sorting order to `ASC` to find users with the fewest reviews.




### Highly rated verified reviews
Find verified reviews with the highest ratings.


**Try This:**

- Change the rating filter to `review_rating >= 5` to see only perfect reviews.

- Remove the verified purchase filter to include all reviews.





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
