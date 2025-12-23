import type { LabConfig } from '../../types';

export const rangeConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'range_query',
  displayName: 'Range Query',
  description: "Returns documents that contain terms within a provided range.",
  docUrl: 'https://elastic.co/docs/reference/query-languages/query-dsl/query-dsl-range-query',

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
      title: "Find products within a price range",
      description: "Search for products that have a price between $50 and $100.",
      template: `{ "query": { "range": { "product_price": { "gte": 50, "lte": 100 } } } }`,
      index: 'products',

      tryThis: [

        "Change the price range to find products that are cheaper or more expensive.",

      ],


      tooltips: {

        "product_price": "The field representing the price of the product.",

        "gte": "Greater than or equal to the specified value.",

        "lte": "Less than or equal to the specified value.",

      },

    },

    {
      id: 'example_2',
      title: "Find highly-rated product reviews",
      description: "Search for product reviews with a rating of 4 or higher.",
      template: `{ "query": { "range": { "review_rating": { "gte": 4 } } } }`,
      index: 'product_reviews',

      tryThis: [

        "Adjust the \u0027gte\u0027 value to filter for reviews with a specific minimum rating.",

      ],


      tooltips: {

        "review_rating": "The field representing the rating given in the review.",

        "gte": "Greater than or equal to the specified value.",

      },

    },

    {
      id: 'example_3',
      title: "Find recent users who joined in a date range",
      description: "Search for users who joined between January 1, 2020, and January 1, 2023.",
      template: `{ "query": { "range": { "member_since": { "gte": "2020-01-01", "lte": "2023-01-01" } } } }`,
      index: 'product_users',

      tryThis: [

        "Modify the date range to filter for users who joined earlier or later.",

      ],


      tooltips: {

        "member_since": "The field representing the date the user joined.",

        "gte": "Greater than or equal to the specified date.",

        "lte": "Less than or equal to the specified date.",

      },

    },

    {
      id: 'example_4',
      title: "Find products priced above $200",
      description: "Search for products that have a price greater than $200.",
      template: `{ "query": { "range": { "product_price": { "gte": 200 } } } }`,
      index: 'products',

      tryThis: [

        "Change the \u0027gte\u0027 value to filter for products priced above a different threshold.",

      ],


      tooltips: {

        "product_price": "The field representing the price of the product.",

        "gte": "Greater than or equal to the specified value.",

      },

    },

    {
      id: 'example_5',
      title: "Find reviews submitted within the last 30 days",
      description: "Search for reviews submitted in the last 30 days using a relative date range.",
      template: `{ "query": { "range": { "review_date": { "gte": "now-30d/d", "lte": "now/d" } } } }`,
      index: 'product_reviews',

      tryThis: [

        "Change the range to \u0027now-7d/d\u0027 to filter for reviews from the last 7 days.",

      ],


      tooltips: {

        "review_date": "The field representing the date the review was created.",

        "gte": "Greater than or equal to the specified date, relative to now.",

        "lte": "Less than or equal to the specified date, relative to now.",

      },

    },

    {
      id: 'example_6',
      title: "Find users with a high trust score",
      description: "Search for users with a trust score of 80 or higher.",
      template: `{ "query": { "range": { "trust_score": { "gte": 80 } } } }`,
      index: 'product_users',

      tryThis: [

        "Adjust the \u0027gte\u0027 value to filter for users with a different minimum trust score.",

      ],


      tooltips: {

        "trust_score": "The field representing the user\u0027s trust score.",

        "gte": "Greater than or equal to the specified value.",

      },

    },

  ],
};
