import type { LabConfig } from '../../types';

export const fuzzyConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'fuzzy_query',
  displayName: 'Fuzzy Query',
  description: "Returns documents that contain terms similar to the search term, as measured by a Levenshtein edit distance. An edit distance is the number of one-character changes needed to turn one term into another. These changes can include: Changing a character (box \u2192 fox), Removing a character (black \u2192 lack), Inserting a character (sic \u2192 sick), Transposing two adjacent characters (act \u2192 cat).",
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
      title: "Basic fuzzy search on product names",
      description: "Search for products with names similar to \u0027wireles\u0027. This demonstrates the most basic usage of the fuzzy query.",
      template: `{ "query": { "fuzzy": { "product_name": { "value": "wireles" } } } }`,
      index: 'products',

      tryThis: [

        "Try searching with variations like \u0027wirless\u0027, \u0027wreless\u0027, or \u0027wirele\u0027.",

      ],


      tooltips: {

        "product_name": "The field to search for fuzzy matches.",

        "value": "The term to find similar matches for.",

      },

    },

    {
      id: '2',
      title: "Fuzzy query with custom fuzziness",
      description: "Search for reviews with text similar to \u0027comfartable\u0027 using a manually set fuzziness level.",
      template: `{ "query": { "fuzzy": { "review_text": { "value": "comfartable", "fuzziness": 2 } } } }`,
      index: 'product_reviews',

      tryThis: [

        "Try increasing or decreasing the fuzziness parameter to see how it affects results.",

      ],


      tooltips: {

        "review_text": "The field to search for fuzzy matches within reviews.",

        "value": "The term to find similar matches for.",

        "fuzziness": "Controls the maximum edit distance allowed for matching terms.",

      },

    },

    {
      id: '3',
      title: "Fuzzy query with prefix length",
      description: "Search for users with interests similar to \u0027Electroncs\u0027, ensuring the first two characters must match exactly.",
      template: `{ "query": { "fuzzy": { "interests": { "value": "Electroncs", "prefix_length": 2 } } } }`,
      index: 'product_users',

      tryThis: [

        "Try setting prefix_length to 0 or 3 and observe the change in results.",

      ],


      tooltips: {

        "interests": "The field to search for fuzzy matches within user interests.",

        "value": "The term to find similar matches for.",

        "prefix_length": "The number of initial characters required to match exactly.",

      },

    },

    {
      id: '4',
      title: "Fuzzy query with max expansions",
      description: "Search for reviews with titles similar to \u0027durability\u0027, limiting the number of term expansions.",
      template: `{ "query": { "fuzzy": { "review_title": { "value": "durability", "max_expansions": 20 } } } }`,
      index: 'product_reviews',

      tryThis: [

        "Experiment with max_expansions set to 10, 50, or higher to control the breadth of search.",

      ],


      tooltips: {

        "review_title": "The field to search for fuzzy matches within review titles.",

        "value": "The term to find similar matches for.",

        "max_expansions": "The maximum number of variations to consider for matching.",

      },

    },

    {
      id: '5',
      title: "Fuzzy query with transpositions enabled",
      description: "Search for products with descriptions similar to \u0027wirless\u0027, allowing transpositions.",
      template: `{ "query": { "fuzzy": { "product_description": { "value": "wirless", "transpositions": true } } } }`,
      index: 'products',

      tryThis: [

        "Try disabling transpositions by setting \u0027transpositions\u0027 to false and see the difference.",

      ],


      tooltips: {

        "product_description": "The field to search for fuzzy matches within product descriptions.",

        "value": "The term to find similar matches for.",

        "transpositions": "Allows swapping adjacent characters to be considered a valid edit.",

      },

    },

  ],
};
