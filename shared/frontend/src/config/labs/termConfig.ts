import type { LabConfig } from '../../types';

export const termConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'term_query',
  displayName: 'Term Query',
  description: "Returns documents that contain an **exact** term in a provided field. You can use the `term` query to find documents based on a precise value such as a price, a product ID, or a username.",
  docUrl: 'https://elastic.co/docs/reference/query-languages/query-dsl/query-dsl-term-query',

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
      title: "Find products in a specific category",
      description: "This query retrieves all products that belong to the \u0027Electronics\u0027 category.",
      template: `{ "query": { "term": { "product_category": { "value": "Electronics" } } } }`,
      index: 'products',

      tryThis: [

        "Change the \u0027value\u0027 to \u0027Books\u0027 to search for products in the \u0027Books\u0027 category.",

        "Try using a different field, such as \u0027product_brand\u0027, to filter by brand.",

      ],


      tooltips: {

        "product_category": "Filters products by their exact category. Use values from the keyword_field_values.",

      },

    },

    {
      id: 'example_2',
      title: "Search for highly rated reviews",
      description: "This query retrieves all reviews with a rating of 5.",
      template: `{ "query": { "term": { "review_rating": { "value": 5 } } } }`,
      index: 'product_reviews',

      tryThis: [

        "Change the \u0027value\u0027 to 4 to search for reviews with a rating of 4.",

        "Combine this query with a range query to filter reviews within a specific rating range.",

      ],


      tooltips: {

        "review_rating": "Filters reviews by their exact rating value. Ratings range from 1 to 5.",

      },

    },

    {
      id: 'example_3',
      title: "Find premium users",
      description: "This query retrieves all users who have a \u0027Premium\u0027 account type.",
      template: `{ "query": { "term": { "account_type": { "value": "Premium" } } } }`,
      index: 'product_users',

      tryThis: [

        "Change the \u0027value\u0027 to \u0027Free\u0027 to find users with a free account.",

        "Try searching by \u0027username\u0027 to look for a specific user\u0027s account.",

      ],


      tooltips: {

        "account_type": "Filters users by their exact account type. Values are case-sensitive.",

      },

    },

    {
      id: 'example_4',
      title: "Locate verified purchases",
      description: "This query retrieves all reviews marked as a verified purchase.",
      template: `{ "query": { "term": { "verified_purchase": { "value": "True" } } } }`,
      index: 'product_reviews',

      tryThis: [

        "Change the \u0027value\u0027 to \u0027False\u0027 to find reviews that are not verified purchases.",

        "Try combining this query with a term query on \u0027review_rating\u0027 for more specific results.",

      ],


      tooltips: {

        "verified_purchase": "Filters reviews by whether they are marked as a verified purchase. Use \u0027True\u0027 or \u0027False\u0027 as string values.",

      },

    },

    {
      id: 'example_5',
      title: "Find products by brand",
      description: "This query retrieves all products from the \u0027AudioMax\u0027 brand.",
      template: `{ "query": { "term": { "product_brand": { "value": "AudioMax" } } } }`,
      index: 'products',

      tryThis: [

        "Change the \u0027value\u0027 to \u0027GlowNaturals\u0027 to search for products from a different brand.",

        "Combine this query with a range query on \u0027product_price\u0027 to find products within a specific price range.",

      ],


      tooltips: {

        "product_brand": "Filters products by their exact brand name. Use values from the keyword_field_values.",

      },

    },

    {
      id: 'example_6',
      title: "Search by exact username",
      description: "This query retrieves a user with the exact username \u0027AveryWilliams55\u0027.",
      template: `{ "query": { "term": { "username": { "value": "AveryWilliams55" } } } }`,
      index: 'product_users',

      tryThis: [

        "Change the \u0027value\u0027 to \u0027CameronLopez20\u0027 to search for a different user.",

        "Combine this query with a term query on \u0027account_type\u0027 to find specific account types for a user.",

      ],


      tooltips: {

        "username": "Filters users by their exact username. Values are case-sensitive.",

      },

    },

  ],
};
