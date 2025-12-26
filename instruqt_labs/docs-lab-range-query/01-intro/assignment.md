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


### Find products within a specific price range
Search for products priced between $30 and $60.


**Try This:**

- Try changing the price range to $50-$100.

- Experiment with using only a minimum price (e.g., gte: 20).




### Filter reviews with high ratings
Retrieve reviews with a rating of 4 or higher.


**Try This:**

- Adjust the minimum rating to 3 and see how the results change.

- Try adding an upper limit (e.g., lte: 5) to find reviews within a specific range.




### Filter users by trust score
Find users with a trust score between 70 and 100.


**Try This:**

- Adjust the trust score range to 50-90 to see different results.

- Try removing the upper limit (lte) to find users with trust scores above a certain value.




### Retrieve recent reviews
Search for reviews posted within the last 30 days.


**Try This:**

- Change the range to the last 7 days (e.g., now-7d/d).

- Try using only a lower bound (gte) to include reviews from a specific date onward.




### Find products with premium prices
Retrieve products priced over $100.


**Try This:**

- Modify the query to include products priced between $50 and $150.

- Remove the upper limit to find all products above a specific price.




### Find highly rated reviews with helpful votes
Search for reviews with a rating of 5 and more than 20 helpful votes.


**Try This:**

- Change the helpful votes range to 15-30.

- Try using a rating range of 4 to 5 instead of a fixed value.





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
