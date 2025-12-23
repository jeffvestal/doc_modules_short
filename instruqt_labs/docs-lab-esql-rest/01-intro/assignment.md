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

This lab includes 5 examples demonstrating different aspects of the esql_rest query:


### Filter products by category and sort by price
This query retrieves products in the 'Electronics' category, showing only the name and price, sorted by price in descending order.


**Try This:**

- Change 'Electronics' to 'Books' to filter for a different category.

- Increase the LIMIT to 10 to see more results.




### Find reviews mentioning specific keywords
This query fetches reviews containing 'durable' or 'comfortable', showing their title and rating, sorted by rating in descending order.


**Try This:**

- Change 'durable' to 'lightweight' to find reviews mentioning a different keyword.

- Add a condition to filter by review rating (e.g., 'review_rating >= 4').




### Search users by interests
This query retrieves user profiles with interests related to 'Books' or 'Electronics', showing their username and interests.


**Try This:**

- Change 'Books' to 'Sports' to find users with a different interest.

- Add a condition to filter by account type (e.g., 'account_type == "Premium"').




### List verified reviews with helpful votes
This query retrieves verified purchase reviews with at least 15 helpful votes, showing their title, rating, and helpful vote count.


**Try This:**

- Change '15' to '10' to include reviews with fewer helpful votes.

- Remove the 'verified_purchase' condition to include all reviews.




### Find premium users with high trust scores
This query retrieves premium users with a trust score above 80, showing their username and trust score.


**Try This:**

- Change 'Premium' to 'Free' to find free users.

- Adjust the trust score threshold to include more users.





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
