---
slug: intro
id: placeholder-termquery
type: challenge
title: Term Query Lab
teaser: Learn how to use the term_query query in Elasticsearch
tabs:
- id: tab-querylab-termquery
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- id: tab-querylabfull-termquery
  title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- id: tab-terminal-termquery
  title: Terminal
  type: terminal
  hostname: host-1
- id: tab-dataset-termquery
  title: Dataset
  type: service
  hostname: host-1
  path: /dataset.html
  port: 8000
notes:
- type: text
  contents: |
    # Term Query Lab
    
    Welcome to the interactive lab for the term_query query!
    
    Returns documents that contain an **exact** term in a provided field. You can use the `term` query to find documents based on a precise value such as a price, a product ID, or a username.
---

# Term Query Lab

Welcome to the interactive Term Query lab! This lab teaches you how to use the term_query query in Elasticsearch.

## Overview

Returns documents that contain an **exact** term in a provided field. You can use the `term` query to find documents based on a precise value such as a price, a product ID, or a username.

## What You'll Learn

- How to construct term_query queries
- Understanding query parameters and options
- How to interpret search results
- Best practices for using term_query queries

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

This lab includes 6 examples demonstrating different aspects of the term_query query:


### Find a product by exact category
Search for products in the 'Electronics' category using an exact match.


**Try This:**

- Change the `product_category` value to 'Books' or 'Clothing' and observe the results.

- Try searching for a category not in the dataset, such as 'Furniture', and see what happens.




### Find reviews with specific helpful votes
Retrieve reviews that have exactly 27 helpful votes.


**Try This:**

- Change `helpful_votes` to another value like 15 or 34 to see different results.

- Try using a value not in the dataset, such as 50, to test the query behavior.




### Find a specific username
Search for a user with the username 'AveryWilliams55'.


**Try This:**

- Change the `username` value to other options like 'CameronLopez20' or 'CaseyRodriguez81'.

- Try searching for a username not in the dataset, such as 'UnknownUser', and check the results.




### Search for a specific product brand
Find all products from the brand 'AudioMax'.


**Try This:**

- Change `product_brand` to other values like 'GlowNaturals' or 'PlaySmart'.

- Test the query with a non-existent brand like 'TechGenius' to observe the output.




### Filter verified purchases
Find all reviews marked as verified purchases.


**Try This:**

- Change `verified_purchase` to 'False' to filter only non-verified purchases.

- Combine this query with other filters like `review_rating` for more specific results.




### Search for a specific product price
Retrieve all products priced at exactly $49.99.


**Try This:**

- Change `product_price` to 89.99 or 24.99 and observe the responses.

- Try using a price not in the dataset, such as 99.99, to test the query's behavior.





## Getting Started

1. Review the first example query
2. Click "Run Query" to see the results
3. Try modifying the query to see how results change
4. Explore the other examples to learn different features
5. Use the "Try This" suggestions to experiment further

## View Official Documentation

For complete documentation, visit: https://elastic.co/docs/reference/query-languages/query-dsl/query-dsl-term-query

## Need Help?

- Check the "Dataset" tab for information about available fields
- Use the "Why?" button on results to understand matching
- Review the "Tokens" tab to see how your query is analyzed

Happy querying!
