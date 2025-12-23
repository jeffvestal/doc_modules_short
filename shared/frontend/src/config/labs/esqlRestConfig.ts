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
      id: 'example_1',
      title: "Filter products by category and sort by price",
      description: "Find products in the \u0027Electronics\u0027 category and sort them by price in descending order.",
      template: `FROM products | WHERE product_category == "Electronics" | SORT product_price DESC | LIMIT 5`,
      index: 'products',

      tryThis: [

        "Change \u0027Electronics\u0027 to another category like \u0027Books\u0027 or \u0027Clothing\u0027 and observe the results.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query.",

        "WHERE": "Filters results based on the condition.",

        "SORT": "Sorts the results by the specified field.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example_2',
      title: "Retrieve top-rated product reviews",
      description: "List reviews with a rating of 5, showing only the review title and rating.",
      template: `FROM product_reviews | WHERE review_rating == 5 | KEEP review_title, review_rating | LIMIT 10`,
      index: 'product_reviews',

      tryThis: [

        "Change the rating to 4 or 3 to see reviews with different ratings.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query.",

        "WHERE": "Filters results based on the condition.",

        "KEEP": "Specifies which fields to include in the results.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example_3',
      title: "Find users interested in specific topics",
      description: "Find users whose interests include \u0027Books\u0027, displaying their username and interests.",
      template: `FROM product_users | WHERE interests LIKE "*Books*" | KEEP username, interests | LIMIT 10`,
      index: 'product_users',

      tryThis: [

        "Replace \u0027Books\u0027 with \u0027Electronics\u0027 or \u0027Sports\u0027 to find users with different interests.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query.",

        "WHERE": "Filters results based on the condition.",

        "KEEP": "Specifies which fields to include in the results.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example_4',
      title: "Search for products with a specific feature",
      description: "Find products with \u0027wireless\u0027 in their description.",
      template: `FROM products | WHERE product_description LIKE "*wireless*" | LIMIT 10`,
      index: 'products',

      tryThis: [

        "Change \u0027wireless\u0027 to another keyword like \u0027portable\u0027 or \u0027durable\u0027 to find different products.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query.",

        "WHERE": "Filters results based on the condition.",

        "LIKE": "Performs a wildcard match in the specified field.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example_5',
      title: "Filter verified reviews with helpful votes",
      description: "Find reviews that are verified purchases and have at least 20 helpful votes, sorted by helpful votes descending.",
      template: `FROM product_reviews | WHERE verified_purchase == "True" AND helpful_votes >= 20 | SORT helpful_votes DESC | LIMIT 5`,
      index: 'product_reviews',

      tryThis: [

        "Change the helpful votes threshold to 15 or 10 to include more reviews.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query.",

        "WHERE": "Filters results based on the condition.",

        "AND": "Combines multiple conditions to filter results.",

        "SORT": "Sorts the results by the specified field.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example_6',
      title: "List premium users by trust score",
      description: "Find premium account users, sorted by trust score in descending order.",
      template: `FROM product_users | WHERE account_type == "Premium" | SORT trust_score DESC | KEEP username, trust_score | LIMIT 5`,
      index: 'product_users',

      tryThis: [

        "Change the account type to \u0027Free\u0027 or \u0027Enterprise\u0027 to explore other user types.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query.",

        "WHERE": "Filters results based on the condition.",

        "SORT": "Sorts the results by the specified field.",

        "KEEP": "Specifies which fields to include in the results.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

  ],
};
