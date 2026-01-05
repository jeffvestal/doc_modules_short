---
slug: intro
id: ra2vn2b2doxr
type: challenge
title: ES|QL Query Lab
teaser: Learn how to use the esql_commands query in Elasticsearch
notes:
- type: text
  contents: |
    # ES|QL Query Lab

    Welcome to the interactive lab for the esql_commands query!

    ES|QL commands come in two flavors: source commands and processing commands: - An ES|QL query must start with a [source command](https://www.elastic.co/docs/reference/query-languages/esql/commands/source-commands). - Use [processing commands](https://www.elastic.co/docs/reference/query-languages/esql/commands/processing-commands) to modify an input table by adding, removing, or transforming rows and columns.
tabs:
- id: whravh8vfsf5
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- id: 98ekag4ywoqt
  title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- id: vvzrgwxwfg1g
  title: Terminal
  type: terminal
  hostname: host-1
- id: 17xeazonflex
  title: Dataset
  type: service
  hostname: host-1
  path: /dataset.html
  port: 8000
difficulty: ""
enhanced_loading: null
---

# ES|QL Query Lab

Welcome to the interactive ES|QL Query lab! This lab teaches you how to use the esql_commands query in Elasticsearch.

## Overview

ES|QL commands come in two flavors: source commands and processing commands: - An ES|QL query must start with a [source command](https://www.elastic.co/docs/reference/query-languages/esql/commands/source-commands). - Use [processing commands](https://www.elastic.co/docs/reference/query-languages/esql/commands/processing-commands) to modify an input table by adding, removing, or transforming rows and columns.

## What You'll Learn

- How to construct esql_commands queries
- Understanding query parameters and options
- How to interpret search results
- Best practices for using esql_commands queries

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

This lab includes 6 examples demonstrating different aspects of the esql_commands query:


### Filter products by category and sort by price
This query retrieves products in the 'Electronics' category and sorts them by price in descending order.


**Try This:**

- Try changing 'Electronics' to 'Books' or 'Clothing' to see other categories.




### Find reviews with specific keywords
Searches for reviews containing the word 'durable' and keeps only the review title and rating.


**Try This:**

- Try changing 'durable' to 'comfortable' or 'quality' to explore reviews with different keywords.




### Filter users by account type and interests
Retrieves users with 'Premium' accounts who are interested in 'Electronics'.


**Try This:**

- Try changing 'Premium' to 'Free' or 'Enterprise' and 'Electronics' to 'Books'.




### Find top-rated reviews
Retrieves reviews with a rating of 5 and sorts them by the number of helpful votes in descending order.


**Try This:**

- Try changing the review rating to 4 or 3 to see reviews with lower ratings.




### Search for products with specific keywords
Finds products with a description containing the word 'wireless' and displays only the product name and price.


**Try This:**

- Try changing 'wireless' to 'portable' or 'durable' to find other products.




### View users sorted by trust score
Lists all users sorted by their trust score in descending order, showing their username and trust score.


**Try This:**

- Try removing the LIMIT clause to see all users sorted by trust score.





## Getting Started

1. Review the first example query
2. Click "Run Query" to see the results
3. Try modifying the query to see how results change
4. Explore the other examples to learn different features
5. Use the "Try This" suggestions to experiment further

## View Official Documentation

For complete documentation, visit: https://www.elastic.co/docs/reference/query-languages/esql/esql-commands

## Need Help?

- Check the "Dataset" tab for information about available fields
- Use the "Why?" button on results to understand matching
- Review the "Tokens" tab to see how your query is analyzed

Happy querying!
