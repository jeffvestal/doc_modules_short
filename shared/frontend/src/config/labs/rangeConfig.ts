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
      title: "Filter Products by Price Range",
      description: "Find products priced between $30 and $60.",
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

        "Change the price range to find products under $50.",

        "Use \u0027gt\u0027 or \u0027lt\u0027 to find products strictly greater or less than a price.",

      ],


      tooltips: {

        "gte": "Sets the lower bound of the range (greater than or equal to).",

        "lte": "Sets the upper bound of the range (less than or equal to).",

      },

    },

    {
      id: '2',
      title: "Find Highly Rated Reviews",
      description: "Search for product reviews with ratings between 4 and 5.",
      template: `{
  "query": {
    "range": {
      "review_rating": {
        "gte": 4,
        "lte": 5
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Modify \u0027gte\u0027 to 3 to include moderately rated reviews.",

        "Remove \u0027lte\u0027 to see reviews with ratings 4 and above.",

      ],


      tooltips: {

        "gte": "Specifies the minimum rating to include in the results.",

        "lte": "Specifies the maximum rating to include in the results.",

      },

    },

    {
      id: '3',
      title: "Filter Users by Review Activity",
      description: "Find users who have written between 10 and 50 reviews.",
      template: `{
  "query": {
    "range": {
      "total_reviews_count": {
        "gte": 10,
        "lte": 50
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Increase \u0027lte\u0027 to 100 to include more active users.",

        "Use \u0027gt\u0027 and \u0027lt\u0027 to exclude the boundary values.",

      ],


      tooltips: {

        "gte": "Include users with at least this many reviews.",

        "lte": "Include users with reviews up to this maximum.",

      },

    },

    {
      id: '4',
      title: "Search Products in Upper Price Range",
      description: "Find products priced above $100.",
      template: `{
  "query": {
    "range": {
      "product_price": {
        "gt": 100
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Add a \u0027lt\u0027 filter to set an upper limit on the price.",

        "Search for products priced above $200.",

      ],


      tooltips: {

        "gt": "Filters results to include values greater than this threshold.",

      },

    },

    {
      id: '5',
      title: "Find Recent Reviews",
      description: "Search for reviews from the last 30 days.",
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

        "Change \u002730d\u0027 to \u00277d\u0027 to find reviews from the last week.",

        "Use \u0027now-1y/y\u0027 to filter reviews from the past year.",

      ],


      tooltips: {

        "gte": "Specifies the start of the date range. Use relative dates like \u0027now-30d/d\u0027.",

        "lte": "Specifies the end of the date range. Use \u0027now\u0027 for the current date.",

      },

    },

    {
      id: '6',
      title: "Filter Users by Trust Score",
      description: "Find users with a trust score between 70 and 90.",
      template: `{
  "query": {
    "range": {
      "trust_score": {
        "gte": 70,
        "lte": 90
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Increase \u0027lte\u0027 to 100 to include users with perfect trust scores.",

        "Set \u0027gte\u0027 to 50 to include users with lower trust scores.",

      ],


      tooltips: {

        "gte": "The minimum trust score to include.",

        "lte": "The maximum trust score to include.",

      },

    },

  ],
};
