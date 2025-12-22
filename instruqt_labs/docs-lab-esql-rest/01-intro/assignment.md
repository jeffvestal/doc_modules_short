# ES|QL Query Lab

Welcome to the interactive ES|QL Query lab! This lab teaches you how to use the esql_rest query in Elasticsearch.

## Overview

<tip> The [Search and filter with ES|QL](https://www.elastic.co/docs/reference/query-languages/esql/esql-search-tutorial) tutorial provides a hands-on introduction to the ES|QL `_query` API. </tip>

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

This lab includes 5 examples demonstrating different aspects of the esql_rest query:


### Filter products by keyword
Find products that contain the word 'wireless' in their descriptions.


**Try This:**

- Change 'wireless' to another keyword, such as 'portable'.

- Add a SORT clause to order the results by product price.




### Sort products by price
List premium products sorted by price in descending order.


**Try This:**

- Change the number of results by modifying the LIMIT value.

- Try sorting in ascending order by replacing DESC with ASC.




### Search for comfortable reviews
Find reviews that mention the word 'comfortable'.


**Try This:**

- Search for a different keyword, such as 'durable'.

- Add a SORT clause to order results by review rating.




### Identify top reviewers
Find users who are interested in electronics and limit the results to verified purchasers.


**Try This:**

- Change the interest to 'Books' to find users interested in books.

- Remove the verified_purchaser condition to include all users.




### Top helpful reviews
Find reviews with the highest number of helpful votes.


**Try This:**

- Increase the LIMIT to display more results.

- Add a WHERE clause to filter reviews with a minimum number of helpful votes.





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
