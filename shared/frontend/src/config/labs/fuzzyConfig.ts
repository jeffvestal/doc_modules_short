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
      id: '1',
      title: "Find products with similar names",
      description: "Search for products with names closely resembling \u0027wirless\u0027.",
      template: `{
  "query": {
    "fuzzy": {
      "product_name": {
        "value": "wirless",
        "fuzziness": "AUTO",
        "max_expansions": 50
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Change the value to \u0027wirless\u0027 or \u0027wirless headphones\u0027.",

        "Adjust the fuzziness to \u00271\u0027 or \u00272\u0027 to see different results.",

      ],


      tooltips: {

        "value": "The search term to find similar matches for.",

        "fuzziness": "Defines the allowed edit distance for matches. \u0027AUTO\u0027 calculates based on term length.",

        "max_expansions": "Limits the number of terms generated for the fuzzy query.",

      },

    },

    {
      id: '2',
      title: "Find reviews with slightly misspelled titles",
      description: "Search for reviews with titles that are similar to \u0027comfotable\u0027.",
      template: `{
  "query": {
    "fuzzy": {
      "review_title": {
        "value": "comfotable",
        "fuzziness": 2,
        "prefix_length": 1
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Modify the value to \u0027comfotable seating\u0027 or \u0027comfotrable couch\u0027.",

        "Change the prefix_length to \u00272\u0027 to require the first two characters to match.",

      ],


      tooltips: {

        "value": "The term to search for similar matches.",

        "fuzziness": "Allows up to 2 edits for matching terms.",

        "prefix_length": "Ensures the first character(s) of the term must match exactly.",

      },

    },

    {
      id: '3',
      title: "Find users with interests close to \u0027Electronics\u0027",
      description: "Search for users whose interests are similar to \u0027Elctronics\u0027.",
      template: `{
  "query": {
    "fuzzy": {
      "interests": {
        "value": "Elctronics",
        "fuzziness": "AUTO",
        "transpositions": true
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Try searching for \u0027Books\u0027 or \u0027Elctronic gadgets\u0027.",

        "Set transpositions to \u0027false\u0027 and observe the difference in results.",

      ],


      tooltips: {

        "value": "The term to find similar matches for.",

        "fuzziness": "Automatically adjusts edit distance based on term length.",

        "transpositions": "Allows adjacent character swaps (e.g., \u0027ca\u0027 \u2192 \u0027ac\u0027).",

      },

    },

    {
      id: '4',
      title: "Find products with misspelled descriptions",
      description: "Search for products with descriptions similar to \u0027wirless connectivity\u0027.",
      template: `{
  "query": {
    "fuzzy": {
      "product_description": {
        "value": "wirless connectivity",
        "fuzziness": 1,
        "rewrite": "constant_score"
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Change the value to \u0027wirless network\u0027 or \u0027wreless signal\u0027.",

        "Use fuzziness \u0027AUTO\u0027 instead of \u00271\u0027 for dynamic edit distances.",

      ],


      tooltips: {

        "value": "The term to search for similar matches.",

        "fuzziness": "Defines the allowed Levenshtein edit distance for matches.",

        "rewrite": "Specifies how the query is rewritten. \u0027constant_score\u0027 ignores term scores.",

      },

    },

    {
      id: '5',
      title: "Find users with similar usernames",
      description: "Search for users with usernames close to \u0027AveryWilams55\u0027.",
      template: `{
  "query": {
    "fuzzy": {
      "username": {
        "value": "AveryWilams55",
        "fuzziness": 2,
        "max_expansions": 30
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Change the value to \u0027CameronLopez20\u0027 or \u0027DakotaHernadez39\u0027.",

        "Reduce max_expansions to \u002710\u0027 and observe fewer results.",

      ],


      tooltips: {

        "value": "The username to find similar matches for.",

        "fuzziness": "Allows up to 2 edits for matching terms.",

        "max_expansions": "Limits the number of expanded terms for the query.",

      },

    },

  ],
};
