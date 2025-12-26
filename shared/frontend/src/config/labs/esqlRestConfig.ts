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
      id: 'example1',
      title: "Find Affordable Electronics",
      description: "Retrieve electronics products priced under $50.",
      template: {
        products: `FROM products | WHERE product_category == "Electronics" AND product_price < 50 | KEEP product_name, product_price | SORT product_price ASC`,
        product_reviews: `FROM product_reviews | WHERE review_text LIKE "*electronics*" AND review_rating < 5 | KEEP review_title, review_rating | SORT review_rating ASC`,
        product_users: `FROM product_users | WHERE interests LIKE "*Electronics*" AND trust_score < 50 | KEEP username, trust_score | SORT trust_score ASC`,
      },
      index: 'products',

      tryThis: [

        "Try changing the category to \u0027Books\u0027 or adjusting the price filter to explore other results.",

      ],


      tooltips: {

        "product_category": "Selects only rows where the product category matches \u0027Electronics\u0027.",

        "product_price": "Filters results to include products priced under $50.",

        "KEEP": "Limits the output to show only the selected fields.",

        "SORT": "Sorts the results by price in ascending order.",

      },

    },

    {
      id: 'example2',
      title: "Highly Rated Reviews",
      description: "Find reviews with a rating of 5 stars, sorted by helpful votes.",
      template: {
        products: `FROM products | WHERE product_category == "Electronics" | SORT product_price DESC | LIMIT 5`,
        product_reviews: `FROM product_reviews | WHERE review_rating == 5 | SORT helpful_votes DESC | LIMIT 5`,
        product_users: `FROM product_users | WHERE avg_rating_given == 5 | SORT trust_score DESC | LIMIT 5`,
      },
      index: 'product_reviews',

      tryThis: [

        "Experiment with different review ratings or sort by review_date to see the latest reviews.",

      ],


      tooltips: {

        "review_rating": "Filters reviews to include only those with a rating of 5.",

        "SORT": "Orders the results by helpful votes in descending order.",

        "LIMIT": "Limits the number of results to 5.",

      },

    },

    {
      id: 'example3',
      title: "Active Users Interested in Books",
      description: "List usernames of users interested in books with more than 10 reviews.",
      template: {
        products: `FROM products | WHERE product_category == "Books" AND product_price > 10 | KEEP product_name, product_price | SORT product_price DESC`,
        product_reviews: `FROM product_reviews | WHERE review_text LIKE "*book*" AND helpful_votes > 10 | KEEP reviewer_name, helpful_votes | SORT helpful_votes DESC`,
        product_users: `FROM product_users | WHERE interests LIKE "*Books*" AND total_reviews_count > 10 | KEEP username, total_reviews_count | SORT total_reviews_count DESC`,
      },
      index: 'product_users',

      tryThis: [

        "Change the interest to \u0027Electronics\u0027 or adjust the total_reviews_count filter to refine the results.",

      ],


      tooltips: {

        "interests": "Filters users with interests related to \u0027Books\u0027.",

        "total_reviews_count": "Includes only users who have written more than 10 reviews.",

        "KEEP": "Displays only the username and total review count fields in the output.",

        "SORT": "Sorts users by their total number of reviews in descending order.",

      },

    },

    {
      id: 'example4',
      title: "Top Brands in Clothing",
      description: "Retrieve the most expensive clothing items from top brands.",
      template: {
        products: `FROM products | WHERE product_category == "Clothing" | SORT product_price DESC | KEEP product_name, product_brand, product_price | LIMIT 5`,
        product_reviews: `FROM product_reviews | WHERE review_text LIKE "*quality*" | SORT helpful_votes DESC | KEEP review_title, reviewer_name, helpful_votes | LIMIT 5`,
        product_users: `FROM product_users | WHERE account_type == "Premium" | SORT trust_score DESC | KEEP username, email, trust_score | LIMIT 5`,
      },
      index: 'products',

      tryThis: [

        "Change the category to \u0027Sports and Outdoors\u0027 or sort in ascending order to find the cheapest items.",

      ],


      tooltips: {

        "product_category": "Filters products to include only those in the \u0027Clothing\u0027 category.",

        "SORT": "Orders the results by price in descending order.",

        "KEEP": "Shows only the product name, brand, and price in the output.",

        "LIMIT": "Restricts the output to the top 5 results.",

      },

    },

    {
      id: 'example5',
      title: "Verified Purchases with High Ratings",
      description: "Find verified purchases with a rating of 4 or higher.",
      template: {
        products: `FROM products | WHERE product_category == "Electronics" AND product_price >= 50 | KEEP product_name, product_price, product_category | LIMIT 10`,
        product_reviews: `FROM product_reviews | WHERE verified_purchase == "True" AND review_rating >= 4 | KEEP review_title, review_rating, verified_purchase | LIMIT 10`,
        product_users: `FROM product_users | WHERE verified_purchaser == "True" AND avg_rating_given >= 4 | KEEP username, avg_rating_given, verified_purchaser | LIMIT 10`,
      },
      index: 'product_reviews',

      tryThis: [

        "Adjust the rating filter to include reviews with a rating of 3 or experiment with non-verified purchases.",

      ],


      tooltips: {

        "verified_purchase": "Filters reviews to include only verified purchases.",

        "review_rating": "Includes reviews with a rating of 4 or higher.",

        "KEEP": "Restricts the output to show only the review title, rating, and verification status.",

        "LIMIT": "Limits the results to 10 reviews.",

      },

    },

    {
      id: 'example6',
      title: "Users from Specific Location",
      description: "Retrieve usernames of users located in \u0027New York\u0027.",
      template: {
        products: `FROM products | WHERE product_category == "Electronics" | KEEP product_name, product_category | SORT product_name ASC`,
        product_reviews: `FROM product_reviews | WHERE reviewer_name LIKE "*New York*" | KEEP reviewer_name | SORT reviewer_name ASC`,
        product_users: `FROM product_users | WHERE location_city == "New York" | KEEP username, location_city | SORT username ASC`,
      },
      index: 'product_users',

      tryThis: [

        "Change the city to \u0027San Francisco\u0027 or filter by location_state instead.",

      ],


      tooltips: {

        "location_city": "Filters users based on their city (e.g., \u0027New York\u0027).",

        "KEEP": "Displays only the username and city fields in the output.",

        "SORT": "Orders the results alphabetically by username.",

      },

    },

  ],
};
