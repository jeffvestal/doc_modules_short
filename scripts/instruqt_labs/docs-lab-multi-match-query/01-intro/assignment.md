# Multi-match Query Lab

Welcome to the interactive Multi-match Query lab! This lab teaches you how to use the multi_match_query query in Elasticsearch.

## Overview

The `multi_match` query builds on the [`match` query](https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-match-query) to allow multi-field queries.

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


### Basic Multi-match Query
Search across multiple fields to find matching documents. Here, the query searches across product name and description.


**Try This:**

- Try changing the query to 'budget wireless' and see how the results change.

- Add more fields like 'product_category' to broaden the search.




### Weighted Fields
Apply different importance (boosting) to fields in the query. Here, the product name is prioritized over the description.


**Try This:**

- Change the boost value for 'product_name' to 5 and observe how results change.

- Add a third field with a lower boost value to refine the query.




### Best Fields Query Type
Use 'best_fields' type to return documents that match the best single field. This is useful for finding the most relevant match across fields.


**Try This:**

- Change the tie_breaker value to 0.1 and see how it affects scoring.

- Switch type to 'most_fields' to consider cumulative matches across fields.




### Phrase Prefix Matching
Search for phrases with prefix matching. This is helpful for autocomplete-like searches.


**Try This:**

- Change the query to 'quick br' to test prefix matching.

- Add additional fields like 'review_rating' for experiments.




### Cross Fields Query Type
Combine text from multiple fields as if it were a single field. Useful for matching across semantically related fields.


**Try This:**

- Change the query to 'Movies Music' and observe the results.

- Add more fields like 'occupation' to test cross-field matching.




### Most Fields Query Type
Match across multiple fields and score based on cumulative matches. This is useful for ensuring all relevant information is considered.


**Try This:**

- Change the query to include synonyms like 'soft' or 'long-lasting'.

- Test the same query with 'best_fields' type for comparison.





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
