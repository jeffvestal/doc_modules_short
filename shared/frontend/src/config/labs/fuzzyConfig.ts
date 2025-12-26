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
      id: 'example_1',
      title: "Search for similar product names",
      description: "Find products with names similar to \u0027wireles\u0027 using automatic fuzziness adjustment.",
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

        "Try changing the value to \u0027wirless\u0027 or \u0027wirleess\u0027 to observe how fuzziness impacts results.",

      ],


      tooltips: {

        "fuzziness": "Defines the edit distance allowed. \u0027AUTO\u0027 adjusts based on the length of the search term.",

        "value": "The term to search for similar matches.",

      },

    },

    {
      id: 'example_2',
      title: "Find reviews with similar titles",
      description: "Search for reviews with titles similar to \u0027comfotable\u0027 and require at least 2 matching prefix characters.",
      template: `{
  "query": {
    "fuzzy": {
      "review_title": {
        "value": "comfotable",
        "fuzziness": "AUTO",
        "prefix_length": 2
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Try adjusting the prefix_length to 0 or 3 to see how it affects the results.",

      ],


      tooltips: {

        "prefix_length": "Specifies the number of characters at the start of the term that must match exactly.",

        "value": "The term to search for similar matches.",

      },

    },

    {
      id: 'example_3',
      title: "Search user interests with fuzziness level 2",
      description: "Find users with interests matching terms similar to \u0027electronic\u0027 with a fuzziness level of 2.",
      template: `{
  "query": {
    "fuzzy": {
      "interests": {
        "value": "electronic",
        "fuzziness": 2
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Try changing the fuzziness to \u0027AUTO\u0027 or 1 to see how it impacts the results.",

      ],


      tooltips: {

        "fuzziness": "Defines the edit distance allowed. A numeric value specifies the exact distance.",

        "value": "The term to search for similar matches.",

      },

    },

    {
      id: 'example_4',
      title: "Find products with brand name typos",
      description: "Search for products with brand names similar to \u0027AudioMx\u0027 using fuzziness.",
      template: `{
  "query": {
    "fuzzy": {
      "product_brand": {
        "value": "AudioMx",
        "fuzziness": 1
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try changing the value to \u0027AudioMaxx\u0027 or \u0027AudMax\u0027 to test different levels of fuzziness.",

      ],


      tooltips: {

        "fuzziness": "Defines the edit distance allowed. A numeric value specifies the exact distance.",

        "value": "The term to search for similar matches.",

      },

    },

    {
      id: 'example_5',
      title: "Find reviews with text typos",
      description: "Search for reviews with text matching terms similar to \u0027durabe\u0027 using fuzziness.",
      template: `{
  "query": {
    "fuzzy": {
      "review_text": {
        "value": "durabe",
        "fuzziness": "AUTO",
        "transpositions": true
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Try turning transpositions off or setting fuzziness to 1 to compare results.",

      ],


      tooltips: {

        "transpositions": "Allows swapping adjacent characters as part of the edit distance.",

        "value": "The term to search for similar matches.",

      },

    },

  ],
};
