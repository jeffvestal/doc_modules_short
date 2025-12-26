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
      id: 'term_query_product_category',
      title: "Find products in a specific category",
      description: "This query retrieves all products that belong to the \u0027Electronics\u0027 category.",
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

        "Change \u0027Electronics\u0027 to another category like \u0027Books\u0027 or \u0027Clothing\u0027.",

        "Try using a category that does not exist to see how the results change.",

      ],


      tooltips: {

        "product_category": "The category field must match exactly. Use the predefined keyword values.",

      },

    },

    {
      id: 'term_query_product_brand',
      title: "Filter products by brand",
      description: "Retrieve all products made by the brand \u0027AudioMax\u0027.",
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

        "Change the brand to \u0027GlowNaturals\u0027 or \u0027BrewMaster\u0027.",

        "Experiment with a non-existent brand to test the exact match behavior.",

      ],


      tooltips: {

        "product_brand": "This field uses exact matching. Ensure the value matches the available options.",

      },

    },

    {
      id: 'term_query_verified_purchase',
      title: "Find reviews with verified purchases",
      description: "Retrieve all product reviews where the purchase was verified.",
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

        "Switch \u0027True\u0027 to \u0027False\u0027 to find reviews from unverified purchases.",

        "Check the effect of case sensitivity by using \u0027true\u0027 or \u0027FALSE\u0027.",

      ],


      tooltips: {

        "verified_purchase": "This field is case-sensitive and uses string values (\u0027True\u0027 or \u0027False\u0027).",

      },

    },

    {
      id: 'term_query_review_rating',
      title: "Find reviews with a specific rating",
      description: "Retrieve all reviews that have a 5-star rating.",
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

        "Change the rating to 1, 2, or 3 to see reviews with lower ratings.",

        "Try using a non-existent rating like 6 to observe the behavior.",

      ],


      tooltips: {

        "review_rating": "Only integer values between 1 and 5 are valid for this field.",

      },

    },

    {
      id: 'term_query_account_type',
      title: "Filter users by account type",
      description: "Retrieve all users with a \u0027Premium\u0027 account type.",
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

        "Change \u0027Premium\u0027 to \u0027Free\u0027 or \u0027Enterprise\u0027 to see users with different account types.",

        "Test with invalid values like \u0027premium\u0027 to verify case sensitivity.",

      ],


      tooltips: {

        "account_type": "Account types are case-sensitive and must match the predefined values exactly.",

      },

    },

    {
      id: 'term_query_username',
      title: "Find a specific user by username",
      description: "Retrieve a user with the username \u0027AveryWilliams55\u0027.",
      template: `{
  "query": {
    "term": {
      "username": {
        "value": "AveryWilliams55"
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Switch the username to \u0027CameronLopez20\u0027 or another available username.",

        "Enter a non-existent username to test the result for no matches.",

      ],


      tooltips: {

        "username": "Usernames must match exactly, including case sensitivity.",

      },

    },

  ],
};
