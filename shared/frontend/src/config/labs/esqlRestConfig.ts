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
      title: "Filter products by description",
      description: "Find products with \u0027wireless\u0027 in their description and limit the results to 10.",
      template: {
        products: `FROM products | WHERE product_description LIKE "*wireless*" | LIMIT 10`,
        product_reviews: `FROM product_reviews | WHERE review_text LIKE "*wireless*" | LIMIT 10`,
        product_users: `FROM product_users | WHERE interests LIKE "*wireless*" | LIMIT 10`,
      },
      index: 'products',

      tryThis: [

        "Change the keyword from \u0027wireless\u0027 to another term like \u0027portable\u0027.",

        "Try increasing the LIMIT to 20 to view more results.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query, in this case, \u0027products\u0027.",

        "WHERE": "Filters the results to include only items where the \u0027product_description\u0027 contains \u0027wireless\u0027.",

        "LIKE": "Performs a wildcard search on the text field.",

        "LIMIT": "Restricts the number of results returned to the specified value.",

      },

    },

    {
      id: 'example_2',
      title: "Sort products by price",
      description: "Retrieve premium products and display their name and price, sorted by price in descending order.",
      template: {
        products: `FROM products | WHERE product_name LIKE "*premium*" | KEEP product_name, product_price | SORT product_price DESC`,
        product_reviews: `FROM product_reviews | WHERE review_text LIKE "*premium*" | KEEP review_title, review_rating | SORT review_rating DESC`,
        product_users: `FROM product_users | WHERE account_type == "Premium" | KEEP username, trust_score | SORT trust_score DESC`,
      },
      index: 'products',

      tryThis: [

        "Modify the SORT direction to ascending (ASC) to see the cheapest premium products first.",

        "Add a LIMIT clause to display only the top 5 results.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query, in this case, \u0027products\u0027.",

        "WHERE": "Filters the results to include only items where \u0027product_name\u0027 contains \u0027premium\u0027.",

        "KEEP": "Selects only the specified fields to be included in the output.",

        "SORT": "Orders the results by \u0027product_price\u0027 in descending order (highest price first).",

      },

    },

    {
      id: 'example_3',
      title: "Find highly rated reviews",
      description: "Search for product reviews that mention \u0027durable\u0027 or \u0027comfortable\u0027 and display the title and rating, sorted by rating in descending order.",
      template: {
        products: `FROM products | WHERE product_description LIKE "*durable*" OR product_description LIKE "*comfortable*" | KEEP product_name, product_price | SORT product_price DESC`,
        product_reviews: `FROM product_reviews | WHERE review_text LIKE "*durable*" OR review_text LIKE "*comfortable*" | KEEP review_title, review_rating | SORT review_rating DESC`,
        product_users: `FROM product_users | WHERE interests LIKE "*durable*" OR interests LIKE "*comfortable*" | KEEP username, avg_rating_given | SORT avg_rating_given DESC`,
      },
      index: 'product_reviews',

      tryThis: [

        "Replace \u0027durable\u0027 with another term such as \u0027sturdy\u0027.",

        "Add a LIMIT clause to return only the top 5 results.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query, in this case, \u0027product_reviews\u0027.",

        "WHERE": "Filters the reviews to include only those mentioning \u0027durable\u0027 or \u0027comfortable\u0027.",

        "OR": "Combines multiple conditions, returning results that match any of the conditions.",

        "KEEP": "Selects only specific fields (\u0027review_title\u0027 and \u0027review_rating\u0027) for output.",

        "SORT": "Orders the results by \u0027review_rating\u0027 in descending order (highest rating first).",

      },

    },

    {
      id: 'example_4',
      title: "Find users interested in Electronics",
      description: "Retrieve users whose interests include \u0027Electronics\u0027 and limit the results to 10.",
      template: {
        products: `FROM products | WHERE product_category == "Electronics" | LIMIT 10`,
        product_reviews: `FROM product_reviews | WHERE review_text LIKE "*Electronics*" | LIMIT 10`,
        product_users: `FROM product_users | WHERE interests LIKE "*Electronics*" | LIMIT 10`,
      },
      index: 'product_users',

      tryThis: [

        "Change the keyword from \u0027Electronics\u0027 to another interest, such as \u0027Books\u0027.",

        "Remove the LIMIT clause to return all matching users.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query, in this case, \u0027product_users\u0027.",

        "WHERE": "Filters the results to include only users whose \u0027interests\u0027 field contains \u0027Electronics\u0027.",

        "LIKE": "Performs a wildcard search on the text field.",

        "LIMIT": "Restricts the number of results returned to the specified value.",

      },

    },

    {
      id: 'example_5',
      title: "Analyze verified purchases",
      description: "Retrieve only verified purchases from reviews and sort them by the number of helpful votes in descending order.",
      template: {
        products: `FROM products | WHERE product_category == "Electronics" | SORT product_price DESC`,
        product_reviews: `FROM product_reviews | WHERE verified_purchase == "True" | SORT helpful_votes DESC`,
        product_users: `FROM product_users | WHERE verified_purchaser == "True" | SORT trust_score DESC`,
      },
      index: 'product_reviews',

      tryThis: [

        "Change the SORT direction to ascending (ASC) to see the least helpful reviews first.",

        "Add a LIMIT clause to display only the top 5 results.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query, in this case, \u0027product_reviews\u0027.",

        "WHERE": "Filters the results to include only verified purchases.",

        "SORT": "Orders the results by \u0027helpful_votes\u0027 in descending order (most helpful first).",

        "==": "Checks for an exact match. In this case, it ensures \u0027verified_purchase\u0027 is \u0027True\u0027.",

      },

    },

    {
      id: 'example_6',
      title: "Find users by account type",
      description: "Retrieve usernames of users with a \u0027Premium\u0027 account and display only their username.",
      template: {
        products: `FROM products | WHERE product_category == "Electronics" | KEEP product_name`,
        product_reviews: `FROM product_reviews | WHERE verified_purchase == "True" | KEEP reviewer_name`,
        product_users: `FROM product_users | WHERE account_type == "Premium" | KEEP username`,
      },
      index: 'product_users',

      tryThis: [

        "Change \u0027Premium\u0027 to \u0027Free\u0027 or \u0027Enterprise\u0027 to see other account types.",

        "Add a LIMIT clause to only return a specific number of results.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query, in this case, \u0027product_users\u0027.",

        "WHERE": "Filters the results to include only users with the specified account type.",

        "KEEP": "Selects only the \u0027username\u0027 field to be included in the output.",

        "==": "Checks for an exact match. In this case, it ensures \u0027account_type\u0027 is \u0027Premium\u0027.",

      },

    },

  ],
};
