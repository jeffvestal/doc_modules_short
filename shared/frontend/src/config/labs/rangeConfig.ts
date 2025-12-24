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
      description: "This query retrieves all products priced between $30 and $60.",
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

        "Change the price range to find products priced below $40 or above $100.",

      ],


      tooltips: {

        "product_price": "The field representing the price of the product.",

        "gte": "Specifies the minimum value for the range.",

        "lte": "Specifies the maximum value for the range.",

      },

    },

    {
      id: '2',
      title: "Filter reviews by high ratings",
      description: "This query fetches reviews with a rating of 4 or higher.",
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

        "Modify the query to find reviews with a rating of 3 or less.",

      ],


      tooltips: {

        "review_rating": "The field representing the rating given in the review.",

        "gte": "Specifies the minimum rating to filter by.",

      },

    },

    {
      id: '3',
      title: "Find recent reviewers",
      description: "This query retrieves users who joined after January 1, 2020.",
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

        "Adjust the date range to find users who joined before 2019.",

      ],


      tooltips: {

        "member_since": "The field representing the date when the user joined.",

        "gte": "Specifies the start date for the range.",

      },

    },

    {
      id: '4',
      title: "Search for top reviewers",
      description: "This query finds users with a trust score greater than or equal to 80.",
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

        "Adjust the trust score threshold to find users with lower scores.",

      ],


      tooltips: {

        "trust_score": "The field representing the trust score of the user.",

        "gte": "Specifies the minimum trust score to filter by.",

      },

    },

    {
      id: '5',
      title: "Filter reviews by helpful votes",
      description: "This query retrieves reviews with at least 20 helpful votes.",
      template: `{
  "query": {
    "range": {
      "helpful_votes": {
        "gte": 20
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change the threshold to find reviews with fewer than 15 helpful votes.",

      ],


      tooltips: {

        "helpful_votes": "The field representing the number of helpful votes a review received.",

        "gte": "Specifies the minimum number of helpful votes to filter by.",

      },

    },

    {
      id: '6',
      title: "Find discounted products",
      description: "This query retrieves products with a price less than $50.",
      template: `{
  "query": {
    "range": {
      "product_price": {
        "lt": 50
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Alter the price range to find products costing more than $100.",

      ],


      tooltips: {

        "product_price": "The field representing the price of the product.",

        "lt": "Specifies the upper limit for the price range.",

      },

    },

  ],
};
