# Fuzzy Query Lab

Welcome to the interactive Fuzzy Query lab! This lab teaches you how to use the fuzzy_query query in Elasticsearch.

## Overview

Returns documents that contain terms similar to the search term, as measured by a Levenshtein edit distance. An edit distance is the number of one-character changes needed to turn one term into another. These changes can include: - Changing a character (box → fox) - Removing a character (black → lack) - Inserting a character (sic → sick) - Transposing two adjacent characters (act → cat)

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

This lab includes 5 examples demonstrating different aspects of the fuzzy_query query:


### Find products with similar names
Search for products with names similar to 'wireles' to account for possible misspellings or typos.


**Try This:**

- Change "wireles" to "wirles" and observe the results.

- Adjust the fuzziness parameter to 1 and rerun the query.




### Search for reviews with similar titles
Search for reviews with titles that closely match 'comfrtable'.


**Try This:**

- Increase the prefix_length to 3 and check how it impacts the results.

- Switch fuzziness to 'AUTO' and compare the output.




### Locate users with similar interests
Search for users whose interests are similar to 'Electonic'.


**Try This:**

- Reduce max_expansions to 10 and observe the narrower results.

- Search for 'Electronix' instead of 'Electonic'.




### Find products with similar descriptions
Search for products with descriptions close to 'premum wireless'.


**Try This:**

- Change 'premum wireless' to 'premium wireles' and rerun the query.

- Increase fuzziness to 2 and compare the results.




### Match reviews with similar text
Search for reviews with text resembling 'durabl and comfortabl'.


**Try This:**

- Replace 'durabl and comfortabl' with 'durable comfort' and observe the behavior.

- Test with fuzziness set to 1 for stricter matching.





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
