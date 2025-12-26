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
      title: "Search across multiple fields for a product",
      description: "Search for products where the name or description contains the term \u0027wireless headphones\u0027.",
      template: `{ "query": { "multi_match": { "query": "wireless headphones", "fields": ["product_name", "product_description"] } } }`,
      index: 'products',

      tryThis: [

        "Change the query to \u0027noise cancelling\u0027 to find products with that phrase.",

        "Add more fields to the \u0027fields\u0027 array, such as \u0027product_category\u0027.",

      ],


      tooltips: {

        "query": "The search term to be matched against the specified fields.",

        "fields": "List of fields to search across. Use searchable fields from the dataset.",

      },

    },

    {
      id: 'example_2',
      title: "Search product reviews by title or text",
      description: "Search for reviews mentioning \u0027excellent sound quality\u0027 in either the title or the review text.",
      template: `{ "query": { "multi_match": { "query": "excellent sound quality", "fields": ["review_title", "review_text"] } } }`,
      index: 'product_reviews',

      tryThis: [

        "Change the query to \u0027durable and comfortable\u0027 to find reviews with those terms.",

        "Experiment with different field weights by modifying the field names with \u0027^\u0027 (e.g., \u0027review_title^2\u0027).",

      ],


      tooltips: {

        "query": "The text to search for in the specified fields.",

        "fields": "Fields to be searched. Use fields relevant to the dataset.",

      },

    },

    {
      id: 'example_3',
      title: "Boost relevance of specific fields",
      description: "Search for products with \u0027premium\u0027 in the name or description, giving higher weight to matches in the name.",
      template: `{ "query": { "multi_match": { "query": "premium", "fields": ["product_name^3", "product_description"] } } }`,
      index: 'products',

      tryThis: [

        "Adjust the boost value for \u0027product_name\u0027 to see how it affects the results.",

        "Add more fields to the search, such as \u0027product_brand\u0027.",

      ],


      tooltips: {

        "query": "The term to search for in the specified fields.",

        "fields": "Use \u0027^\u0027 to apply a weight to specific fields, increasing their importance in the search.",

      },

    },

    {
      id: 'example_4',
      title: "Cross-field search for user interests",
      description: "Search for users interested in \u0027Books\u0027 or \u0027Electronics\u0027 using a cross-field strategy.",
      template: `{ "query": { "multi_match": { "query": "Books Electronics", "type": "cross_fields", "fields": ["interests"] } } }`,
      index: 'product_users',

      tryThis: [

        "Change the query to include other interests, like \u0027Sports\u0027 or \u0027Fashion\u0027.",

        "Test the \u0027AND\u0027 operator by adding \u0027operator\u0027: \u0027and\u0027 to the query.",

      ],


      tooltips: {

        "query": "The search terms to match, separated by spaces.",

        "type": "Defines how the query should behave. \u0027cross_fields\u0027 treats the fields as a single combined field.",

      },

    },

    {
      id: 'example_5',
      title: "Find reviews with phrase matching",
      description: "Search for reviews mentioning the phrase \u0027comfortable fit\u0027 in either the title or review text.",
      template: `{ "query": { "multi_match": { "query": "comfortable fit", "type": "phrase", "fields": ["review_title", "review_text"] } } }`,
      index: 'product_reviews',

      tryThis: [

        "Change the phrase to \u0027easy to use\u0027 and see the results.",

        "Test the \u0027phrase_prefix\u0027 type to allow for partial matches.",

      ],


      tooltips: {

        "query": "The exact phrase to search for.",

        "type": "Use \u0027phrase\u0027 to match exact phrases or \u0027phrase_prefix\u0027 for partial matches.",

      },

    },

    {
      id: 'example_6',
      title: "Search with tie-breaking for fields",
      description: "Search for products with the term \u0027gaming\u0027 in either the name or description, using a tie-breaker for equal scores.",
      template: `{ "query": { "multi_match": { "query": "gaming", "type": "best_fields", "fields": ["product_name", "product_description"], "tie_breaker": 0.3 } } }`,
      index: 'products',

      tryThis: [

        "Change the query to \u0027portable\u0027 and observe the results.",

        "Adjust the tie_breaker value to see how it impacts the scoring.",

      ],


      tooltips: {

        "query": "The search term to match.",

        "type": "Use \u0027best_fields\u0027 to find the single best matching field.",

        "tie_breaker": "A value between 0 and 1 that controls how scores from multiple fields are combined.",

      },

    },

  ],
};
