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
      title: "Search for similar product names",
      description: "Find products where the name is similar to the term \u0027wireles\u0027 using AUTO fuzziness.",
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

        "Try changing \u0027wireles\u0027 to a term like \u0027wirless\u0027 or \u0027wirles\u0027 to see how variations affect the results.",

      ],


      tooltips: {

        "fuzziness": "Determines the edit distance allowed for matches. AUTO adjusts based on input length.",

      },

    },

    {
      id: 'example_2',
      title: "Search for similar review text",
      description: "Find reviews where the text is similar to the term \u0027comfortabl\u0027 with fuzziness of 2 and a prefix length of 1.",
      template: `{
  "query": {
    "fuzzy": {
      "review_text": {
        "value": "comfortabl",
        "fuzziness": 2,
        "prefix_length": 1
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Modify \u0027comfortabl\u0027 to terms like \u0027comfrtable\u0027 or \u0027cmfortabl\u0027 and observe changes in results.",

      ],


      tooltips: {

        "fuzziness": "Specifies the maximum edit distance allowed for matches.",

        "prefix_length": "Ensures the first \u0027prefix_length\u0027 characters match exactly.",

      },

    },

    {
      id: 'example_3',
      title: "Search for similar usernames",
      description: "Find user accounts where the username is similar to \u0027AveryWillims\u0027 using AUTO fuzziness and transpositions enabled.",
      template: `{
  "query": {
    "fuzzy": {
      "username": {
        "value": "AveryWillims",
        "fuzziness": "AUTO",
        "transpositions": true
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Change \u0027AveryWillims\u0027 to variations like \u0027AveryWilams\u0027 or \u0027AveryWilims\u0027 and note the results.",

      ],


      tooltips: {

        "transpositions": "Allows matching terms with transposed adjacent characters.",

      },

    },

    {
      id: 'example_4',
      title: "Search for similar product descriptions",
      description: "Find products where the description is similar to \u0027premum\u0027 with AUTO fuzziness and constant score rewrite.",
      template: `{
  "query": {
    "fuzzy": {
      "product_description": {
        "value": "premum",
        "fuzziness": "AUTO",
        "rewrite": "constant_score_blended"
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try changing \u0027premum\u0027 to \u0027premium\u0027 or \u0027prmium\u0027 and see how the similarity affects the matches.",

      ],


      tooltips: {

        "rewrite": "Specifies how the query should be rewritten. \u0027constant_score_blended\u0027 affects scoring.",

      },

    },

    {
      id: 'example_5',
      title: "Search for similar interests",
      description: "Find users with interests similar to \u0027Electonics\u0027 using fuzziness of 1.",
      template: `{
  "query": {
    "fuzzy": {
      "interests": {
        "value": "Electonics",
        "fuzziness": 1
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Replace \u0027Electonics\u0027 with \u0027Electroncs\u0027 or \u0027Electrnics\u0027 to test different edit distances.",

      ],


      tooltips: {

        "fuzziness": "Maximum edit distance permitted. Lower values require stricter matching.",

      },

    },

  ],
};
