# Fuzzy Query Lab

Welcome to the interactive Fuzzy Query lab! This lab teaches you how to use the fuzzy_query query in Elasticsearch.

## Overview

Returns documents that contain terms similar to the search term, as measured by a Levenshtein edit distance. An edit distance is the number of one-character changes needed to turn one term into another. These changes can include: - Changing a character (box → fox) - Removing a character (black → lack) - Inserting a character (sic → sick) - Transposing two adjacent characters (act → cat).

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


### Basic Fuzzy Query
Search for documents with terms similar to the specified value using default fuzziness settings.


**Try This:**

- Change the value to 'premium' or 'wireless' to see different results.

- Try using shorter or longer terms to observe how fuzziness impacts matches.




### Fuzziness Auto Setting
Use the 'AUTO' fuzziness setting to dynamically adjust edit distance based on the length of the input term.


**Try This:**

- Change the value to 'durble' or 'comfortable' and observe the results.

- Try changing fuzziness to a number like 1 or 2 for custom edit distance.




### Prefix Length
Specify the number of initial characters that must match exactly. This can help narrow down results.


**Try This:**

- Change prefix_length to 1 or 3 and observe the impact on matching.

- Try searching for shorter terms and adjust prefix_length accordingly.




### Max Expansions
Limit the number of variations generated for fuzzy matching. This can improve performance for large datasets.


**Try This:**

- Change max_expansions to a lower value like 10 or a higher value like 100.

- Try searching for broader interests like 'Books' and observe the difference.




### Handle Transpositions
Enable transpositions to match terms where two adjacent characters are swapped.


**Try This:**

- Disable transpositions and see if the results change.

- Try searching for terms with swapped characters, like 'comfrtable' instead of 'comfortable'.





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
