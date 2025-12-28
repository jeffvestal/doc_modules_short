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


### Filter products by category and sort by price
Retrieve all Electronics products and sort them by price in ascending order.


**Try This:**

- Try changing the category to 'Books' or 'Clothing' to explore different results.




### Find reviews mentioning specific keywords
Search for reviews mentioning 'durable' or 'comfortable' and display their titles and ratings.


**Try This:**

- Try replacing the keywords with 'sturdy' or 'reliable' to find other reviews.




### Identify active users interested in specific topics
List usernames and their interests for users who are interested in Books or Electronics.


**Try This:**

- Try changing the interests to 'Sports' or 'Beauty' to view users with different preferences.




### Analyze verified purchases with high helpful votes
Find reviews from verified purchases with more than 20 helpful votes.


**Try This:**

- Try modifying the helpful_votes threshold to 15 or 30 to see different results.




### Discover premium users with high trust scores
Retrieve usernames and trust scores of Premium account users.


**Try This:**

- Try changing the account_type to 'Free' or 'Enterprise' to analyze other user groups.




### Search for affordable products by brand
Find products from 'GlowNaturals' priced below $50, sorted by price.


**Try This:**

- Try changing the brand to 'AudioMax' or 'PlayPals' and adjust the price range to explore other products.





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
