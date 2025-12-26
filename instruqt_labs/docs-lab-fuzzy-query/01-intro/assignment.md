---
slug: intro
id: placeholder-fuzzyquery
type: challenge
title: Fuzzy Query Lab
teaser: Learn how to use the fuzzy_query query in Elasticsearch
tabs:
- id: tab-querylab-fuzzyquery
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- id: tab-querylabfull-fuzzyquery
  title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- id: tab-terminal-fuzzyquery
  title: Terminal
  type: terminal
  hostname: host-1
- id: tab-dataset-fuzzyquery
  title: Dataset
  type: service
  hostname: host-1
  path: /dataset.html
  port: 8000
notes:
- type: text
  contents: |
    # Fuzzy Query Lab
    
    Welcome to the interactive lab for the fuzzy_query query!
    
    Returns documents that contain terms similar to the search term, as measured by a Levenshtein edit distance. An edit distance is the number of one-character changes needed to turn one term into another. These changes can include: - Changing a character (box → fox) - Removing a character (black → lack) - Inserting a character (sic → sick) - Transposing two adjacent characters (act → cat)
---

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


### Find similar product names
Search for products where the name is similar to 'wireles' using automatic fuzziness.


**Try This:**

- Try changing 'wireles' to 'wirless' or 'wireless' to see how fuzziness impacts results.




### Match product descriptions with limited fuzziness
Search for products with descriptions similar to 'premum' allowing up to 1 edit distance.


**Try This:**

- Experiment with 'premum' and 'premium' to see if results differ when fuzziness is set to 1.




### Find similar review texts
Search for reviews with text similar to 'durabl' allowing up to 2 edit distances.


**Try This:**

- Try changing 'durabl' to 'durable' or 'durablity' and compare the results.




### Prefix matching for user interests
Search for users with interests similar to 'electroncs' requiring a prefix length of 2.


**Try This:**

- Test with 'electroncs' and see the effect of different prefix lengths like 0 or 3.




### Find verified reviews with fuzzy matching
Search for verified reviews with titles similar to 'comfrtable' allowing automatic fuzziness.


**Try This:**

- Modify 'comfrtable' to 'comfortable' or 'comfrtble' and observe the results.





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
