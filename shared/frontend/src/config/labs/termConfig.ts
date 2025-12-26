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
      title: "Find products in the \u0027Electronics\u0027 category",
      description: "This query retrieves all products from the \u0027Electronics\u0027 category.",
      template: `{
  "query": {
    "term": {
      "product_category": {
        "value": "Electronics"
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Change the category to \u0027Home and Kitchen\u0027 or \u0027Books\u0027 and observe the results.",

        "Try searching for a category that doesn\u0027t exist in the data.",

      ],


      tooltips: {

        "product_category": "This field contains predefined categories of products. Use the exact values listed in the dataset (e.g., \u0027Electronics\u0027).",

        "value": "The exact term you want to match. The match is case-sensitive and must be an exact match.",

      },

    },

    {
      id: 'example_2',
      title: "Find 5-star reviews",
      description: "This query retrieves all reviews that have a rating of 5 stars.",
      template: `{
  "query": {
    "term": {
      "review_rating": {
        "value": 5
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change the rating to 4 or 3 to find reviews with lower ratings.",

        "Try using a rating value not present in the dataset and observe the results.",

      ],


      tooltips: {

        "review_rating": "This field contains the numerical rating given in a review, ranging from 1 to 5.",

        "value": "The exact rating value to match. Ensure that the value exists in the dataset.",

      },

    },

    {
      id: 'example_3',
      title: "Find users with a \u0027Premium\u0027 account type",
      description: "This query retrieves all users who have a \u0027Premium\u0027 account type.",
      template: `{
  "query": {
    "term": {
      "account_type": {
        "value": "Premium"
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Change the account type to \u0027Free\u0027 or \u0027Enterprise\u0027 to find different types of users.",

        "Try using a lowercase value like \u0027premium\u0027 and observe how the case sensitivity affects the results.",

      ],


      tooltips: {

        "account_type": "This field defines the account type of the user. Valid values are \u0027Free\u0027, \u0027Premium\u0027, and \u0027Enterprise\u0027.",

        "value": "The exact term you want to match. Note that this is case-sensitive.",

      },

    },

    {
      id: 'example_4',
      title: "Find products from the \u0027AudioMax\u0027 brand",
      description: "This query retrieves all products that are manufactured by the \u0027AudioMax\u0027 brand.",
      template: `{
  "query": {
    "term": {
      "product_brand": {
        "value": "AudioMax"
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Change the brand to \u0027GlowNaturals\u0027 or \u0027PlaySmart\u0027 to find products from other manufacturers.",

        "Use a brand name that doesn\u0027t exist in the dataset and observe the results.",

      ],


      tooltips: {

        "product_brand": "This field contains the name of the product\u0027s brand. Use the exact values listed in the dataset (e.g., \u0027AudioMax\u0027).",

        "value": "The exact term you want to match. The match is case-sensitive and must be an exact match.",

      },

    },

    {
      id: 'example_5',
      title: "Find reviews marked as verified purchase",
      description: "This query retrieves all reviews that are marked as a verified purchase.",
      template: `{
  "query": {
    "term": {
      "verified_purchase": {
        "value": "True"
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change the value to \u0027False\u0027 to find reviews that are not verified purchases.",

        "Try using lowercase \u0027true\u0027 or \u0027false\u0027 and observe the case sensitivity of the query.",

      ],


      tooltips: {

        "verified_purchase": "This field indicates whether the purchase was verified. Valid values are \u0027True\u0027 and \u0027False\u0027 (case-sensitive).",

        "value": "The exact term you want to match. Note that this is case-sensitive.",

      },

    },

    {
      id: 'example_6',
      title: "Find products priced at $89.99",
      description: "This query retrieves all products that have a price of $89.99.",
      template: `{
  "query": {
    "term": {
      "product_price": {
        "value": 89.99
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Change the price to $49.99 or $129.99 to find products with other prices.",

        "Use a price that doesn\u0027t exist in the dataset (e.g., $199.99) and observe the results.",

      ],


      tooltips: {

        "product_price": "This field represents the price of the product. Use exact numerical values as listed in the dataset.",

        "value": "The exact price value you want to match. Ensure it matches the dataset format (e.g., 89.99).",

      },

    },

  ],
};
