import type { LabConfig } from '../types';

export const range-queryConfig: LabConfig = {
  queryLanguage: '',
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
    products: 'product_description',
    product_reviews: 'review_text',
    product_users: 'interests',
  },
  sampleQueries: {
    products: "product_price: [10 TO 50]",
    product_reviews: "review_rating: [4 TO 5]",
    product_users: "age_group: [18 TO 35]",
  },
  queryStructure: {
    type: '',
    fieldPath: '',
  },
  examples: [

    {
      id: 'basic-range',
      title: "Basic Range Query",
      description: "Find products within a specific price range.",
      template: `{
  "query": {
    "range": {
      "product_price": {
        "gte": 20,
        "lte": 100
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Change the price range to [50 TO 200] and see the updated results.",

        "Try setting only a minimum price using \u0027gte\u0027.",

      ],


      tooltips: {

        gte: "Defines the minimum value (inclusive) for the range.",

        lte: "Defines the maximum value (inclusive) for the range.",

      },

    },

    {
      id: 'date-range',
      title: "Date Range Query",
      description: "Retrieve reviews written within a specific date range.",
      template: `{
  "query": {
    "range": {
      "review_date": {
        "gte": "2023-01-01",
        "lte": "2023-12-31"
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change the date range to only include reviews from the last month.",

        "Use \u0027now-7d/d\u0027 as the start date to see reviews from the last 7 days.",

      ],


      tooltips: {

        review_date: "The field containing the review dates.",

        gte: "Defines the start of the date range (inclusive).",

        lte: "Defines the end of the date range (inclusive).",

      },

    },

    {
      id: 'boosted-range',
      title: "Boosted Range Query",
      description: "Boost the relevance of documents within a specific range.",
      template: `{
  "query": {
    "range": {
      "product_price": {
        "gte": 30,
        "lte": 70,
        "boost": 2.0
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Change the \u0027boost\u0027 value to 3.0 and observe the effect on relevance scores.",

        "Try removing the \u0027boost\u0027 parameter and compare the results.",

      ],


      tooltips: {

        boost: "Increases the relevance score of documents matching this range.",

        product_price: "The field representing the product\u0027s price.",

      },

    },

    {
      id: 'time-zone-range',
      title: "Range Query with Time Zone",
      description: "Consider a specific time zone when querying date ranges.",
      template: `{
  "query": {
    "range": {
      "review_date": {
        "gte": "2023-01-01",
        "lte": "2023-01-31",
        "time_zone": "+01:00"
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change the time zone to \u0027-05:00\u0027 and examine the results.",

        "Try adjusting the date range to include an earlier month.",

      ],


      tooltips: {

        time_zone: "Adjusts the range to a specific time zone.",

        review_date: "The field containing the review dates.",

      },

    },

    {
      id: 'exclusive-range',
      title: "Exclusive Range Query",
      description: "Use exclusive boundaries in the range query.",
      template: `{
  "query": {
    "range": {
      "review_rating": {
        "gt": 3,
        "lt": 5
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change the boundaries to include exact matches using \u0027gte\u0027 and \u0027lte\u0027.",

        "Experiment with ratings below 3 or above 4.5.",

      ],


      tooltips: {

        gt: "Defines the minimum value (exclusive) for the range.",

        lt: "Defines the maximum value (exclusive) for the range.",

      },

    },

    {
      id: 'multi-range-fields',
      title: "Range Query on Multiple Fields",
      description: "Filter users by age group and trust score.",
      template: `{
  "query": {
    "bool": {
      "must": [
        {
          "range": {
            "age_group": {
              "gte": 25,
              "lte": 40
            }
          }
        },
        {
          "range": {
            "trust_score": {
              "gte": 70
            }
          }
        }
      ]
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Change the age range to 18-30 and trust score to 50-100.",

        "Try using only one range filter instead of two.",

      ],


      tooltips: {

        bool: "Combines multiple query clauses using logical operators.",

        must: "Requires all conditions within this clause to be satisfied.",

        age_group: "The field representing the age group of the user.",

        trust_score: "The field representing the user\u0027s trust score.",

      },

    },

  ],
};
