import type { LabConfig } from '../../types';

export const fuzzyConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'fuzzy_query',
  displayName: 'Fuzzy Query',
  description: "Returns documents that contain terms similar to the search term, as measured by a Levenshtein edit distance. An edit distance is the number of one-character changes needed to turn one term into another. These changes can include: changing a character, removing a character, inserting a character, or transposing two adjacent characters.",
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
      id: 'fuzzy_1',
      title: "Find similar product names with fuzziness",
      description: "Search for product names similar to \u0027wirless\u0027 with automatic fuzziness calculation.",
      template: `{
  "query": {
    "fuzzy": {
      "product_name": {
        "value": "wirless",
        "fuzziness": "AUTO"
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try changing the value to \u0027wirles\u0027 or \u0027wirelles\u0027 and observe the results.",

      ],


      tooltips: {

        "value": "The term to search for similar matches.",

        "fuzziness": "Defines the edit distance. AUTO adjusts based on term length.",

      },

    },

    {
      id: 'fuzzy_2',
      title: "Search for products with prefix matching",
      description: "Search for product descriptions similar to \u0027smrt\u0027 with a prefix length of 1.",
      template: `{
  "query": {
    "fuzzy": {
      "product_description": {
        "value": "smrt",
        "fuzziness": 2,
        "prefix_length": 1
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try changing the prefix_length to 2 and observe how the results change.",

      ],


      tooltips: {

        "value": "The term to search for similar matches.",

        "prefix_length": "Specifies the number of initial characters that must match exactly.",

        "fuzziness": "Defines the maximum edit distance.",

      },

    },

    {
      id: 'fuzzy_3',
      title: "Find similar review titles using transpositions",
      description: "Search for review titles similar to \u0027comfrotable\u0027 with transpositions enabled.",
      template: `{
  "query": {
    "fuzzy": {
      "review_title": {
        "value": "comfrotable",
        "fuzziness": 1,
        "transpositions": true
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Try disabling transpositions by setting \u0027transpositions\u0027 to false.",

      ],


      tooltips: {

        "value": "The term to search for similar matches.",

        "transpositions": "When true, adjacent character swaps are considered as edits.",

        "fuzziness": "Defines the maximum edit distance.",

      },

    },

    {
      id: 'fuzzy_4',
      title: "Search user interests with rewrite method",
      description: "Search for interests similar to \u0027Elecronics\u0027 using a custom rewrite method.",
      template: `{
  "query": {
    "fuzzy": {
      "interests": {
        "value": "Elecronics",
        "fuzziness": "AUTO",
        "rewrite": "constant_score"
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Try changing the rewrite method to \u0027constant_score_blended\u0027 and compare the results.",

      ],


      tooltips: {

        "value": "The term to search for similar matches.",

        "rewrite": "Controls how the query is rewritten internally for scoring.",

        "fuzziness": "Defines the edit distance. AUTO adjusts based on term length.",

      },

    },

    {
      id: 'fuzzy_5',
      title: "Match product descriptions with expanded terms",
      description: "Search for product descriptions similar to \u0027premum\u0027 with a maximum of 20 term expansions.",
      template: `{
  "query": {
    "fuzzy": {
      "product_description": {
        "value": "premum",
        "fuzziness": 1,
        "max_expansions": 20
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try increasing max_expansions to 50 and observe the difference in results.",

      ],


      tooltips: {

        "value": "The term to search for similar matches.",

        "max_expansions": "Controls the maximum number of terms generated for the query.",

        "fuzziness": "Defines the maximum edit distance.",

      },

    },

  ],
};
