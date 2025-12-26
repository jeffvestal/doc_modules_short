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


### Filter Products by Price Range
Find products priced between $30 and $60.


**Try This:**

- Change the price range to find products under $50.

- Use 'gt' or 'lt' to find products strictly greater or less than a price.




### Find Highly Rated Reviews
Search for product reviews with ratings between 4 and 5.


**Try This:**

- Modify 'gte' to 3 to include moderately rated reviews.

- Remove 'lte' to see reviews with ratings 4 and above.




### Filter Users by Review Activity
Find users who have written between 10 and 50 reviews.


**Try This:**

- Increase 'lte' to 100 to include more active users.

- Use 'gt' and 'lt' to exclude the boundary values.




### Search Products in Upper Price Range
Find products priced above $100.


**Try This:**

- Add a 'lt' filter to set an upper limit on the price.

- Search for products priced above $200.




### Find Recent Reviews
Search for reviews from the last 30 days.


**Try This:**

- Change '30d' to '7d' to find reviews from the last week.

- Use 'now-1y/y' to filter reviews from the past year.




### Filter Users by Trust Score
Find users with a trust score between 70 and 90.


**Try This:**

- Increase 'lte' to 100 to include users with perfect trust scores.

- Set 'gte' to 50 to include users with lower trust scores.





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
