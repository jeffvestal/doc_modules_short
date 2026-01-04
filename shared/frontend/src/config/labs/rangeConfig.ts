import type { LabConfig } from '../../types';

export const rangeConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'range_query',
  displayName: 'Range Query',
  description: "Returns documents that contain terms within a provided range.",
  docUrl: 'https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-range-query',

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
      title: "Find products within a price range",
      description: "Search for products priced between $20 and $50.",
      template: `{ "query": { "range": { "product_price": { "gte": 20, "lte": 50 } } } }`,
      index: 'products',

      tryThis: [

        "Try changing the price range to 30 and 70.",

        "Filter for products priced below $40 by using only \u0027lte\u0027.",

      ],


      tooltips: {

        "product_price": "The price of the product. Use \u0027gte\u0027 for greater than or equal to and \u0027lte\u0027 for less than or equal to.",

      },

    },

    {
      id: '2',
      title: "Top-rated reviews",
      description: "Retrieve reviews with a rating of 4 or higher.",
      template: `{ "query": { "range": { "review_rating": { "gte": 4 } } } }`,
      index: 'product_reviews',

      tryThis: [

        "Try lowering the rating to 3 to see more results.",

        "Find reviews with a maximum rating of 5 by adding \u0027lte: 5\u0027.",

      ],


      tooltips: {

        "review_rating": "The rating given in a review. Values range from 1 (lowest) to 5 (highest).",

      },

    },

    {
      id: '3',
      title: "Filter users with low trust scores",
      description: "Find users with a trust score of 80 or below.",
      template: `{ "query": { "range": { "trust_score": { "lte": 80 } } } }`,
      index: 'product_users',

      tryThis: [

        "Try finding users with trust scores greater than 50 by using \u0027gte: 50\u0027.",

        "Combine \u0027gte\u0027 and \u0027lte\u0027 to create a range, such as 50 to 80.",

      ],


      tooltips: {

        "trust_score": "A numerical score indicating user trustworthiness. Higher is better.",

      },

    },

    {
      id: '4',
      title: "Filter reviews by date",
      description: "Retrieve reviews posted in the year 2023.",
      template: `{ "query": { "range": { "review_date": { "gte": "2023-01-01", "lte": "2023-12-31" } } } }`,
      index: 'product_reviews',

      tryThis: [

        "Try changing the range to a single month, e.g., January 2023.",

        "Use only \u0027gte\u0027 to find reviews posted after a specific date.",

      ],


      tooltips: {

        "review_date": "The date a review was posted. Use date strings in \u0027YYYY-MM-DD\u0027 format.",

      },

    },

    {
      id: '5',
      title: "Find affordable products",
      description: "Search for products priced less than $30.",
      template: `{ "query": { "range": { "product_price": { "lte": 30 } } } }`,
      index: 'products',

      tryThis: [

        "Increase the price limit to $50 to find more results.",

        "Combine with \u0027gte\u0027 to create a range, e.g., $10 to $30.",

      ],


      tooltips: {

        "product_price": "The price of the product. Use \u0027lte\u0027 for less than or equal to.",

      },

    },

    {
      id: '6',
      title: "Find experienced users",
      description: "Retrieve users who have been members for 5 years or more.",
      template: `{ "query": { "range": { "member_since": { "lte": "now-5y/y" } } } }`,
      index: 'product_users',

      tryThis: [

        "Change the range to 3 years by using \u0027now-3y/y\u0027.",

        "Try filtering for newer users by using \u0027gte: now-1y/y\u0027.",

      ],


      tooltips: {

        "member_since": "The date when the user joined. Use date math like \u0027now-5y/y\u0027 for ranges.",

      },

    },

  ],
};
