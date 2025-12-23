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
      id: 'example_1',
      title: "Find product by exact category",
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

        "Change \u0027Electronics\u0027 to another category such as \u0027Books\u0027 or \u0027Clothing\u0027.",

        "Use the \u0027product_brand\u0027 field to search by brand instead.",

      ],


      tooltips: {

        "product_category": "Field containing predefined categories like Electronics, Books, etc.",

        "value": "The exact value you want to match in the field.",

      },

    },

    {
      id: 'example_2',
      title: "Retrieve reviews with a specific rating",
      description: "Find all product reviews with a rating of 5.",
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

        "Change the rating to 4 or 3 to retrieve reviews with those ratings.",

        "Combine this query with a range query to find reviews within a rating range.",

      ],


      tooltips: {

        "review_rating": "Field representing the numeric rating of a review (1-5).",

        "value": "The exact rating you want to match.",

      },

    },

    {
      id: 'example_3',
      title: "Search for a specific user by username",
      description: "Find a user by their exact username.",
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

        "Replace \u0027AveryWilliams55\u0027 with another username from the dataset such as \u0027CameronLopez20\u0027.",

        "Use the \u0027account_type\u0027 field to search for users with a specific account type.",

      ],


      tooltips: {

        "username": "Field containing the exact username for a user.",

        "value": "The specific username to match in the query.",

      },

    },

    {
      id: 'example_4',
      title: "Find products by exact price",
      description: "Retrieve products priced at $49.99.",
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

        "Change the price to another value, such as 89.99 or 29.99.",

        "Use the \u0027product_category\u0027 field to filter products by category instead.",

      ],


      tooltips: {

        "product_price": "Field representing the exact price of a product.",

        "value": "The specific price to match in the query.",

      },

    },

    {
      id: 'example_5',
      title: "Search for verified purchases in reviews",
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

        "Change \u0027True\u0027 to \u0027False\u0027 to find reviews that are not verified purchases.",

        "Combine this query with a term query on \u0027review_rating\u0027 for more specific results.",

      ],


      tooltips: {

        "verified_purchase": "Field indicating whether a review is from a verified purchase (\u0027True\u0027 or \u0027False\u0027).",

        "value": "The exact value to match (either \u0027True\u0027 or \u0027False\u0027).",

      },

    },

  ],
};
