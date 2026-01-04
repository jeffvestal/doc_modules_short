---
slug: intro
id: placeholder-constantscorequery
type: challenge
title: Constant Score Query Lab
teaser: Learn how to use the constant_score_query query in Elasticsearch
tabs:
- id: tab-querylab-constantscorequery
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- id: tab-querylabfull-constantscorequery
  title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- id: tab-terminal-constantscorequery
  title: Terminal
  type: terminal
  hostname: host-1
- id: tab-dataset-constantscorequery
  title: Dataset
  type: service
  hostname: host-1
  path: /dataset.html
  port: 8000
notes:
- type: text
  contents: |
    # Constant Score Query Lab
    
    Welcome to the interactive lab for the constant_score_query query!
    
    Wraps a filter query and returns every matching document with a relevance score equal to the boost parameter value.
---

# Constant Score Query Lab

Welcome to the interactive Constant Score Query lab! This lab teaches you how to use the constant_score_query query in Elasticsearch.

## Overview

Wraps a filter query and returns every matching document with a relevance score equal to the boost parameter value.

## What You'll Learn

- How to construct constant_score_query queries
- Understanding query parameters and options
- How to interpret search results
- Best practices for using constant_score_query queries

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

This lab includes 6 examples demonstrating different aspects of the constant_score_query query:


### Boost all Electronics products
This query retrieves all documents in the 'products' index where the category is 'Electronics' and applies a constant boost score of 1.2.


**Try This:**

- Modify the 'product_category' value to 'Books' or another category to see different results.




### Highlight verified purchases
Fetch all reviews for verified purchases from the 'product_reviews' index and apply a constant boost score of 2.0.


**Try This:**

- Change the 'verified_purchase' value to 'False' to retrieve non-verified reviews.




### Filter by specific product brand
Retrieve all products of the brand 'GlowNaturals' with a constant boost score of 1.8.


**Try This:**

- Replace 'GlowNaturals' with another brand like 'AudioMax' or 'PawComfort' to explore different results.




### Find users with specific interests
Search for users interested in 'Electronics' and assign a constant boost score of 1.5.


**Try This:**

- Try changing the 'interests' value to 'Books' or 'Sports' to see how it impacts the results.




### Boost high-rated reviews
Retrieve all reviews with a rating of 5 and apply a boost of 2.5.


**Try This:**

- Change the 'review_rating' value to 3 or 4 to see results for different ratings.




### Filter affordable products
Search for products priced at $29.99 and apply a boost of 1.3.


**Try This:**

- Modify the 'product_price' to other values like 49.99 or 14.99 to explore different price ranges.





## Getting Started

1. Review the first example query
2. Click "Run Query" to see the results
3. Try modifying the query to see how results change
4. Explore the other examples to learn different features
5. Use the "Try This" suggestions to experiment further

## View Official Documentation

For complete documentation, visit: https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-constant-score-query

## Need Help?

- Check the "Dataset" tab for information about available fields
- Use the "Why?" button on results to understand matching
- Review the "Tokens" tab to see how your query is analyzed

Happy querying!
