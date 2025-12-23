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
      title: "Find Wireless Products",
      description: "Search for products that mention \u0027wireless\u0027 in their description and limit the results to 10.",
      template: `FROM products | WHERE product_description LIKE "*wireless*" | LIMIT 10`,
      index: 'products',

      tryThis: [

        "Try changing \u0027wireless\u0027 to another word like \u0027Bluetooth\u0027.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query.",

        "WHERE": "Filters results based on a condition.",

        "LIKE": "Performs a text match using wildcards (*).",

        "LIMIT": "Restricts the number of results returned.",

      },

    },

    {
      id: 'example2',
      title: "Top Premium Products by Price",
      description: "Search for premium products and sort them by price in descending order, keeping only the product name and price.",
      template: `FROM products | WHERE product_name LIKE "*premium*" | KEEP product_name, product_price | SORT product_price DESC`,
      index: 'products',

      tryThis: [

        "Try sorting by ascending price by using \u0027ASC\u0027 instead of \u0027DESC\u0027.",

      ],


      tooltips: {

        "KEEP": "Selects specific fields to include in the results.",

        "SORT": "Orders results by a specified field.",

        "DESC": "Sorts in descending order.",

      },

    },

    {
      id: 'example3',
      title: "Comfortable Product Reviews",
      description: "Search for reviews mentioning \u0027comfortable\u0027 and limit the results to 10.",
      template: `FROM product_reviews | WHERE review_text LIKE "*comfortable*" | LIMIT 10`,
      index: 'product_reviews',

      tryThis: [

        "Try changing \u0027comfortable\u0027 to another word like \u0027durable\u0027.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query.",

        "WHERE": "Filters results based on a condition.",

        "LIKE": "Performs a text match using wildcards (*).",

        "LIMIT": "Restricts the number of results returned.",

      },

    },

    {
      id: 'example4',
      title: "Top Durable and Comfortable Reviews",
      description: "Search for reviews mentioning \u0027durable\u0027 or \u0027comfortable\u0027, keep the review title and rating, and sort by rating in descending order.",
      template: `FROM product_reviews | WHERE review_text LIKE "*durable*" OR review_text LIKE "*comfortable*" | KEEP review_title, review_rating | SORT review_rating DESC`,
      index: 'product_reviews',

      tryThis: [

        "Try adding another keyword to the search condition, such as \u0027stylish\u0027.",

      ],


      tooltips: {

        "OR": "Combines multiple conditions, returning results that match any condition.",

        "KEEP": "Selects specific fields to include in the results.",

        "SORT": "Orders results by a specified field.",

      },

    },

    {
      id: 'example5',
      title: "Find Users Interested in Electronics",
      description: "Search for users with interests related to \u0027Electronics\u0027 and limit the results to 10.",
      template: `FROM product_users | WHERE interests LIKE "*Electronics*" | LIMIT 10`,
      index: 'product_users',

      tryThis: [

        "Try changing \u0027Electronics\u0027 to another interest like \u0027Books\u0027.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query.",

        "WHERE": "Filters results based on a condition.",

        "LIKE": "Performs a text match using wildcards (*).",

        "LIMIT": "Restricts the number of results returned.",

      },

    },

    {
      id: 'example6',
      title: "Users Interested in Multiple Categories",
      description: "Search for users with interests in \u0027Books\u0027 or \u0027Electronics\u0027, keep the username and interests, and limit the results to 10.",
      template: `FROM product_users | WHERE interests LIKE "*Books*" OR interests LIKE "*Electronics*" | KEEP username, interests | LIMIT 10`,
      index: 'product_users',

      tryThis: [

        "Try adding another interest, such as \u0027Sports\u0027, to the query.",

      ],


      tooltips: {

        "OR": "Combines multiple conditions, returning results that match any condition.",

        "KEEP": "Selects specific fields to include in the results.",

        "LIMIT": "Restricts the number of results returned.",

      },

    },

  ],
};
