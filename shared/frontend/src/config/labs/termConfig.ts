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
        "value": "Electronics"
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Change the value from \u0027Electronics\u0027 to another category like \u0027Books\u0027 or \u0027Clothing\u0027.",

      ],


      tooltips: {

        "product_category": "The category the product belongs to. Example values include \u0027Electronics\u0027, \u0027Books\u0027, etc.",

      },

    },

    {
      id: '2',
      title: "Search for reviews with a specific rating",
      description: "Retrieve all reviews with a rating of 5.",
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

        "Modify the rating value to 4 or 3 to explore reviews with different ratings.",

      ],


      tooltips: {

        "review_rating": "The rating given in the review. Valid values are integers from 1 to 5.",

      },

    },

    {
      id: '3',
      title: "Find users with a specific account type",
      description: "Retrieve all users with an \u0027Premium\u0027 account type.",
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

        "Change the account type to \u0027Free\u0027 or \u0027Enterprise\u0027 to see users with different subscriptions.",

      ],


      tooltips: {

        "account_type": "The type of account the user has. Possible values are \u0027Free\u0027, \u0027Premium\u0027, and \u0027Enterprise\u0027.",

      },

    },

    {
      id: '4',
      title: "Search for a product by brand",
      description: "Find all products from the brand \u0027AudioMax\u0027.",
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

        "Switch the brand to \u0027GlowNaturals\u0027 or \u0027PlaySmart\u0027 to explore products from other brands.",

      ],


      tooltips: {

        "product_brand": "The brand of the product. Example values include \u0027AudioMax\u0027, \u0027GlowNaturals\u0027, etc.",

      },

    },

    {
      id: '5',
      title: "Search for verified reviews",
      description: "Retrieve reviews marked as a verified purchase.",
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

        "Change the value to \u0027False\u0027 to find unverified purchase reviews.",

      ],


      tooltips: {

        "verified_purchase": "Indicates whether the review is for a verified purchase. Accepts \u0027True\u0027 or \u0027False\u0027.",

      },

    },

    {
      id: '6',
      title: "Find a specific user by username",
      description: "Search for a user with the exact username \u0027AveryWilliams55\u0027.",
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

        "Replace the username with \u0027CameronLopez20\u0027 or \u0027JordanMartinez33\u0027 to find other users.",

      ],


      tooltips: {

        "username": "The unique username of the user. Example values include \u0027AveryWilliams55\u0027, \u0027CameronLopez20\u0027, etc.",

      },

    },

  ],
};
