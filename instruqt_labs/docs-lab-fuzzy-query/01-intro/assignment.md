# Fuzzy Query Lab

Welcome to the interactive Fuzzy Query lab! This lab teaches you how to use the fuzzy_query query in Elasticsearch.

## Overview

Returns documents that contain terms similar to the search term, as measured by a Levenshtein edit distance.

## What You'll Learn

- How to construct fuzzy_query queries
- Understanding query parameters and options
- How to interpret search results
- Best practices for using fuzzy_query queries

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

This lab includes 6 examples demonstrating different aspects of the fuzzy_query query:


### Find similar product names
Search for products with names similar to 'wireles' to catch spelling variations.


**Try This:**

- Try searching for similar terms like 'premum' or 'luxry'.




### Match review titles with typos
Find reviews with titles similar to 'comforable', accounting for spelling errors.


**Try This:**

- Try searching for 'qulity' or 'durable'.




### Fuzzy match user interests
Find users with interests similar to 'Electonics', allowing for minor spelling errors.


**Try This:**

- Search for terms like 'Books' or 'Musics'.




### Find products with prefix matching
Search for products with names starting with 'lux' and allow minor misspellings.


**Try This:**

- Search for terms like 'pre' or 'qual'.




### Review text with transpositions
Find reviews with text similar to 'durbale', correcting swapped characters.


**Try This:**

- Search for terms like 'comfrotable' or 'practical'.




### Limit fuzzy search expansions
Search for users with interests similar to 'Books', limiting the number of matched terms.


**Try This:**

- Try increasing max_expansions to see more matches.





## Getting Started

1. Review the first example query
2. Click "Run Query" to see the results
3. Try modifying the query to see how results change
4. Explore the other examples to learn different features
5. Use the "Try This" suggestions to experiment further

## View Official Documentation

For complete documentation, visit: https://elastic.co/docs/reference/query-languages/query-dsl/query-dsl-fuzzy-query

## Need Help?

- Check the "Dataset" tab for information about available fields
- Use the "Why?" button on results to understand matching
- Review the "Tokens" tab to see how your query is analyzed

Happy querying!
