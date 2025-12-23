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
    products: "product_name",
    product_reviews: "review_text",
    product_users: "interests",
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
      title: "Find wireless products",
      description: "Search for products with \u0027wireless\u0027 in their description.",
      template: `FROM products | WHERE product_description LIKE "*wireless*" | KEEP product_name, product_price | SORT product_price DESC | LIMIT 5`,
      index: 'products',

      tryThis: [

        "Change \u0027wireless\u0027 to \u0027premium\u0027 to find products with \u0027premium\u0027 in their description.",

        "Add a condition to filter by product_category, e.g., `AND product_category == \"Electronics\"`.",

      ],


      tooltips: {

        "FROM": "Defines the dataset to query.",

        "WHERE": "Filters the results based on a condition.",

        "LIKE": "Performs a wildcard text search.",

        "KEEP": "Specifies which fields to include in the results.",

        "SORT": "Orders the results based on a field.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example2',
      title: "Top-rated reviews mentioning durability",
      description: "Find product reviews mentioning \u0027durable\u0027 and sort them by rating in descending order.",
      template: `FROM product_reviews | WHERE review_text LIKE "*durable*" | KEEP review_title, review_rating | SORT review_rating DESC | LIMIT 5`,
      index: 'product_reviews',

      tryThis: [

        "Change \u0027durable\u0027 to \u0027comfortable\u0027 to find reviews mentioning \u0027comfortable\u0027.",

        "Add a condition to include verified purchases only, e.g., `AND verified_purchase == \"True\"`.",

      ],


      tooltips: {

        "FROM": "Defines the dataset to query.",

        "WHERE": "Filters the results based on a condition.",

        "LIKE": "Performs a wildcard text search.",

        "KEEP": "Specifies which fields to include in the results.",

        "SORT": "Orders the results based on a field.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example3',
      title: "Users interested in Books and Electronics",
      description: "Search for users with interests in both \u0027Books\u0027 and \u0027Electronics\u0027.",
      template: `FROM product_users | WHERE interests LIKE "*Books*" OR interests LIKE "*Electronics*" | KEEP username, interests | LIMIT 10`,
      index: 'product_users',

      tryThis: [

        "Add another interest, e.g., `OR interests LIKE \"*Sports*\"`.",

        "Change the LIMIT value to display more or fewer results.",

      ],


      tooltips: {

        "FROM": "Defines the dataset to query.",

        "WHERE": "Filters the results based on a condition.",

        "LIKE": "Performs a wildcard text search.",

        "OR": "Combines multiple conditions, returning results that match any condition.",

        "KEEP": "Specifies which fields to include in the results.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example4',
      title: "Affordable products in Electronics",
      description: "Find products in the \u0027Electronics\u0027 category with prices under $50.",
      template: `FROM products | WHERE product_category == "Electronics" AND product_price < 50 | KEEP product_name, product_price | SORT product_price ASC | LIMIT 10`,
      index: 'products',

      tryThis: [

        "Change the price filter to `product_price \u003c 100` to include more products.",

        "Remove the category filter to see affordable products from all categories.",

      ],


      tooltips: {

        "FROM": "Defines the dataset to query.",

        "WHERE": "Filters the results based on a condition.",

        "KEEP": "Specifies which fields to include in the results.",

        "SORT": "Orders the results based on a field.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example5',
      title: "Frequently reviewed users",
      description: "Find users who have written the most reviews.",
      template: `FROM product_users | SORT total_reviews_count DESC | KEEP username, total_reviews_count | LIMIT 5`,
      index: 'product_users',

      tryThis: [

        "Add a condition to filter by account type, e.g., `WHERE account_type == \"Premium\"`.",

        "Change the sorting order to `ASC` to find users with the fewest reviews.",

      ],


      tooltips: {

        "FROM": "Defines the dataset to query.",

        "SORT": "Orders the results based on a field.",

        "KEEP": "Specifies which fields to include in the results.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example6',
      title: "Highly rated verified reviews",
      description: "Find verified reviews with the highest ratings.",
      template: `FROM product_reviews | WHERE verified_purchase == "True" AND review_rating >= 4 | SORT review_rating DESC, helpful_votes DESC | KEEP review_title, review_rating, helpful_votes | LIMIT 10`,
      index: 'product_reviews',

      tryThis: [

        "Change the rating filter to `review_rating \u003e= 5` to see only perfect reviews.",

        "Remove the verified purchase filter to include all reviews.",

      ],


      tooltips: {

        "FROM": "Defines the dataset to query.",

        "WHERE": "Filters the results based on a condition.",

        "SORT": "Orders the results based on one or more fields.",

        "KEEP": "Specifies which fields to include in the results.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

  ],
};
