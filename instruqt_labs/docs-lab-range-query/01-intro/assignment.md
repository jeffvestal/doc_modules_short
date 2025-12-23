---
slug: intro
id: placeholder-rangequery
type: challenge
title: Range Query Lab
teaser: Learn how to use the range_query query in Elasticsearch
tabs:
- id: tab-querylab-rangequery
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- id: tab-querylabfull-rangequery
  title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- id: tab-terminal-rangequery
  title: Terminal
  type: terminal
  hostname: host-1
- id: tab-dataset-rangequery
  title: Dataset
  type: service
  hostname: host-1
  path: /dataset.html
  port: 8000
notes:
- type: text
  contents: |
    # Range Query Lab
    
    Welcome to the interactive lab for the range_query query!
    
    Returns documents that contain terms within a provided range.
---

# Range Query Lab

Welcome to the interactive Range Query lab! This lab teaches you how to use the range_query query in Elasticsearch.

## Overview

Returns documents that contain terms within a provided range.

## What You'll Learn

- How to construct range_query queries
- Understanding query parameters and options
- How to interpret search results
- Best practices for using range_query queries

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

This lab includes 6 examples demonstrating different aspects of the range_query query:


### Find products within a price range
Search for products that have a price between $50 and $100.


**Try This:**

- Change the price range to find products that are cheaper or more expensive.




### Find highly-rated product reviews
Search for product reviews with a rating of 4 or higher.


**Try This:**

- Adjust the 'gte' value to filter for reviews with a specific minimum rating.




### Find recent users who joined in a date range
Search for users who joined between January 1, 2020, and January 1, 2023.


**Try This:**

- Modify the date range to filter for users who joined earlier or later.




### Find products priced above $200
Search for products that have a price greater than $200.


**Try This:**

- Change the 'gte' value to filter for products priced above a different threshold.




### Find reviews submitted within the last 30 days
Search for reviews submitted in the last 30 days using a relative date range.


**Try This:**

- Change the range to 'now-7d/d' to filter for reviews from the last 7 days.




### Find users with a high trust score
Search for users with a trust score of 80 or higher.


**Try This:**

- Adjust the 'gte' value to filter for users with a different minimum trust score.





## Getting Started

1. Review the first example query
2. Click "Run Query" to see the results
3. Try modifying the query to see how results change
4. Explore the other examples to learn different features
5. Use the "Try This" suggestions to experiment further

## View Official Documentation

For complete documentation, visit: https://elastic.co/docs/reference/query-languages/query-dsl/query-dsl-range-query

## Need Help?

- Check the "Dataset" tab for information about available fields
- Use the "Why?" button on results to understand matching
- Review the "Tokens" tab to see how your query is analyzed

Happy querying!
