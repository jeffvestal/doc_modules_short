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
      title: "Find a product by exact category",
      description: "Search for products in the \u0027Electronics\u0027 category using an exact match.",
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

        "Change the `product_category` value to \u0027Books\u0027 or \u0027Clothing\u0027 and observe the results.",

        "Try searching for a category not in the dataset, such as \u0027Furniture\u0027, and see what happens.",

      ],


      tooltips: {

        "product_category": "The category of the product. Use exact values like \u0027Electronics\u0027 or \u0027Books\u0027.",

      },

    },

    {
      id: '2',
      title: "Find reviews with specific helpful votes",
      description: "Retrieve reviews that have exactly 27 helpful votes.",
      template: `{
  "query": {
    "term": {
      "helpful_votes": {
        "value": 27
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change `helpful_votes` to another value like 15 or 34 to see different results.",

        "Try using a value not in the dataset, such as 50, to test the query behavior.",

      ],


      tooltips: {

        "helpful_votes": "The number of helpful votes a review received. Use exact numeric values like 10, 15, or 27.",

      },

    },

    {
      id: '3',
      title: "Find a specific username",
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

        "Change the `username` value to other options like \u0027CameronLopez20\u0027 or \u0027CaseyRodriguez81\u0027.",

        "Try searching for a username not in the dataset, such as \u0027UnknownUser\u0027, and check the results.",

      ],


      tooltips: {

        "username": "The unique username of a user. Use exact values like \u0027AveryWilliams55\u0027 or \u0027JordanMartinez33\u0027.",

      },

    },

    {
      id: '4',
      title: "Search for a specific product brand",
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

        "Change `product_brand` to other values like \u0027GlowNaturals\u0027 or \u0027PlaySmart\u0027.",

        "Test the query with a non-existent brand like \u0027TechGenius\u0027 to observe the output.",

      ],


      tooltips: {

        "product_brand": "The brand of the product. Use exact values like \u0027AudioMax\u0027 or \u0027GlowNaturals\u0027.",

      },

    },

    {
      id: '5',
      title: "Filter verified purchases",
      description: "Find all reviews marked as verified purchases.",
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

        "Change `verified_purchase` to \u0027False\u0027 to filter only non-verified purchases.",

        "Combine this query with other filters like `review_rating` for more specific results.",

      ],


      tooltips: {

        "verified_purchase": "Indicates if the review is from a verified purchase. Use \u0027True\u0027 or \u0027False\u0027 as string values.",

      },

    },

    {
      id: '6',
      title: "Search for a specific product price",
      description: "Retrieve all products priced at exactly $49.99.",
      template: `{
  "query": {
    "term": {
      "product_price": {
        "value": 49.99
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Change `product_price` to 89.99 or 24.99 and observe the responses.",

        "Try using a price not in the dataset, such as 99.99, to test the query\u0027s behavior.",

      ],


      tooltips: {

        "product_price": "The exact price of the product. Use numeric values like 49.99 or 89.99.",

      },

    },

  ],
};
