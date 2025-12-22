# Range Query Lab

Welcome to the interactive Range Query lab! This lab teaches you how to use the range_query query in Elasticsearch.

## Overview

Returns documents that contain terms within a provided range.

## What You'll Learn

- How to construct range_query queries
- Understanding query parameters and options
- How to interpret search results
- Best practices for using range_query queries

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

This lab includes 5 examples demonstrating different aspects of the range_query query:


### Filter products within a price range
Retrieve products priced between $50 and $200.


**Try This:**

- Modify the price range to search for luxury products above $500.




### Filter reviews with high ratings
Retrieve reviews with ratings greater than 3 and up to 5.


**Try This:**

- Change the range to find reviews with low or average ratings (e.g., 1 to 3).




### Find users who joined within a specific time frame
Retrieve users who became members between 2015 and 2022.


**Try This:**

- Adjust the date range to find users who joined more recently (e.g., after 2020).




### Filter products by price and boost results
Retrieve products priced under $100 and boost their relevance by a factor of 2.


**Try This:**

- Experiment with different boost values to alter the relevance of results.




### Filter reviews by date range
Retrieve reviews posted within the last 7 days.


**Try This:**

- Extend the date range to retrieve reviews from the last 30 days.





## Getting Started

1. Review the first example query
2. Click "Run Query" to see the results
3. Try modifying the query to see how results change
4. Explore the other examples to learn different features
5. Use the "Try This" suggestions to experiment further

## View Official Documentation

For complete documentation, visit: https://elastic.co/docs/reference/query-languages/query-dsl/query-dsl-range-query

## Need Help?

- Check the "Dataset" tab for information about available fields
- Use the "Why?" button on results to understand matching
- Review the "Tokens" tab to see how your query is analyzed

Happy querying!
