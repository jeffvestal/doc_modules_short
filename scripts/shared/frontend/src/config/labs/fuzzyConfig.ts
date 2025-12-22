import type { LabConfig } from '../types';

export const fuzzyConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'fuzzy_query',
  displayName: 'Fuzzy Query',
  description: "Returns documents that contain terms similar to the search term, as measured by a Levenshtein edit distance. An edit distance is the number of one-character changes needed to turn one term into another. These changes can include: - Changing a character (box \u2192 fox) - Removing a character (black \u2192 lack) - Inserting a character (sic \u2192 sick) - Transposing two adjacent characters (act \u2192 cat).",
  docUrl: 'https://elastic.co/docs/reference/query-languages/query-dsl/query-dsl-fuzzy-query',

  keyDisplayFields: {
    products: 'product_name',
    product_reviews: 'review_title',
    product_users: 'username',
  },
  searchFields: {
    products: 'product_name',
    product_reviews: 'review_title',
    product_users: 'interests',
  },
  sampleQueries: {
    products: "wireles premium",
    product_reviews: "comfrtable durble",
    product_users: "Electronics Boks",
  },
  queryStructure: {
    type: '',
    fieldPath: '',
  },
  examples: [

    {
      id: 'basic-fuzzy',
      title: "Basic Fuzzy Query",
      description: "Search for documents with terms similar to the specified value using default fuzziness settings.",
      template: `{
  "query": {
    "fuzzy": {
      "product_name": {
        "value": "wireles"
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Change the value to \u0027premium\u0027 or \u0027wireless\u0027 to see different results.",

        "Try using shorter or longer terms to observe how fuzziness impacts matches.",

      ],


      tooltips: {

        value: "The term to search for. Terms similar to this value will be matched.",

        fuzzy: "A query type that matches terms based on edit distance.",

      },

    },

    {
      id: 'fuzziness-auto',
      title: "Fuzziness Auto Setting",
      description: "Use the \u0027AUTO\u0027 fuzziness setting to dynamically adjust edit distance based on the length of the input term.",
      template: `{
  "query": {
    "fuzzy": {
      "review_title": {
        "value": "comfrtable",
        "fuzziness": "AUTO"
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change the value to \u0027durble\u0027 or \u0027comfortable\u0027 and observe the results.",

        "Try changing fuzziness to a number like 1 or 2 for custom edit distance.",

      ],


      tooltips: {

        fuzziness: "Determines the edit distance allowed for matches. \u0027AUTO\u0027 adjusts this based on term length.",

        value: "The term to search for. Terms similar to this value will be matched.",

      },

    },

    {
      id: 'prefix-length',
      title: "Prefix Length",
      description: "Specify the number of initial characters that must match exactly. This can help narrow down results.",
      template: `{
  "query": {
    "fuzzy": {
      "product_name": {
        "value": "premium",
        "prefix_length": 2
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Change prefix_length to 1 or 3 and observe the impact on matching.",

        "Try searching for shorter terms and adjust prefix_length accordingly.",

      ],


      tooltips: {

        prefix_length: "The number of initial characters that must match exactly.",

        value: "The term to search for. Terms similar to this value will be matched.",

      },

    },

    {
      id: 'max-expansions',
      title: "Max Expansions",
      description: "Limit the number of variations generated for fuzzy matching. This can improve performance for large datasets.",
      template: `{
  "query": {
    "fuzzy": {
      "interests": {
        "value": "Electronics",
        "max_expansions": 50
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Change max_expansions to a lower value like 10 or a higher value like 100.",

        "Try searching for broader interests like \u0027Books\u0027 and observe the difference.",

      ],


      tooltips: {

        max_expansions: "Limits the number of terms generated for matching, improving performance.",

        value: "The term to search for. Terms similar to this value will be matched.",

      },

    },

    {
      id: 'transpositions',
      title: "Handle Transpositions",
      description: "Enable transpositions to match terms where two adjacent characters are swapped.",
      template: `{
  "query": {
    "fuzzy": {
      "review_text": {
        "value": "durabble",
        "transpositions": true
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Disable transpositions and see if the results change.",

        "Try searching for terms with swapped characters, like \u0027comfrtable\u0027 instead of \u0027comfortable\u0027.",

      ],


      tooltips: {

        transpositions: "Enables matching terms where two adjacent characters are swapped.",

        value: "The term to search for. Terms similar to this value will be matched.",

      },

    },

  ],
};
