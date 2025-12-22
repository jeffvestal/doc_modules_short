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

This lab includes 6 examples demonstrating different aspects of the range_query query:


### Basic Range Query
Find products within a specific price range.


**Try This:**

- Change the price range to [50 TO 200] and see the updated results.

- Try setting only a minimum price using 'gte'.




### Date Range Query
Retrieve reviews written within a specific date range.


**Try This:**

- Change the date range to only include reviews from the last month.

- Use 'now-7d/d' as the start date to see reviews from the last 7 days.




### Boosted Range Query
Boost the relevance of documents within a specific range.


**Try This:**

- Change the 'boost' value to 3.0 and observe the effect on relevance scores.

- Try removing the 'boost' parameter and compare the results.




### Range Query with Time Zone
Consider a specific time zone when querying date ranges.


**Try This:**

- Change the time zone to '-05:00' and examine the results.

- Try adjusting the date range to include an earlier month.




### Exclusive Range Query
Use exclusive boundaries in the range query.


**Try This:**

- Change the boundaries to include exact matches using 'gte' and 'lte'.

- Experiment with ratings below 3 or above 4.5.




### Range Query on Multiple Fields
Filter users by age group and trust score.


**Try This:**

- Change the age range to 18-30 and trust score to 50-100.

- Try using only one range filter instead of two.





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
