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
      id: 'example_1',
      title: "Filter Products by Category",
      description: "Find all products in the \u0027Electronics\u0027 category and display their names, brands, and prices.",
      template: {
        products: `FROM products | WHERE product_category == "Electronics" | KEEP product_name, product_brand, product_price | LIMIT 5`,
        product_reviews: `FROM product_reviews | WHERE review_text LIKE "*electronics*" | KEEP review_title, reviewer_name, review_rating | LIMIT 5`,
        product_users: `FROM product_users | WHERE interests LIKE "*Electronics*" | KEEP username, account_type, trust_score | LIMIT 5`,
      },
      index: 'products',

      tryThis: [

        "Change \u0027Electronics\u0027 to another category like \u0027Books\u0027 or \u0027Clothing\u0027 to see different results.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query.",

        "WHERE": "Filters the data based on the given condition.",

        "KEEP": "Limits the output to the specified fields.",

        "LIMIT": "Restricts the number of results returned.",

      },

    },

    {
      id: 'example_2',
      title: "Sort Products by Price",
      description: "Retrieve product names and prices, sorted by price in descending order.",
      template: {
        products: `FROM products | KEEP product_name, product_price | SORT product_price DESC | LIMIT 10`,
        product_reviews: `FROM product_reviews | KEEP review_title, review_rating | SORT review_rating DESC | LIMIT 10`,
        product_users: `FROM product_users | KEEP username, trust_score | SORT trust_score DESC | LIMIT 10`,
      },
      index: 'products',

      tryThis: [

        "Change \u0027DESC\u0027 to \u0027ASC\u0027 to sort prices in ascending order.",

      ],


      tooltips: {

        "KEEP": "Selects the fields to include in the result set.",

        "SORT": "Orders the results by the specified field.",

        "DESC": "Sorts in descending order.",

        "LIMIT": "Limits the number of results.",

      },

    },

    {
      id: 'example_3',
      title: "Search Reviews by Keywords",
      description: "Find reviews that mention \u0027durable\u0027 or \u0027comfortable\u0027, displaying their titles and ratings.",
      template: {
        products: `FROM products | WHERE product_description LIKE "*durable*" OR product_description LIKE "*comfortable*" | KEEP product_name, product_price | SORT product_price DESC | LIMIT 10`,
        product_reviews: `FROM product_reviews | WHERE review_text LIKE "*durable*" OR review_text LIKE "*comfortable*" | KEEP review_title, review_rating | SORT review_rating DESC | LIMIT 10`,
        product_users: `FROM product_users | WHERE interests LIKE "*durable*" OR interests LIKE "*comfortable*" | KEEP username, avg_rating_given | SORT avg_rating_given DESC | LIMIT 10`,
      },
      index: 'product_reviews',

      tryThis: [

        "Try searching for other keywords like \u0027stylish\u0027 or \u0027functional\u0027.",

      ],


      tooltips: {

        "WHERE": "Filters reviews based on specific keywords.",

        "LIKE": "Performs a wildcard search for partial matches.",

        "OR": "Combines two or more conditions.",

        "SORT": "Orders the results based on the field specified.",

      },

    },

    {
      id: 'example_4',
      title: "Filter Verified Purchases",
      description: "Retrieve verified purchase reviews with a rating of 5, sorted by helpful votes.",
      template: {
        products: `FROM products | WHERE product_category == "Electronics" AND product_price == 89.99 | KEEP product_name, product_brand | SORT product_price DESC | LIMIT 5`,
        product_reviews: `FROM product_reviews | WHERE verified_purchase == "True" AND review_rating == 5 | KEEP review_title, helpful_votes | SORT helpful_votes DESC | LIMIT 5`,
        product_users: `FROM product_users | WHERE verified_purchaser == "True" AND avg_rating_given == 5 | KEEP username, trust_score | SORT trust_score DESC | LIMIT 5`,
      },
      index: 'product_reviews',

      tryThis: [

        "Change \u0027review_rating == 5\u0027 to another rating (e.g., 4) to find reviews with different ratings.",

      ],


      tooltips: {

        "WHERE": "Filters data based on specific conditions.",

        "AND": "Combines multiple conditions that all must be true.",

        "SORT": "Sorts the results by the specified field in the chosen order.",

      },

    },

    {
      id: 'example_5',
      title: "Find Users by Interest",
      description: "Retrieve usernames and interests of users who are interested in \u0027Books\u0027 or \u0027Electronics\u0027.",
      template: {
        products: `FROM products | WHERE product_category == "Books" OR product_category == "Electronics" | KEEP product_name, product_category | LIMIT 10`,
        product_reviews: `FROM product_reviews | WHERE review_text LIKE "*Books*" OR review_text LIKE "*Electronics*" | KEEP reviewer_name, review_text | LIMIT 10`,
        product_users: `FROM product_users | WHERE interests LIKE "*Books*" OR interests LIKE "*Electronics*" | KEEP username, interests | LIMIT 10`,
      },
      index: 'product_users',

      tryThis: [

        "Add another interest to the WHERE clause, like \u0027Sports\u0027, to see additional results.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query.",

        "WHERE": "Filters data based on the given conditions.",

        "OR": "Combines multiple conditions, where either can be true.",

        "KEEP": "Limits the output to specific fields.",

        "LIMIT": "Restricts the number of results.",

      },

    },

    {
      id: 'example_6',
      title: "Top Reviewers by Trust Score",
      description: "List the top 5 users with the highest trust scores.",
      template: {
        products: `FROM products | KEEP product_name, product_price | SORT product_price DESC | LIMIT 5`,
        product_reviews: `FROM product_reviews | KEEP reviewer_name, helpful_votes | SORT helpful_votes DESC | LIMIT 5`,
        product_users: `FROM product_users | KEEP username, trust_score | SORT trust_score DESC | LIMIT 5`,
      },
      index: 'product_users',

      tryThis: [

        "Change the limit to 10 or sort in ascending order to see different results.",

      ],


      tooltips: {

        "KEEP": "Specifies the fields to include in the output.",

        "SORT": "Orders the results by the specified field.",

        "DESC": "Sorts the results in descending order.",

        "LIMIT": "Restricts the number of results returned.",

      },

    },

  ],
};
