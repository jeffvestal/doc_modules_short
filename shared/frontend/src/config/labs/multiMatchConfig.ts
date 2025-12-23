import type { LabConfig } from '../../types';

export const multiMatchConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'multi_match_query',
  displayName: 'Multi-match Query',
  description: "The `multi_match` query builds on the `match` query to allow multi-field queries.",
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
      id: 'example_1',
      title: "Search across product name and description",
      description: "Find products related to \u0027wireless audio\u0027 in both product names and descriptions.",
      template: `{
  "query": {
    "multi_match": {
      "query": "wireless audio",
      "fields": ["product_name", "product_description"]
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try searching for \u0027premium headphones\u0027 or \u0027Bluetooth speakers\u0027.",

      ],


      tooltips: {

        "query": "The search terms to match.",

        "fields": "The fields in which to search for the query text.",

      },

    },

    {
      id: 'example_2',
      title: "Match product reviews with specific keywords",
      description: "Search for reviews that include both \u0027durable\u0027 and \u0027comfortable\u0027 in the title or text.",
      template: `{
  "query": {
    "multi_match": {
      "query": "durable comfortable",
      "fields": ["review_title", "review_text"],
      "operator": "and"
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Experiment with keywords like \u0027easy to use\u0027 or \u0027high quality\u0027.",

      ],


      tooltips: {

        "operator": "Defines whether all terms are required (\u0027and\u0027) or any term is sufficient (\u0027or\u0027).",

        "fields": "The fields to search within.",

      },

    },

    {
      id: 'example_3',
      title: "Search user interests for multiple categories",
      description: "Find users interested in both \u0027Electronics\u0027 and \u0027Books\u0027.",
      template: `{
  "query": {
    "multi_match": {
      "query": "Electronics Books",
      "fields": ["interests"],
      "type": "cross_fields"
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Try searching for \u0027Sports\u0027 or \u0027Beauty\u0027 interests.",

      ],


      tooltips: {

        "type": "Cross-field matching combines fields to create a single search space.",

        "query": "The categories or interests to search for.",

      },

    },

    {
      id: 'example_4',
      title: "Boost specific fields in product search",
      description: "Search for \u0027wireless\u0027 in products, giving higher priority to product names.",
      template: `{
  "query": {
    "multi_match": {
      "query": "wireless",
      "fields": ["product_name^2", "product_description"]
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Boost description instead using \u0027product_description^3\u0027.",

      ],


      tooltips: {

        "fields": "Boosting is indicated by ^ followed by a number (e.g., ^2).",

        "query": "The term to search for.",

      },

    },

    {
      id: 'example_5',
      title: "Search reviews using phrase prefix",
      description: "Find reviews where the title or text starts with \u0027great\u0027 or \u0027excellent\u0027.",
      template: `{
  "query": {
    "multi_match": {
      "query": "great excellent",
      "type": "phrase_prefix",
      "fields": ["review_title", "review_text"]
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Try searching for prefix phrases like \u0027easy\u0027 or \u0027fast shipping\u0027.",

      ],


      tooltips: {

        "type": "Phrase prefix searches for terms that start with the provided text.",

        "fields": "The fields to search within.",

      },

    },

    {
      id: 'example_6',
      title: "Tie-breaker in cross-field search",
      description: "Search for \u0027premium quality\u0027 across all user interests with tie-breaking for partial matches.",
      template: `{
  "query": {
    "multi_match": {
      "query": "premium quality",
      "type": "cross_fields",
      "fields": ["interests"],
      "tie_breaker": 0.3
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Adjust tie_breaker to 0.5 or try different keywords like \u0027affordable\u0027.",

      ],


      tooltips: {

        "tie_breaker": "Controls how partial matches are scored in cross-field queries.",

        "fields": "The fields to combine for cross-field matching.",

      },

    },

  ],
};
