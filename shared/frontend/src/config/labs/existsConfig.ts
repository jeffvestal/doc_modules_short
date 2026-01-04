import type { LabConfig } from '../../types';

export const existsConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'exists_query',
  displayName: 'Exists Query',
  description: "Returns documents that contain an indexed value for a field. An indexed value may not exist for a document\u2019s field due to a variety of reasons: - The field in the source JSON is `null` or `[]` - The field has `\"index\" : false` and `\"doc_values\" : false` set in the mapping - The length of the field value exceeded an `ignore_above` setting in the mapping - The field value was malformed and `ignore_malformed` was defined in the mapping",
  docUrl: 'https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-exists-query',

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
      id: '1',
      title: "Find products with a description",
      description: "This query retrieves products that have a value in the `product_description` field.",
      template: `{
  "query": {
    "exists": {
      "field": "product_description"
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try changing `product_description` to `product_category` to check for indexed categories.",

      ],


      tooltips: {

        "field": "Specify the field name to check for an existing indexed value.",

      },

    },

    {
      id: '2',
      title: "Identify reviews with a rating",
      description: "This query retrieves reviews that have a value in the `review_rating` field.",
      template: `{
  "query": {
    "exists": {
      "field": "review_rating"
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Try changing `review_rating` to `verified_purchase` to find reviews with verified purchase information.",

      ],


      tooltips: {

        "field": "Specify the field name to check for an existing indexed value.",

      },

    },

    {
      id: '3',
      title: "Find users with a username",
      description: "This query retrieves users that have a value in the `username` field.",
      template: `{
  "query": {
    "exists": {
      "field": "username"
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Try changing `username` to `email` to locate users with an email address indexed.",

      ],


      tooltips: {

        "field": "Specify the field name to check for an existing indexed value.",

      },

    },

    {
      id: '4',
      title: "Find reviews with helpful votes",
      description: "This query retrieves reviews that have a value in the `helpful_votes` field.",
      template: `{
  "query": {
    "exists": {
      "field": "helpful_votes"
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Try changing `helpful_votes` to `review_text` to retrieve reviews with text content.",

      ],


      tooltips: {

        "field": "Specify the field name to check for an existing indexed value.",

      },

    },

    {
      id: '5',
      title: "Find users with a trust score",
      description: "This query retrieves users that have a value in the `trust_score` field.",
      template: `{
  "query": {
    "exists": {
      "field": "trust_score"
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Try changing `trust_score` to `location_city` to find users with a city indexed.",

      ],


      tooltips: {

        "field": "Specify the field name to check for an existing indexed value.",

      },

    },

  ],
};
