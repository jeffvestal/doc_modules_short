import type { LabConfig } from '../../types';

export const fuzzyConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'fuzzy_query',
  displayName: 'Fuzzy Query',
  description: "Returns documents that contain terms similar to the search term, as measured by a Levenshtein edit distance.",
  docUrl: 'https://elastic.co/docs/reference/query-languages/query-dsl/query-dsl-fuzzy-query',

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
      title: "Find similar product names",
      description: "Search for products with names similar to \u0027wireles\u0027 to catch spelling variations.",
      template: `{ "query": { "fuzzy": { "product_name": { "value": "wireles" } } } }`,
      index: 'products',

      tryThis: [

        "Try searching for similar terms like \u0027premum\u0027 or \u0027luxry\u0027.",

      ],


      tooltips: {

        "product_name": "The field where the fuzzy matching is applied.",

        "value": "The term to search for with fuzzy matching.",

        "fuzziness": "Defines the allowed Levenshtein distance. Default is AUTO.",

      },

    },

    {
      id: '2',
      title: "Match review titles with typos",
      description: "Find reviews with titles similar to \u0027comforable\u0027, accounting for spelling errors.",
      template: `{ "query": { "fuzzy": { "review_title": { "value": "comforable", "fuzziness": "AUTO" } } } }`,
      index: 'product_reviews',

      tryThis: [

        "Try searching for \u0027qulity\u0027 or \u0027durable\u0027.",

      ],


      tooltips: {

        "review_title": "The field where the fuzzy matching is applied.",

        "value": "The term to search for with fuzzy matching.",

        "fuzziness": "AUTO adjusts based on term length. It can also be set explicitly (e.g., 1 or 2).",

      },

    },

    {
      id: '3',
      title: "Fuzzy match user interests",
      description: "Find users with interests similar to \u0027Electonics\u0027, allowing for minor spelling errors.",
      template: `{ "query": { "fuzzy": { "interests": { "value": "Electonics", "fuzziness": "1" } } } }`,
      index: 'product_users',

      tryThis: [

        "Search for terms like \u0027Books\u0027 or \u0027Musics\u0027.",

      ],


      tooltips: {

        "interests": "The field where the fuzzy matching is applied.",

        "value": "The term to search for with fuzzy matching.",

        "fuzziness": "Set to 1 here, which allows for one edit (e.g., insertion, deletion, or substitution).",

      },

    },

    {
      id: '4',
      title: "Find products with prefix matching",
      description: "Search for products with names starting with \u0027lux\u0027 and allow minor misspellings.",
      template: `{ "query": { "fuzzy": { "product_name": { "value": "lux", "prefix_length": 3 } } } }`,
      index: 'products',

      tryThis: [

        "Search for terms like \u0027pre\u0027 or \u0027qual\u0027.",

      ],


      tooltips: {

        "product_name": "The field where the fuzzy matching is applied.",

        "value": "The term to search for with fuzzy matching.",

        "prefix_length": "The number of initial characters that must match exactly (e.g., \u0027lux\u0027).",

      },

    },

    {
      id: '5',
      title: "Review text with transpositions",
      description: "Find reviews with text similar to \u0027durbale\u0027, correcting swapped characters.",
      template: `{ "query": { "fuzzy": { "review_text": { "value": "durbale", "transpositions": true } } } }`,
      index: 'product_reviews',

      tryThis: [

        "Search for terms like \u0027comfrotable\u0027 or \u0027practical\u0027.",

      ],


      tooltips: {

        "review_text": "The field where the fuzzy matching is applied.",

        "value": "The term to search for with fuzzy matching.",

        "transpositions": "If true, adjacent character swaps (e.g., \u0027ac\u0027 \u2192 \u0027ca\u0027) are treated as one edit.",

      },

    },

    {
      id: '6',
      title: "Limit fuzzy search expansions",
      description: "Search for users with interests similar to \u0027Books\u0027, limiting the number of matched terms.",
      template: `{ "query": { "fuzzy": { "interests": { "value": "Books", "max_expansions": 10 } } } }`,
      index: 'product_users',

      tryThis: [

        "Try increasing max_expansions to see more matches.",

      ],


      tooltips: {

        "interests": "The field where the fuzzy matching is applied.",

        "value": "The term to search for with fuzzy matching.",

        "max_expansions": "Limits the number of terms generated for fuzzy matching.",

      },

    },

  ],
};
