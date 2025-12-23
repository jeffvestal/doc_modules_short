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
      description: "Fetch products with \u0027wireless\u0027 mentioned in either the name or description fields.",
      template: `{
  "query": {
    "multi_match": {
      "query": "wireless",
      "fields": ["product_name", "product_description"]
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try modifying the query to search for \u0027premium\u0027 or \u0027Bluetooth\u0027.",

      ],


      tooltips: {

        "query": "The text to search for.",

        "fields": "Specify the fields to search across.",

      },

    },

    {
      id: 'example_2',
      title: "Search for reviews mentioning multiple terms",
      description: "Find reviews that mention \u0027durable\u0027 or \u0027comfortable\u0027 in the title or text fields.",
      template: `{
  "query": {
    "multi_match": {
      "query": "durable comfortable",
      "fields": ["review_title", "review_text"],
      "operator": "or"
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change the query to look for \u0027amazing\u0027 or \u0027excellent\u0027.",

      ],


      tooltips: {

        "query": "The terms to search for.",

        "fields": "Specify the fields to search across.",

        "operator": "Defines how terms in the query are combined (e.g., \u0027or\u0027 or \u0027and\u0027).",

      },

    },

    {
      id: 'example_3',
      title: "Boost field relevance for product name",
      description: "Search for \u0027wireless\u0027 in product fields, but prioritize matches in the name field.",
      template: `{
  "query": {
    "multi_match": {
      "query": "wireless",
      "fields": ["product_name^3", "product_description"]
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try adjusting the boost value (e.g., ^5) or adding more fields.",

      ],


      tooltips: {

        "fields": "Use \u0027^\u0027 to boost relevance for specific fields.",

        "query": "The text to search for.",

      },

    },

    {
      id: 'example_4',
      title: "Search for users with specific interests",
      description: "Find users interested in \u0027Books\u0027 or \u0027Electronics\u0027.",
      template: `{
  "query": {
    "multi_match": {
      "query": "Books Electronics",
      "fields": ["interests"],
      "type": "best_fields"
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Modify the query to search for \u0027Sports\u0027 or \u0027Pet Supplies\u0027.",

      ],


      tooltips: {

        "type": "The scoring strategy to use for matching fields.",

        "query": "The text to search for.",

        "fields": "Specify the fields to search across.",

      },

    },

    {
      id: 'example_5',
      title: "Phrase prefix search in product reviews",
      description: "Search for reviews starting with \u0027great pr\u0027 in title and text fields.",
      template: `{
  "query": {
    "multi_match": {
      "query": "great pr",
      "fields": ["review_title", "review_text"],
      "type": "phrase_prefix"
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Try searching for \u0027excellent ser\u0027 or \u0027comfortable ch\u0027.",

      ],


      tooltips: {

        "type": "Use \u0027phrase_prefix\u0027 for prefix matching.",

        "query": "The text prefix to search for.",

        "fields": "Specify the fields to search across.",

      },

    },

    {
      id: 'example_6',
      title: "Cross-field search for user interests",
      description: "Search for users with interests in \u0027Books\u0027 and \u0027Electronics\u0027.",
      template: `{
  "query": {
    "multi_match": {
      "query": "Books Electronics",
      "fields": ["interests"],
      "type": "cross_fields",
      "operator": "and"
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Adjust the operator to \u0027or\u0027 and search for \u0027Sports\u0027 or \u0027Beauty\u0027.",

      ],


      tooltips: {

        "type": "Use \u0027cross_fields\u0027 to combine field values for matching.",

        "operator": "Defines how terms in the query are combined.",

        "query": "The text to search for.",

        "fields": "Specify the fields to search across.",

      },

    },

  ],
};
