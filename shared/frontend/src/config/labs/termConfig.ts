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
      title: "Find product by exact category",
      description: "This query searches for products in the \u0027Electronics\u0027 category.",
      template: `{ "query": { "term": { "product_category": { "value": "Electronics" } } } }`,
      index: 'products',

      tryThis: [

        "Change the value to \u0027Appliances\u0027 to see if there are products in that category.",

        "Try using a different field like \u0027product_brand\u0027 with a brand name as the value.",

      ],


      tooltips: {

        "product_category": "The field containing the product category.",

        "value": "The exact value to match in the specified field.",

      },

    },

    {
      id: '2',
      title: "Find verified purchase reviews",
      description: "This query retrieves product reviews that are verified purchases.",
      template: `{ "query": { "term": { "verified_purchase": { "value": "True" } } } }`,
      index: 'product_reviews',

      tryThis: [

        "Change the value to 'False' to find non-verified reviews.",

        "Try the 'review_rating' field with a value of 5 to find 5-star reviews.",

      ],


      tooltips: {

        "verified_purchase": "Boolean field indicating if the reviewer purchased the product.",

        "value": "The exact value to match ('True' or 'False').",

      },

    },

    {
      id: '3',
      title: "Find user by username",
      description: "This query retrieves information about a user with an exact username.",
      template: `{ "query": { "term": { "username": { "value": "AveryWilliams55" } } } }`,
      index: 'product_users',

      tryThis: [

        "Try other usernames like 'CameronLopez20' or 'JordanMartinez33'.",

        "Try searching the 'account_type' field with 'Premium' or 'Enterprise'.",

      ],


      tooltips: {

        "username": "The field containing the user's unique username.",

        "value": "The exact username to match.",

      },

    },

    {
      id: '4',
      title: "Find products by exact price",
      description: "This query retrieves products that have a price of exactly 89.99.",
      template: `{ "query": { "term": { "product_price": { "value": 89.99 } } } }`,
      index: 'products',

      tryThis: [

        "Change the price value to 49.99 or 129.99 to find other products.",

        "Try the 'product_brand' field with 'AudioMax' or 'BrewMaster'.",

      ],


      tooltips: {

        "product_price": "The field containing the price of the product.",

        "value": "The exact price to match.",

      },

    },

    {
      id: '5',
      title: "Find reviews with helpful votes",
      description: "This query retrieves reviews that have exactly 10 helpful votes.",
      template: `{ "query": { "term": { "helpful_votes": { "value": 10 } } } }`,
      index: 'product_reviews',

      tryThis: [

        "Modify the value to 5 or 20 to see reviews with different numbers of helpful votes.",

        "Use the \u0027review_rating\u0027 field to filter reviews based on their rating instead.",

      ],


      tooltips: {

        "helpful_votes": "The field containing the number of helpful votes a review received.",

        "value": "The exact number of votes to match.",

      },

    },

    {
      id: '6',
      title: "Find users by account type",
      description: "This query retrieves users with a Premium account type.",
      template: `{ "query": { "term": { "account_type": { "value": "Premium" } } } }`,
      index: 'product_users',

      tryThis: [

        "Change 'Premium' to 'Free' or 'Enterprise' to find other account types.",

        "Note: Term queries are case-sensitive - 'premium' won't match 'Premium'.",

      ],


      tooltips: {

        "account_type": "The field containing the account type of the user.",

        "value": "The exact account type to match (case-sensitive).",

      },

    },

  ],
};
