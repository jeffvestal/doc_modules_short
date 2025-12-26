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
      title: "Find products within a price range",
      description: "Search for products priced between $30 and $70.",
      template: `{
  "query": {
    "range": {
      "product_price": {
        "gte": 30,
        "lte": 70
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Change the price range to $20 - $50.",

        "Try using only \u0027gte\u0027 or \u0027lte\u0027 to set a minimum or maximum.",

      ],


      tooltips: {

        "product_price": "The price of the product in USD.",

        "gte": "Greater than or equal to the specified value.",

        "lte": "Less than or equal to the specified value.",

      },

    },

    {
      id: '2',
      title: "Retrieve highly rated reviews",
      description: "Get reviews with a rating of 4 or higher.",
      template: `{
  "query": {
    "range": {
      "review_rating": {
        "gte": 4
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Adjust the minimum rating to 3.",

        "Add an upper limit by using \u0027lte\u0027.",

      ],


      tooltips: {

        "review_rating": "The rating given in the review (1-5).",

        "gte": "Greater than or equal to the specified value.",

      },

    },

    {
      id: '3',
      title: "Search for recent reviews",
      description: "Find reviews posted in the last 30 days.",
      template: `{
  "query": {
    "range": {
      "review_date": {
        "gte": "now-30d/d",
        "lte": "now/d"
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change the time range to the last 7 days.",

        "Adjust the query to only include reviews before today.",

      ],


      tooltips: {

        "review_date": "The date the review was posted.",

        "gte": "Greater than or equal to the specified value.",

        "lte": "Less than or equal to the specified value.",

        "now-30d/d": "A relative date range indicating 30 days ago.",

      },

    },

    {
      id: '4',
      title: "Filter users by membership date",
      description: "Find users who joined after January 1, 2020.",
      template: `{
  "query": {
    "range": {
      "member_since": {
        "gte": "2020-01-01"
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Change the date to \u00272019-01-01\u0027 to look further back.",

        "Add an upper limit to find users who joined within a specific timeframe.",

      ],


      tooltips: {

        "member_since": "The date the user joined.",

        "gte": "Greater than or equal to the specified value.",

      },

    },

    {
      id: '5',
      title: "Find products in premium price range",
      description: "Search for products priced above $100.",
      template: `{
  "query": {
    "range": {
      "product_price": {
        "gte": 100
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Lower the price threshold to $80.",

        "Include an upper limit to restrict the range.",

      ],


      tooltips: {

        "product_price": "The price of the product in USD.",

        "gte": "Greater than or equal to the specified value.",

      },

    },

    {
      id: '6',
      title: "Filter by user\u0027s trust score",
      description: "Find users with a trust score between 50 and 80.",
      template: `{
  "query": {
    "range": {
      "trust_score": {
        "gte": 50,
        "lte": 80
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Expand the range to include trust scores above 80.",

        "Remove \u0027lte\u0027 to only filter by the minimum trust score.",

      ],


      tooltips: {

        "trust_score": "A score representing the user\u0027s reliability.",

        "gte": "Greater than or equal to the specified value.",

        "lte": "Less than or equal to the specified value.",

      },

    },

  ],
};
