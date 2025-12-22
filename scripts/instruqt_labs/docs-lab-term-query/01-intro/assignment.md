# Term Query Lab

Welcome to the interactive Term Query lab! This lab teaches you how to use the term_query query in Elasticsearch.

## Overview

Returns documents that contain an exact term in a provided field. You can use the `term` query to find documents based on a precise value such as a price, a product ID, or a username.

## What You'll Learn

- How to construct term_query queries
- Understanding query parameters and options
- How to interpret search results
- Best practices for using term_query queries

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

This lab includes 6 examples demonstrating different aspects of the term_query query:


### Exact Match on Product ID
Find a product with a specific product ID. The term query searches for an exact match and is case-sensitive.


**Try This:**

- Change the product_id value to another ID to find a different product.

- Try a non-existent product_id and observe the result.




### Exact Match on Product Category
Find all products that belong to the 'Electronics' category. Use the term query for precise filtering.


**Try This:**

- Change the value to 'Clothing' or another category.

- Add more categories to your dataset and test their exact matches.




### Exact Match on Review Rating
Retrieve all reviews with a specific rating. Use this query to find reviews with a precise numeric value.


**Try This:**

- Change the rating value to 4 or 3 to find reviews with different ratings.

- Test with a rating value that doesn't exist (e.g., 7) and observe the empty result.




### Exact Match on Username
Find a user by their username. This query matches users with an exact username value.


**Try This:**

- Change the username value to another user in the dataset.

- Try searching for a username that doesn't exist and observe the result.




### Exact Match on Verified Purchase
Retrieve all reviews marked as verified purchases. This query uses a boolean field to filter results.


**Try This:**

- Change the value to false to find reviews that are not verified purchases.

- Test with other boolean fields in your dataset.




### Exact Match on Product Price
Find products with an exact price. Note that the term query is effective for precise values like numbers.


**Try This:**

- Change the price value to a different number.

- Test with a price that doesn't exist in the dataset.





## Getting Started

1. Review the first example query
2. Click "Run Query" to see the results
3. Try modifying the query to see how results change
4. Explore the other examples to learn different features
5. Use the "Try This" suggestions to experiment further

## View Official Documentation

For complete documentation, visit: https://elastic.co/docs/reference/query-languages/query-dsl/query-dsl-term-query

## Need Help?

- Check the "Dataset" tab for information about available fields
- Use the "Why?" button on results to understand matching
- Review the "Tokens" tab to see how your query is analyzed

Happy querying!
