---
slug: intro
id: kuthbuszqk51
type: challenge
title: Simple Query String Query Lab
teaser: Learn how to use the simple_query_string_query query in Elasticsearch
notes:
- type: text
  contents: |
    # Simple Query String Query Lab

    Welcome to the interactive lab for the simple_query_string_query query!

    Returns documents based on a provided query string, using a parser with a limited but fault-tolerant syntax. This query uses a simple syntax to parse and split the provided query string into terms based on special operators. The query then analyzes each term independently before returning matching documents. While its syntax is more limited than the `query_string` query, the `simple_query_string` query does not return errors for invalid syntax. Instead, it ignores any invalid parts of the query string.
tabs:
- id: hxf9cickg3ex
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- id: a9jt1ihskasu
  title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- id: vvwqvxhchf9h
  title: Terminal
  type: terminal
  hostname: host-1
- id: zrsv7dhbzphx
  title: Dataset
  type: service
  hostname: host-1
  path: /dataset.html
  port: 8000
difficulty: ""
enhanced_loading: null
---

# Simple Query String Query Lab

Welcome to the interactive Simple Query String Query lab! This lab teaches you how to use the simple_query_string_query query in Elasticsearch.

## Overview

Returns documents based on a provided query string, using a parser with a limited but fault-tolerant syntax. This query uses a simple syntax to parse and split the provided query string into terms based on special operators. The query then analyzes each term independently before returning matching documents. While its syntax is more limited than the `query_string` query, the `simple_query_string` query does not return errors for invalid syntax. Instead, it ignores any invalid parts of the query string.

## What You'll Learn

- How to construct simple_query_string_query queries
- Understanding query parameters and options
- How to interpret search results
- Best practices for using simple_query_string_query queries

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

This lab includes 5 examples demonstrating different aspects of the simple_query_string_query query:


### Search for Wireless Headphones
Find products with the terms 'wireless' and 'headphones' in the name or description.


**Try This:**

- Replace 'wireless' with 'Bluetooth' to see different results.

- Add '-expensive' to exclude high-priced items.




### Search for Highly Rated Reviews
Find reviews mentioning 'comfortable' but exclude those with the word 'cheap'.


**Try This:**

- Change 'comfortable' to 'durable' to see alternate reviews.

- Remove '-cheap' to include more results.




### Search for Premium Users with Specific Interests
Find premium users interested in either Books or Electronics.


**Try This:**

- Try adding 'AND Premium' to limit results to premium accounts.

- Replace 'Books' with 'Toys' to see users with different interests.




### Search for Beauty Products
Find products from the 'GlowNaturals' brand in the Beauty category.


**Try This:**

- Replace 'GlowNaturals' with 'GlowEssence' to explore products from a different brand.

- Add '-expensive' to filter out high-priced items.




### Search for Verified Purchases with High Ratings
Find reviews from verified purchases with a rating of 5.


**Try This:**

- Change '5' to '4' to include slightly lower ratings.

- Remove 'verified_purchase:True' to expand the results.





## Getting Started

1. Review the first example query
2. Click "Run Query" to see the results
3. Try modifying the query to see how results change
4. Explore the other examples to learn different features
5. Use the "Try This" suggestions to experiment further

## View Official Documentation

For complete documentation, visit: https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-simple-query-string-query

## Need Help?

- Check the "Dataset" tab for information about available fields
- Use the "Why?" button on results to understand matching
- Review the "Tokens" tab to see how your query is analyzed

Happy querying!
