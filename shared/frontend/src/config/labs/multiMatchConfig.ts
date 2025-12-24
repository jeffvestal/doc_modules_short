import type { LabConfig } from '../../types';

export const multiMatchConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'multi_match_query',
  displayName: 'Multi-match Query',
  description: "The multi_match query builds on the match query to allow multi-field queries.",
  docUrl: 'https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-multi-match-query',

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
      title: "Search multiple fields for product descriptions",
      description: "Find products that match the query \u0027wireless headphones\u0027 in the fields \u0027product_name\u0027 and \u0027product_description\u0027.",
      template: `{
  "query": {
    "multi_match": {
      "query": "wireless headphones",
      "fields": ["product_name", "product_description"]
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try changing the query to \u0027premium speakers\u0027 or add weighting to fields using the \u0027^\u0027 operator (e.g., \u0027product_name^2\u0027).",

      ],


      tooltips: {

        "query": "The text to search for across the specified fields.",

        "fields": "The list of fields to search in. Use \u0027^\u0027 to boost relevance.",

      },

    },

    {
      id: 'example2',
      title: "Find product reviews mentioning durability and comfort",
      description: "Search for reviews that mention both \u0027durable\u0027 and \u0027comfortable\u0027 in \u0027review_title\u0027 and \u0027review_text\u0027 fields.",
      template: `{
  "query": {
    "multi_match": {
      "query": "durable and comfortable",
      "fields": ["review_title", "review_text"]
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Try searching for \u0027easy to use\u0027 or \u0027highly recommended\u0027 to see different results.",

      ],


      tooltips: {

        "query": "The keywords to match across the specified fields.",

        "fields": "The text fields to search for the given query.",

      },

    },

    {
      id: 'example3',
      title: "Search user interests for matches",
      description: "Find users interested in \u0027Electronics enthusiast\u0027 by searching the \u0027interests\u0027 field.",
      template: `{
  "query": {
    "multi_match": {
      "query": "Electronics enthusiast",
      "fields": ["interests"]
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Try searching for \u0027Books lover\u0027 or \u0027Sports fan\u0027 to find users with those interests.",

      ],


      tooltips: {

        "query": "The phrase to search for in the specified field.",

        "fields": "The field to search for the given query.",

      },

    },

    {
      id: 'example4',
      title: "Boosted field search in product descriptions",
      description: "Search for \u0027premium quality\u0027 in \u0027product_name\u0027 and \u0027product_description\u0027, giving extra weight to \u0027product_name\u0027.",
      template: `{
  "query": {
    "multi_match": {
      "query": "premium quality",
      "fields": ["product_name^2", "product_description"]
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Experiment with different boosts (e.g., \u0027product_description^3\u0027) or search for \u0027affordable price\u0027.",

      ],


      tooltips: {

        "query": "The phrase to search for across the specified fields.",

        "fields": "The fields to search in, with optional boosting using \u0027^\u0027.",

      },

    },

    {
      id: 'example5',
      title: "Cross-field search with tie breaker",
      description: "Search for \u0027comfortable durable\u0027 in \u0027review_title\u0027 and \u0027review_text\u0027, using a tie breaker for better scoring.",
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

        "Modify the query to \u0027lightweight portable\u0027 or test different tie breaker values (e.g., 0.5).",

      ],


      tooltips: {

        "query": "The keywords to search for across the specified fields.",

        "type": "The scoring method for combining results from multiple fields.",

        "tie_breaker": "Controls how scores from less relevant fields contribute to the overall score.",

      },

    },

  ],
};
