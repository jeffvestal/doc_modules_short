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
      id: 'example_1',
      title: "Find Wireless Products",
      description: "Search for products where the description contains the word \u0027wireless\u0027.",
      template: {
        products: `FROM products | WHERE product_description LIKE "*wireless*" | LIMIT 10`,
        product_reviews: `FROM product_reviews | WHERE review_text LIKE "*wireless*" | LIMIT 10`,
        product_users: `FROM product_users | WHERE interests LIKE "*wireless*" | LIMIT 10`,
      },
      index: 'products',

      tryThis: [

        "Change \u0027wireless\u0027 to another term like \u0027portable\u0027 or \u0027smart\u0027",

        "Experiment with LIMIT to adjust the number of results returned.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query.",

        "WHERE": "Filters results to only include rows matching the condition.",

        "LIKE": "Performs a wildcard text match. Use * as a wildcard.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example_2',
      title: "Top Rated Durable Reviews",
      description: "Find reviews mentioning \u0027durable\u0027 or \u0027comfortable\u0027, sorted by rating in descending order.",
      template: {
        products: `FROM products | WHERE product_description LIKE "*durable*" OR product_description LIKE "*comfortable*" | KEEP product_name, product_price | SORT product_price DESC`,
        product_reviews: `FROM product_reviews | WHERE review_text LIKE "*durable*" OR review_text LIKE "*comfortable*" | KEEP review_title, review_rating | SORT review_rating DESC`,
        product_users: `FROM product_users | WHERE interests LIKE "*durable*" OR interests LIKE "*comfortable*" | KEEP username, avg_rating_given | SORT avg_rating_given DESC`,
      },
      index: 'product_reviews',

      tryThis: [

        "Change the keywords in the WHERE clause to find reviews mentioning other terms.",

        "Try removing the OR condition to focus on one keyword.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query.",

        "WHERE": "Filters results to match the condition, allowing multiple conditions with OR.",

        "KEEP": "Selects specific fields to include in the output.",

        "SORT": "Sorts the results by the specified field and order.",

      },

    },

    {
      id: 'example_3',
      title: "Electronics Enthusiasts",
      description: "Find users with interests in \u0027Electronics\u0027.",
      template: {
        products: `FROM products | WHERE product_category == "Electronics" | LIMIT 10`,
        product_reviews: `FROM product_reviews | WHERE review_text LIKE "*Electronics*" | LIMIT 10`,
        product_users: `FROM product_users | WHERE interests LIKE "*Electronics*" | LIMIT 10`,
      },
      index: 'product_users',

      tryThis: [

        "Replace \u0027Electronics\u0027 with another interest like \u0027Books\u0027 or \u0027Sports\u0027.",

        "Increase the LIMIT to see more results.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query.",

        "WHERE": "Filters results to include rows where the condition is true.",

        "LIKE": "Performs a wildcard text match. Use * as a wildcard.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example_4',
      title: "Premium Products by Price",
      description: "Find premium products and display their name and price, sorted by price in descending order.",
      template: {
        products: `FROM products | WHERE product_name LIKE "*premium*" | KEEP product_name, product_price | SORT product_price DESC`,
        product_reviews: `FROM product_reviews | WHERE review_text LIKE "*premium*" | KEEP review_title, review_rating | SORT review_rating DESC`,
        product_users: `FROM product_users | WHERE account_type == "Premium" | KEEP username, trust_score | SORT trust_score DESC`,
      },
      index: 'products',

      tryThis: [

        "Change \u0027premium\u0027 to another term like \u0027luxury\u0027 or \u0027classic\u0027.",

        "Sort the results in ascending order by replacing DESC with ASC.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query.",

        "WHERE": "Filters results to include rows matching the condition.",

        "KEEP": "Selects specific fields to include in the output.",

        "SORT": "Sorts the results by the specified field and order.",

      },

    },

    {
      id: 'example_5',
      title: "Top Verified Reviews",
      description: "Retrieve reviews from verified purchases with a high number of helpful votes.",
      template: {
        products: `FROM products | WHERE product_category == "Electronics" AND product_price > 50 | SORT product_price DESC | LIMIT 5`,
        product_reviews: `FROM product_reviews | WHERE verified_purchase == "True" AND helpful_votes > 15 | SORT helpful_votes DESC | LIMIT 5`,
        product_users: `FROM product_users | WHERE verified_purchaser == "True" AND trust_score > 15 | SORT trust_score DESC | LIMIT 5`,
      },
      index: 'product_reviews',

      tryThis: [

        "Change the helpful_votes threshold to 10 or 20.",

        "Experiment with sorting in ascending order instead.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query.",

        "WHERE": "Filters results to include only verified purchases with helpful votes greater than 15.",

        "SORT": "Sorts the results by the specified field and order.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

  ],
};
