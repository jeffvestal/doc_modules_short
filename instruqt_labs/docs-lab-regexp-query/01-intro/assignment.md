---
slug: intro
id: z3bg3ugsxeah
type: challenge
title: Regexp Query Lab
teaser: Learn how to use the regexp_query query in Elasticsearch
notes:
- type: text
  contents: |
    # Regexp Query Lab

    Welcome to the interactive lab for the regexp_query query!

    Returns documents that contain terms matching a [regular expression](https://en.wikipedia.org/wiki/Regular_expression). A regular expression is a way to match patterns in data using placeholder characters, called operators. For a list of operators supported by the `regexp` query, see [Regular expression syntax](https://www.elastic.co/docs/reference/query-languages/query-dsl/regexp-syntax).
tabs:
- id: nvybo6jvf8se
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- id: uxo98v3ii4mj
  title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- id: tsmsyl0acdua
  title: Terminal
  type: terminal
  hostname: host-1
- id: y93vygw1wag1
  title: Dataset
  type: service
  hostname: host-1
  path: /dataset.html
  port: 8000
difficulty: ""
enhanced_loading: null
---

# Regexp Query Lab

Welcome to the interactive Regexp Query lab! This lab teaches you how to use the regexp_query query in Elasticsearch.

## Overview

Returns documents that contain terms matching a [regular expression](https://en.wikipedia.org/wiki/Regular_expression). A regular expression is a way to match patterns in data using placeholder characters, called operators. For a list of operators supported by the `regexp` query, see [Regular expression syntax](https://www.elastic.co/docs/reference/query-languages/query-dsl/regexp-syntax).

## What You'll Learn

- How to construct regexp_query queries
- Understanding query parameters and options
- How to interpret search results
- Best practices for using regexp_query queries

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

This lab includes 4 examples demonstrating different aspects of the regexp_query query:


### Find reviews with titles matching a specific pattern
Search for reviews where the title contains variations of the word 'great', such as 'great', 'greater', or 'greatest'.


**Try This:**

- Try changing the pattern to match other variations, such as 'good' or 'better'.




### Search for users with specific interests
Find users whose interests start with the letter 'E' and end with 'ics', such as 'Electronics'.


**Try This:**

- Try searching for interests starting with other letters or ending in different patterns.




### Search for reviews mentioning helpful hints
Find reviews where the text contains the word 'help' followed by any characters and ending with 'ful'.


**Try This:**

- Modify the regex to match other terms like 'useful' or 'beneficial'.




### Find users with specific usernames
Search for usernames starting with 'Cam' and ending with '20'.


**Try This:**

- Change the regex to find other usernames, such as those starting with 'Jor' or ending with '33'.





## Getting Started

1. Review the first example query
2. Click "Run Query" to see the results
3. Try modifying the query to see how results change
4. Explore the other examples to learn different features
5. Use the "Try This" suggestions to experiment further

## View Official Documentation

For complete documentation, visit: https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-regexp-query

## Need Help?

- Check the "Dataset" tab for information about available fields
- Use the "Why?" button on results to understand matching
- Review the "Tokens" tab to see how your query is analyzed

Happy querying!
