---
slug: intro
id: placeholder-termquery
type: challenge
title: Term Query Lab
teaser: Learn how to use the term_query query in Elasticsearch
tabs:
- id: tab-querylab-termquery
  title: Query Lab
  type: service
  hostname: host-1
  path: /
  port: 8000
- id: tab-querylabfull-termquery
  title: Query Lab (Full)
  type: service
  hostname: host-1
  path: /
  port: 8000
  new_window: true
- id: tab-terminal-termquery
  title: Terminal
  type: terminal
  hostname: host-1
- id: tab-dataset-termquery
  title: Dataset
  type: service
  hostname: host-1
  path: /dataset.html
  port: 8000
notes:
- type: text
  contents: |
    # Term Query Lab
    
    Welcome to the interactive lab for the term_query query!
    
    Returns documents that contain an **exact** term in a provided field. You can use the `term` query to find documents based on a precise value such as a price, a product ID, or a username.
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

This lab includes 5 examples demonstrating different aspects of the term_query query:


### Find products in Electronics category
Search for products that belong to the 'Electronics' category.


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

- `

- E

- l

- e

- c

- t

- r

- o

- n

- i

- c

- s

- `

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

-  

- l

- i

- k

- e

-  

- `

- B

- o

- o

- k

- s

- `

-  

- o

- r

-  

- `

- C

- l

- o

- t

- h

- i

- n

- g

- `

- .




### Find products by brand
Search for products from the 'GlowNaturals' brand.


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

- `

- G

- l

- o

- w

- N

- a

- t

- u

- r

- a

- l

- s

- `

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

- b

- r

- a

- n

- d

-  

- l

- i

- k

- e

-  

- `

- A

- u

- d

- i

- o

- M

- a

- x

- `

-  

- o

- r

-  

- `

- P

- l

- a

- y

- P

- a

- l

- s

- `

- .




### Search for verified purchase reviews
Find reviews where the purchase was verified.


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

- `

- T

- r

- u

- e

- `

-  

- t

- o

-  

- `

- F

- a

- l

- s

- e

- `

-  

- t

- o

-  

- f

- i

- n

- d

-  

- n

- o

- n

- -

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




### Find user by username
Search for a user with the username 'AveryWilliams55'.


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

- u

- s

- e

- r

- n

- a

- m

- e

-  

- t

- o

-  

- `

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

- `

-  

- o

- r

-  

- `

- D

- a

- k

- o

- t

- a

- H

- e

- r

- n

- a

- n

- d

- e

- z

- 3

- 9

- `

- .




### Find reviews with a 5-star rating
Search for reviews where the rating is exactly 5 stars.


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

- r

- a

- t

- i

- n

- g

-  

- t

- o

-  

- `

- 1

- `

- ,

-  

- `

- 3

- `

- ,

-  

- o

- r

-  

- `

- 4

- `

-  

- t

- o

-  

- f

- i

- n

- d

-  

- r

- e

- v

- i

- e

- w

- s

-  

- w

- i

- t

- h

-  

- t

- h

- o

- s

- e

-  

- r

- a

- t

- i

- n

- g

- s

- .





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
