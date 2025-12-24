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
This query retrieves all products that belong to the 'Electronics' category.


**Try This:**

- Change the 'value' to 'Books' to search for products in the 'Books' category.

- Try using a different field, such as 'product_brand', to filter by brand.




### Search for highly rated reviews
This query retrieves all reviews with a rating of 5.


**Try This:**

- Change the 'value' to 4 to search for reviews with a rating of 4.

- Combine this query with a range query to filter reviews within a specific rating range.




### Find premium users
This query retrieves all users who have a 'Premium' account type.


**Try This:**

- Change the 'value' to 'Free' to find users with a free account.

- Try searching by 'username' to look for a specific user's account.




### Locate verified purchases
This query retrieves all reviews marked as a verified purchase.


**Try This:**

- Change the 'value' to 'False' to find reviews that are not verified purchases.

- Try combining this query with a term query on 'review_rating' for more specific results.




### Find products by brand
This query retrieves all products from the 'AudioMax' brand.


**Try This:**

- Change the 'value' to 'GlowNaturals' to search for products from a different brand.

- Combine this query with a range query on 'product_price' to find products within a specific price range.




### Search by exact username
This query retrieves a user with the exact username 'AveryWilliams55'.


**Try This:**

- Change the 'value' to 'CameronLopez20' to search for a different user.

- Combine this query with a term query on 'account_type' to find specific account types for a user.





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
