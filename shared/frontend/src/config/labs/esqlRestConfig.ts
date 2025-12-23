import type { LabConfig } from '../../types';

export const esqlRestConfig: LabConfig = {
  queryLanguage: 'esql',
  queryType: 'esql_rest',
  displayName: 'ES|QL Query',
  description: "The [Search and filter with ES|QL](https://www.elastic.co/docs/reference/query-languages/esql/esql-search-tutorial) tutorial provides a hands-on introduction to the ES|QL `_query` API.",
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
      id: 'example_1',
      title: "Filter Products by Category",
      description: "Retrieve all products in the \u0027Electronics\u0027 category.",
      template: `FROM products | WHERE product_category == "Electronics" | KEEP product_name, product_price | SORT product_price DESC`,
      index: 'products',

      tryThis: [

        "Try changing the category to \u0027Books\u0027 or \u0027Toys\u0027 to explore other product categories.",

      ],


      tooltips: {

        "product_category": "Filters products by their category.",

        "KEEP": "Limits the output to only the specified fields.",

        "SORT": "Sorts the results in descending order by the specified field.",

      },

    },

    {
      id: 'example_2',
      title: "Find Highly Rated Reviews",
      description: "Show reviews with a rating of 5 and include helpful votes.",
      template: `FROM product_reviews | WHERE review_rating == 5 | KEEP review_title, helpful_votes | SORT helpful_votes DESC | LIMIT 5`,
      index: 'product_reviews',

      tryThis: [

        "Try changing the rating to 4 or 3 to see reviews with lower ratings.",

      ],


      tooltips: {

        "review_rating": "Filters reviews by their rating.",

        "HELPFUL_VOTES": "The number of helpful votes a review received.",

        "LIMIT": "Restricts the number of results to the specified count.",

      },

    },

    {
      id: 'example_3',
      title: "Search for Users by Interests",
      description: "Retrieve users who are interested in \u0027Books\u0027 or \u0027Electronics\u0027.",
      template: `FROM product_users | WHERE interests LIKE "*Books*" OR interests LIKE "*Electronics*" | KEEP username, interests`,
      index: 'product_users',

      tryThis: [

        "Try replacing \u0027Books\u0027 with \u0027Sports\u0027 or \u0027Beauty\u0027 to find users with other interests.",

      ],


      tooltips: {

        "interests": "Searches for users based on their interests.",

        "OR": "Combines multiple conditions to broaden the search.",

        "KEEP": "Displays only the specified fields.",

      },

    },

    {
      id: 'example_4',
      title: "Top Verified Purchases",
      description: "Find users who are verified purchasers and sort them by trust score.",
      template: `FROM product_users | WHERE verified_purchaser == "True" | KEEP username, trust_score | SORT trust_score DESC | LIMIT 10`,
      index: 'product_users',

      tryThis: [

        "Try changing the sort order to ascending by replacing \u0027DESC\u0027 with \u0027ASC\u0027.",

      ],


      tooltips: {

        "verified_purchaser": "Filters users who are verified purchasers.",

        "trust_score": "A numerical value representing the user\u0027s trust level.",

        "SORT": "Orders the results based on the specified field.",

      },

    },

    {
      id: 'example_5',
      title: "Search for Affordable Products",
      description: "Retrieve products that are priced below $50.",
      template: `FROM products | WHERE product_price < 50 | KEEP product_name, product_price | SORT product_price ASC`,
      index: 'products',

      tryThis: [

        "Try changing the price filter to \u0027product_price \u003c 30\u0027 to narrow the search further.",

      ],


      tooltips: {

        "product_price": "The price of the product.",

        "SORT": "Orders the results in ascending order based on the product price.",

        "KEEP": "Specifies which fields to include in the output.",

      },

    },

    {
      id: 'example_6',
      title: "Reviews Mentioning Durability",
      description: "Find reviews that mention the word \u0027durable\u0027 in their text.",
      template: `FROM product_reviews | WHERE review_text LIKE "*durable*" | KEEP review_title, review_text | LIMIT 5`,
      index: 'product_reviews',

      tryThis: [

        "Try adding another keyword using \u0027OR\u0027, such as \u0027comfortable\u0027, to expand the results.",

      ],


      tooltips: {

        "review_text": "Searches for the specified keyword in the review text.",

        "LIKE": "Performs a wildcard search for matching text.",

        "LIMIT": "Restricts the number of results returned.",

      },

    },

  ],
};
