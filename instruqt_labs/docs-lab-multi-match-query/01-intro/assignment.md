# Multi-match Query Lab

Welcome to the interactive Multi-match Query lab! This lab teaches you how to use the multi_match_query query in Elasticsearch.

## Overview

The `multi_match` query builds on the `match` query to allow multi-field queries.

## What You'll Learn

- How to construct multi_match_query queries
- Understanding query parameters and options
- How to interpret search results
- Best practices for using multi_match_query queries

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

This lab includes 6 examples demonstrating different aspects of the multi_match_query query:


### Search product by name and description
Find products that match the query 'wireless' in both the name and description fields.


**Try This:**

- Try searching for 'premium' or 'Bluetooth' to explore the results for different keywords.




### Search reviews with boosted fields
Prioritize matches in the review title field over the review text field using field boosting.


**Try This:**

- Experiment with boosting other fields, such as 'review_text^3'.




### Search users based on interests
Find users with interests containing the keyword 'Electronics'.


**Try This:**

- Try searching for interests like 'Books' or 'Gaming'.




### Cross-fields search with AND operator
Perform a cross-fields search requiring all terms in the query 'durable comfortable' to match.


**Try This:**

- Use 'or' as the operator to allow partial matches.




### Phrase prefix search for products
Search for products where the name or description starts with 'wire'.


**Try This:**

- Try searching for prefixes like 'blue' or 'smart'.




### Most fields query for products
Find products where the query 'premium wireless' matches the most fields.


**Try This:**

- Test multi-field queries such as 'Bluetooth headphones' or 'durable stylish'.





## Getting Started

1. Review the first example query
2. Click "Run Query" to see the results
3. Try modifying the query to see how results change
4. Explore the other examples to learn different features
5. Use the "Try This" suggestions to experiment further

## View Official Documentation

For complete documentation, visit: https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-multi-match-query

## Need Help?

- Check the "Dataset" tab for information about available fields
- Use the "Why?" button on results to understand matching
- Review the "Tokens" tab to see how your query is analyzed

Happy querying!
