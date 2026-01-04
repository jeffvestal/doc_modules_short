---
slug: intro
id: placeholder-esqlsyntax
type: challenge
title: Basic ES|QL Syntax Lab
teaser: Learn how to use the esql_syntax query in Elasticsearch
tabs:
- id: tab-querylab-esqlsyntax
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- id: tab-querylabfull-esqlsyntax
  title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- id: tab-terminal-esqlsyntax
  title: Terminal
  type: terminal
  hostname: host-1
- id: tab-dataset-esqlsyntax
  title: Dataset
  type: service
  hostname: host-1
  path: /dataset.html
  port: 8000
notes:
- type: text
  contents: |
    # Basic ES|QL Syntax Lab
    
    Welcome to the interactive lab for the esql_syntax query!
    
    Learn the basic syntax of ES|QL, the Elasticsearch Query Language.
---

# Basic ES|QL Syntax Lab

Welcome to the interactive Basic ES|QL Syntax lab! This lab teaches you how to use the esql_syntax query in Elasticsearch.

## Overview

Learn the basic syntax of ES|QL, the Elasticsearch Query Language.

## What You'll Learn

- How to construct esql_syntax queries
- Understanding query parameters and options
- How to interpret search results
- Best practices for using esql_syntax queries

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

This lab includes 6 examples demonstrating different aspects of the esql_syntax query:


### Filter products by category
Find all products belonging to the 'Electronics' category.


**Try This:**

- Change 'Electronics' to another category such as 'Books' or 'Toys' and see the results.




### Find highly rated reviews
Retrieve reviews with a rating of 5 stars, sorted by the number of helpful votes.


**Try This:**

- Modify the rating to 4 or 3 and observe how the results change.




### Search for users with specific interests
Find users interested in 'Books' or 'Electronics' and display their usernames and interests.


**Try This:**

- Add another interest to the query, such as 'Sports', and see how the results expand.




### Find affordable products
Retrieve products priced under $50, sorted by price in ascending order.


**Try This:**

- Change the price threshold to a higher value, such as 100, to see more results.




### Search reviews for specific keywords
Find reviews mentioning the word 'durable' and display the review title and rating.


**Try This:**

- Replace 'durable' with another keyword like 'comfortable' or 'premium' and observe the results.




### Analyze users by account type
Filter users with a 'Premium' account type and sort them by their trust score.


**Try This:**

- Try changing 'Premium' to 'Free' or 'Enterprise' to explore other account types.





## Getting Started

1. Review the first example query
2. Click "Run Query" to see the results
3. Try modifying the query to see how results change
4. Explore the other examples to learn different features
5. Use the "Try This" suggestions to experiment further

## View Official Documentation

For complete documentation, visit: https://www.elastic.co/docs/reference/query-languages/esql/esql-syntax

## Need Help?

- Check the "Dataset" tab for information about available fields
- Use the "Why?" button on results to understand matching
- Review the "Tokens" tab to see how your query is analyzed

Happy querying!
