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
      title: "Find products within a specific price range",
      description: "Search for products priced between $30 and $60.",
      template: `{ "query": { "range": { "product_price": { "gte": 30, "lte": 60 } } } }`,
      index: 'products',

      tryThis: [

        "Try changing the price range to $50-$100.",

        "Experiment with using only a minimum price (e.g., gte: 20).",

      ],


      tooltips: {

        "product_price": "The price of the product in dollars.",

        "gte": "The minimum value for the range.",

        "lte": "The maximum value for the range.",

      },

    },

    {
      id: 'example_2',
      title: "Filter reviews with high ratings",
      description: "Retrieve reviews with a rating of 4 or higher.",
      template: `{ "query": { "range": { "review_rating": { "gte": 4 } } } }`,
      index: 'product_reviews',

      tryThis: [

        "Adjust the minimum rating to 3 and see how the results change.",

        "Try adding an upper limit (e.g., lte: 5) to find reviews within a specific range.",

      ],


      tooltips: {

        "review_rating": "The rating given to a product in a review, ranging from 1 to 5.",

        "gte": "The minimum rating value to include in the results.",

      },

    },

    {
      id: 'example_3',
      title: "Filter users by trust score",
      description: "Find users with a trust score between 70 and 100.",
      template: `{ "query": { "range": { "trust_score": { "gte": 70, "lte": 100 } } } }`,
      index: 'product_users',

      tryThis: [

        "Adjust the trust score range to 50-90 to see different results.",

        "Try removing the upper limit (lte) to find users with trust scores above a certain value.",

      ],


      tooltips: {

        "trust_score": "A score representing the user\u0027s trustworthiness, ranging from 0 to 100.",

        "gte": "The minimum trust score value to include in the results.",

        "lte": "The maximum trust score value to include in the results.",

      },

    },

    {
      id: 'example_4',
      title: "Retrieve recent reviews",
      description: "Search for reviews posted within the last 30 days.",
      template: `{ "query": { "range": { "review_date": { "gte": "now-30d/d", "lte": "now/d" } } } }`,
      index: 'product_reviews',

      tryThis: [

        "Change the range to the last 7 days (e.g., now-7d/d).",

        "Try using only a lower bound (gte) to include reviews from a specific date onward.",

      ],


      tooltips: {

        "review_date": "The date when the review was posted.",

        "gte": "The start date of the range (e.g., now-30d/d for the last 30 days).",

        "lte": "The end date of the range (e.g., now/d for the current day).",

      },

    },

    {
      id: 'example_5',
      title: "Find products with premium prices",
      description: "Retrieve products priced over $100.",
      template: `{ "query": { "range": { "product_price": { "gte": 100 } } } }`,
      index: 'products',

      tryThis: [

        "Modify the query to include products priced between $50 and $150.",

        "Remove the upper limit to find all products above a specific price.",

      ],


      tooltips: {

        "product_price": "The price of the product in dollars.",

        "gte": "The minimum price value to include in the results.",

      },

    },

    {
      id: 'example_6',
      title: "Find highly rated reviews with helpful votes",
      description: "Search for reviews with a rating of 5 and more than 20 helpful votes.",
      template: `{ "query": { "bool": { "must": [ { "range": { "review_rating": { "gte": 5 } } }, { "range": { "helpful_votes": { "gte": 20 } } } ] } } }`,
      index: 'product_reviews',

      tryThis: [

        "Change the helpful votes range to 15-30.",

        "Try using a rating range of 4 to 5 instead of a fixed value.",

      ],


      tooltips: {

        "review_rating": "The rating given to a product in a review, ranging from 1 to 5.",

        "helpful_votes": "The number of votes indicating the review was helpful.",

        "gte": "The minimum value to include in the results.",

      },

    },

  ],
};
