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
      id: '1',
      title: "Find products in a specific category",
      description: "Search for all products in the \u0027Electronics\u0027 category.",
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

        "Change \u0027Electronics\u0027 to \u0027Books\u0027 to find products in the Books category.",

        "Try using another category such as \u0027Clothing\u0027 or \u0027Beauty\u0027.",

      ],


      tooltips: {

        "product_category": "This is an exact match field. Use one of the predefined categories.",

      },

    },

    {
      id: '2',
      title: "Find highly-rated reviews",
      description: "Search for reviews with a rating of 5.",
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

        "Change the rating to 4 to see reviews with a slightly lower rating.",

        "Try searching for reviews with a rating of 1 to find negative reviews.",

      ],


      tooltips: {

        "review_rating": "This field stores review ratings as exact numbers (1-5).",

      },

    },

    {
      id: '3',
      title: "Find a specific user by username",
      description: "Search for a user with the username \u0027AveryWilliams55\u0027.",
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

        "Change the username to \u0027CameronLopez20\u0027 to find a different user.",

        "Try using \u0027CaseyRodriguez81\u0027 or \u0027JordanMartinez33\u0027 as the username.",

      ],


      tooltips: {

        "username": "Usernames are stored as exact strings. Ensure you use the correct capitalization and spelling.",

      },

    },

    {
      id: '4',
      title: "Find products by brand",
      description: "Search for all products from the brand \u0027AudioMax\u0027.",
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

        "Change the brand to \u0027GlowNaturals\u0027 or \u0027PlaySmart\u0027 to find products from other brands.",

        "Try using \u0027AutoGuard\u0027 to find automotive products.",

      ],


      tooltips: {

        "product_brand": "This is an exact match field. Use one of the predefined brand names.",

      },

    },

    {
      id: '5',
      title: "Find verified purchases",
      description: "Search for reviews where the purchase is verified.",
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

        "Change \u0027True\u0027 to \u0027False\u0027 to find reviews where the purchase is not verified.",

        "Combine this with a rating filter to find verified purchases with high ratings.",

      ],


      tooltips: {

        "verified_purchase": "This field uses string values (\u0027True\u0027 or \u0027False\u0027). Ensure the value is case-sensitive.",

      },

    },

    {
      id: '6',
      title: "Find products by price",
      description: "Search for products with a price of 59.99.",
      template: `{
  "query": {
    "term": {
      "product_price": {
        "value": 59.99
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Change the price to 89.99 to find more expensive products.",

        "Try using a lower price, such as 14.99, to find cheaper products.",

      ],


      tooltips: {

        "product_price": "This field stores the exact numerical price. Ensure the value matches one in the dataset.",

      },

    },

  ],
};
