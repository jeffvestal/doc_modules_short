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
      id: '1',
      title: "Find similar product names",
      description: "Search for products where the name is similar to \u0027wireless\u0027.",
      template: `{"query": {"fuzzy": {"product_name": {"value": "wireless"}}}}`,
      index: 'products',

      tryThis: [

        "Change the search term to \u0027premium\u0027 or \u0027audio\u0027 to explore other matches.",

        "Set \u0027fuzziness\u0027 to \u0027AUTO\u0027 for automatic adjustments.",

      ],


      tooltips: {

        "value": "The term to search for similar matches.",

        "fuzziness": "The maximum Levenshtein edit distance. Defaults to AUTO.",

      },

    },

    {
      id: '2',
      title: "Search for reviews with similar titles",
      description: "Find reviews with titles similar to \u0027comfortable\u0027.",
      template: `{"query": {"fuzzy": {"review_title": {"value": "comfortable", "fuzziness": "AUTO"}}}}`,
      index: 'product_reviews',

      tryThis: [

        "Try searching for \u0027durable\u0027 or \u0027reliable\u0027 to see other similar matches.",

        "Adjust \u0027fuzziness\u0027 to 2 for stricter matching.",

      ],


      tooltips: {

        "value": "The term to find similar matches for review titles.",

        "fuzziness": "Defines the maximum edit distance. AUTO adapts based on term length.",

      },

    },

    {
      id: '3',
      title: "Search usernames with prefix matching",
      description: "Find users with usernames similar to \u0027Dakota\u0027 but require a prefix match of at least 2 characters.",
      template: `{"query": {"fuzzy": {"username": {"value": "Dakota", "prefix_length": 2}}}}`,
      index: 'product_users',

      tryThis: [

        "Change the search term to \u0027Jordan\u0027 or \u0027Avery\u0027 for other matches.",

        "Increase \u0027prefix_length\u0027 to ensure stricter matches.",

      ],


      tooltips: {

        "value": "The term to search for similar matches.",

        "prefix_length": "The number of leading characters that must match exactly.",

      },

    },

    {
      id: '4',
      title: "Search product descriptions for similar terms",
      description: "Find products with descriptions similar to \u0027kitchen\u0027.",
      template: `{"query": {"fuzzy": {"product_description": {"value": "kitchen", "fuzziness": "1"}}}}`,
      index: 'products',

      tryThis: [

        "Try searching for \u0027home\u0027 or \u0027cook\u0027 for other relevant results.",

        "Adjust \u0027fuzziness\u0027 to 2 for broader matches.",

      ],


      tooltips: {

        "value": "The term to find similar matches in product descriptions.",

        "fuzziness": "Defines how different the matched term can be from the provided value.",

      },

    },

    {
      id: '5',
      title: "Find reviews with transposed characters",
      description: "Search for reviews containing terms similar to \u0027reliable\u0027 but allow transpositions.",
      template: `{"query": {"fuzzy": {"review_text": {"value": "reliable", "transpositions": true}}}}`,
      index: 'product_reviews',

      tryThis: [

        "Change the term to \u0027comfortable\u0027 or \u0027durable\u0027 to explore other matches.",

        "Set \u0027transpositions\u0027 to false to disable adjacent character swaps.",

      ],


      tooltips: {

        "value": "The term to search for similar matches within review text.",

        "transpositions": "Allows swapping of two adjacent characters in the match.",

      },

    },

    {
      id: '6',
      title: "Search user interests with limited expansions",
      description: "Find users with interests similar to \u0027Books\u0027 but limit the number of expansions.",
      template: `{"query": {"fuzzy": {"interests": {"value": "Books", "max_expansions": 30}}}}`,
      index: 'product_users',

      tryThis: [

        "Change the search term to \u0027Electronics\u0027 or \u0027Sports\u0027 to explore other interests.",

        "Increase \u0027max_expansions\u0027 for broader results.",

      ],


      tooltips: {

        "value": "The term to find similar matches in user interests.",

        "max_expansions": "Sets the maximum number of terms to consider for matching.",

      },

    },

  ],
};
