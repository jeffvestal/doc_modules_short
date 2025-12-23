import type { LabConfig } from '../../types';

export const esqlRestConfig: LabConfig = {
  queryLanguage: 'esql',
  queryType: 'esql_rest',
  displayName: 'ES|QL Query',
  description: "\u003ctip\u003e The [Search and filter with ES|QL](https://www.elastic.co/docs/reference/query-languages/esql/esql-search-tutorial) tutorial provides a hands-on introduction to the ES|QL `_query` API. \u003c/tip\u003e",
  docUrl: 'https://www.elastic.co/docs/reference/query-languages/esql/esql-rest',

  keyDisplayFields: {
    products: 'product_name',
    product_reviews: 'review_title',
    product_users: 'username',
  },
  searchFields: {
    products: ["product_name", "product_description"],
    product_reviews: ["review_title", "review_text"],
    product_users: ["interests"],
  },
  sampleQueries: {
    products: "wireless",
    product_reviews: "comfortable",
    product_users: "Electronics",
  },
  queryStructure: {
    type: 'inline',
    fieldPath: '',
  },
  examples: [

    {
      id: '1',
      title: "Filter products by category and sort by price",
      description: "Retrieve products in the \u0027Electronics\u0027 category, showing their name and price, sorted by price in ascending order.",
      template: `FROM products | WHERE product_category == "Electronics" | KEEP product_name, product_price | SORT product_price ASC | LIMIT 5`,
      index: 'products',

      tryThis: [

        "Try changing the category to \u0027Books\u0027 or \u0027Clothing\u0027 to see different results.",

      ],


      tooltips: {

        "WHERE": "Filters the results based on the given condition.",

        "KEEP": "Includes only the listed fields in the output.",

        "SORT": "Sorts the results by the specified field.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: '2',
      title: "Find reviews mentioning specific keywords",
      description: "Search for reviews that mention either \u0027durable\u0027 or \u0027comfortable\u0027, and display the review title and rating sorted by rating in descending order.",
      template: `FROM product_reviews | WHERE review_text LIKE "*durable*" OR review_text LIKE "*comfortable*" | KEEP review_title, review_rating | SORT review_rating DESC | LIMIT 5`,
      index: 'product_reviews',

      tryThis: [

        "Try replacing \u0027durable\u0027 with \u0027easy to use\u0027 to explore other keywords.",

      ],


      tooltips: {

        "WHERE": "Filters the results based on the given condition.",

        "LIKE": "Performs a wildcard search to match text patterns.",

        "OR": "Combines multiple conditions, returning results that match any of them.",

        "KEEP": "Includes only the listed fields in the output.",

        "SORT": "Sorts the results by the specified field.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: '3',
      title: "List verified purchasers with specific interests",
      description: "Find usernames of verified purchasers who are interested in \u0027Books\u0027, limiting the results to 10 users.",
      template: `FROM product_users | WHERE interests LIKE "*Books*" AND verified_purchaser == "True" | KEEP username | LIMIT 10`,
      index: 'product_users',

      tryThis: [

        "Try changing the interest to \u0027Electronics\u0027 or \u0027Sports\u0027 to find users with other interests.",

      ],


      tooltips: {

        "WHERE": "Filters the results based on the given condition.",

        "AND": "Combines multiple conditions, returning only results that match all of the conditions.",

        "KEEP": "Includes only the listed fields in the output.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: '4',
      title: "Top-rated reviews with helpful votes",
      description: "Retrieve the top 5 highest-rated reviews that have more than 20 helpful votes, showing the review title and rating.",
      template: `FROM product_reviews | WHERE review_rating == 5 AND helpful_votes > 20 | KEEP review_title, review_rating | SORT helpful_votes DESC | LIMIT 5`,
      index: 'product_reviews',

      tryThis: [

        "Try reducing the helpful votes threshold to 10 to see more results.",

      ],


      tooltips: {

        "WHERE": "Filters the results based on the given condition.",

        "KEEP": "Includes only the listed fields in the output.",

        "SORT": "Sorts the results by the specified field.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: '5',
      title: "Search products by brand and price range",
      description: "Find products from the \u0027AudioMax\u0027 brand that cost less than $50, sorted by price in ascending order.",
      template: `FROM products | WHERE product_brand == "AudioMax" AND product_price < 50 | KEEP product_name, product_price | SORT product_price ASC | LIMIT 5`,
      index: 'products',

      tryThis: [

        "Try changing the brand to \u0027GlowEssence\u0027 and modifying the price range to explore other results.",

      ],


      tooltips: {

        "WHERE": "Filters the results based on the given condition.",

        "AND": "Combines multiple conditions, returning only results that match all of the conditions.",

        "KEEP": "Includes only the listed fields in the output.",

        "SORT": "Sorts the results by the specified field.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

  ],
};
