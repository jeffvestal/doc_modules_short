import type { LabConfig } from '../../types';

export const fuzzyConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'fuzzy_query',
  displayName: 'Fuzzy Query',
  description: "Returns documents that contain terms similar to the search term, as measured by a Levenshtein edit distance. An edit distance is the number of one-character changes needed to turn one term into another. These changes can include: - Changing a character (box \u2192 fox) - Removing a character (black \u2192 lack) - Inserting a character (sic \u2192 sick) - Transposing two adjacent characters (act \u2192 cat)",
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
      id: 'example_1',
      title: "Find products with similar names",
      description: "Search for products with names similar to \u0027wirless\u0027.",
      template: `{ "query": { "fuzzy": { "product_name": { "value": "wirless", "fuzziness": "AUTO" } } } }`,
      index: 'products',

      tryThis: [

        "Try searching for a misspelled product name like \u0027wirless\u0027 or \u0027prmium\u0027.",

      ],


      tooltips: {

        "value": "The term to match with fuzzy logic.",

        "fuzziness": "AUTO means the fuzziness is automatically determined based on the term length.",

      },

    },

    {
      id: 'example_2',
      title: "Find reviews with similar titles",
      description: "Search for reviews with titles similar to \u0027comfrtable\u0027.",
      template: `{ "query": { "fuzzy": { "review_title": { "value": "comfrtable", "fuzziness": 2, "prefix_length": 1 } } } }`,
      index: 'product_reviews',

      tryThis: [

        "Try searching for a common typo in review titles, such as \u0027comfrtable\u0027 instead of \u0027comfortable\u0027.",

      ],


      tooltips: {

        "value": "The term to match with fuzzy logic.",

        "fuzziness": "Defines the maximum edit distance. Higher values allow more differences.",

        "prefix_length": "Specifies the number of initial characters that must match exactly.",

      },

    },

    {
      id: 'example_3',
      title: "Find users with similar interests",
      description: "Search for users with interests similar to \u0027Eletronics\u0027.",
      template: `{ "query": { "fuzzy": { "interests": { "value": "Eletronics", "fuzziness": "AUTO", "max_expansions": 30 } } } }`,
      index: 'product_users',

      tryThis: [

        "Try searching for interests with a typo, such as \u0027Eletronics\u0027 instead of \u0027Electronics\u0027.",

      ],


      tooltips: {

        "value": "The term to match with fuzzy logic.",

        "fuzziness": "AUTO adjusts the level of fuzziness automatically.",

        "max_expansions": "Limits the number of terms generated during the query expansion.",

      },

    },

    {
      id: 'example_4',
      title: "Find products with similar descriptions",
      description: "Search for products with descriptions similar to \u0027wirelss\u0027.",
      template: `{ "query": { "fuzzy": { "product_description": { "value": "wirelss", "fuzziness": 1, "prefix_length": 2 } } } }`,
      index: 'products',

      tryThis: [

        "Try searching for a typo in product descriptions, such as \u0027wirelss\u0027 instead of \u0027wireless\u0027.",

      ],


      tooltips: {

        "value": "The term to match with fuzzy logic.",

        "fuzziness": "Defines the maximum number of allowed character changes (edit distance).",

        "prefix_length": "Ensures the first few characters match exactly.",

      },

    },

    {
      id: 'example_5',
      title: "Find reviewers with similar names",
      description: "Search for reviewers with names similar to \u0027AveryWilams55\u0027.",
      template: `{ "query": { "fuzzy": { "username": { "value": "AveryWilams55", "fuzziness": "AUTO", "prefix_length": 0, "transpositions": true } } } }`,
      index: 'product_users',

      tryThis: [

        "Try searching for a misspelled username, such as \u0027AveryWilams55\u0027 instead of \u0027AveryWilliams55\u0027.",

      ],


      tooltips: {

        "value": "The term to match with fuzzy logic.",

        "fuzziness": "AUTO adapts the fuzziness level based on the term length.",

        "transpositions": "Set to true to allow swapping of adjacent characters in the match.",

      },

    },

  ],
};
