import type { LabConfig } from '../../types';

export const esqlRestConfig: LabConfig = {
  queryLanguage: 'esql',
  queryType: 'esql_rest',
  displayName: 'ES|QL Query',
  description: "\u003ctip\u003e The [Search and filter with ES|QL](https://www.elastic.co/docs/reference/query-languages/esql/esql-search-tutorial) tutorial provides a hands-on introduction to the ES|QL `_query` API. \u003c/tip\u003e",
  docUrl: 'https://www.elastic.co/docs/reference/query-languages/esql/esql-rest',

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
      id: 'products_filter_sort',
      title: "Filter and Sort Products",
      description: "Filter products by category and sort them by price in descending order.",
      template: {
        products: `FROM products | WHERE product_category == "Electronics" | SORT product_price DESC | LIMIT 5`,
        product_reviews: `FROM product_reviews | WHERE verified_purchase == "True" | SORT helpful_votes DESC | LIMIT 5`,
        product_users: `FROM product_users | WHERE interests LIKE "*Electronics*" | SORT trust_score DESC | LIMIT 5`,
      },
      index: 'products',

      tryThis: [

        "Change the product_category to \"Books\" or \"Clothing\".",

        "Remove the SORT clause to see unsorted results.",

      ],


      tooltips: {

        "WHERE": "Filters records based on the specified condition.",

        "SORT": "Sorts the results by a specified field in ascending or descending order.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'reviews_top_rated',
      title: "Find Top Rated Reviews",
      description: "Retrieve reviews with a rating of 5 and sort by helpful votes in descending order.",
      template: {
        products: `FROM products | WHERE product_category == "Electronics" | SORT product_price DESC | LIMIT 5`,
        product_reviews: `FROM product_reviews | WHERE review_rating == 5 | SORT helpful_votes DESC | LIMIT 5`,
        product_users: `FROM product_users | WHERE avg_rating_given == 5 | SORT trust_score DESC | LIMIT 5`,
      },
      index: 'product_reviews',

      tryThis: [

        "Change the review_rating to 4 or 3.",

        "Remove the LIMIT clause to see all reviews with the specified rating.",

      ],


      tooltips: {

        "WHERE": "Filters records based on the specified condition.",

        "SORT": "Sorts the results by a specified field in ascending or descending order.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'users_interests_filter',
      title: "Filter Users by Interests",
      description: "Find users interested in Electronics or Books, displaying only their username and interests.",
      template: {
        products: `FROM products | WHERE product_category == "Electronics" OR product_category == "Books" | KEEP product_name, product_category | LIMIT 10`,
        product_reviews: `FROM product_reviews | WHERE review_text LIKE "*Electronics*" OR review_text LIKE "*Books*" | KEEP reviewer_name, review_text | LIMIT 10`,
        product_users: `FROM product_users | WHERE interests LIKE "*Electronics*" OR interests LIKE "*Books*" | KEEP username, interests | LIMIT 10`,
      },
      index: 'product_users',

      tryThis: [

        "Add additional interests like \"Sports\" or \"Toys\".",

        "Remove the LIMIT clause to see all matching users.",

      ],


      tooltips: {

        "WHERE": "Filters records based on the specified condition.",

        "LIKE": "Performs a partial match search on string fields.",

        "KEEP": "Selects specific fields to include in the results.",

      },

    },

    {
      id: 'products_premium_prices',
      title: "Find Premium Priced Products",
      description: "Find products with prices greater than $50, displaying their name and price.",
      template: {
        products: `FROM products | WHERE product_price > 50 | KEEP product_name, product_price | SORT product_price DESC`,
        product_reviews: `FROM product_reviews | WHERE helpful_votes > 22 | KEEP review_title, helpful_votes | SORT helpful_votes DESC`,
        product_users: `FROM product_users | WHERE trust_score > 50 | KEEP username, trust_score | SORT trust_score DESC`,
      },
      index: 'products',

      tryThis: [

        "Change the condition to product_price \u003c= 50 to find cheaper products.",

        "Add a LIMIT clause to restrict the number of results.",

      ],


      tooltips: {

        "WHERE": "Filters records based on the specified condition.",

        "KEEP": "Selects specific fields to include in the results.",

        "SORT": "Sorts the results by a specified field in ascending or descending order.",

      },

    },

    {
      id: 'reviews_verified_purchases',
      title: "Find Verified Purchase Reviews",
      description: "Retrieve reviews from verified purchases with at least 15 helpful votes.",
      template: {
        products: `FROM products | WHERE product_category == "Electronics" AND product_price >= 50 | KEEP product_name, product_price | SORT product_price DESC | LIMIT 5`,
        product_reviews: `FROM product_reviews | WHERE verified_purchase == "True" AND helpful_votes >= 15 | KEEP review_title, helpful_votes | SORT helpful_votes DESC | LIMIT 5`,
        product_users: `FROM product_users | WHERE verified_purchaser == "True" AND trust_score >= 15 | KEEP username, trust_score | SORT trust_score DESC | LIMIT 5`,
      },
      index: 'product_reviews',

      tryThis: [

        "Change the helpful_votes condition to \u003e= 10.",

        "Remove the SORT clause to see unsorted results.",

      ],


      tooltips: {

        "WHERE": "Filters records based on the specified condition.",

        "KEEP": "Selects specific fields to include in the results.",

        "SORT": "Sorts the results by a specified field in ascending or descending order.",

      },

    },

    {
      id: 'users_high_trust',
      title: "Find Users with High Trust Scores",
      description: "Retrieve users with a trust score greater than 80, displaying their username and trust score.",
      template: {
        products: `FROM products | WHERE product_price > 80 | KEEP product_name, product_price | SORT product_price DESC | LIMIT 5`,
        product_reviews: `FROM product_reviews | WHERE helpful_votes > 20 | KEEP reviewer_name, helpful_votes | SORT helpful_votes DESC | LIMIT 5`,
        product_users: `FROM product_users | WHERE trust_score > 80 | KEEP username, trust_score | SORT trust_score DESC | LIMIT 5`,
      },
      index: 'product_users',

      tryThis: [

        "Change the trust_score condition to \u003e 50.",

        "Remove the LIMIT clause to see all matching users.",

      ],


      tooltips: {

        "WHERE": "Filters records based on the specified condition.",

        "KEEP": "Selects specific fields to include in the results.",

        "SORT": "Sorts the results by a specified field in ascending or descending order.",

      },

    },

  ],
};
