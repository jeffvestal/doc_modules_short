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
      title: "Filter products by category and sort by price",
      description: "This query retrieves products in the \u0027Electronics\u0027 category, showing only the name and price, sorted by price in descending order.",
      template: `FROM products | WHERE product_category == 'Electronics' | KEEP product_name, product_price | SORT product_price DESC | LIMIT 5`,
      index: 'products',

      tryThis: [

        "Change \u0027Electronics\u0027 to \u0027Books\u0027 to filter for a different category.",

        "Increase the LIMIT to 10 to see more results.",

      ],


      tooltips: {

        "FROM": "Specifies which dataset to query.",

        "WHERE": "Filters results based on a condition.",

        "KEEP": "Keeps only the specified fields in the output.",

        "SORT": "Orders the results by a field.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example_2',
      title: "Find reviews mentioning specific keywords",
      description: "This query fetches reviews containing \u0027durable\u0027 or \u0027comfortable\u0027, showing their title and rating, sorted by rating in descending order.",
      template: `FROM product_reviews | WHERE review_text LIKE '*durable*' OR review_text LIKE '*comfortable*' | KEEP review_title, review_rating | SORT review_rating DESC | LIMIT 10`,
      index: 'product_reviews',

      tryThis: [

        "Change \u0027durable\u0027 to \u0027lightweight\u0027 to find reviews mentioning a different keyword.",

        "Add a condition to filter by review rating (e.g., \u0027review_rating \u003e= 4\u0027).",

      ],


      tooltips: {

        "FROM": "Specifies which dataset to query.",

        "WHERE": "Filters results based on a condition.",

        "LIKE": "Performs a wildcard search on text fields.",

        "KEEP": "Keeps only the specified fields in the output.",

        "SORT": "Orders the results by a field.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example_3',
      title: "Search users by interests",
      description: "This query retrieves user profiles with interests related to \u0027Books\u0027 or \u0027Electronics\u0027, showing their username and interests.",
      template: `FROM product_users | WHERE interests LIKE '*Books*' OR interests LIKE '*Electronics*' | KEEP username, interests | LIMIT 10`,
      index: 'product_users',

      tryThis: [

        "Change \u0027Books\u0027 to \u0027Sports\u0027 to find users with a different interest.",

        "Add a condition to filter by account type (e.g., \u0027account_type == \"Premium\"\u0027).",

      ],


      tooltips: {

        "FROM": "Specifies which dataset to query.",

        "WHERE": "Filters results based on a condition.",

        "LIKE": "Performs a wildcard search on text fields.",

        "KEEP": "Keeps only the specified fields in the output.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example_4',
      title: "List verified reviews with helpful votes",
      description: "This query retrieves verified purchase reviews with at least 15 helpful votes, showing their title, rating, and helpful vote count.",
      template: `FROM product_reviews | WHERE verified_purchase == 'True' AND helpful_votes >= 15 | KEEP review_title, review_rating, helpful_votes | SORT helpful_votes DESC | LIMIT 10`,
      index: 'product_reviews',

      tryThis: [

        "Change \u002715\u0027 to \u002710\u0027 to include reviews with fewer helpful votes.",

        "Remove the \u0027verified_purchase\u0027 condition to include all reviews.",

      ],


      tooltips: {

        "FROM": "Specifies which dataset to query.",

        "WHERE": "Filters results based on a condition.",

        "KEEP": "Keeps only the specified fields in the output.",

        "SORT": "Orders the results by a field.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example_5',
      title: "Find premium users with high trust scores",
      description: "This query retrieves premium users with a trust score above 80, showing their username and trust score.",
      template: `FROM product_users | WHERE account_type == 'Premium' AND trust_score > 80 | KEEP username, trust_score | SORT trust_score DESC | LIMIT 5`,
      index: 'product_users',

      tryThis: [

        "Change \u0027Premium\u0027 to \u0027Free\u0027 to find free users.",

        "Adjust the trust score threshold to include more users.",

      ],


      tooltips: {

        "FROM": "Specifies which dataset to query.",

        "WHERE": "Filters results based on a condition.",

        "KEEP": "Keeps only the specified fields in the output.",

        "SORT": "Orders the results by a field.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

  ],
};
