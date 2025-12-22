import type { LabConfig } from '../types';

export const multiMatchConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'multi_match_query',
  displayName: 'Multi-match Query',
  description: "The `multi_match` query builds on the [`match` query](https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-match-query) to allow multi-field queries.",
  docUrl: 'https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-multi-match-query',

  keyDisplayFields: {
    products: 'product_name',
    product_reviews: 'review_title',
    product_users: 'username',
  },
  searchFields: {
    products: '['product_name', 'product_description']',
    product_reviews: '['review_title', 'review_text']',
    product_users: '['interests']',
  },
  sampleQueries: {
    products: "wireless premium",
    product_reviews: "comfortable durable",
    product_users: "Electronics Books",
  },
  queryStructure: {
    type: '',
    fieldPath: '',
  },
  examples: [

    {
      id: 'basic-multi-match',
      title: "Basic Multi-match Query",
      description: "Search across multiple fields to find matching documents. Here, the query searches across product name and description.",
      template: `{
  "query": {
    "multi_match": {
      "query": "wireless premium",
      "fields": ["product_name", "product_description"]
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try changing the query to \u0027budget wireless\u0027 and see how the results change.",

        "Add more fields like \u0027product_category\u0027 to broaden the search.",

      ],


      tooltips: {

        query: "The text to search for, analyzed before matching.",

        fields: "The fields to search across. Use multiple fields to broaden your search scope.",

      },

    },

    {
      id: 'weighted-fields',
      title: "Weighted Fields",
      description: "Apply different importance (boosting) to fields in the query. Here, the product name is prioritized over the description.",
      template: `{
  "query": {
    "multi_match": {
      "query": "premium wireless",
      "fields": ["product_name^3", "product_description"]
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Change the boost value for \u0027product_name\u0027 to 5 and observe how results change.",

        "Add a third field with a lower boost value to refine the query.",

      ],


      tooltips: {

        fields: "Boost values (e.g., ^3) prioritize certain fields over others during scoring.",

      },

    },

    {
      id: 'best-fields',
      title: "Best Fields Query Type",
      description: "Use \u0027best_fields\u0027 type to return documents that match the best single field. This is useful for finding the most relevant match across fields.",
      template: `{
  "query": {
    "multi_match": {
      "query": "comfortable durable",
      "type": "best_fields",
      "fields": ["review_title", "review_text"],
      "tie_breaker": 0.3
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change the tie_breaker value to 0.1 and see how it affects scoring.",

        "Switch type to \u0027most_fields\u0027 to consider cumulative matches across fields.",

      ],


      tooltips: {

        type: "Determines how matches across fields are combined. \u0027best_fields\u0027 selects the highest scoring field.",

        tie_breaker: "When multiple fields match, this value adjusts how scores are combined for secondary matches.",

      },

    },

    {
      id: 'phrase-prefix',
      title: "Phrase Prefix Matching",
      description: "Search for phrases with prefix matching. This is helpful for autocomplete-like searches.",
      template: `{
  "query": {
    "multi_match": {
      "query": "quick brown",
      "type": "phrase_prefix",
      "fields": ["review_title", "review_text"]
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change the query to \u0027quick br\u0027 to test prefix matching.",

        "Add additional fields like \u0027review_rating\u0027 for experiments.",

      ],


      tooltips: {

        type: "Searches for documents where the query matches the beginning of phrases in the fields.",

        fields: "Specify the fields to search for prefix matches.",

      },

    },

    {
      id: 'cross-fields',
      title: "Cross Fields Query Type",
      description: "Combine text from multiple fields as if it were a single field. Useful for matching across semantically related fields.",
      template: `{
  "query": {
    "multi_match": {
      "query": "Electronics Books",
      "type": "cross_fields",
      "fields": ["interests"]
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Change the query to \u0027Movies Music\u0027 and observe the results.",

        "Add more fields like \u0027occupation\u0027 to test cross-field matching.",

      ],


      tooltips: {

        type: "Treats all specified fields as a single combined field for matching.",

        fields: "Choose fields that are semantically related for best results.",

      },

    },

    {
      id: 'most-fields',
      title: "Most Fields Query Type",
      description: "Match across multiple fields and score based on cumulative matches. This is useful for ensuring all relevant information is considered.",
      template: `{
  "query": {
    "multi_match": {
      "query": "comfortable durable",
      "type": "most_fields",
      "fields": ["review_title", "review_text"]
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change the query to include synonyms like \u0027soft\u0027 or \u0027long-lasting\u0027.",

        "Test the same query with \u0027best_fields\u0027 type for comparison.",

      ],


      tooltips: {

        type: "Scores documents based on how many fields match the query.",

        fields: "Specify multiple fields to ensure broader matching.",

      },

    },

  ],
};
