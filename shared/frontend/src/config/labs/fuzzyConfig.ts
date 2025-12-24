import type { LabConfig } from '../../types';

export const fuzzyConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'fuzzy_query',
  displayName: 'Fuzzy Query',
  description: "Returns documents that contain terms similar to the search term, as measured by a Levenshtein edit distance. An edit distance is the number of one-character changes needed to turn one term into another.",
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
      id: 'fuzzy_product_name',
      title: "Find products with similar names",
      description: "Search for products where the name is similar to \u0027wirless\u0027 using fuzzy matching.",
      template: `{ "query": { "fuzzy": { "product_name": { "value": "wirless", "fuzziness": "AUTO", "max_expansions": 10, "prefix_length": 1 } } } }`,
      index: 'products',

      tryThis: [

        "Try changing \u0027wirless\u0027 to \u0027wrlss\u0027 or \u0027wireles\u0027 to see different results.",

      ],


      tooltips: {

        "fuzziness": "The edit distance allowed for matching terms.",

        "max_expansions": "The maximum number of terms to consider during matching.",

        "prefix_length": "The number of characters at the start of the term that must match exactly.",

      },

    },

    {
      id: 'fuzzy_review_title',
      title: "Find reviews with similar titles",
      description: "Search for reviews where the title is similar to \u0027comfy\u0027 using fuzzy matching and automatic fuzziness.",
      template: `{ "query": { "fuzzy": { "review_title": { "value": "comfy", "fuzziness": "AUTO", "transpositions": true } } } }`,
      index: 'product_reviews',

      tryThis: [

        "Try changing \u0027comfy\u0027 to \u0027cmfy\u0027 or \u0027comfort\u0027 to explore matching variations.",

      ],


      tooltips: {

        "transpositions": "Allows swapping two adjacent characters (e.g., \u0027act\u0027 -\u003e \u0027cat\u0027).",

        "fuzziness": "Set to \u0027AUTO\u0027 for automatic adjustment based on term length.",

      },

    },

    {
      id: 'fuzzy_interests',
      title: "Find users with similar interests",
      description: "Search for users whose interests field contains terms similar to \u0027Books\u0027.",
      template: `{ "query": { "fuzzy": { "interests": { "value": "Books", "prefix_length": 2, "max_expansions": 30 } } } }`,
      index: 'product_users',

      tryThis: [

        "Change \u0027Books\u0027 to \u0027Boks\u0027 or \u0027Boooks\u0027 and observe the results.",

      ],


      tooltips: {

        "prefix_length": "Ensures the first N characters of the term are matched exactly.",

        "max_expansions": "Limits the number of fuzzy matches that are expanded.",

      },

    },

    {
      id: 'fuzzy_product_description',
      title: "Find products with similar descriptions",
      description: "Search for products with descriptions containing terms similar to \u0027premium\u0027.",
      template: `{ "query": { "fuzzy": { "product_description": { "value": "premium", "fuzziness": "2", "rewrite": "constant_score" } } } }`,
      index: 'products',

      tryThis: [

        "Change \u0027premium\u0027 to \u0027premum\u0027 or \u0027premiun\u0027 and notice the difference in results.",

      ],


      tooltips: {

        "fuzziness": "Specifies the maximum edit distance explicitly.",

        "rewrite": "Controls how the scoring is calculated. \u0027constant_score\u0027 ignores term-level scoring.",

      },

    },

    {
      id: 'fuzzy_review_text',
      title: "Find reviews with similar text",
      description: "Search for reviews with text containing terms similar to \u0027durable\u0027.",
      template: `{ "query": { "fuzzy": { "review_text": { "value": "durable", "fuzziness": "AUTO", "prefix_length": 1 } } } }`,
      index: 'product_reviews',

      tryThis: [

        "Change \u0027durable\u0027 to \u0027durabl\u0027 or \u0027durrable\u0027 to see matching variations.",

      ],


      tooltips: {

        "fuzziness": "Automatic fuzziness adjusts based on the length of the term.",

        "prefix_length": "Specifies the number of initial characters that must match exactly.",

      },

    },

  ],
};
