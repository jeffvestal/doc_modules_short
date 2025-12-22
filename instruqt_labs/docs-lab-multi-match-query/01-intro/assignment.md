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

This lab includes 5 examples demonstrating different aspects of the multi_match_query query:


### Basic multi-match query
Search for products with 'wireless headphones' in the name or description.


**Try This:**

- Try changing the query to 'premium speakers' or adding another field like 'product_category' to the fields list.




### Best fields type
Search product reviews where 'durable' matches the best fields.


**Try This:**

- Try changing the type to 'most_fields' or modifying the query to 'comfortable'.




### Phrase prefix type
Search for reviews with text phrases starting with 'quick brown'.


**Try This:**

- Experiment with other prefixes like 'comfortable chair' or 'high quality'.




### Cross fields type
Search for users interested in 'Electronics' across multiple fields.


**Try This:**

- Add another query term like 'Books' or use 'Electronics' with a different type, such as 'best_fields'.




### Tie breaker parameter
Use a tie breaker to balance scores across fields when searching for 'wireless'.


**Try This:**

- Try adjusting the tie breaker value or changing the query term to 'Bluetooth'.





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
