import type { LabConfig } from '../types';

export const term-queryConfig: LabConfig = {
  queryLanguage: '',
  queryType: 'term_query',
  displayName: 'Term Query',
  description: "Returns documents that contain an exact term in a provided field. You can use the `term` query to find documents based on a precise value such as a price, a product ID, or a username.",
  docUrl: 'https://elastic.co/docs/reference/query-languages/query-dsl/query-dsl-term-query',

  keyDisplayFields: {
    products: 'product_name',
    product_reviews: 'review_title',
    product_users: 'username',
  },
  searchFields: {
    products: '['product_name', 'product_description']',
    product_reviews: '['review_title', 'review_text']',
    product_users: '['interests']',
  },
  sampleQueries: {
    products: "product_category: \u0027Electronics\u0027",
    product_reviews: "review_rating: 5",
    product_users: "username: \u0027johndoe\u0027",
  },
  queryStructure: {
    type: '',
    fieldPath: '',
  },
  examples: [

    {
      id: 'exact-match-product-id',
      title: "Exact Match on Product ID",
      description: "Find a product with a specific product ID. The term query searches for an exact match and is case-sensitive.",
      template: `{
  "query": {
    "term": {
      "product_id": {
        "value": "12345"
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Change the product_id value to another ID to find a different product.",

        "Try a non-existent product_id and observe the result.",

      ],


      tooltips: {

        product_id: "The unique identifier of the product.",

        value: "The exact term to match. This is case-sensitive.",

      },

    },

    {
      id: 'exact-match-product-category',
      title: "Exact Match on Product Category",
      description: "Find all products that belong to the \u0027Electronics\u0027 category. Use the term query for precise filtering.",
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

        "Change the value to \u0027Clothing\u0027 or another category.",

        "Add more categories to your dataset and test their exact matches.",

      ],


      tooltips: {

        product_category: "The category field of the product.",

        value: "The exact category to filter by.",

      },

    },

    {
      id: 'term-query-review-rating',
      title: "Exact Match on Review Rating",
      description: "Retrieve all reviews with a specific rating. Use this query to find reviews with a precise numeric value.",
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

        "Change the rating value to 4 or 3 to find reviews with different ratings.",

        "Test with a rating value that doesn\u0027t exist (e.g., 7) and observe the empty result.",

      ],


      tooltips: {

        review_rating: "The numeric rating given by a reviewer.",

        value: "The exact numeric value to match.",

      },

    },

    {
      id: 'term-query-username',
      title: "Exact Match on Username",
      description: "Find a user by their username. This query matches users with an exact username value.",
      template: `{
  "query": {
    "term": {
      "username": {
        "value": "johndoe"
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Change the username value to another user in the dataset.",

        "Try searching for a username that doesn\u0027t exist and observe the result.",

      ],


      tooltips: {

        username: "The username of the user.",

        value: "The exact username to match. This is case-sensitive.",

      },

    },

    {
      id: 'term-query-verified-purchase',
      title: "Exact Match on Verified Purchase",
      description: "Retrieve all reviews marked as verified purchases. This query uses a boolean field to filter results.",
      template: `{
  "query": {
    "term": {
      "verified_purchase": {
        "value": true
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change the value to false to find reviews that are not verified purchases.",

        "Test with other boolean fields in your dataset.",

      ],


      tooltips: {

        verified_purchase: "Indicates whether the purchase was verified.",

        value: "Set to true or false to filter results.",

      },

    },

    {
      id: 'term-query-product-price',
      title: "Exact Match on Product Price",
      description: "Find products with an exact price. Note that the term query is effective for precise values like numbers.",
      template: `{
  "query": {
    "term": {
      "product_price": {
        "value": 499.99
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Change the price value to a different number.",

        "Test with a price that doesn\u0027t exist in the dataset.",

      ],


      tooltips: {

        product_price: "The price of the product.",

        value: "The exact price to match.",

      },

    },

  ],
};
