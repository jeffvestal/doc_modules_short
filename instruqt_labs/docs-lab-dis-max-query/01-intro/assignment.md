---
slug: intro
id: 8umiyitksags
type: challenge
title: Disjunction Max Query Lab
teaser: Learn how to use the dis_max_query query in Elasticsearch
notes:
- type: text
  contents: |
    # Disjunction Max Query Lab

    Welcome to the interactive lab for the dis_max_query query!

    Returns documents matching one or more wrapped queries, called query clauses or clauses. If a returned document matches multiple query clauses, the `dis_max` query assigns the document the highest relevance score from any matching clause, plus a tie breaking increment for any additional matching subqueries.
tabs:
- id: puyxjeb1nnq6
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- id: 59kim7htc2wh
  title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- id: 2atzbhgqgxdf
  title: Terminal
  type: terminal
  hostname: host-1
- id: xfr1kdyssijc
  title: Dataset
  type: service
  hostname: host-1
  path: /dataset.html
  port: 8000
difficulty: ""
enhanced_loading: null
---

# Disjunction Max Query Lab

Welcome to the interactive Disjunction Max Query lab! This lab teaches you how to use the dis_max_query query in Elasticsearch.

## Overview

Returns documents matching one or more wrapped queries, called query clauses or clauses. If a returned document matches multiple query clauses, the `dis_max` query assigns the document the highest relevance score from any matching clause, plus a tie breaking increment for any additional matching subqueries.

## What You'll Learn

- How to construct dis_max_query queries
- Understanding query parameters and options
- How to interpret search results
- Best practices for using dis_max_query queries

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

This lab includes 6 examples demonstrating different aspects of the dis_max_query query:


### Match product name or description
Search for products where the name or description contains the term 'wireless'.


**Try This:**

- Try changing the term 'wireless' to 'premium' and observe the difference in results.




### Match review title or text
Search for reviews where the title or text contains the term 'durable'.


**Try This:**

- Try changing the term 'durable' to 'comfortable' to find reviews mentioning comfort.




### Search for users with interests
Search for users whose interests include 'Books' or 'Electronics'.


**Try This:**

- Try adding another term like 'Sports' to the interests field.




### Search for products by category or brand
Search for products in the 'Electronics' category or with the brand 'AudioMax'.


**Try This:**

- Try changing the category to 'Home and Kitchen' or the brand to 'GlowNaturals'.




### Search for highly rated reviews
Search for reviews with a rating of 5 or helpful votes greater than 20.


**Try This:**

- Try lowering the rating to 4 or changing the helpful votes threshold to 15.




### Search for premium or enterprise users
Find users who are either 'Premium' or 'Enterprise' account holders.


**Try This:**

- Try adding 'Free' to the term queries for account type.





## Getting Started

1. Review the first example query
2. Click "Run Query" to see the results
3. Try modifying the query to see how results change
4. Explore the other examples to learn different features
5. Use the "Try This" suggestions to experiment further

## View Official Documentation

For complete documentation, visit: https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-dis-max-query

## Need Help?

- Check the "Dataset" tab for information about available fields
- Use the "Why?" button on results to understand matching
- Review the "Tokens" tab to see how your query is analyzed

Happy querying!
