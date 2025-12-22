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
      title: "Filter products within a price range",
      description: "Retrieve products priced between $50 and $200.",
      template: `{
  "query": {
    "range": {
      "product_price": {
        "gte": 50,
        "lte": 200
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Modify the price range to search for luxury products above $500.",

      ],


      tooltips: {

        "gte": "The minimum value (inclusive) for the range.",

        "lte": "The maximum value (inclusive) for the range.",

      },

    },

    {
      id: 'example_2',
      title: "Filter reviews with high ratings",
      description: "Retrieve reviews with ratings greater than 3 and up to 5.",
      template: `{
  "query": {
    "range": {
      "review_rating": {
        "gt": 3,
        "lte": 5
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change the range to find reviews with low or average ratings (e.g., 1 to 3).",

      ],


      tooltips: {

        "gt": "The minimum value (exclusive) for the range.",

        "lte": "The maximum value (inclusive) for the range.",

      },

    },

    {
      id: 'example_3',
      title: "Find users who joined within a specific time frame",
      description: "Retrieve users who became members between 2015 and 2022.",
      template: `{
  "query": {
    "range": {
      "member_since": {
        "gte": "2015-01-01",
        "lte": "2022-12-31"
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Adjust the date range to find users who joined more recently (e.g., after 2020).",

      ],


      tooltips: {

        "gte": "The earliest date (inclusive) for the range.",

        "lte": "The latest date (inclusive) for the range.",

      },

    },

    {
      id: 'example_4',
      title: "Filter products by price and boost results",
      description: "Retrieve products priced under $100 and boost their relevance by a factor of 2.",
      template: `{
  "query": {
    "range": {
      "product_price": {
        "lte": 100,
        "boost": 2.0
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Experiment with different boost values to alter the relevance of results.",

      ],


      tooltips: {

        "lte": "The maximum value (inclusive) for the range.",

        "boost": "A multiplier for the relevance score of matching documents.",

      },

    },

    {
      id: 'example_5',
      title: "Filter reviews by date range",
      description: "Retrieve reviews posted within the last 7 days.",
      template: `{
  "query": {
    "range": {
      "review_date": {
        "gte": "now-7d/d",
        "lte": "now/d"
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Extend the date range to retrieve reviews from the last 30 days.",

      ],


      tooltips: {

        "gte": "The start of the range, relative to now.",

        "lte": "The end of the range, relative to now.",

      },

    },

  ],
};
