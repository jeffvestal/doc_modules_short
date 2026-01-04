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
Search for products priced between $20 and $50.


**Try This:**

- Try changing the price range to 30 and 70.

- Filter for products priced below $40 by using only 'lte'.




### Top-rated reviews
Retrieve reviews with a rating of 4 or higher.


**Try This:**

- Try lowering the rating to 3 to see more results.

- Find reviews with a maximum rating of 5 by adding 'lte: 5'.




### Filter users with low trust scores
Find users with a trust score of 80 or below.


**Try This:**

- Try finding users with trust scores greater than 50 by using 'gte: 50'.

- Combine 'gte' and 'lte' to create a range, such as 50 to 80.




### Filter reviews by date
Retrieve reviews posted in the year 2023.


**Try This:**

- Try changing the range to a single month, e.g., January 2023.

- Use only 'gte' to find reviews posted after a specific date.




### Find affordable products
Search for products priced less than $30.


**Try This:**

- Increase the price limit to $50 to find more results.

- Combine with 'gte' to create a range, e.g., $10 to $30.




### Find experienced users
Retrieve users who have been members for 5 years or more.


**Try This:**

- Change the range to 3 years by using 'now-3y/y'.

- Try filtering for newer users by using 'gte: now-1y/y'.





## Getting Started

1. Review the first example query
2. Click "Run Query" to see the results
3. Try modifying the query to see how results change
4. Explore the other examples to learn different features
5. Use the "Try This" suggestions to experiment further

## View Official Documentation

For complete documentation, visit: https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-range-query

## Need Help?

- Check the "Dataset" tab for information about available fields
- Use the "Why?" button on results to understand matching
- Review the "Tokens" tab to see how your query is analyzed

Happy querying!
