---
slug: intro
id: placeholder-matchquery
type: challenge
title: Match Query Lab
teaser: Learn how to use the match_query query in Elasticsearch
tabs:
- id: tab-querylab-matchquery
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- id: tab-querylabfull-matchquery
  title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- id: tab-terminal-matchquery
  title: Terminal
  type: terminal
  hostname: host-1
- id: tab-dataset-matchquery
  title: Dataset
  type: service
  hostname: host-1
  path: /dataset.html
  port: 8000
notes:
- type: text
  contents: |
    # Match Query Lab
    
    Welcome to the interactive lab for the match_query query!
    
    Returns documents that match a provided text, number, date or boolean value. The provided text is analyzed before matching. The `match` query is the standard query for performing a full-text search, including options for fuzzy matching. `Match` will also work against semantic_text fields. As `semantic_text` does not support lexical text search, `match` queries against `semantic_text` fields will automatically perform the correct semantic search. Because of this, options that specifically target lexical search such as `fuzziness` or `analyzer` will be ignored.
---

# Match Query Lab

Welcome to the interactive Match Query lab! This lab teaches you how to use the match_query query in Elasticsearch.

## Overview

Returns documents that match a provided text, number, date or boolean value. The provided text is analyzed before matching. The `match` query is the standard query for performing a full-text search, including options for fuzzy matching. `Match` will also work against semantic_text fields. As `semantic_text` does not support lexical text search, `match` queries against `semantic_text` fields will automatically perform the correct semantic search. Because of this, options that specifically target lexical search such as `fuzziness` or `analyzer` will be ignored.

## What You'll Learn

- How to construct match_query queries
- Understanding query parameters and options
- How to interpret search results
- Best practices for using match_query queries

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

This lab includes 6 examples demonstrating different aspects of the match_query query:


### Basic match query on product name
Search for products with the term 'wireless' in the product name.


**Try This:**

- Modify the query to search for a different term like 'premium' or 'durable'.

- Change the field to 'product_description' to search within product descriptions instead.




### Match query with operator
Search for reviews containing both 'comfortable' and 'durable' in the review text.


**Try This:**

- Change the operator to 'or' to return reviews containing either 'comfortable' or 'durable'.

- Search for other terms in the 'review_text' field, like 'stylish' or 'lightweight'.




### Match query with fuzziness
Search for products with a term similar to 'wirless' in the product description using fuzzy matching.


**Try This:**

- Try misspelling other terms to see how the fuzziness parameter handles them.

- Change the field to 'product_name' and search for a similar term.




### Match query with zero_terms_query
Search for reviews with 'great product' in the text. If no terms match, return all documents.


**Try This:**

- Change the query to see how it behaves with different terms.

- Set 'zero_terms_query' to 'none' to exclude documents when no terms match.




### Match query with auto_generate_synonyms_phrase_query
Search for users interested in 'sports equipment' without expanding synonyms.


**Try This:**

- Set 'auto_generate_synonyms_phrase_query' to true to see how synonyms are expanded.

- Change the field to search for interests like 'technology' or 'cooking'.




### Match query with semantic text
Search for products semantically related to 'wireless headphones' in the product description.


**Try This:**

- Modify the query to search for other phrases like 'noise cancelling headphones' or 'portable speakers'.

- Change the field to 'product_name' and adjust the query accordingly.





## Getting Started

1. Review the first example query
2. Click "Run Query" to see the results
3. Try modifying the query to see how results change
4. Explore the other examples to learn different features
5. Use the "Try This" suggestions to experiment further

## View Official Documentation

For complete documentation, visit: https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-match-query

## Need Help?

- Check the "Dataset" tab for information about available fields
- Use the "Why?" button on results to understand matching
- Review the "Tokens" tab to see how your query is analyzed

Happy querying!
