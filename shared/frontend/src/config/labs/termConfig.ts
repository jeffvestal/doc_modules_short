import type { LabConfig } from '../../types';

export const termConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'term_query',
  displayName: 'Term Query',
  description: "Returns documents that contain an **exact** term in a provided field. You can use the `term` query to find documents based on a precise value such as a price, a product ID, or a username.",
  docUrl: 'https://elastic.co/docs/reference/query-languages/query-dsl/query-dsl-term-query',

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
      title: "Find a product by exact ID",
      description: "This query retrieves a product document with the exact product_id of \u002712345\u0027.",
      template: `{
  "query": {
    "term": {
      "product_id": {
        "value": "12345",
        "boost": 1.0
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Change the value of \u0027product_id\u0027 to another exact ID in your dataset and observe the results.",

      ],


      tooltips: {

        "product_id": "The ID of the product, which must be matched exactly.",

        "value": "The exact term value to match in the specified field.",

        "boost": "Optional parameter to influence the document\u0027s relevance score.",

      },

    },

    {
      id: '2',
      title: "Search for an exact product brand",
      description: "This query retrieves all products that have the exact brand name \u0027Acme\u0027.",
      template: `{
  "query": {
    "term": {
      "product_brand": {
        "value": "Acme",
        "boost": 1.0
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Replace \u0027Acme\u0027 with another brand name to see if products from that brand exist in your data.",

      ],


      tooltips: {

        "product_brand": "The field containing the product\u0027s brand name.",

        "value": "The exact brand name to search for.",

        "boost": "Optional parameter to prioritize results with this term.",

      },

    },

    {
      id: '3',
      title: "Find reviews with a specific rating",
      description: "This query retrieves all reviews that have a rating of exactly 5.",
      template: `{
  "query": {
    "term": {
      "review_rating": {
        "value": 5,
        "boost": 1.0
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Modify the \u0027value\u0027 field to another rating (e.g., 4 or 3) to see reviews with that rating.",

      ],


      tooltips: {

        "review_rating": "The rating given in the review, typically a number.",

        "value": "The exact rating to match in the specified field.",

        "boost": "Optional parameter to adjust the relevance of the results.",

      },

    },

    {
      id: '4',
      title: "Search for a verified purchase",
      description: "This query retrieves reviews where the purchase is marked as verified.",
      template: `{
  "query": {
    "term": {
      "verified_purchase": {
        "value": true,
        "boost": 1.0
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Toggle the \u0027value\u0027 between true and false to see reviews for verified and non-verified purchases.",

      ],


      tooltips: {

        "verified_purchase": "A boolean field indicating whether the purchase was verified.",

        "value": "Set this to true or false to match the desired state.",

        "boost": "Optional parameter to influence result ranking.",

      },

    },

    {
      id: '5',
      title: "Find a user by exact username",
      description: "This query retrieves a user document with the exact username \u0027johndoe\u0027.",
      template: `{
  "query": {
    "term": {
      "username": {
        "value": "johndoe",
        "boost": 1.0
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Replace \u0027johndoe\u0027 with another username to find a different user.",

      ],


      tooltips: {

        "username": "The username of the user, which must match exactly.",

        "value": "The exact username to search for.",

        "boost": "Optional parameter to adjust relevance ranking.",

      },

    },

    {
      id: '6',
      title: "Find users based on trust score",
      description: "This query retrieves all users with a trust score of exactly 90.",
      template: `{
  "query": {
    "term": {
      "trust_score": {
        "value": 90,
        "boost": 1.0
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Change the \u0027value\u0027 to a different trust score (e.g., 80 or 95) to find users with that score.",

      ],


      tooltips: {

        "trust_score": "The trust level of the user, usually a numerical value.",

        "value": "The exact trust score to match in the user data.",

        "boost": "Optional parameter to influence the scoring of results.",

      },

    },

  ],
};
