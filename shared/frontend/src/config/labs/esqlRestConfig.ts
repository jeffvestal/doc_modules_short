import type { LabConfig } from '../../types';

export const esqlRestConfig: LabConfig = {
  queryLanguage: 'esql',
  queryType: 'esql_rest',
  displayName: "ES|QL Rest Api",
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
      title: "Filter products by category and sort by price",
      description: "Retrieve all products in the \u0027Electronics\u0027 category and sort them by price in descending order.",
      template: {
        products: `FROM products
| WHERE product_category == "Pet Supplies"
| SORT product_price DESC
| LIMIT 10`,
        product_reviews: `FROM product_reviews
| WHERE review_rating >= 4
| SORT review_date DESC
| LIMIT 10`,
        product_users: `FROM product_users
| WHERE account_type == "Premium"
| SORT trust_score DESC
| LIMIT 10`,
      },
      index: 'products',

      tryThis: [

        "Change the category to \u0027Clothing\u0027 or another value from the provided list.",

      ],


      tooltips: {

        "product_category": "Filters for products in the specified category.",

        "SORT": "Sorts the results by the specified field (e.g., product_price).",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example_2',
      title: "Find high-rated reviews",
      description: "Retrieve reviews with a rating of 5 stars and display the title, rating, and helpful votes.",
      template: {
        products: `FROM products
| WHERE product_price >= 100
| KEEP product_name, product_brand, product_category, product_price
| SORT product_price DESC
| LIMIT 10`,
        product_reviews: `FROM product_reviews
| WHERE review_rating == 5
| KEEP review_title, review_rating, helpful_votes, reviewer_name
| SORT helpful_votes DESC
| LIMIT 10`,
        product_users: `FROM product_users
| WHERE avg_rating_given >= 4.3
| KEEP username, avg_rating_given, trust_score, total_reviews_count
| SORT trust_score DESC
| LIMIT 10`,
      },
      index: 'product_reviews',

      tryThis: [

        "Modify the rating to 4 or another value to see reviews with different ratings.",

      ],


      tooltips: {

        "WHERE": "Filters the results based on the specified condition.",

        "KEEP": "Specifies which fields to include in the output.",

        "SORT": "Sorts the results by the specified field in descending order.",

      },

    },

    {
      id: 'example_3',
      title: "Search for specific user interests",
      description: "Find users interested in \u0027Books\u0027 or \u0027Electronics\u0027 and display their username and interests.",
      template: {
        products: `FROM products
| WHERE product_category IN ("Toys", "Beauty", "Office Products")
| SORT product_price DESC
| LIMIT 10`,
        product_reviews: `FROM product_reviews
| WHERE review_text LIKE "*kids*" OR review_text LIKE "*skin*" OR review_text LIKE "*coffee*"
| KEEP reviewer_name, review_title, review_text, review_rating
| SORT review_rating DESC
| LIMIT 10`,
        product_users: `FROM product_users
| WHERE interests LIKE "*Electronics*" OR interests LIKE "*Clothing*" OR interests LIKE "*Toys*"
| KEEP username, interests, account_type
| SORT username
| LIMIT 10`,
      },
      index: 'product_users',

      tryThis: [

        "Change the interest to \u0027Sports\u0027 or another value to explore other user interests.",

      ],


      tooltips: {

        "LIKE": "Performs a wildcard text search on the field.",

        "OR": "Combines multiple conditions where at least one must be true.",

        "KEEP": "Specifies only the desired fields to include in the output.",

      },

    },

    {
      id: 'example_4',
      title: "Find affordable products",
      description: "List products priced below $50 and show their name, brand, and price.",
      template: {
        products: `FROM products
| WHERE product_price < 50
| KEEP product_name, product_brand, product_price
| SORT product_price ASC
| LIMIT 10`,
        product_reviews: `FROM product_reviews
| WHERE review_text LIKE "*$*" AND (review_text LIKE "*affordable*" OR review_text LIKE "*cheap*" OR review_text LIKE "*inexpensive*" OR review_text LIKE "*$12.99*")
| KEEP review_id, review_title, review_text, review_rating
| SORT review_rating DESC
| LIMIT 10`,
        product_users: `FROM product_users
| WHERE trust_score < 50
| KEEP username, email, trust_score
| SORT trust_score ASC
| LIMIT 10`,
      },
      index: 'products',

      tryThis: [

        "Adjust the price threshold to $30 or $100 to see different results.",

      ],


      tooltips: {

        "product_price": "Filters products based on their price.",

        "KEEP": "Specifies which fields to include in the output.",

        "SORT": "Sorts the results by the specified field in ascending order.",

      },

    },

    {
      id: 'example_5',
      title: "Identify verified product reviews",
      description: "Retrieve reviews marked as verified purchases and sort them by review date.",
      template: {
        products: `FROM products
| WHERE product_category == "Home and Kitchen"
| KEEP product_name, product_brand, product_price
| SORT product_price DESC
| LIMIT 5`,
        product_reviews: `FROM product_reviews
| WHERE verified_purchase == "True"
| KEEP review_title, review_date, reviewer_name, review_rating
| SORT review_date DESC
| LIMIT 10`,
        product_users: `FROM product_users
| WHERE verified_purchaser == "True"
| KEEP username, member_since, account_type, verified_purchaser
| SORT member_since DESC
| LIMIT 10`,
      },
      index: 'product_reviews',

      tryThis: [

        "Change the filter to \u0027False\u0027 to see non-verified reviews.",

      ],


      tooltips: {

        "verified_purchase": "Filters reviews to show only those marked as verified purchases.",

        "SORT": "Sorts the results by the specified field (e.g., review_date).",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example_6',
      title: "Analyze user activity",
      description: "Find premium users who have written more than 20 reviews and display their username and total reviews count.",
      template: {
        products: `FROM products
| WHERE product_category == "Home and Kitchen" AND product_price > 80
| STATS avg_price = AVG(product_price), max_price = MAX(product_price), product_count = COUNT(*) BY product_brand
| SORT avg_price DESC
| LIMIT 10`,
        product_reviews: `FROM product_reviews
| WHERE helpful_votes > 15 AND verified_purchase == "True"
| STATS total_reviews = COUNT(*), avg_rating = AVG(review_rating), total_helpful_votes = SUM(helpful_votes) BY reviewer_name
| SORT total_helpful_votes DESC
| LIMIT 10`,
        product_users: `FROM product_users
| WHERE account_type == "Free" AND total_reviews_count >= 1
| KEEP username, account_type, total_reviews_count, age_group, verified_purchaser, avg_rating_given
| SORT total_reviews_count DESC
| LIMIT 10`,
      },
      index: 'product_users',

      tryThis: [

        "Change the account type to \u0027Free\u0027 or \u0027Enterprise\u0027 to analyze other user groups.",

      ],


      tooltips: {

        "account_type": "Filters users based on their account type.",

        "AND": "Combines multiple conditions where all must be true.",

        "total_reviews_count": "Filters users based on the number of reviews they have written.",

      },

    },

  ],
};
