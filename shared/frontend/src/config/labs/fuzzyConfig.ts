import type { LabConfig } from '../../types';

export const fuzzyConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'fuzzy_query',
  displayName: 'Fuzzy Query',
  description: "Returns documents that contain terms similar to the search term, as measured by a Levenshtein edit distance. An edit distance is the number of one-character changes needed to turn one term into another.",
  docUrl: 'https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-fuzzy-query',

  keyDisplayFields: {
    products: 'product_name',
    product_reviews: 'review_title',
    product_users: 'username',
  },
  searchFields: {
    products: "product_name",
    product_reviews: "review_text",
    product_users: "interests",
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
      id: 'example_2',
      title: "Find similar review titles",
      description: "Search for review titles similar to \u0027durable\u0027. Useful for identifying reviews with common misspellings or alternative phrasing.",
      template: `{
  "query": {
    "fuzzy": {
      "review_title": {
        "value": "durable",
        "fuzziness": 2,
        "prefix_length": 0,
        "transpositions": true
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Try changing \u0027durable\u0027 to \u0027durrable\u0027 or \u0027durbale\u0027 to test transpositions and edit distances.",

      ],


      tooltips: {

        "fuzziness": "Set to a numeric value to explicitly define the edit distance.",

        "transpositions": "Enables swapping of adjacent characters as an allowable edit operation.",

      },

    },

    {
      id: 'example_3',
      title: "Search for similar user interests",
      description: "Find users whose documented interests are similar to \u0027Books\u0027. This helps identify users with close interests despite typos or variations.",
      template: `{
  "query": {
    "fuzzy": {
      "interests": {
        "value": "Books",
        "fuzziness": "AUTO",
        "max_expansions": 30,
        "prefix_length": 2
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Try searching for \u0027Boooks\u0027 or \u0027Boks\u0027 to explore how fuzziness handles input errors.",

      ],


      tooltips: {

        "prefix_length": "Requires an exact match for the initial characters of the term.",

        "max_expansions": "Adjust this to optimize query performance by limiting the number of matching terms.",

      },

    },

    {
      id: 'example_4',
      title: "Find products with similar descriptions",
      description: "Search for products where the description is similar to \u0027premium quality\u0027. This query helps identify products with closely related descriptions.",
      template: `{
  "query": {
    "fuzzy": {
      "product_description": {
        "value": "premium quality",
        "fuzziness": "AUTO",
        "prefix_length": 0,
        "rewrite": "constant_score_blended"
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try modifying \u0027premium quality\u0027 to include typos like \u0027premiom qualty\u0027.",

      ],


      tooltips: {

        "rewrite": "Specifies the scoring mechanism for matching terms. Use \u0027constant_score_blended\u0027 for blended constant scoring.",

      },

    },

    {
      id: 'example_5',
      title: "Search for similar product brand names",
      description: "Find products with a brand name similar to \u0027GlowEssence\u0027. This is useful for locating brands with slight variations or common typos.",
      template: `{
  "query": {
    "fuzzy": {
      "product_brand": {
        "value": "GlowEssence",
        "fuzziness": "AUTO",
        "prefix_length": 1,
        "transpositions": true
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try searching for \u0027GlowEsence\u0027 or \u0027GlowEsensce\u0027 to see how close matches are handled.",

      ],


      tooltips: {

        "transpositions": "Allows swapping adjacent characters, such as \u0027Es\u0027 to \u0027Se\u0027.",

      },

    },

  ],
};
