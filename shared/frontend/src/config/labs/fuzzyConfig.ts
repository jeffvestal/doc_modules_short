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
      title: "Find products with fuzzy match on name",
      description: "Search for products where the name is similar to \u0027wireles\u0027 with automatic fuzziness handling.",
      template: `{
  "query": {
    "fuzzy": {
      "product_name": {
        "value": "wireles",
        "fuzziness": "AUTO"
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try searching with different misspellings, such as \u0027wirless\u0027 or \u0027wreless\u0027, to see how fuzzy matching works.",

      ],


      tooltips: {

        "fuzziness": "Defines the edit distance. Use \u0027AUTO\u0027 for dynamic adjustment based on term length.",

      },

    },

    {
      id: '2',
      title: "Search product reviews with prefix fuzziness",
      description: "Find reviews with titles similar to \u0027comfort\u0027 while requiring the first 2 characters to match.",
      template: `{
  "query": {
    "fuzzy": {
      "review_title": {
        "value": "comfort",
        "fuzziness": "AUTO",
        "prefix_length": 2
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change the prefix_length to 0 and observe how the results adjust.",

      ],


      tooltips: {

        "prefix_length": "Specifies the number of initial characters that must match exactly.",

      },

    },

    {
      id: '3',
      title: "Match user interests with fixed fuzziness",
      description: "Search for users with interests similar to \u0027Electonic\u0027 using a fixed fuzziness of 1.",
      template: `{
  "query": {
    "fuzzy": {
      "interests": {
        "value": "Electonic",
        "fuzziness": "1",
        "max_expansions": 20
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Use \u0027Electronic\u0027 instead of \u0027Electonic\u0027 and compare the results.",

      ],


      tooltips: {

        "max_expansions": "Limits the number of terms the query can expand to.",

      },

    },

    {
      id: '4',
      title: "Find products with fuzzy match and transpositions enabled",
      description: "Search for products with names similar to \u0027premiim\u0027, allowing transposition of characters.",
      template: `{
  "query": {
    "fuzzy": {
      "product_name": {
        "value": "premiim",
        "fuzziness": "AUTO",
        "transpositions": true
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Disable transpositions to see how results differ when transposing characters is not allowed.",

      ],


      tooltips: {

        "transpositions": "Enables swapping of adjacent characters during fuzzy matching.",

      },

    },

    {
      id: '5',
      title: "Search reviews with constant score rewrite",
      description: "Find reviews with fuzzy matches on \u0027durable\u0027 using constant score blending for efficiency.",
      template: `{
  "query": {
    "fuzzy": {
      "review_text": {
        "value": "durable",
        "fuzziness": "AUTO",
        "rewrite": "constant_score_blended"
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change the rewrite method to \u0027scoring_boolean\u0027 and observe how results are ranked.",

      ],


      tooltips: {

        "rewrite": "Specifies how matching terms are blended into a constant score.",

      },

    },

  ],
};
