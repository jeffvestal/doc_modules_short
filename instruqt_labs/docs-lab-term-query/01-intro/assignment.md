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


### Find products in the 'Electronics' category
This query retrieves all products from the 'Electronics' category.


**Try This:**

- Change the category to 'Home and Kitchen' or 'Books' and observe the results.

- Try searching for a category that doesn't exist in the data.




### Find 5-star reviews
This query retrieves all reviews that have a rating of 5 stars.


**Try This:**

- Change the rating to 4 or 3 to find reviews with lower ratings.

- Try using a rating value not present in the dataset and observe the results.




### Find users with a 'Premium' account type
This query retrieves all users who have a 'Premium' account type.


**Try This:**

- Change the account type to 'Free' or 'Enterprise' to find different types of users.

- Try using a lowercase value like 'premium' and observe how the case sensitivity affects the results.




### Find products from the 'AudioMax' brand
This query retrieves all products that are manufactured by the 'AudioMax' brand.


**Try This:**

- Change the brand to 'GlowNaturals' or 'PlaySmart' to find products from other manufacturers.

- Use a brand name that doesn't exist in the dataset and observe the results.




### Find reviews marked as verified purchase
This query retrieves all reviews that are marked as a verified purchase.


**Try This:**

- Change the value to 'False' to find reviews that are not verified purchases.

- Try using lowercase 'true' or 'false' and observe the case sensitivity of the query.




### Find products priced at $89.99
This query retrieves all products that have a price of $89.99.


**Try This:**

- Change the price to $49.99 or $129.99 to find products with other prices.

- Use a price that doesn't exist in the dataset (e.g., $199.99) and observe the results.





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
