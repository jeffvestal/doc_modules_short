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

This lab includes 6 examples demonstrating different aspects of the fuzzy_query query:


### Find similar product names
Search for products where the name is similar to 'wireless'.


**Try This:**

- Change the search term to 'premium' or 'audio' to explore other matches.

- Set 'fuzziness' to 'AUTO' for automatic adjustments.




### Search for reviews with similar titles
Find reviews with titles similar to 'comfortable'.


**Try This:**

- Try searching for 'durable' or 'reliable' to see other similar matches.

- Adjust 'fuzziness' to 2 for stricter matching.




### Search usernames with prefix matching
Find users with usernames similar to 'Dakota' but require a prefix match of at least 2 characters.


**Try This:**

- Change the search term to 'Jordan' or 'Avery' for other matches.

- Increase 'prefix_length' to ensure stricter matches.




### Search product descriptions for similar terms
Find products with descriptions similar to 'kitchen'.


**Try This:**

- Try searching for 'home' or 'cook' for other relevant results.

- Adjust 'fuzziness' to 2 for broader matches.




### Find reviews with transposed characters
Search for reviews containing terms similar to 'reliable' but allow transpositions.


**Try This:**

- Change the term to 'comfortable' or 'durable' to explore other matches.

- Set 'transpositions' to false to disable adjacent character swaps.




### Search user interests with limited expansions
Find users with interests similar to 'Books' but limit the number of expansions.


**Try This:**

- Change the search term to 'Electronics' or 'Sports' to explore other interests.

- Increase 'max_expansions' for broader results.





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
