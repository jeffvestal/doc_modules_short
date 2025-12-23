import type { LabConfig } from '../../types';

export const esqlRestConfig: LabConfig = {
  queryLanguage: 'esql',
  queryType: 'esql_rest',
  displayName: 'ES|QL Query',
  description: "The [Search and filter with ES|QL](https://www.elastic.co/docs/reference/query-languages/esql/esql-search-tutorial) tutorial provides a hands-on introduction to the ES|QL `_query` API.",
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
      id: 'example1',
      title: "Filter Products by Category",
      description: "Retrieve a list of products in the \u0027Electronics\u0027 category and display their names and prices.",
      template: `FROM products | WHERE product_category == "Electronics" | KEEP product_name, product_price | LIMIT 10`,
      index: 'products',

      tryThis: [

        "Change the product_category to \u0027Books\u0027 or \u0027Clothing\u0027 to see different results.",

      ],


      tooltips: {

        "FROM": "Defines the dataset to query.",

        "WHERE": "Filters results based on specified conditions.",

        "KEEP": "Specifies the fields to include in the results.",

        "LIMIT": "Restricts the number of results returned.",

      },

    },

    {
      id: 'example2',
      title: "Sort Product Reviews by Rating",
      description: "Find reviews mentioning \u0027durable\u0027 or \u0027comfortable\u0027 and display them sorted by rating in descending order.",
      template: `FROM product_reviews | WHERE review_text LIKE "*durable*" OR review_text LIKE "*comfortable*" | KEEP review_title, review_rating | SORT review_rating DESC | LIMIT 10`,
      index: 'product_reviews',

      tryThis: [

        "Try removing the SORT clause to see the default order of results.",

      ],


      tooltips: {

        "FROM": "Defines the dataset to query.",

        "WHERE": "Filters results based on specified conditions.",

        "OR": "Combines multiple conditions, returning results that match any of them.",

        "KEEP": "Specifies the fields to include in the results.",

        "SORT": "Orders the results by a specified field.",

        "DESC": "Sorts the results in descending order.",

        "LIMIT": "Restricts the number of results returned.",

      },

    },

    {
      id: 'example3',
      title: "Find Verified Purchasers with High Trust Scores",
      description: "List usernames of verified purchasers with a trust score greater than 80.",
      template: `FROM product_users | WHERE verified_purchaser == "True" AND trust_score > 80 | KEEP username, trust_score | LIMIT 10`,
      index: 'product_users',

      tryThis: [

        "Change the trust_score threshold to 90 to narrow the results.",

      ],


      tooltips: {

        "FROM": "Defines the dataset to query.",

        "WHERE": "Filters results based on specified conditions.",

        "AND": "Combines multiple conditions, returning results that match all of them.",

        "KEEP": "Specifies the fields to include in the results.",

        "LIMIT": "Restricts the number of results returned.",

      },

    },

    {
      id: 'example4',
      title: "Search Products with Specific Keywords",
      description: "Find products with descriptions containing the keyword \u0027wireless\u0027 and display their names and categories.",
      template: `FROM products | WHERE product_description LIKE "*wireless*" | KEEP product_name, product_category | LIMIT 5`,
      index: 'products',

      tryThis: [

        "Replace \u0027wireless\u0027 with another keyword like \u0027premium\u0027 or \u0027durable\u0027 to explore different products.",

      ],


      tooltips: {

        "FROM": "Defines the dataset to query.",

        "WHERE": "Filters results based on specified conditions.",

        "LIKE": "Performs a pattern match on text fields.",

        "KEEP": "Specifies the fields to include in the results.",

        "LIMIT": "Restricts the number of results returned.",

      },

    },

    {
      id: 'example5',
      title: "Top Users by Review Count",
      description: "Retrieve usernames and their total review counts, sorted by the number of reviews in descending order.",
      template: `FROM product_users | KEEP username, total_reviews_count | SORT total_reviews_count DESC | LIMIT 10`,
      index: 'product_users',

      tryThis: [

        "Try adding a WHERE clause to filter users by account_type, e.g., \u0027WHERE account_type == \"Premium\"\u0027.",

      ],


      tooltips: {

        "FROM": "Defines the dataset to query.",

        "KEEP": "Specifies the fields to include in the results.",

        "SORT": "Orders the results by a specified field.",

        "DESC": "Sorts the results in descending order.",

        "LIMIT": "Restricts the number of results returned.",

      },

    },

    {
      id: 'example6',
      title: "Most Helpful Reviews",
      description: "Find the most helpful reviews (based on helpful_votes) and display their titles and vote counts.",
      template: `FROM product_reviews | KEEP review_title, helpful_votes | SORT helpful_votes DESC | LIMIT 5`,
      index: 'product_reviews',

      tryThis: [

        "Add a WHERE clause to filter reviews with a minimum number of helpful votes, e.g., \u0027WHERE helpful_votes \u003e 20\u0027.",

      ],


      tooltips: {

        "FROM": "Defines the dataset to query.",

        "KEEP": "Specifies the fields to include in the results.",

        "SORT": "Orders the results by a specified field.",

        "DESC": "Sorts the results in descending order.",

        "LIMIT": "Restricts the number of results returned.",

      },

    },

  ],
};
