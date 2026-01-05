---
slug: intro
id: vzpd7z7gm8ij
type: challenge
title: Prefix Query Lab
teaser: Learn how to use the prefix_query query in Elasticsearch
notes:
- type: text
  contents: |
    # Prefix Query Lab

    Welcome to the interactive lab for the prefix_query query!

    Returns documents that contain a specific prefix in a provided field.
tabs:
- id: ub8xn2o4jvwx
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- id: panax1eiq6jg
  title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- id: jem3b7qypfel
  title: Terminal
  type: terminal
  hostname: host-1
- id: ysbgn3f2pyag
  title: Dataset
  type: service
  hostname: host-1
  path: /dataset.html
  port: 8000
difficulty: ""
enhanced_loading: null
---

# Prefix Query Lab

Welcome to the interactive Prefix Query lab! This lab teaches you how to use the prefix_query query in Elasticsearch.

## Overview

Returns documents that contain a specific prefix in a provided field.

## What You'll Learn

- How to construct prefix_query queries
- Understanding query parameters and options
- How to interpret search results
- Best practices for using prefix_query queries

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

This lab includes 6 examples demonstrating different aspects of the prefix_query query:


### Find Products by Name Prefix
Search for products where the name starts with 'wire'.


**Try This:**

- Change the prefix value to 'lap' to find laptop-related products.

- Try searching with 'head' to find products like headphones.




### Find Products by Description Prefix
Search for products where the description starts with 'premium'.


**Try This:**

- Change the prefix to 'durable' to find products described as durable.

- Test with 'light' to find products with lightweight descriptions.




### Find Reviews by Title Prefix
Search for reviews where the title starts with 'great'.


**Try This:**

- Change the prefix to 'amazing' to find reviews with titles starting with 'amazing'.

- Use 'good' to find reviews with a positive title prefix.




### Find Reviews by Text Prefix
Search for reviews where the text starts with 'easy'.


**Try This:**

- Change the prefix to 'comfortable' to find reviews talking about comfort.

- Try 'durable' to locate reviews mentioning durability.




### Find Users by Username Prefix
Search for users whose username starts with 'Cam'.


**Try This:**

- Change the prefix to 'Ave' to search for usernames beginning with 'Ave'.

- Try 'Dak' to find usernames that start with 'Dak'.




### Find Users by Interest Prefix
Search for users whose interests start with 'Elect'.


**Try This:**

- Change the prefix to 'Books' to find users interested in books.

- Try 'Sports' to locate users interested in sports activities.





## Getting Started

1. Review the first example query
2. Click "Run Query" to see the results
3. Try modifying the query to see how results change
4. Explore the other examples to learn different features
5. Use the "Try This" suggestions to experiment further

## View Official Documentation

For complete documentation, visit: https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-prefix-query

## Need Help?

- Check the "Dataset" tab for information about available fields
- Use the "Why?" button on results to understand matching
- Review the "Tokens" tab to see how your query is analyzed

Happy querying!
