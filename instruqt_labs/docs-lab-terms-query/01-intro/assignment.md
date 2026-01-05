---
slug: intro
id: 6dx0phwskbx4
type: challenge
title: Terms Query Lab
teaser: Learn how to use the terms_query query in Elasticsearch
notes:
- type: text
  contents: |
    # Terms Query Lab

    Welcome to the interactive lab for the terms_query query!

    Returns documents that contain one or more **exact** terms in a provided field. The `terms` query is the same as the [`term` query](https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-term-query), except you can search for multiple values. A document will match if it contains at least one of the terms. To search for documents that contain more than one matching term, use the [`terms_set` query](https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-terms-set-query).
tabs:
- id: gcrbjpg634dz
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- id: muvmoxj4yiio
  title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- id: sehaxdxav7cg
  title: Terminal
  type: terminal
  hostname: host-1
- id: 9bfih1lvxbhc
  title: Dataset
  type: service
  hostname: host-1
  path: /dataset.html
  port: 8000
difficulty: ""
enhanced_loading: null
---

# Terms Query Lab

Welcome to the interactive Terms Query lab! This lab teaches you how to use the terms_query query in Elasticsearch.

## Overview

Returns documents that contain one or more **exact** terms in a provided field. The `terms` query is the same as the [`term` query](https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-term-query), except you can search for multiple values. A document will match if it contains at least one of the terms. To search for documents that contain more than one matching term, use the [`terms_set` query](https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-terms-set-query).

## What You'll Learn

- How to construct terms_query queries
- Understanding query parameters and options
- How to interpret search results
- Best practices for using terms_query queries

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

This lab includes 5 examples demonstrating different aspects of the terms_query query:


### Find products by category
Search for products that belong to either the 'Electronics' or 'Books' categories.


**Try This:**

- Try changing the categories to 'Home and Kitchen' or 'Sports and Outdoors' and observe the results.




### Search for specific product brands
Retrieve all products from the specified brands: 'PlaySmart' and 'GlowNaturals'.


**Try This:**

- Try adding another brand such as 'AudioMax' to the list of brands to include more results.




### Filter reviews by rating
Find reviews that have a 4 or 5-star rating.


**Try This:**

- Try searching for reviews with a 3-star rating by adding '3' to the list.




### Find users by account type
Retrieve users who have either a 'Premium' or 'Enterprise' account.


**Try This:**

- Try searching for users with a 'Free' account by replacing the values in the query.




### Search for verified reviews
Find reviews where the purchase was verified.


**Try This:**

- Try searching for unverified reviews by replacing 'True' with 'False'.





## Getting Started

1. Review the first example query
2. Click "Run Query" to see the results
3. Try modifying the query to see how results change
4. Explore the other examples to learn different features
5. Use the "Try This" suggestions to experiment further

## View Official Documentation

For complete documentation, visit: https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-terms-query

## Need Help?

- Check the "Dataset" tab for information about available fields
- Use the "Why?" button on results to understand matching
- Review the "Tokens" tab to see how your query is analyzed

Happy querying!
