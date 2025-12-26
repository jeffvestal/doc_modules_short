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
This query retrieves all products with a price between $20 and $50.


**Try This:**

- Change the price range to 10-30 to find cheaper products.

- Try using only `gte` to find products with a price greater than or equal to 30.




### Retrieve highly-rated reviews
Fetch reviews where the rating is between 4 and 5 stars.


**Try This:**

- Change the range to 3-5 to include moderately rated reviews.

- Remove `lte` to only retrieve reviews rated 4 or higher.




### Filter users by trust score
Retrieve user profiles with a trust score between 80 and 100.


**Try This:**

- Adjust the range to 70-90 to include users with a lower trust score.

- Remove `gte` to find users with a trust score below 100.




### Find recent reviews
Retrieve reviews posted within the last 30 days.


**Try This:**

- Change the range to `now-7d/d` to find reviews from the last week.

- Remove `lte` to include all reviews from the past 30 days onward.




### Filter products by mid-range prices
Find products priced between $30 and $70.


**Try This:**

- Change the range to 50-100 to find higher-priced products.

- Use only `lte` to find products cheaper than $70.




### Retrieve products within a specific brand and price range
Fetch products from the brand 'GlowNaturals' priced between $20 and $60.


**Try This:**

- Change the brand to 'AudioMax' to find products from another brand.

- Adjust the price range to $50-$100 to find more expensive items.





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
