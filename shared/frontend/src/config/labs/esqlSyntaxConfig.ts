import type { LabConfig } from '../../types';

export const esqlSyntaxConfig: LabConfig = {
  queryLanguage: 'esql',
  queryType: 'esql_syntax',
  displayName: 'Basic ES|QL Syntax',
  description: "Learn the basic syntax of ES|QL, the Elasticsearch Query Language.",
  docUrl: 'https://www.elastic.co/docs/reference/query-languages/esql/esql-syntax',

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
      title: "Filter products by category",
      description: "Find all products belonging to the \u0027Electronics\u0027 category.",
      template: {
        products: `FROM products
| WHERE product_category == "Clothing"
| LIMIT 10`,
        product_reviews: `FROM product_reviews
| WHERE verified_purchase == "True"
| LIMIT 10`,
        product_users: `FROM product_users
| WHERE interests LIKE "*Office Products*"
| LIMIT 10`,
      },
      index: 'products',

      tryThis: [

        "Change \u0027Electronics\u0027 to another category such as \u0027Books\u0027 or \u0027Toys\u0027 and see the results.",

      ],


      tooltips: {

        "FROM": "Specifies the data source to query.",

        "WHERE": "Filters the data based on a condition.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example_2',
      title: "Find highly rated reviews",
      description: "Retrieve reviews with a rating of 5 stars, sorted by the number of helpful votes.",
      template: {
        products: `FROM products
| WHERE product_price >= 100 AND product_category == "Electronics"
| SORT product_price DESC
| LIMIT 10`,
        product_reviews: `FROM product_reviews
| WHERE review_rating == 5
| SORT helpful_votes DESC
| LIMIT 10`,
        product_users: `FROM product_users
| WHERE avg_rating_given >= 4.5
| SORT trust_score DESC
| LIMIT 10`,
      },
      index: 'product_reviews',

      tryThis: [

        "Modify the rating to 4 or 3 and observe how the results change.",

      ],


      tooltips: {

        "FROM": "Specifies the data source to query.",

        "WHERE": "Filters the data based on a condition.",

        "SORT": "Sorts the results based on a field.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example_3',
      title: "Search for users with specific interests",
      description: "Find users interested in \u0027Books\u0027 or \u0027Electronics\u0027 and display their usernames and interests.",
      template: {
        products: `FROM products
| WHERE product_category == "Books" OR product_category == "Electronics"
| KEEP product_name, product_category, product_brand
| LIMIT 10`,
        product_reviews: `FROM product_reviews
| WHERE review_text LIKE "*book*" OR review_text LIKE "*electronics*" OR review_text LIKE "*headphones*"
| KEEP reviewer_name, review_text, review_title, review_date
| SORT review_date DESC
| LIMIT 10`,
        product_users: `FROM product_users
| WHERE interests LIKE "*Books*" OR interests LIKE "*Automotive*" OR interests LIKE "*Office Products*"
| KEEP username, interests, account_type
| SORT username
| LIMIT 10`,
      },
      index: 'product_users',

      tryThis: [

        "Add another interest to the query, such as \u0027Sports\u0027, and see how the results expand.",

      ],


      tooltips: {

        "FROM": "Specifies the data source to query.",

        "WHERE": "Filters the data based on a condition.",

        "OR": "Combines multiple conditions with a logical OR.",

        "KEEP": "Selects specific fields to include in the results.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example_4',
      title: "Find affordable products",
      description: "Retrieve products priced under $50, sorted by price in ascending order.",
      template: {
        products: `FROM products
| WHERE product_price < 50.00
| SORT product_price ASC
| LIMIT 10`,
        product_reviews: `FROM product_reviews
| WHERE MATCH(review_text, "affordable") OR MATCH(review_text, "cheap") OR MATCH(review_text, "inexpensive") OR MATCH(review_text, "budget")
| SORT review_rating DESC
| LIMIT 10`,
        product_users: `FROM product_users
| WHERE trust_score < 70
| SORT trust_score ASC
| LIMIT 10`,
      },
      index: 'products',

      tryThis: [

        "Change the price threshold to a higher value, such as 100, to see more results.",

      ],


      tooltips: {

        "FROM": "Specifies the data source to query.",

        "WHERE": "Filters the data based on a condition.",

        "SORT": "Sorts the results based on a field.",

        "ASC": "Sorts the results in ascending order.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example_5',
      title: "Search reviews for specific keywords",
      description: "Find reviews mentioning the word \u0027durable\u0027 and display the review title and rating.",
      template: {
        products: `FROM products
| WHERE MATCH(product_description, "premium")
| KEEP product_name, product_brand, product_category, product_price
| LIMIT 10`,
        product_reviews: `FROM product_reviews
| WHERE review_text LIKE "*best*" OR review_text LIKE "*excellent*" OR review_text LIKE "*great*"
| KEEP review_title, review_text, review_rating, reviewer_name
| SORT review_rating DESC
| LIMIT 10`,
        product_users: `FROM product_users
| WHERE interests LIKE "*Sports*"
| KEEP username, interests, avg_rating_given
| LIMIT 10`,
      },
      index: 'product_reviews',

      tryThis: [

        "Replace \u0027durable\u0027 with another keyword like \u0027comfortable\u0027 or \u0027premium\u0027 and observe the results.",

      ],


      tooltips: {

        "FROM": "Specifies the data source to query.",

        "WHERE": "Filters the data based on a condition.",

        "LIKE": "Performs a partial match search using wildcards.",

        "KEEP": "Selects specific fields to include in the results.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example_6',
      title: "Analyze users by account type",
      description: "Filter users with a \u0027Premium\u0027 account type and sort them by their trust score.",
      template: {
        products: `FROM products
| STATS count = COUNT(*), avg_price = AVG(product_price) BY product_category
| SORT count DESC
| LIMIT 10`,
        product_reviews: `FROM product_reviews
| WHERE verified_purchase IN ("True", "False")
| SORT helpful_votes DESC
| LIMIT 10`,
        product_users: `FROM product_users
| STATS count = COUNT(*), avg_trust_score = AVG(trust_score), max_trust_score = MAX(trust_score), min_trust_score = MIN(trust_score) BY account_type
| SORT count DESC
| LIMIT 10`,
      },
      index: 'product_users',

      tryThis: [

        "Try changing \u0027Premium\u0027 to \u0027Free\u0027 or \u0027Enterprise\u0027 to explore other account types.",

      ],


      tooltips: {

        "FROM": "Specifies the data source to query.",

        "WHERE": "Filters the data based on a condition.",

        "SORT": "Sorts the results based on a field.",

        "DESC": "Sorts the results in descending order.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

  ],
};
