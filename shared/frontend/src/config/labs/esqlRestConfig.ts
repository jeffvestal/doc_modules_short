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
      title: "Filter products by category and sort by price",
      description: "Retrieve all products from the \u0027Electronics\u0027 category, keep only the product name and price, and sort by price in descending order.",
      template: `FROM products | WHERE product_category == 'Electronics' | KEEP product_name, product_price | SORT product_price DESC | LIMIT 5`,
      index: 'products',

      tryThis: [

        "Change the category to \u0027Home Appliances\u0027 or another category and see the results.",

      ],


      tooltips: {

        "WHERE": "Filters the results based on the given condition.",

        "KEEP": "Specifies which fields to include in the output.",

        "SORT": "Sorts the results based on a specified field and order.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example_2',
      title: "Find top-rated reviews for durable products",
      description: "Search product reviews containing the word \u0027durable\u0027, keep the review title and rating, and sort by rating in descending order.",
      template: `FROM product_reviews | WHERE review_text LIKE '*durable*' | KEEP review_title, review_rating | SORT review_rating DESC | LIMIT 10`,
      index: 'product_reviews',

      tryThis: [

        "Change the keyword to \u0027lightweight\u0027 or another product feature to explore different reviews.",

      ],


      tooltips: {

        "WHERE": "Filters the results based on the given condition.",

        "LIKE": "Searches for text patterns in a field.",

        "KEEP": "Specifies which fields to include in the output.",

        "SORT": "Sorts the results based on a specified field and order.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example_3',
      title: "Identify active users interested in Electronics",
      description: "List users interested in Electronics, showing their username and total reviews count.",
      template: `FROM product_users | WHERE interests LIKE '*Electronics*' | KEEP username, total_reviews_count | SORT total_reviews_count DESC | LIMIT 10`,
      index: 'product_users',

      tryThis: [

        "Modify the interest keyword to \u0027Books\u0027 or \u0027Sports\u0027 to see users with different interests.",

      ],


      tooltips: {

        "WHERE": "Filters the results based on the given condition.",

        "LIKE": "Searches for text patterns in a field.",

        "KEEP": "Specifies which fields to include in the output.",

        "SORT": "Sorts the results based on a specified field and order.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example_4',
      title: "Explore helpful product reviews",
      description: "Retrieve reviews with more than 50 helpful votes, sorted by the highest number of votes.",
      template: `FROM product_reviews | WHERE helpful_votes > 50 | KEEP review_title, helpful_votes | SORT helpful_votes DESC | LIMIT 5`,
      index: 'product_reviews',

      tryThis: [

        "Adjust the threshold for helpful votes to 30 or 100 to see different sets of reviews.",

      ],


      tooltips: {

        "WHERE": "Filters the results based on the given condition.",

        "KEEP": "Specifies which fields to include in the output.",

        "SORT": "Sorts the results based on a specified field and order.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example_5',
      title: "Analyze product pricing trends",
      description: "Retrieve products from a specific brand, showing their name, category, and price, sorted by price in ascending order.",
      template: `FROM products | WHERE product_brand == 'BrandX' | KEEP product_name, product_category, product_price | SORT product_price ASC | LIMIT 10`,
      index: 'products',

      tryThis: [

        "Replace \u0027BrandX\u0027 with another brand to analyze pricing trends for different brands.",

      ],


      tooltips: {

        "WHERE": "Filters the results based on the given condition.",

        "KEEP": "Specifies which fields to include in the output.",

        "SORT": "Sorts the results based on a specified field and order.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

  ],
};
