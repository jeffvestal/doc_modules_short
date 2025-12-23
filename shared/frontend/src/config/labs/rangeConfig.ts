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
      id: 'range_query_price',
      title: "Find products within a specific price range",
      description: "This query retrieves products with prices between $30 and $60.",
      template: `{
  "query": {
    "range": {
      "product_price": {
        "gte": 30,
        "lte": 60
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Adjust the price range to explore products in different budget categories.",

      ],


      tooltips: {

        "gte": "Specifies the inclusive lower bound for the range.",

        "lte": "Specifies the inclusive upper bound for the range.",

      },

    },

    {
      id: 'range_query_review_rating',
      title: "Find reviews with high ratings",
      description: "This query retrieves reviews with a rating of 4 or higher.",
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

        "Change the rating range to find reviews with lower ratings.",

      ],


      tooltips: {

        "gte": "Specifies the minimum rating to include in the results.",

      },

    },

    {
      id: 'range_query_review_date',
      title: "Find reviews from the last month",
      description: "This query retrieves reviews submitted within the last month.",
      template: `{
  "query": {
    "range": {
      "review_date": {
        "gte": "now-1M/M",
        "lte": "now/M"
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Modify the date range to explore reviews from different time periods.",

      ],


      tooltips: {

        "gte": "Defines the start of the range using a relative date (e.g., \u0027now-1M/M\u0027 for the start of last month).",

        "lte": "Defines the end of the range using a relative date (e.g., \u0027now/M\u0027 for the end of the current month).",

      },

    },

    {
      id: 'range_query_user_trust',
      title: "Find users with high trust scores",
      description: "This query retrieves users with a trust score greater than 4.5.",
      template: `{
  "query": {
    "range": {
      "trust_score": {
        "gt": 4.5
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Experiment with different trust score thresholds to find users with varying levels of trust.",

      ],


      tooltips: {

        "gt": "Specifies the exclusive lower bound for the range.",

      },

    },

    {
      id: 'range_query_reviews_helpful_votes',
      title: "Find reviews with a high number of helpful votes",
      description: "This query retrieves reviews with more than 20 helpful votes.",
      template: `{
  "query": {
    "range": {
      "helpful_votes": {
        "gt": 20
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Adjust the number of helpful votes to find reviews with varying levels of engagement.",

      ],


      tooltips: {

        "gt": "Specifies the exclusive lower bound for the range.",

      },

    },

    {
      id: 'range_query_user_reviews',
      title: "Find active users based on review count",
      description: "This query retrieves users who have written at least 15 reviews.",
      template: `{
  "query": {
    "range": {
      "total_reviews_count": {
        "gte": 15
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Lower the minimum review count to find less active users.",

      ],


      tooltips: {

        "gte": "Specifies the inclusive lower bound for the range.",

      },

    },

  ],
};
