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
Retrieve all products that have a price between $20 and $50.


**Try This:**

- Change the range to find products between $30 and $70.

- Add a 'boost' parameter to prioritize these results.




### Retrieve highly rated reviews
Find all reviews with a rating of 4 or higher.


**Try This:**

- Change the range to find reviews with a rating of 3 or lower.

- Add a sort clause to order results by the review date.




### Filter users by trust score
Retrieve users with a trust score between 70 and 90.


**Try This:**

- Expand the range to include users with trust scores of 60 to 95.

- Add a condition to filter users by account type (e.g., Premium).




### Find recent reviews
Retrieve reviews posted within the last 30 days.


**Try This:**

- Change the range to find reviews from the last 7 days.

- Use a specific date range instead (e.g., '2023-01-01' to '2023-01-31').




### Filter products by price with boost
Find products priced between $50 and $100, giving them a higher relevance boost.


**Try This:**

- Adjust the boost value to prioritize these results differently.

- Narrow the price range to between $60 and $80.




### Find users by age group
Retrieve users between the ages of 25 and 35.


**Try This:**

- Change the range to target users aged 18 to 29.

- Combine this query with a term query on the 'account_type' field.





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
