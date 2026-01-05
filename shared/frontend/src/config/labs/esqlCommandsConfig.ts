import type { LabConfig } from '../../types';

export const esqlCommandsConfig: LabConfig = {
  queryLanguage: 'esql',
  queryType: 'esql_commands',
  displayName: "ES|QL Commands",
  description: "ES|QL commands come in two flavors: source commands and processing commands: - An ES|QL query must start with a [source command](https://www.elastic.co/docs/reference/query-languages/esql/commands/source-commands). - Use [processing commands](https://www.elastic.co/docs/reference/query-languages/esql/commands/processing-commands) to modify an input table by adding, removing, or transforming rows and columns.",
  docUrl: 'https://www.elastic.co/docs/reference/query-languages/esql/esql-commands',

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
      id: 'example1',
      title: "Filter products by category and sort by price",
      description: "This query retrieves products in the \u0027Electronics\u0027 category and sorts them by price in descending order.",
      template: {
        products: `FROM products
| WHERE product_category == "Clothing"
| SORT product_price DESC
| LIMIT 5`,
        product_reviews: `FROM product_reviews
| WHERE verified_purchase == "True"
| SORT review_rating DESC
| LIMIT 5`,
        product_users: `FROM product_users
| WHERE interests LIKE "*Electronics*"
| SORT trust_score DESC
| LIMIT 5`,
      },
      index: 'products',

      tryThis: [

        "Try changing \u0027Electronics\u0027 to \u0027Books\u0027 or \u0027Clothing\u0027 to see other categories.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query.",

        "WHERE": "Filters rows based on the condition provided.",

        "SORT": "Sorts the results based on the specified field and order.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example2',
      title: "Find reviews with specific keywords",
      description: "Searches for reviews containing the word \u0027durable\u0027 and keeps only the review title and rating.",
      template: {
        products: `FROM products
| WHERE MATCH(product_description, "premium")
| KEEP product_name, product_brand, product_price
| LIMIT 10`,
        product_reviews: `FROM product_reviews
| WHERE review_text LIKE "*perfect*" OR review_text LIKE "*love*" OR review_text LIKE "*best*"
| KEEP review_title, review_text, review_rating
| SORT review_rating DESC
| LIMIT 10`,
        product_users: `FROM product_users
| WHERE interests LIKE "*Automotive*"
| KEEP username, interests, avg_rating_given
| SORT avg_rating_given DESC
| LIMIT 10`,
      },
      index: 'product_reviews',

      tryThis: [

        "Try changing \u0027durable\u0027 to \u0027comfortable\u0027 or \u0027quality\u0027 to explore reviews with different keywords.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query.",

        "WHERE": "Filters rows based on the condition provided.",

        "LIKE": "Performs a wildcard text search.",

        "KEEP": "Keeps only the specified columns in the result.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example3',
      title: "Filter users by account type and interests",
      description: "Retrieves users with \u0027Premium\u0027 accounts who are interested in \u0027Electronics\u0027.",
      template: {
        products: `FROM products | WHERE product_category == "Electronics" AND product_description LIKE "*premium*" | KEEP product_name, product_category, product_description | LIMIT 10`,
        product_reviews: `FROM product_reviews
| WHERE review_rating >= 4 AND verified_purchase == "True"
| KEEP reviewer_name, review_rating, review_title, verified_purchase
| LIMIT 10`,
        product_users: `FROM product_users
| WHERE account_type == "Premium" AND interests LIKE "*Electronics*"
| KEEP username, account_type, interests, email
| SORT username
| LIMIT 10`,
      },
      index: 'product_users',

      tryThis: [

        "Try changing \u0027Premium\u0027 to \u0027Free\u0027 or \u0027Enterprise\u0027 and \u0027Electronics\u0027 to \u0027Books\u0027.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query.",

        "WHERE": "Filters rows based on the condition provided.",

        "AND": "Combines multiple conditions that must all be true.",

        "LIKE": "Performs a wildcard text search.",

        "KEEP": "Keeps only the specified columns in the result.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example4',
      title: "Find top-rated reviews",
      description: "Retrieves reviews with a rating of 5 and sorts them by the number of helpful votes in descending order.",
      template: {
        products: `FROM products
| WHERE product_category == "Home and Kitchen"
| SORT product_price DESC
| LIMIT 5`,
        product_reviews: `FROM product_reviews
| WHERE review_rating == 5
| SORT helpful_votes DESC
| LIMIT 5`,
        product_users: `FROM product_users
| WHERE avg_rating_given >= 4.3 AND verified_purchaser == "True"
| SORT trust_score DESC
| LIMIT 5`,
      },
      index: 'product_reviews',

      tryThis: [

        "Try changing the review rating to 4 or 3 to see reviews with lower ratings.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query.",

        "WHERE": "Filters rows based on the condition provided.",

        "SORT": "Sorts the results based on the specified field and order.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example5',
      title: "Search for products with specific keywords",
      description: "Finds products with a description containing the word \u0027wireless\u0027 and displays only the product name and price.",
      template: {
        products: `FROM products
| WHERE MATCH(product_description, "headphones") OR product_brand == "AudioMax"
| KEEP product_name, product_description, product_price, product_brand
| SORT product_price DESC
| LIMIT 10`,
        product_reviews: `FROM product_reviews
| WHERE MATCH(review_text, "car") OR review_title LIKE "*chair*"
| KEEP review_id, review_title, review_text, review_rating
| SORT review_rating DESC
| LIMIT 10`,
        product_users: `FROM product_users
| WHERE MATCH(interests, "Beauty")
| KEEP username, interests, account_type
| LIMIT 10`,
      },
      index: 'products',

      tryThis: [

        "Try changing \u0027wireless\u0027 to \u0027portable\u0027 or \u0027durable\u0027 to find other products.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query.",

        "WHERE": "Filters rows based on the condition provided.",

        "LIKE": "Performs a wildcard text search.",

        "KEEP": "Keeps only the specified columns in the result.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example6',
      title: "View users sorted by trust score",
      description: "Lists all users sorted by their trust score in descending order, showing their username and trust score.",
      template: {
        products: `FROM products
| SORT product_price DESC
| KEEP product_name, product_brand, product_price
| LIMIT 10`,
        product_reviews: `FROM product_reviews
| SORT helpful_votes DESC
| KEEP reviewer_name, review_user_id, helpful_votes
| LIMIT 10`,
        product_users: `FROM product_users
| SORT trust_score DESC
| KEEP username, trust_score, account_type
| LIMIT 10`,
      },
      index: 'product_users',

      tryThis: [

        "Try removing the LIMIT clause to see all users sorted by trust score.",

      ],


      tooltips: {

        "FROM": "Specifies the dataset to query.",

        "SORT": "Sorts the results based on the specified field and order.",

        "KEEP": "Keeps only the specified columns in the result.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

  ],
};
