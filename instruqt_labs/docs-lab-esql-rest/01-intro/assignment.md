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

This lab includes 5 examples demonstrating different aspects of the esql_rest query:


### Filter products by category and sort by price
Retrieve all products from the 'Electronics' category, keep only the product name and price, and sort by price in descending order.


**Try This:**

- Change the category to 'Home Appliances' or another category and see the results.




### Find top-rated reviews for durable products
Search product reviews containing the word 'durable', keep the review title and rating, and sort by rating in descending order.


**Try This:**

- Change the keyword to 'lightweight' or another product feature to explore different reviews.




### Identify active users interested in Electronics
List users interested in Electronics, showing their username and total reviews count.


**Try This:**

- Modify the interest keyword to 'Books' or 'Sports' to see users with different interests.




### Explore helpful product reviews
Retrieve reviews with more than 50 helpful votes, sorted by the highest number of votes.


**Try This:**

- Adjust the threshold for helpful votes to 30 or 100 to see different sets of reviews.




### Analyze product pricing trends
Retrieve products from a specific brand, showing their name, category, and price, sorted by price in ascending order.


**Try This:**

- Replace 'BrandX' with another brand to analyze pricing trends for different brands.





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
