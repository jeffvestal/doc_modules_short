---
slug: intro
id: qmp88lp7opnk
type: challenge
title: ES|QL Query Lab
teaser: Learn how to use the esql_rest query in Elasticsearch
notes:
- type: text
  contents: |
    # ES|QL Query Lab

    Welcome to the interactive lab for the esql_rest query!

    The [Search and filter with ES|QL](https://www.elastic.co/docs/reference/query-languages/esql/esql-search-tutorial) tutorial provides a hands-on introduction to the ES|QL `_query` API.
tabs:
- id: 1sg1yogpp9gv
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- id: dksxamsxxy0t
  title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- id: 8soliwjziqwn
  title: Terminal
  type: terminal
  hostname: host-1
- id: 4yuatdkpwpf9
  title: Dataset
  type: service
  hostname: host-1
  path: /dataset.html
  port: 8000
difficulty: ""
enhanced_loading: null
---

# ES|QL Query Lab

Welcome to the interactive ES|QL Query lab! This lab teaches you how to use the esql_rest query in Elasticsearch.

## Overview

The [Search and filter with ES|QL](https://www.elastic.co/docs/reference/query-languages/esql/esql-search-tutorial) tutorial provides a hands-on introduction to the ES|QL `_query` API.

## What You'll Learn

- How to construct esql_rest queries
- Understanding query parameters and options
- How to interpret search results
- Best practices for using esql_rest queries

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

This lab includes 6 examples demonstrating different aspects of the esql_rest query:


### Filter products by description
Find products with 'wireless' in their description and limit the results to 10.


**Try This:**

- Change the keyword from 'wireless' to another term like 'portable'.

- Try increasing the LIMIT to 20 to view more results.




### Sort products by price
Retrieve premium products and display their name and price, sorted by price in descending order.


**Try This:**

- Modify the SORT direction to ascending (ASC) to see the cheapest premium products first.

- Add a LIMIT clause to display only the top 5 results.




### Find highly rated reviews
Search for product reviews that mention 'durable' or 'comfortable' and display the title and rating, sorted by rating in descending order.


**Try This:**

- Replace 'durable' with another term such as 'sturdy'.

- Add a LIMIT clause to return only the top 5 results.




### Find users interested in Electronics
Retrieve users whose interests include 'Electronics' and limit the results to 10.


**Try This:**

- Change the keyword from 'Electronics' to another interest, such as 'Books'.

- Remove the LIMIT clause to return all matching users.




### Analyze verified purchases
Retrieve only verified purchases from reviews and sort them by the number of helpful votes in descending order.


**Try This:**

- Change the SORT direction to ascending (ASC) to see the least helpful reviews first.

- Add a LIMIT clause to display only the top 5 results.




### Find users by account type
Retrieve usernames of users with a 'Premium' account and display only their username.


**Try This:**

- Change 'Premium' to 'Free' or 'Enterprise' to see other account types.

- Add a LIMIT clause to only return a specific number of results.





## Getting Started

1. Review the first example query
2. Click "Run Query" to see the results
3. Try modifying the query to see how results change
4. Explore the other examples to learn different features
5. Use the "Try This" suggestions to experiment further

## View Official Documentation

For complete documentation, visit: https://www.elastic.co/docs/reference/query-languages/esql/esql-rest

## Need Help?

- Check the "Dataset" tab for information about available fields
- Use the "Why?" button on results to understand matching
- Review the "Tokens" tab to see how your query is analyzed

Happy querying!
