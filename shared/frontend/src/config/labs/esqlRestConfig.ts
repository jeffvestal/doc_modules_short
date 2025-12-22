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
      id: '1',
      title: "Filter products by keyword",
      description: "Find products that contain the word \u0027wireless\u0027 in their descriptions.",
      template: `FROM products | WHERE product_description LIKE '*wireless*' | LIMIT 10`,
      index: 'products',

      tryThis: [

        "Change \u0027wireless\u0027 to another keyword, such as \u0027portable\u0027.",

        "Add a SORT clause to order the results by product price.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query.",

        "WHERE": "Filters results based on specified conditions.",

        "LIKE": "Performs a wildcard text match.",

        "LIMIT": "Restricts the number of results returned.",

      },

    },

    {
      id: '2',
      title: "Sort products by price",
      description: "List premium products sorted by price in descending order.",
      template: `FROM products | WHERE product_name LIKE '*premium*' | KEEP product_name, product_price | SORT product_price DESC | LIMIT 5`,
      index: 'products',

      tryThis: [

        "Change the number of results by modifying the LIMIT value.",

        "Try sorting in ascending order by replacing DESC with ASC.",

      ],


      tooltips: {

        "KEEP": "Selects specific fields to include in the results.",

        "SORT": "Orders results based on a specified field and direction.",

        "DESC": "Sorts results in descending order.",

        "LIMIT": "Restricts the number of results returned.",

      },

    },

    {
      id: '3',
      title: "Search for comfortable reviews",
      description: "Find reviews that mention the word \u0027comfortable\u0027.",
      template: `FROM product_reviews | WHERE review_text LIKE '*comfortable*' | KEEP review_title, review_rating | LIMIT 10`,
      index: 'product_reviews',

      tryThis: [

        "Search for a different keyword, such as \u0027durable\u0027.",

        "Add a SORT clause to order results by review rating.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query.",

        "WHERE": "Filters results based on specified conditions.",

        "KEEP": "Selects specific fields to include in the results.",

        "LIMIT": "Restricts the number of results returned.",

      },

    },

    {
      id: '4',
      title: "Identify top reviewers",
      description: "Find users who are interested in electronics and limit the results to verified purchasers.",
      template: `FROM product_users | WHERE interests LIKE '*Electronics*' AND verified_purchaser == true | KEEP username, avg_rating_given | LIMIT 10`,
      index: 'product_users',

      tryThis: [

        "Change the interest to \u0027Books\u0027 to find users interested in books.",

        "Remove the verified_purchaser condition to include all users.",

      ],


      tooltips: {

        "WHERE": "Filters results based on specified conditions.",

        "AND": "Combines multiple conditions that must all be true.",

        "KEEP": "Selects specific fields to include in the results.",

        "LIMIT": "Restricts the number of results returned.",

      },

    },

    {
      id: '5',
      title: "Top helpful reviews",
      description: "Find reviews with the highest number of helpful votes.",
      template: `FROM product_reviews | SORT helpful_votes DESC | KEEP review_title, helpful_votes | LIMIT 5`,
      index: 'product_reviews',

      tryThis: [

        "Increase the LIMIT to display more results.",

        "Add a WHERE clause to filter reviews with a minimum number of helpful votes.",

      ],


      tooltips: {

        "SORT": "Orders results based on a specified field and direction.",

        "DESC": "Sorts results in descending order.",

        "KEEP": "Selects specific fields to include in the results.",

        "LIMIT": "Restricts the number of results returned.",

      },

    },

  ],
};
