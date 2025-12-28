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
      description: "Retrieve all Electronics products and sort them by price in ascending order.",
      template: {
        products: `FROM products
| WHERE product_category == "Home and Kitchen"
| SORT product_price ASC
| LIMIT 5`,
        product_reviews: `FROM product_reviews
| WHERE verified_purchase == "True"
| SORT review_rating ASC
| LIMIT 5`,
        product_users: `FROM product_users
| WHERE interests LIKE "*Electronics*"
| SORT avg_rating_given DESC
| LIMIT 5`,
      },
      index: 'products',

      tryThis: [

        "Try changing the category to \u0027Books\u0027 or \u0027Clothing\u0027 to explore different results.",

      ],


      tooltips: {

        "product_category": "Filters the products belonging to a specific category. Use exact matches from the dataset.",

        "SORT": "Sorts the results in ascending (ASC) or descending (DESC) order.",

        "LIMIT": "Limits the number of results returned.",

      },

    },

    {
      id: 'example_2',
      title: "Find reviews mentioning specific keywords",
      description: "Search for reviews mentioning \u0027durable\u0027 or \u0027comfortable\u0027 and display their titles and ratings.",
      template: {
        products: `FROM products
| WHERE product_description LIKE "*durable*" OR product_description LIKE "*comfort*"
| KEEP product_name, product_brand, product_description, product_price
| SORT product_price DESC
| LIMIT 10`,
        product_reviews: `FROM product_reviews
| WHERE review_text LIKE "*sturdy*" OR review_text LIKE "*comfortable*" OR review_text LIKE "*quality*"
| KEEP review_title, review_text, review_rating
| SORT review_rating DESC
| LIMIT 100`,
        product_users: `FROM product_users
| WHERE interests LIKE "*Electronics*" OR interests LIKE "*Beauty*"
| KEEP username, interests, avg_rating_given
| SORT avg_rating_given DESC
| LIMIT 10`,
      },
      index: 'product_reviews',

      tryThis: [

        "Try replacing the keywords with \u0027sturdy\u0027 or \u0027reliable\u0027 to find other reviews.",

      ],


      tooltips: {

        "WHERE": "Filters results based on the specified condition.",

        "LIKE": "Performs a text-based search using wildcard patterns.",

        "KEEP": "Selects specific fields to be returned in the results.",

      },

    },

    {
      id: 'example_3',
      title: "Identify active users interested in specific topics",
      description: "List usernames and their interests for users who are interested in Books or Electronics.",
      template: {
        products: `FROM products
| WHERE product_category == "Electronics" OR product_category == "Beauty"
| KEEP product_name, product_category, product_brand, product_price
| SORT product_price DESC
| LIMIT 10`,
        product_reviews: `FROM product_reviews
| WHERE review_text LIKE "*cream*" OR review_text LIKE "*toy*"
| STATS review_count = COUNT(*) BY reviewer_name, review_user_id
| WHERE review_count >= 1
| SORT review_count DESC
| LIMIT 10`,
        product_users: `FROM product_users
| WHERE interests LIKE "*Electronics*" OR interests LIKE "*Beauty*" OR interests LIKE "*Clothing*"
| KEEP username, interests, account_type, verified_purchaser, member_since
| SORT member_since DESC
| LIMIT 10`,
      },
      index: 'product_users',

      tryThis: [

        "Try changing the interests to \u0027Sports\u0027 or \u0027Beauty\u0027 to view users with different preferences.",

      ],


      tooltips: {

        "interests": "Searches user interests for matching keywords.",

        "KEEP": "Specifies the fields to include in the results.",

        "LIMIT": "Restricts the number of records returned to the given value.",

      },

    },

    {
      id: 'example_4',
      title: "Analyze verified purchases with high helpful votes",
      description: "Find reviews from verified purchases with more than 20 helpful votes.",
      template: {
        products: `FROM products
| WHERE product_category == "Electronics" AND product_price > 80
| KEEP product_name, product_brand, product_price
| SORT product_price DESC
| LIMIT 5`,
        product_reviews: `FROM product_reviews
| WHERE verified_purchase == "True" AND helpful_votes > 20
| KEEP review_title, review_text, helpful_votes, reviewer_name, review_rating
| SORT helpful_votes DESC
| LIMIT 10`,
        product_users: `FROM product_users
| WHERE verified_purchaser == "True" AND trust_score > 50
| KEEP username, verified_purchaser, trust_score, account_type
| SORT trust_score DESC
| LIMIT 10`,
      },
      index: 'product_reviews',

      tryThis: [

        "Try modifying the helpful_votes threshold to 15 or 30 to see different results.",

      ],


      tooltips: {

        "verified_purchase": "Filters reviews to include only those marked as verified purchases.",

        "helpful_votes": "Specifies the number of helpful votes a review must have.",

        "SORT": "Orders the results by the number of helpful votes in descending order.",

      },

    },

    {
      id: 'example_5',
      title: "Discover premium users with high trust scores",
      description: "Retrieve usernames and trust scores of Premium account users.",
      template: {
        products: `FROM products
| WHERE product_price >= 89.99
| KEEP product_name, product_brand, product_price
| SORT product_price DESC
| LIMIT 10`,
        product_reviews: `FROM product_reviews
| WHERE verified_purchase == "True"
| SORT helpful_votes DESC
| KEEP reviewer_name, review_rating, helpful_votes, verified_purchase
| LIMIT 10`,
        product_users: `FROM product_users
| WHERE account_type == "Premium"
| KEEP username, trust_score
| SORT trust_score DESC
| LIMIT 10`,
      },
      index: 'product_users',

      tryThis: [

        "Try changing the account_type to \u0027Free\u0027 or \u0027Enterprise\u0027 to analyze other user groups.",

      ],


      tooltips: {

        "account_type": "Filters users based on their account type (e.g., Free, Premium, Enterprise).",

        "trust_score": "A numerical value indicating the user\u0027s trust level.",

        "SORT": "Sorts the results by trust_score in descending order.",

      },

    },

    {
      id: 'example_6',
      title: "Search for affordable products by brand",
      description: "Find products from \u0027GlowNaturals\u0027 priced below $50, sorted by price.",
      template: {
        products: `FROM products
| WHERE product_brand == "AudioMax" AND product_price < 100
| KEEP product_name, product_brand, product_price
| SORT product_price ASC
| LIMIT 10`,
        product_reviews: `FROM product_reviews
| WHERE reviewer_name == "Emily Carter" AND review_rating >= 4
| KEEP reviewer_name, review_title, review_rating, review_date
| SORT review_rating DESC
| LIMIT 10`,
        product_users: `FROM product_users
| WHERE interests LIKE "*Beauty*" AND account_type == "Free"
| KEEP username, interests, account_type
| SORT username ASC
| LIMIT 10`,
      },
      index: 'products',

      tryThis: [

        "Try changing the brand to \u0027AudioMax\u0027 or \u0027PlayPals\u0027 and adjust the price range to explore other products.",

      ],


      tooltips: {

        "product_brand": "Filters products by their brand name. Use exact matches.",

        "product_price": "Specifies the price range for filtering products.",

        "SORT": "Organizes the results in ascending order based on product_price.",

      },

    },

  ],
};
