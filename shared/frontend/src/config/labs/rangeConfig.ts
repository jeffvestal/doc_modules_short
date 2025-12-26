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
      id: '1',
      title: "Find products within a specific price range",
      description: "This query retrieves all products with a price between $20 and $50.",
      template: `{"query": {"range": {"product_price": {"gte": 20, "lte": 50}}}}`,
      index: 'products',

      tryThis: [

        "Change the price range to 10-30 to find cheaper products.",

        "Try using only `gte` to find products with a price greater than or equal to 30.",

      ],


      tooltips: {

        "product_price": "The price of the product in USD.",

        "gte": "Greater than or equal to the specified value.",

        "lte": "Less than or equal to the specified value.",

      },

    },

    {
      id: '2',
      title: "Retrieve highly-rated reviews",
      description: "Fetch reviews where the rating is between 4 and 5 stars.",
      template: `{"query": {"range": {"review_rating": {"gte": 4, "lte": 5}}}}`,
      index: 'product_reviews',

      tryThis: [

        "Change the range to 3-5 to include moderately rated reviews.",

        "Remove `lte` to only retrieve reviews rated 4 or higher.",

      ],


      tooltips: {

        "review_rating": "The star rating given to a product, ranging from 1 to 5.",

        "gte": "Greater than or equal to the specified value.",

        "lte": "Less than or equal to the specified value.",

      },

    },

    {
      id: '3',
      title: "Filter users by trust score",
      description: "Retrieve user profiles with a trust score between 80 and 100.",
      template: `{"query": {"range": {"trust_score": {"gte": 80, "lte": 100}}}}`,
      index: 'product_users',

      tryThis: [

        "Adjust the range to 70-90 to include users with a lower trust score.",

        "Remove `gte` to find users with a trust score below 100.",

      ],


      tooltips: {

        "trust_score": "A score indicating the trustworthiness of a user.",

        "gte": "Greater than or equal to the specified value.",

        "lte": "Less than or equal to the specified value.",

      },

    },

    {
      id: '4',
      title: "Find recent reviews",
      description: "Retrieve reviews posted within the last 30 days.",
      template: `{"query": {"range": {"review_date": {"gte": "now-30d/d", "lte": "now/d"}}}}`,
      index: 'product_reviews',

      tryThis: [

        "Change the range to `now-7d/d` to find reviews from the last week.",

        "Remove `lte` to include all reviews from the past 30 days onward.",

      ],


      tooltips: {

        "review_date": "The date when the review was posted.",

        "gte": "Greater than or equal to the specified value.",

        "lte": "Less than or equal to the specified value.",

        "now": "Represents the current date and time.",

      },

    },

    {
      id: '5',
      title: "Filter products by mid-range prices",
      description: "Find products priced between $30 and $70.",
      template: `{"query": {"range": {"product_price": {"gte": 30, "lte": 70}}}}`,
      index: 'products',

      tryThis: [

        "Change the range to 50-100 to find higher-priced products.",

        "Use only `lte` to find products cheaper than $70.",

      ],


      tooltips: {

        "product_price": "The price of the product in USD.",

        "gte": "Greater than or equal to the specified value.",

        "lte": "Less than or equal to the specified value.",

      },

    },

    {
      id: '6',
      title: "Retrieve products within a specific brand and price range",
      description: "Fetch products from the brand \u0027GlowNaturals\u0027 priced between $20 and $60.",
      template: `{"query": {"bool": {"must": [{"term": {"product_brand": "GlowNaturals"}}, {"range": {"product_price": {"gte": 20, "lte": 60}}}]}}}`,
      index: 'products',

      tryThis: [

        "Change the brand to \u0027AudioMax\u0027 to find products from another brand.",

        "Adjust the price range to $50-$100 to find more expensive items.",

      ],


      tooltips: {

        "product_brand": "The brand name of the product.",

        "product_price": "The price of the product in USD.",

        "gte": "Greater than or equal to the specified value.",

        "lte": "Less than or equal to the specified value.",

      },

    },

  ],
};
