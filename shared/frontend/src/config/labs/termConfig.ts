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
      id: '1',
      title: "Find products in a specific category",
      description: "Retrieve all products that belong to the \u0027Electronics\u0027 category.",
      template: `{ "query": { "term": { "product_category": { "value": "Electronics" } } } }`,
      index: 'products',

      tryThis: [

        "Change the `value` to another category such as `Books` or `Clothing` to explore more results.",

      ],


      tooltips: {

        "product_category": "The category of the product. Use one of the predefined values (e.g., \u0027Electronics\u0027, \u0027Books\u0027).",

      },

    },

    {
      id: '2',
      title: "Search for a specific product brand",
      description: "Find all products manufactured by the brand \u0027GlowNaturals\u0027.",
      template: `{ "query": { "term": { "product_brand": { "value": "GlowNaturals" } } } }`,
      index: 'products',

      tryThis: [

        "Try replacing `GlowNaturals` with another brand like `AudioMax` or `PlayPals`.",

      ],


      tooltips: {

        "product_brand": "The brand of the product. Use one of the predefined values (e.g., \u0027GlowNaturals\u0027, \u0027AudioMax\u0027).",

      },

    },

    {
      id: '3',
      title: "Search for highly-rated reviews",
      description: "Find reviews with a rating of 5 stars.",
      template: `{ "query": { "term": { "review_rating": { "value": 5 } } } }`,
      index: 'product_reviews',

      tryThis: [

        "Change the `value` to a lower rating (e.g., 3) to find reviews with a different rating.",

      ],


      tooltips: {

        "review_rating": "The rating given in the review. Use integers between 1 and 5.",

      },

    },

    {
      id: '4',
      title: "Find verified purchases",
      description: "Retrieve reviews that are marked as verified purchases.",
      template: `{ "query": { "term": { "verified_purchase": { "value": "True" } } } }`,
      index: 'product_reviews',

      tryThis: [

        "Change the `value` to `False` to find reviews for unverified purchases.",

      ],


      tooltips: {

        "verified_purchase": "Indicates if the review is from a verified purchase. Use \u0027True\u0027 or \u0027False\u0027.",

      },

    },

    {
      id: '5',
      title: "Find a specific user",
      description: "Retrieve all data for the user with the username \u0027AveryWilliams55\u0027.",
      template: `{ "query": { "term": { "username": { "value": "AveryWilliams55" } } } }`,
      index: 'product_users',

      tryThis: [

        "Replace `AveryWilliams55` with another username like `CameronLopez20` to find data for a different user.",

      ],


      tooltips: {

        "username": "The username of the user. Use exact values (e.g., \u0027AveryWilliams55\u0027).",

      },

    },

    {
      id: '6',
      title: "Search for premium account users",
      description: "Find users with a \u0027Premium\u0027 account type.",
      template: `{ "query": { "term": { "account_type": { "value": "Premium" } } } }`,
      index: 'product_users',

      tryThis: [

        "Change the `value` to `Free` or `Enterprise` to find other types of account users.",

      ],


      tooltips: {

        "account_type": "The type of user account. Use one of the predefined values (e.g., \u0027Premium\u0027, \u0027Free\u0027).",

      },

    },

  ],
};
