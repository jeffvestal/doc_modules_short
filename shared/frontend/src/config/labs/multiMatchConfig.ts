import type { LabConfig } from '../../types';

export const multiMatchConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'multi_match_query',
  displayName: 'Multi-Match Query',
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
      id: 'example1',
      title: "Search across multiple fields in products",
      description: "Find products with \u0027wireless\u0027 in the name or description.",
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

        "Try replacing \u0027wireless\u0027 with other keywords like \u0027premium\u0027 or \u0027durable\u0027 to see how it affects the results.",

      ],


      tooltips: {

        "query": "The text to search for across the specified fields.",

        "fields": "The fields to search for the specified query text.",

      },

    },

    {
      id: 'example2',
      title: "Boost specific fields",
      description: "Give more weight to matches in the product name field.",
      template: `{
  "query": {
    "multi_match": {
      "query": "headphones",
      "fields": ["product_name^2", "product_description"]
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try experimenting with different boost values, e.g., \u0027product_name^3\u0027, to see how boosting affects the ranking of results.",

      ],


      tooltips: {

        "fields": "Boosting is applied by appending a caret (^) and a boost factor to a field name.",

      },

    },

    {
      id: 'example3',
      title: "Search product reviews",
      description: "Find reviews mentioning \u0027comfortable\u0027 in the title or text.",
      template: `{
  "query": {
    "multi_match": {
      "query": "comfortable",
      "fields": ["review_title", "review_text"]
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Try replacing \u0027comfortable\u0027 with other terms, like \u0027durable\u0027 or \u0027easy setup\u0027, to find different reviews.",

      ],


      tooltips: {

        "fields": "The fields in the product_reviews index to search for the given query text.",

      },

    },

    {
      id: 'example4',
      title: "Use the \u0027phrase_prefix\u0027 type",
      description: "Search for reviews where the title or text starts with \u0027durable and\u0027.",
      template: `{
  "query": {
    "multi_match": {
      "query": "durable and",
      "type": "phrase_prefix",
      "fields": ["review_title", "review_text"]
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Try using different phrases like \u0027easy to\u0027 or \u0027great for\u0027 to explore the prefix search functionality.",

      ],


      tooltips: {

        "type": "The type \u0027phrase_prefix\u0027 matches documents containing the terms in the order specified, but allows for partial matches on the last term.",

        "fields": "The fields to search for the phrase prefix.",

      },

    },

    {
      id: 'example5',
      title: "Search user interests",
      description: "Find users interested in \u0027Books\u0027 and \u0027Electronics\u0027.",
      template: `{
  "query": {
    "multi_match": {
      "query": "Books Electronics",
      "fields": ["interests"],
      "operator": "and"
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Try changing the query to other combinations like \u0027Sports Outdoors\u0027 or \u0027Beauty\u0027 to see how it matches users.",

      ],


      tooltips: {

        "operator": "The \u0027and\u0027 operator ensures that all terms in the query must appear in the results.",

        "fields": "The fields in the product_users index to search for the given query text.",

      },

    },

    {
      id: 'example6',
      title: "Use \u0027most_fields\u0027 type",
      description: "Search for users where the text matches in most fields.",
      template: `{
  "query": {
    "multi_match": {
      "query": "outdoor enthusiast",
      "type": "most_fields",
      "fields": ["interests"]
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Try replacing \u0027outdoor enthusiast\u0027 with another phrase like \u0027tech lover\u0027 or \u0027avid reader\u0027 to observe field-matching behavior.",

      ],


      tooltips: {

        "type": "The \u0027most_fields\u0027 type scores documents higher when more fields match.",

        "fields": "The fields in the product_users index to search for the given query text.",

      },

    },

  ],
};
