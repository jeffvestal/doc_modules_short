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
      description: "Search for all products in the \u0027Electronics\u0027 category.",
      template: `{ "query": { "term": { "product_category": { "value": "Electronics" } } } }`,
      index: 'products',

      tryThis: [

        "Change the category to \u0027Books\u0027 or \u0027Toys\u0027 to see results for those categories.",

        "Try searching for \u0027Home and Kitchen\u0027 to explore products in that category.",

      ],


      tooltips: {

        "product_category": "This field contains the category of the product. Ensure the value matches exactly.",

      },

    },

    {
      id: '2',
      title: "Search for products from a specific brand",
      description: "Retrieve all products made by the brand \u0027GlowNaturals\u0027.",
      template: `{ "query": { "term": { "product_brand": { "value": "GlowNaturals" } } } }`,
      index: 'products',

      tryThis: [

        "Change the brand to \u0027AudioMax\u0027 or \u0027PlaySmart\u0027 to see their products.",

        "Try searching for another brand from the keyword list.",

      ],


      tooltips: {

        "product_brand": "This field identifies the brand of the product. Use exact matches from the keyword list.",

      },

    },

    {
      id: '3',
      title: "Find reviews with a specific rating",
      description: "Retrieve all reviews with a 5-star rating.",
      template: `{ "query": { "term": { "review_rating": { "value": 5 } } } }`,
      index: 'product_reviews',

      tryThis: [

        "Change the rating to 3 or 4 to explore reviews with different ratings.",

        "Try searching for the lowest rating (1) to find critical reviews.",

      ],


      tooltips: {

        "review_rating": "This field contains numerical ratings for reviews. Use values from 1 to 5.",

      },

    },

    {
      id: '4',
      title: "Filter reviews by verified purchase",
      description: "Find all reviews marked as verified purchases.",
      template: `{ "query": { "term": { "verified_purchase": { "value": "True" } } } }`,
      index: 'product_reviews',

      tryThis: [

        "Change the value to \u0027False\u0027 to find reviews that are not verified purchases.",

        "Combine this query with other fields, like \u0027review_rating\u0027, for more specific results.",

      ],


      tooltips: {

        "verified_purchase": "This field indicates whether the reviewer purchased the product. Use \u0027True\u0027 or \u0027False\u0027 as string values.",

      },

    },

    {
      id: '5',
      title: "Search users by account type",
      description: "Find all users with a \u0027Premium\u0027 account.",
      template: `{ "query": { "term": { "account_type": { "value": "Premium" } } } }`,
      index: 'product_users',

      tryThis: [

        "Change the account type to \u0027Free\u0027 or \u0027Enterprise\u0027 to explore other user groups.",

        "Combine this query with age group or location fields for deeper insights.",

      ],


      tooltips: {

        "account_type": "This field indicates the type of user account. Use \u0027Free\u0027, \u0027Premium\u0027, or \u0027Enterprise\u0027.",

      },

    },

    {
      id: '6',
      title: "Search users by username",
      description: "Find the user with the username \u0027AveryWilliams55\u0027.",
      template: `{ "query": { "term": { "username": { "value": "AveryWilliams55" } } } }`,
      index: 'product_users',

      tryThis: [

        "Change the username to \u0027CameronLopez20\u0027 or \u0027JordanMartinez33\u0027 to find other users.",

        "Try searching for a username not in the dataset to see how no results are returned.",

      ],


      tooltips: {

        "username": "This field represents the unique username of the user. Use an exact match to find the user.",

      },

    },

  ],
};
