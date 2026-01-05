---
slug: intro
id: autndddz2w3c
type: challenge
title: ES|QL Query Lab
teaser: Learn how to use the esql_rest query in Elasticsearch
notes:
- type: text
  contents: |
    # ES|QL Query Lab

    Welcome to the interactive lab for the esql_rest query!

    <tip> The [Search and filter with ES|QL](https://www.elastic.co/docs/reference/query-languages/esql/esql-search-tutorial) tutorial provides a hands-on introduction to the ES|QL `_query` API. </tip>
tabs:
- id: k2yozoioxntv
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- id: khhejyvs18sz
  title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- id: yuhwu6fzgtqu
  title: Terminal
  type: terminal
  hostname: host-1
- id: awgtxjarvrt9
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
Retrieve all products in the 'Electronics' category and sort them by price in descending order.


**Try This:**

- Change the category to 'Clothing' or another value from the provided list.




### Find high-rated reviews
Retrieve reviews with a rating of 5 stars and display the title, rating, and helpful votes.


**Try This:**

- Modify the rating to 4 or another value to see reviews with different ratings.




### Search for specific user interests
Find users interested in 'Books' or 'Electronics' and display their username and interests.


**Try This:**

- Change the interest to 'Sports' or another value to explore other user interests.




### Find affordable products
List products priced below $50 and show their name, brand, and price.


**Try This:**

- Adjust the price threshold to $30 or $100 to see different results.




### Identify verified product reviews
Retrieve reviews marked as verified purchases and sort them by review date.


**Try This:**

- Change the filter to 'False' to see non-verified reviews.




### Analyze user activity
Find premium users who have written more than 20 reviews and display their username and total reviews count.


**Try This:**

- Change the account type to 'Free' or 'Enterprise' to analyze other user groups.





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
