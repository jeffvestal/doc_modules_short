import type { LabConfig } from '../../types';

export const constantScoreConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'constant_score_query',
  displayName: 'Constant Score Query',
  description: "Wraps a filter query and returns every matching document with a relevance score equal to the boost parameter value.",
  docUrl: 'https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-constant-score-query',

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
      id: '1',
      title: "Boost all Electronics products",
      description: "This query retrieves all documents in the \u0027products\u0027 index where the category is \u0027Electronics\u0027 and applies a constant boost score of 1.2.",
      template: `{
  "query": {
    "constant_score": {
      "filter": {
        "term": { "product_category": "Electronics" }
      },
      "boost": 1.2
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Modify the \u0027product_category\u0027 value to \u0027Books\u0027 or another category to see different results.",

      ],


      tooltips: {

        "constant_score": "Wraps the filter query and assigns a constant boost score to all matching documents.",

        "filter": "A filter query to match documents. Results are not affected by relevance scoring.",

        "term": "Matches documents with the exact term specified in the field.",

        "boost": "The constant score assigned to all matching documents.",

      },

    },

    {
      id: '2',
      title: "Highlight verified purchases",
      description: "Fetch all reviews for verified purchases from the \u0027product_reviews\u0027 index and apply a constant boost score of 2.0.",
      template: `{
  "query": {
    "constant_score": {
      "filter": {
        "term": { "verified_purchase": "True" }
      },
      "boost": 2.0
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change the \u0027verified_purchase\u0027 value to \u0027False\u0027 to retrieve non-verified reviews.",

      ],


      tooltips: {

        "term": "Exact match for the \u0027verified_purchase\u0027 field, which indicates if the reviewer purchased the product.",

        "boost": "This boost value is applied to all matching documents.",

      },

    },

    {
      id: '3',
      title: "Filter by specific product brand",
      description: "Retrieve all products of the brand \u0027GlowNaturals\u0027 with a constant boost score of 1.8.",
      template: `{
  "query": {
    "constant_score": {
      "filter": {
        "term": { "product_brand": "GlowNaturals" }
      },
      "boost": 1.8
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Replace \u0027GlowNaturals\u0027 with another brand like \u0027AudioMax\u0027 or \u0027PawComfort\u0027 to explore different results.",

      ],


      tooltips: {

        "term": "Performs an exact match on the \u0027product_brand\u0027 field.",

        "boost": "Boost value applied to all matching documents.",

      },

    },

    {
      id: '4',
      title: "Find users with specific interests",
      description: "Search for users interested in \u0027Electronics\u0027 and assign a constant boost score of 1.5.",
      template: `{
  "query": {
    "constant_score": {
      "filter": {
        "term": { "interests": "Electronics" }
      },
      "boost": 1.5
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Try changing the \u0027interests\u0027 value to \u0027Books\u0027 or \u0027Sports\u0027 to see how it impacts the results.",

      ],


      tooltips: {

        "term": "Filters users by their exact interest.",

        "boost": "Increases or decreases the relevance of the matched documents.",

      },

    },

    {
      id: '5',
      title: "Boost high-rated reviews",
      description: "Retrieve all reviews with a rating of 5 and apply a boost of 2.5.",
      template: `{
  "query": {
    "constant_score": {
      "filter": {
        "term": { "review_rating": 5 }
      },
      "boost": 2.5
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change the \u0027review_rating\u0027 value to 3 or 4 to see results for different ratings.",

      ],


      tooltips: {

        "term": "Filters documents by exact match on \u0027review_rating\u0027.",

        "boost": "Applies this boost score to all matching reviews.",

      },

    },

    {
      id: '6',
      title: "Filter affordable products",
      description: "Search for products priced at $29.99 and apply a boost of 1.3.",
      template: `{
  "query": {
    "constant_score": {
      "filter": {
        "term": { "product_price": 29.99 }
      },
      "boost": 1.3
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Modify the \u0027product_price\u0027 to other values like 49.99 or 14.99 to explore different price ranges.",

      ],


      tooltips: {

        "term": "Performs an exact match on the \u0027product_price\u0027 field.",

        "boost": "Assigns a constant boost score to the resulting documents.",

      },

    },

  ],
};
