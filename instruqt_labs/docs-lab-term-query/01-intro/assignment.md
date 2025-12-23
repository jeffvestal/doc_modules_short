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


### Find products in a specific category
Search for all products in the 'Electronics' category.


**Try This:**

- Change 'Electronics' to 'Books' to find products in the Books category.

- Try using another category such as 'Clothing' or 'Beauty'.




### Find highly-rated reviews
Search for reviews with a rating of 5.


**Try This:**

- Change the rating to 4 to see reviews with a slightly lower rating.

- Try searching for reviews with a rating of 1 to find negative reviews.




### Find a specific user by username
Search for a user with the username 'AveryWilliams55'.


**Try This:**

- Change the username to 'CameronLopez20' to find a different user.

- Try using 'CaseyRodriguez81' or 'JordanMartinez33' as the username.




### Find products by brand
Search for all products from the brand 'AudioMax'.


**Try This:**

- Change the brand to 'GlowNaturals' or 'PlaySmart' to find products from other brands.

- Try using 'AutoGuard' to find automotive products.




### Find verified purchases
Search for reviews where the purchase is verified.


**Try This:**

- Change 'True' to 'False' to find reviews where the purchase is not verified.

- Combine this with a rating filter to find verified purchases with high ratings.




### Find products by price
Search for products with a price of 59.99.


**Try This:**

- Change the price to 89.99 to find more expensive products.

- Try using a lower price, such as 14.99, to find cheaper products.





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
