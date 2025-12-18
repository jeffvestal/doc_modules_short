---
slug: challenge
id: match-query-challenge-001
type: challenge
title: Match Query Challenge
teaser: Write a match query to find reviews matching specific criteria
tabs:
- id: lab-ui
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- title: Terminal
  type: terminal
  hostname: host-1
difficulty: basic
timelimit: 300
enhanced_loading: null
---

# Challenge: Write a Match Query

Your goal is to write a **match query** that finds product reviews mentioning "waterproof" in the review text.

## Requirements

Your query must:
1. Use the `match` query type
2. Search in the `review_text` field
3. Find reviews containing the word "waterproof"

## Steps

1. In the [button label="Query Lab"](tab-0) tab, you'll see an empty query template
2. Write your match query in the editor
3. Click **"Run Query"** to see the results
4. Click **"Validate Query"** to check if your query meets the requirements

## Hints

- The basic structure is: `{"query": {"match": {"field": "search text"}}}`
- Make sure to use the `review_text` field
- The match query will analyze "waterproof" and find it even if it appears as part of other words

## Validation

Click the **"Validate Query"** button to check:
- ✅ Your query uses the `match` query type
- ✅ Your query searches the `review_text` field
- ✅ Your query returns the expected results

Good luck!

