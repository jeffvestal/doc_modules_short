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
      id: 'example_1',
      title: "Find products within a price range",
      description: "This query retrieves products priced between $50 and $150.",
      template: `{
  "query": {
    "range": {
      "product_price": {
        "gte": 50,
        "lte": 150
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try changing the price range to see how the results vary.",

      ],


      tooltips: {

        "product_price": "Field representing the price of the product.",

        "gte": "Greater than or equal to this value.",

        "lte": "Less than or equal to this value.",

      },

    },

    {
      id: 'example_2',
      title: "Filter reviews by rating",
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

        "Adjust the rating threshold to find reviews with lower or higher ratings.",

      ],


      tooltips: {

        "review_rating": "Field representing the rating given in the review.",

        "gte": "Greater than or equal to this value.",

      },

    },

    {
      id: 'example_3',
      title: "Search for recent reviews",
      description: "Find reviews created in the last 30 days.",
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

        "Change the date range to explore reviews from different periods.",

      ],


      tooltips: {

        "review_date": "Field representing the date of the review.",

        "gte": "Start date of the range.",

        "lte": "End date of the range.",

        "now-30d/d": "Relative date, representing 30 days ago from today.",

      },

    },

    {
      id: 'example_4',
      title: "Find users by trust score range",
      description: "Retrieve users with a trust score between 60 and 90.",
      template: `{
  "query": {
    "range": {
      "trust_score": {
        "gte": 60,
        "lte": 90
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Modify the trust score range to include more or fewer users.",

      ],


      tooltips: {

        "trust_score": "Field representing the trust score of a user.",

        "gte": "Greater than or equal to this value.",

        "lte": "Less than or equal to this value.",

      },

    },

    {
      id: 'example_5',
      title: "Find users by membership duration",
      description: "Retrieve users who joined after January 1, 2020.",
      template: `{
  "query": {
    "range": {
      "member_since": {
        "gte": "2020-01-01T00:00:00"
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Try changing the date to find users who joined during different time periods.",

      ],


      tooltips: {

        "member_since": "Field representing the date the user became a member.",

        "gte": "Start date of the range.",

      },

    },

  ],
};
