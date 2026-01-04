---
slug: intro
id: placeholder-existsquery
type: challenge
title: Exists Query Lab
teaser: Learn how to use the exists_query query in Elasticsearch
tabs:
- id: tab-querylab-existsquery
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- id: tab-querylabfull-existsquery
  title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- id: tab-terminal-existsquery
  title: Terminal
  type: terminal
  hostname: host-1
- id: tab-dataset-existsquery
  title: Dataset
  type: service
  hostname: host-1
  path: /dataset.html
  port: 8000
notes:
- type: text
  contents: |
    # Exists Query Lab
    
    Welcome to the interactive lab for the exists_query query!
    
    Returns documents that contain an indexed value for a field. An indexed value may not exist for a document’s field due to a variety of reasons: - The field in the source JSON is `null` or `[]` - The field has `"index" : false` and `"doc_values" : false` set in the mapping - The length of the field value exceeded an `ignore_above` setting in the mapping - The field value was malformed and `ignore_malformed` was defined in the mapping
---

# Exists Query Lab

Welcome to the interactive Exists Query lab! This lab teaches you how to use the exists_query query in Elasticsearch.

## Overview

Returns documents that contain an indexed value for a field. An indexed value may not exist for a document’s field due to a variety of reasons: - The field in the source JSON is `null` or `[]` - The field has `"index" : false` and `"doc_values" : false` set in the mapping - The length of the field value exceeded an `ignore_above` setting in the mapping - The field value was malformed and `ignore_malformed` was defined in the mapping

## What You'll Learn

- How to construct exists_query queries
- Understanding query parameters and options
- How to interpret search results
- Best practices for using exists_query queries

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

This lab includes 5 examples demonstrating different aspects of the exists_query query:


### Find products with a description
This query retrieves products that have a value in the `product_description` field.


**Try This:**

- Try changing `product_description` to `product_category` to check for indexed categories.




### Identify reviews with a rating
This query retrieves reviews that have a value in the `review_rating` field.


**Try This:**

- Try changing `review_rating` to `verified_purchase` to find reviews with verified purchase information.




### Find users with a username
This query retrieves users that have a value in the `username` field.


**Try This:**

- Try changing `username` to `email` to locate users with an email address indexed.




### Find reviews with helpful votes
This query retrieves reviews that have a value in the `helpful_votes` field.


**Try This:**

- Try changing `helpful_votes` to `review_text` to retrieve reviews with text content.




### Find users with a trust score
This query retrieves users that have a value in the `trust_score` field.


**Try This:**

- Try changing `trust_score` to `location_city` to find users with a city indexed.





## Getting Started

1. Review the first example query
2. Click "Run Query" to see the results
3. Try modifying the query to see how results change
4. Explore the other examples to learn different features
5. Use the "Try This" suggestions to experiment further

## View Official Documentation

For complete documentation, visit: https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-exists-query

## Need Help?

- Check the "Dataset" tab for information about available fields
- Use the "Why?" button on results to understand matching
- Review the "Tokens" tab to see how your query is analyzed

Happy querying!
