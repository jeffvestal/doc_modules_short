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
      title: "Find products in a specific price range",
      description: "Retrieve products with prices between $20 and $50.",
      template: `{
  "query": {
    "range": {
      "product_price": {
        "gte": 20,
        "lte": 50
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Change the price range to 30 and 70 to get products in a higher price range.",

      ],


      tooltips: {

        "product_price": "The price of the product in USD.",

        "gte": "Greater than or equal to the specified value.",

        "lte": "Less than or equal to the specified value.",

      },

    },

    {
      id: '2',
      title: "Filter reviews with high ratings",
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

        "Change the minimum rating to 5 to find only the highest-rated reviews.",

      ],


      tooltips: {

        "review_rating": "The rating given in the review, ranging from 1 to 5.",

        "gte": "Greater than or equal to the specified value.",

      },

    },

    {
      id: '3',
      title: "Find users with a high trust score",
      description: "Retrieve users with a trust score between 70 and 100.",
      template: `{
  "query": {
    "range": {
      "trust_score": {
        "gte": 70,
        "lte": 100
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Adjust the range to 50 and 90 to include users with medium trust scores.",

      ],


      tooltips: {

        "trust_score": "A score representing the user\u0027s trustworthiness, between 0 and 100.",

        "gte": "Greater than or equal to the specified value.",

        "lte": "Less than or equal to the specified value.",

      },

    },

    {
      id: '4',
      title: "Find recent reviews",
      description: "Retrieve reviews submitted in the last week.",
      template: `{
  "query": {
    "range": {
      "review_date": {
        "gte": "now-1w/w",
        "lte": "now/w"
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change the range to the last month by using \u0027now-1M/M\u0027 instead of \u0027now-1w/w\u0027.",

      ],


      tooltips: {

        "review_date": "The date the review was submitted.",

        "gte": "Greater than or equal to the specified value.",

        "lte": "Less than or equal to the specified value.",

      },

    },

    {
      id: '5',
      title: "Find products in a specific category with a price range",
      description: "Retrieve \u0027Electronics\u0027 products priced between $50 and $100.",
      template: `{
  "query": {
    "bool": {
      "filter": [
        { "term": { "product_category": "Electronics" } },
        { "range": { "product_price": { "gte": 50, "lte": 100 } } }
      ]
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Change the category to \u0027Home and Kitchen\u0027 and the price range to $20-$70.",

      ],


      tooltips: {

        "product_category": "The category of the product (e.g., Electronics, Home and Kitchen).",

        "product_price": "The price of the product in USD.",

        "gte": "Greater than or equal to the specified value.",

        "lte": "Less than or equal to the specified value.",

      },

    },

    {
      id: '6',
      title: "Find verified reviews with high helpful votes",
      description: "Retrieve verified reviews with at least 20 helpful votes.",
      template: `{
  "query": {
    "bool": {
      "filter": [
        { "term": { "verified_purchase": "True" } },
        { "range": { "helpful_votes": { "gte": 20 } } }
      ]
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Increase the minimum helpful votes to 30 for stricter filtering.",

      ],


      tooltips: {

        "verified_purchase": "A flag indicating whether the review was written by a verified purchaser.",

        "helpful_votes": "The number of helpful votes this review has received.",

        "gte": "Greater than or equal to the specified value.",

      },

    },

  ],
};
