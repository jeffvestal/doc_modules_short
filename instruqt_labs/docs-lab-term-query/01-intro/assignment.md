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

- Change the category to 'Books' or 'Toys' to see results for those categories.

- Try searching for 'Home and Kitchen' to explore products in that category.




### Search for products from a specific brand
Retrieve all products made by the brand 'GlowNaturals'.


**Try This:**

- Change the brand to 'AudioMax' or 'PlaySmart' to see their products.

- Try searching for another brand from the keyword list.




### Find reviews with a specific rating
Retrieve all reviews with a 5-star rating.


**Try This:**

- Change the rating to 3 or 4 to explore reviews with different ratings.

- Try searching for the lowest rating (1) to find critical reviews.




### Filter reviews by verified purchase
Find all reviews marked as verified purchases.


**Try This:**

- Change the value to 'False' to find reviews that are not verified purchases.

- Combine this query with other fields, like 'review_rating', for more specific results.




### Search users by account type
Find all users with a 'Premium' account.


**Try This:**

- Change the account type to 'Free' or 'Enterprise' to explore other user groups.

- Combine this query with age group or location fields for deeper insights.




### Search users by username
Find the user with the username 'AveryWilliams55'.


**Try This:**

- Change the username to 'CameronLopez20' or 'JordanMartinez33' to find other users.

- Try searching for a username not in the dataset to see how no results are returned.





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
