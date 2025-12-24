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
      title: "Filter products by description",
      description: "Find products with \u0027wireless\u0027 in their description and limit the results to 10.",
      template: {
        products: `FROM products | WHERE product_description LIKE "*wireless*" | LIMIT 10`,
        product_reviews: `FROM product_reviews | WHERE review_text LIKE "*wireless*" | LIMIT 10`,
        product_users: `FROM product_users | WHERE interests LIKE "*wireless*" | LIMIT 10`,
      },
      index: 'products',

      tryThis: [

        "Try changing \u0027wireless\u0027 to another term like \u0027premium\u0027 to see different results.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query.",

        "WHERE": "Filters the results based on a condition.",

        "LIKE": "Performs a text search using wildcards.",

        "LIMIT": "Restricts the number of results returned.",

      },

    },

    {
      id: 'example2',
      title: "Sort products by price",
      description: "Find premium products, keep only their names and prices, and sort them by price in descending order.",
      template: {
        products: `FROM products | WHERE product_name LIKE "*premium*" | KEEP product_name, product_price | SORT product_price DESC`,
        product_reviews: `FROM product_reviews | WHERE review_text LIKE "*premium*" | KEEP review_title, review_rating | SORT review_rating DESC`,
        product_users: `FROM product_users | WHERE account_type == "Premium" | KEEP username, trust_score | SORT trust_score DESC`,
      },
      index: 'products',

      tryThis: [

        "Try changing \u0027premium\u0027 to another keyword like \u0027wireless\u0027 or remove the SORT clause to see unsorted results.",

      ],


      tooltips: {

        "KEEP": "Selects specific fields to include in the result.",

        "SORT": "Arranges the results based on a field, optionally in descending order.",

        "DESC": "Sorts the results in descending order.",

      },

    },

    {
      id: 'example3',
      title: "Find highly-rated reviews",
      description: "Search for reviews mentioning \u0027durable\u0027 or \u0027comfortable\u0027, keep the title and rating, and sort by rating in descending order.",
      template: {
        products: `FROM products | WHERE product_description LIKE "*durable*" OR product_description LIKE "*comfortable*" | KEEP product_name, product_price | SORT product_price DESC`,
        product_reviews: `FROM product_reviews | WHERE review_text LIKE "*durable*" OR review_text LIKE "*comfortable*" | KEEP review_title, review_rating | SORT review_rating DESC`,
        product_users: `FROM product_users | WHERE interests LIKE "*durable*" OR interests LIKE "*comfortable*" | KEEP username, avg_rating_given | SORT avg_rating_given DESC`,
      },
      index: 'product_reviews',

      tryThis: [

        "Try changing \u0027durable\u0027 and \u0027comfortable\u0027 to other keywords like \u0027easy\u0027 or \u0027reliable\u0027.",

      ],


      tooltips: {

        "OR": "Combines multiple conditions, returning results that match any condition.",

        "KEEP": "Selects specific fields to include in the result.",

        "SORT": "Arranges the results based on a field, optionally in descending order.",

      },

    },

    {
      id: 'example4',
      title: "Filter users by interests",
      description: "Find users interested in \u0027Electronics\u0027 and limit the results to 10.",
      template: {
        products: `FROM products | WHERE product_category == "Electronics" | LIMIT 10`,
        product_reviews: `FROM product_reviews | WHERE review_text LIKE "*Electronics*" | LIMIT 10`,
        product_users: `FROM product_users | WHERE interests LIKE "*Electronics*" | LIMIT 10`,
      },
      index: 'product_users',

      tryThis: [

        "Try changing \u0027Electronics\u0027 to another interest like \u0027Books\u0027 to find different users.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query.",

        "WHERE": "Filters the results based on a condition.",

        "LIKE": "Performs a text search using wildcards.",

        "LIMIT": "Restricts the number of results returned.",

      },

    },

    {
      id: 'example5',
      title: "Find users with multiple interests",
      description: "Search for users interested in \u0027Books\u0027 or \u0027Electronics\u0027, keep their username and interests, and limit the results to 10.",
      template: {
        products: `FROM products | WHERE product_category == "Books" OR product_category == "Electronics" | KEEP product_name, product_category | LIMIT 10`,
        product_reviews: `FROM product_reviews | WHERE review_text LIKE "*Books*" OR review_text LIKE "*Electronics*" | KEEP reviewer_name, review_text | LIMIT 10`,
        product_users: `FROM product_users | WHERE interests LIKE "*Books*" OR interests LIKE "*Electronics*" | KEEP username, interests | LIMIT 10`,
      },
      index: 'product_users',

      tryThis: [

        "Try adding another interest like \u0027Sports\u0027 or removing the LIMIT clause to see all results.",

      ],


      tooltips: {

        "OR": "Combines multiple conditions, returning results that match any condition.",

        "KEEP": "Selects specific fields to include in the result.",

        "LIMIT": "Restricts the number of results returned.",

      },

    },

  ],
};
