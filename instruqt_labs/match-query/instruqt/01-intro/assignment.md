---
slug: intro
id: match-query-intro-001
type: challenge
title: Understanding the Match Query
teaser: Learn how the match query analyzes and searches text
tabs:
  - id: lab-ui
    title: Query Lab
    type: service
    hostname: host-1
    path: /
    port: 8000
difficulty: basic
timelimit: 180
enhanced_loading: null
---

# Learn: The Match Query

Read the official Elastic documentation to understand how the match query works:

**[📖 Match Query Documentation](https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-match-query)**

**Key concepts** (2-minute read):
- The match query **analyzes** your search text before searching
- It finds documents containing **any** of the analyzed terms (by default)
- Perfect for user-facing search where you want flexible, relevant results

---

# Test It Out

In the [button label="Query Lab"](tab-0) tab, you'll see a pre-loaded query. **Click "Run Query"** to see how it works.

Try modifying the query:
- Change the search term to see different results
- Change the field name to search in different document fields
- Add multiple words and notice how it finds documents with **any** of those words

Once you understand how it works, proceed to the next challenge to test your knowledge!

