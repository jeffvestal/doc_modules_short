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
      id: 'example_1',
      title: "Find wireless products",
      description: "Search for products with \u0027wireless\u0027 in their description and show the first 10 results.",
      template: `FROM products | WHERE product_description LIKE "*wireless*" | LIMIT 10`,
      index: 'products',

      tryThis: [

        "Modify the query to search for a different keyword, such as \u0027Bluetooth\u0027.",

      ],


      tooltips: {

        "FROM": "Defines the data source to query.",

        "WHERE": "Filters the results based on a condition.",

        "LIKE": "Searches for records matching the specified pattern.",

        "LIMIT": "Restricts the number of results returned.",

      },

    },

    {
      id: 'example_2',
      title: "Sort premium products by price",
      description: "Find products with \u0027premium\u0027 in their name, keep the name and price fields, and sort by price in descending order.",
      template: `FROM products | WHERE product_name LIKE "*premium*" | KEEP product_name, product_price | SORT product_price DESC`,
      index: 'products',

      tryThis: [

        "Change the sorting to ascending order or filter by another keyword like \u0027luxury\u0027.",

      ],


      tooltips: {

        "KEEP": "Selects specific fields to include in the results.",

        "SORT": "Orders the results based on the specified field and direction.",

        "DESC": "Sorts the results in descending order.",

      },

    },

    {
      id: 'example_3',
      title: "Top-rated comfortable reviews",
      description: "Search for reviews mentioning \u0027comfortable\u0027 and return the first 10 results.",
      template: `FROM product_reviews | WHERE review_text LIKE "*comfortable*" | LIMIT 10`,
      index: 'product_reviews',

      tryThis: [

        "Update the query to search for reviews mentioning \u0027durable\u0027 instead.",

      ],


      tooltips: {

        "FROM": "Defines the data source to query.",

        "WHERE": "Filters the results based on a condition.",

        "LIKE": "Searches for records matching the specified pattern.",

        "LIMIT": "Restricts the number of results returned.",

      },

    },

    {
      id: 'example_4',
      title: "Find users interested in Electronics",
      description: "Search for users with interests related to \u0027Electronics\u0027 and return the first 10 results.",
      template: `FROM product_users | WHERE interests LIKE "*Electronics*" | LIMIT 10`,
      index: 'product_users',

      tryThis: [

        "Experiment with different interest keywords, like \u0027Books\u0027 or \u0027Sports\u0027.",

      ],


      tooltips: {

        "FROM": "Defines the data source to query.",

        "WHERE": "Filters the results based on a condition.",

        "LIKE": "Searches for records matching the specified pattern.",

        "LIMIT": "Restricts the number of results returned.",

      },

    },

    {
      id: 'example_5',
      title: "Top-rated reviews for durable and comfortable products",
      description: "Find reviews mentioning \u0027durable\u0027 or \u0027comfortable\u0027, show the title and rating, and sort by rating in descending order.",
      template: `FROM product_reviews | WHERE review_text LIKE "*durable*" OR review_text LIKE "*comfortable*" | KEEP review_title, review_rating | SORT review_rating DESC`,
      index: 'product_reviews',

      tryThis: [

        "Add another keyword to the filter, such as \u0027reliable\u0027.",

      ],


      tooltips: {

        "WHERE": "Filters the results based on a condition.",

        "OR": "Allows combining multiple conditions.",

        "KEEP": "Selects specific fields to include in the results.",

        "SORT": "Orders the results based on the specified field and direction.",

        "DESC": "Sorts the results in descending order.",

      },

    },

    {
      id: 'example_6',
      title: "Users with multiple interests",
      description: "Find users interested in both \u0027Books\u0027 and \u0027Electronics\u0027, showing their username and interests.",
      template: `FROM product_users | WHERE interests LIKE "*Books*" OR interests LIKE "*Electronics*" | KEEP username, interests | LIMIT 10`,
      index: 'product_users',

      tryThis: [

        "Try changing the interests to \u0027Gaming\u0027 or \u0027Travel\u0027.",

      ],


      tooltips: {

        "WHERE": "Filters the results based on a condition.",

        "OR": "Allows combining multiple conditions.",

        "KEEP": "Selects specific fields to include in the results.",

        "LIMIT": "Restricts the number of results returned.",

      },

    },

  ],
};
