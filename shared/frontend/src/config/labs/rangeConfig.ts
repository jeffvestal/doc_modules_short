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
      title: "Find products in a specific price range",
      description: "Search for products with prices between $30 and $60.",
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

        "Change the range to find products over $60.",

        "Try setting only a lower bound (gte) to see products above a certain price.",

      ],


      tooltips: {

        "gte": "Greater than or equal to the specified value.",

        "lte": "Less than or equal to the specified value.",

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

        "Change the range to find reviews with a lower rating.",

        "Combine this query with a term query to filter by verified purchases.",

      ],


      tooltips: {

        "gte": "Greater than or equal to the specified value.",

      },

    },

    {
      id: 'example_3',
      title: "Search for recent reviews",
      description: "Find reviews posted in the last 6 months.",
      template: `{
  "query": {
    "range": {
      "review_date": {
        "gte": "now-6M/M",
        "lte": "now/M"
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Adjust the range to search for reviews from the last year.",

        "Try combining this with a range filter on review_rating.",

      ],


      tooltips: {

        "gte": "Greater than or equal to the specified date.",

        "lte": "Less than or equal to the specified date.",

        "now-6M/M": "The start of the month, 6 months ago.",

        "now/M": "The start of the current month.",

      },

    },

    {
      id: 'example_4',
      title: "Find users by trust score",
      description: "Search for users with a trust score above 70.",
      template: `{
  "query": {
    "range": {
      "trust_score": {
        "gt": 70
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Change the range to find users with trust scores below 50.",

        "Combine this with a match query on interests to refine results.",

      ],


      tooltips: {

        "gt": "Greater than the specified value.",

      },

    },

    {
      id: 'example_5',
      title: "Filter products by price and boost relevance",
      description: "Search for products with prices between $20 and $80, boosting relevance for mid-range prices.",
      template: `{
  "query": {
    "range": {
      "product_price": {
        "gte": 20,
        "lte": 80,
        "boost": 1.5
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Adjust the boost value to prioritize mid-range products even more.",

        "Change the price range to focus on luxury products.",

      ],


      tooltips: {

        "gte": "Greater than or equal to the specified value.",

        "lte": "Less than or equal to the specified value.",

        "boost": "Increase the relevance score for documents matching this range.",

      },

    },

  ],
};
