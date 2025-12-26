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
      description: "Search for products with a price between $50 and $100.",
      template: `{
  "query": {
    "range": {
      "product_price": {
        "gte": 50,
        "lte": 100
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Modify the price range to find products above $75.",

      ],


      tooltips: {

        "product_price": "The price of the product in USD.",

        "gte": "Greater than or equal to.",

        "lte": "Less than or equal to.",

      },

    },

    {
      id: 'example_2',
      title: "Filter reviews with high ratings",
      description: "Retrieve reviews with a rating of 4 or higher.",
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

        "Experiment with ratings of 3 or higher to include more reviews.",

      ],


      tooltips: {

        "review_rating": "The rating given by the reviewer, ranging from 1 to 5.",

        "gte": "Greater than or equal to.",

      },

    },

    {
      id: 'example_3',
      title: "Find recent reviews",
      description: "Search for reviews posted within the last month.",
      template: `{
  "query": {
    "range": {
      "review_date": {
        "gte": "now-1M/M",
        "lte": "now"
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change the range to look for reviews from the last week.",

      ],


      tooltips: {

        "review_date": "The date the review was posted.",

        "gte": "Greater than or equal to.",

        "lte": "Less than or equal to.",

        "now-1M/M": "The beginning of the current month minus 1 month.",

      },

    },

    {
      id: 'example_4',
      title: "Find trusted users",
      description: "Search for users with a trust score of 80 or higher.",
      template: `{
  "query": {
    "range": {
      "trust_score": {
        "gte": 80
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Adjust the trust score threshold to 90 for even more trusted users.",

      ],


      tooltips: {

        "trust_score": "A score representing the user\u0027s trust level.",

        "gte": "Greater than or equal to.",

      },

    },

    {
      id: 'example_5',
      title: "Search for mid-range priced products",
      description: "Find products with prices between $25 and $75.",
      template: `{
  "query": {
    "range": {
      "product_price": {
        "gte": 25,
        "lte": 75
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Experiment with a price range of $10 to $50.",

      ],


      tooltips: {

        "product_price": "The price of the product in USD.",

        "gte": "Greater than or equal to.",

        "lte": "Less than or equal to.",

      },

    },

    {
      id: 'example_6',
      title: "Find recent premium user activity",
      description: "Search for premium users who joined within the last year.",
      template: `{
  "query": {
    "range": {
      "member_since": {
        "gte": "now-1y/y",
        "lte": "now"
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Change the range to find users who joined in the last 6 months.",

      ],


      tooltips: {

        "member_since": "The date the user created their account.",

        "gte": "Greater than or equal to.",

        "lte": "Less than or equal to.",

        "now-1y/y": "The start of the current year minus 1 year.",

      },

    },

  ],
};
