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


### Find product by exact category
This query searches for products in the 'Electronics' category.


**Try This:**

- Change the value to 'Appliances' to see if there are products in that category.

- Try using a different field like 'product_brand' with a brand name as the value.




### Find review by user ID
This query retrieves product reviews written by a specific user ID.


**Try This:**

- Replace 'user123' with a different user ID to find reviews from other users.

- Change the field to 'verified_purchase' and the value to 'true' to find verified reviews.




### Find user by username
This query retrieves information about a user with an exact username.


**Try This:**

- Change 'john_doe' to a different username to find a different user.

- Try searching another field, like 'account_type', to filter users by their account type.




### Find products by exact price
This query retrieves products that have a price of exactly 99.99.


**Try This:**

- Change the price value to 49.99 to find cheaper products.

- Try using the 'product_brand' field to filter products by a specific brand.




### Find reviews with helpful votes
This query retrieves reviews that have exactly 10 helpful votes.


**Try This:**

- Modify the value to 5 or 20 to see reviews with different numbers of helpful votes.

- Use the 'review_rating' field to filter reviews based on their rating instead.




### Find users by account type
This query retrieves users with an account type of 'premium'.


**Try This:**

- Change 'premium' to 'basic' to find users with basic accounts.

- Try querying the 'location_country' field to find users from a specific country.





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
