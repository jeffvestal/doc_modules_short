---
slug: intro
id: 8patrbwyoypz
type: challenge
title: Boosting Query Lab
teaser: Learn how to use the boosting_query query in Elasticsearch
notes:
- type: text
  contents: |
    # Boosting Query Lab

    Welcome to the interactive lab for the boosting_query query!

    Returns documents matching a `positive` query while reducing the relevance score of documents that also match a `negative` query. You can use the `boosting` query to demote certain documents without excluding them from the search results.
tabs:
- id: r9pb3p9balkl
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- id: dthmjqiq9oou
  title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- id: o14cphmrcol2
  title: Terminal
  type: terminal
  hostname: host-1
- id: rgqzgd9nk7kz
  title: Dataset
  type: service
  hostname: host-1
  path: /dataset.html
  port: 8000
difficulty: ""
enhanced_loading: null
---

# Boosting Query Lab

Welcome to the interactive Boosting Query lab! This lab teaches you how to use the boosting_query query in Elasticsearch.

## Overview

Returns documents matching a `positive` query while reducing the relevance score of documents that also match a `negative` query. You can use the `boosting` query to demote certain documents without excluding them from the search results.

## What You'll Learn

- How to construct boosting_query queries
- Understanding query parameters and options
- How to interpret search results
- Best practices for using boosting_query queries

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

This lab includes 5 examples demonstrating different aspects of the boosting_query query:


### Boost wireless products while demoting wired ones
This query boosts products with 'wireless' in their description while reducing the score of products with 'wired' in their description.


**Try This:**

- Try changing the positive query to 'premium' and the negative query to 'cheap'.




### Boost reviews mentioning comfort while demoting durability
This query boosts reviews containing 'comfortable' while reducing the score of reviews mentioning 'durable'.


**Try This:**

- Try modifying the positive term to 'amazing' and the negative term to 'terrible'.




### Boost users interested in electronics while demoting those interested in books
This query boosts users with interests in 'Electronics' and reduces the score of users interested in 'Books'.


**Try This:**

- Try boosting 'Sports and Outdoors' and demoting 'Beauty'.




### Boost Electronics category while demoting Home and Kitchen
This query boosts products in the 'Electronics' category while reducing the score of products in 'Home and Kitchen'.


**Try This:**

- Try boosting 'Beauty' and demoting 'Automotive' instead.




### Boost verified purchase reviews while demoting unverified ones
This query boosts reviews where 'verified_purchase' is true while reducing the score of unverified purchase reviews.


**Try This:**

- Try boosting reviews with high helpful votes while demoting low votes.





## Getting Started

1. Review the first example query
2. Click "Run Query" to see the results
3. Try modifying the query to see how results change
4. Explore the other examples to learn different features
5. Use the "Try This" suggestions to experiment further

## View Official Documentation

For complete documentation, visit: https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-boosting-query

## Need Help?

- Check the "Dataset" tab for information about available fields
- Use the "Why?" button on results to understand matching
- Review the "Tokens" tab to see how your query is analyzed

Happy querying!
