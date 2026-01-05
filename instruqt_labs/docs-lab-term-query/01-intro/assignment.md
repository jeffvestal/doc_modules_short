---
slug: intro
id: qho7yji2ohn4
type: challenge
title: Term Query Lab
teaser: Learn how to use the term_query query in Elasticsearch
notes:
- type: text
  contents: |
    # Term Query Lab

    Welcome to the interactive lab for the term_query query!

    Returns documents that contain an **exact** term in a provided field. You can use the `term` query to find documents based on a precise value such as a price, a product ID, or a username.
tabs:
- id: j7dnz13sdrwr
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- id: cycwwukzxcvp
  title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- id: d6oijtefxgjy
  title: Terminal
  type: terminal
  hostname: host-1
- id: blrap4optyea
  title: Dataset
  type: service
  hostname: host-1
  path: /dataset.html
  port: 8000
difficulty: ""
enhanced_loading: null
---

# Term Query Lab

Welcome to the interactive Term Query lab! This lab teaches you how to use the term_query query in Elasticsearch.

## Overview

Returns documents that contain an **exact** term in a provided field. You can use the `term` query to find documents based on a precise value such as a price, a product ID, or a username.

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


### Find products by category
Search for products in the 'Electronics' category.


**Try This:**

- T

- r

- y

-

- c

- h

- a

- n

- g

- i

- n

- g

-

- t

- h

- e

-

- v

- a

- l

- u

- e

-

- t

- o

-

- a

- n

- o

- t

- h

- e

- r

-

- c

- a

- t

- e

- g

- o

- r

- y

- ,

-

- s

- u

- c

- h

-

- a

- s

-

- '

- B

- o

- o

- k

- s

- '

-

- o

- r

-

- '

- C

- l

- o

- t

- h

- i

- n

- g

- '

- .




### Find reviews with a specific rating
Retrieve all reviews that have a 5-star rating.


**Try This:**

- T

- r

- y

-

- s

- e

- t

- t

- i

- n

- g

-

- t

- h

- e

-

- v

- a

- l

- u

- e

-

- t

- o

-

- a

- n

- o

- t

- h

- e

- r

-

- r

- a

- t

- i

- n

- g

-

- (

- e

- .

- g

- .

- ,

-

- 1

- ,

-

- 3

- )

-

- t

- o

-

- s

- e

- e

-

- d

- i

- f

- f

- e

- r

- e

- n

- t

-

- r

- e

- s

- u

- l

- t

- s

- .




### Find users by username
Locate a user with the username 'AveryWilliams55'.


**Try This:**

- T

- r

- y

-

- s

- e

- a

- r

- c

- h

- i

- n

- g

-

- f

- o

- r

-

- o

- t

- h

- e

- r

-

- u

- s

- e

- r

- n

- a

- m

- e

- s

- ,

-

- s

- u

- c

- h

-

- a

- s

-

- '

- C

- a

- m

- e

- r

- o

- n

- L

- o

- p

- e

- z

- 2

- 0

- '

-

- o

- r

-

- '

- J

- o

- r

- d

- a

- n

- M

- a

- r

- t

- i

- n

- e

- z

- 3

- 3

- '

- .




### Find products by brand
Search for products from the 'GlowNaturals' brand.


**Try This:**

- E

- x

- p

- e

- r

- i

- m

- e

- n

- t

-

- w

- i

- t

- h

-

- o

- t

- h

- e

- r

-

- b

- r

- a

- n

- d

- s

-

- s

- u

- c

- h

-

- a

- s

-

- '

- A

- u

- d

- i

- o

- M

- a

- x

- '

-

- o

- r

-

- '

- P

- l

- a

- y

- S

- m

- a

- r

- t

- '

- .




### Find reviews marked as verified purchase
Retrieve all reviews that are verified purchases.


**Try This:**

- C

- h

- a

- n

- g

- e

-

- t

- h

- e

-

- v

- a

- l

- u

- e

-

- t

- o

-

- '

- F

- a

- l

- s

- e

- '

-

- t

- o

-

- f

- i

- n

- d

-

- u

- n

- v

- e

- r

- i

- f

- i

- e

- d

-

- p

- u

- r

- c

- h

- a

- s

- e

- s

- .




### Find users by account type
Find users with a 'Premium' account type.


**Try This:**

- T

- r

- y

-

- s

- e

- a

- r

- c

- h

- i

- n

- g

-

- f

- o

- r

-

- u

- s

- e

- r

- s

-

- w

- i

- t

- h

-

- '

- F

- r

- e

- e

- '

-

- o

- r

-

- '

- E

- n

- t

- e

- r

- p

- r

- i

- s

- e

- '

-

- a

- c

- c

- o

- u

- n

- t

-

- t

- y

- p

- e

- s

- .





## Getting Started

1. Review the first example query
2. Click "Run Query" to see the results
3. Try modifying the query to see how results change
4. Explore the other examples to learn different features
5. Use the "Try This" suggestions to experiment further

## View Official Documentation

For complete documentation, visit: https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-term-query

## Need Help?

- Check the "Dataset" tab for information about available fields
- Use the "Why?" button on results to understand matching
- Review the "Tokens" tab to see how your query is analyzed

Happy querying!
