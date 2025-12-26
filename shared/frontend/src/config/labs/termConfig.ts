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
      title: "Find products in a specific category",
      description: "Search for products in the \u0027Electronics\u0027 category.",
      template: `{
  "query": {
    "term": {
      "product_category": {
        "value": "Electronics",
        "boost": 1.0
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Change the `value` to another category such as \u0027Books\u0027 or \u0027Clothing\u0027.",

      ],


      tooltips: {

        "product_category": "This field represents the product\u0027s category. It is a keyword field, so the value must match exactly.",

        "value": "The exact term to match in the specified field.",

        "boost": "Optional. Boosts the relevance score of the query. Default is 1.0.",

      },

    },

    {
      id: '2',
      title: "Find reviews with a specific rating",
      description: "Search for reviews with a rating of 5.",
      template: `{
  "query": {
    "term": {
      "review_rating": {
        "value": 5,
        "boost": 1.5
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Try changing the `value` to 4 or 1 to see reviews with different ratings.",

      ],


      tooltips: {

        "review_rating": "This field represents the rating given in a review. Use a numeric value between 1 and 5.",

        "value": "The exact rating value to match.",

        "boost": "Optional. Increases the relevance of documents with this rating. Higher values make these results rank higher.",

      },

    },

    {
      id: '3',
      title: "Find users with a specific account type",
      description: "Search for users with a \u0027Premium\u0027 account.",
      template: `{
  "query": {
    "term": {
      "account_type": {
        "value": "Premium",
        "boost": 1.0
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Change the `value` to \u0027Free\u0027 or \u0027Enterprise\u0027 to find users with different account types.",

      ],


      tooltips: {

        "account_type": "This field represents the user\u0027s account type. Use exact values like \u0027Free\u0027, \u0027Premium\u0027, or \u0027Enterprise\u0027.",

        "value": "The exact term to match for the account type.",

        "boost": "Optional. Adjust the relevance score for matches. Default is 1.0.",

      },

    },

    {
      id: '4',
      title: "Find products by brand",
      description: "Search for products from the brand \u0027AudioMax\u0027.",
      template: `{
  "query": {
    "term": {
      "product_brand": {
        "value": "AudioMax",
        "boost": 1.0
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try using \u0027GlowNaturals\u0027 or \u0027WorkEase\u0027 as the brand value.",

      ],


      tooltips: {

        "product_brand": "This field represents the brand of the product. Use exact brand names like \u0027AudioMax\u0027 or \u0027GlowNaturals\u0027.",

        "value": "The exact term to match for the product\u0027s brand.",

        "boost": "Optional. Adjust the relevance score for matches. Default is 1.0.",

      },

    },

    {
      id: '5',
      title: "Find verified reviews",
      description: "Search for reviews that are marked as verified purchases.",
      template: `{
  "query": {
    "term": {
      "verified_purchase": {
        "value": "True",
        "boost": 1.0
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change the `value` to \u0027False\u0027 to find non-verified reviews.",

      ],


      tooltips: {

        "verified_purchase": "This field indicates whether the review is from a verified purchase. Use \u0027True\u0027 or \u0027False\u0027 as string values.",

        "value": "The exact term to match for verified purchase status.",

        "boost": "Optional. Adjust the relevance score for matches. Default is 1.0.",

      },

    },

    {
      id: '6',
      title: "Find users by username",
      description: "Search for a user with the username \u0027AveryWilliams55\u0027.",
      template: `{
  "query": {
    "term": {
      "username": {
        "value": "AveryWilliams55",
        "boost": 1.0
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Change the `value` to another username like \u0027CameronLopez20\u0027 or \u0027JordanMartinez33\u0027.",

      ],


      tooltips: {

        "username": "This field represents the unique username of a user. Use exact usernames for matching.",

        "value": "The exact term to match for the username.",

        "boost": "Optional. Adjust the relevance score for matches. Default is 1.0.",

      },

    },

  ],
};
