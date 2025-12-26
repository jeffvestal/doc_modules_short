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
    
    Returns documents that contain terms similar to the search term, as measured by a Levenshtein edit distance. An edit distance is the number of one-character changes needed to turn one term into another.
---

# Fuzzy Query Lab

Welcome to the interactive Fuzzy Query lab! This lab teaches you how to use the fuzzy_query query in Elasticsearch.

## Overview

Returns documents that contain terms similar to the search term, as measured by a Levenshtein edit distance. An edit distance is the number of one-character changes needed to turn one term into another.

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


### Search for similar product names
Find products with names similar to 'wireles' using automatic fuzziness adjustment.


**Try This:**

- Try changing the value to 'wirless' or 'wirleess' to observe how fuzziness impacts results.




### Find reviews with similar titles
Search for reviews with titles similar to 'comfotable' and require at least 2 matching prefix characters.


**Try This:**

- Try adjusting the prefix_length to 0 or 3 to see how it affects the results.




### Search user interests with fuzziness level 2
Find users with interests matching terms similar to 'electronic' with a fuzziness level of 2.


**Try This:**

- Try changing the fuzziness to 'AUTO' or 1 to see how it impacts the results.




### Find products with brand name typos
Search for products with brand names similar to 'AudioMx' using fuzziness.


**Try This:**

- Try changing the value to 'AudioMaxx' or 'AudMax' to test different levels of fuzziness.




### Find reviews with text typos
Search for reviews with text matching terms similar to 'durabe' using fuzziness.


**Try This:**

- Try turning transpositions off or setting fuzziness to 1 to compare results.





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
