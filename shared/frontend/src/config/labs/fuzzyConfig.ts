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
      description: "Search for products where the name is similar to \u0027wireles\u0027 using automatic fuzziness.",
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

        "Try changing \u0027wireles\u0027 to \u0027wirless\u0027 or \u0027wireless\u0027 to see how fuzziness impacts results.",

      ],


      tooltips: {

        "product_name": "The field containing product names.",

        "value": "The search term. Fuzzy matching will look for similar terms.",

        "fuzziness": "The edit distance allowed for matching. Use \u0027AUTO\u0027 for dynamic adjustment.",

      },

    },

    {
      id: '2',
      title: "Match product descriptions with limited fuzziness",
      description: "Search for products with descriptions similar to \u0027premum\u0027 allowing up to 1 edit distance.",
      template: `{
  "query": {
    "fuzzy": {
      "product_description": {
        "value": "premum",
        "fuzziness": 1
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Experiment with \u0027premum\u0027 and \u0027premium\u0027 to see if results differ when fuzziness is set to 1.",

      ],


      tooltips: {

        "product_description": "The field containing product descriptions.",

        "value": "The input search string.",

        "fuzziness": "Defines the maximum allowable edit distance for matches.",

      },

    },

    {
      id: '3',
      title: "Find similar review texts",
      description: "Search for reviews with text similar to \u0027durabl\u0027 allowing up to 2 edit distances.",
      template: `{
  "query": {
    "fuzzy": {
      "review_text": {
        "value": "durabl",
        "fuzziness": 2
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Try changing \u0027durabl\u0027 to \u0027durable\u0027 or \u0027durablity\u0027 and compare the results.",

      ],


      tooltips: {

        "review_text": "The field containing review texts.",

        "value": "The term to search for similar matches.",

        "fuzziness": "The maximum edit distance. Higher values expand the search results.",

      },

    },

    {
      id: '4',
      title: "Prefix matching for user interests",
      description: "Search for users with interests similar to \u0027electroncs\u0027 requiring a prefix length of 2.",
      template: `{
  "query": {
    "fuzzy": {
      "interests": {
        "value": "electroncs",
        "fuzziness": "AUTO",
        "prefix_length": 2
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Test with \u0027electroncs\u0027 and see the effect of different prefix lengths like 0 or 3.",

      ],


      tooltips: {

        "interests": "The field representing user interests.",

        "value": "The term to search for similar matches.",

        "prefix_length": "The number of initial characters that must match exactly.",

      },

    },

    {
      id: '5',
      title: "Find verified reviews with fuzzy matching",
      description: "Search for verified reviews with titles similar to \u0027comfrtable\u0027 allowing automatic fuzziness.",
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

        "Modify \u0027comfrtable\u0027 to \u0027comfortable\u0027 or \u0027comfrtble\u0027 and observe the results.",

      ],


      tooltips: {

        "review_title": "The field containing review titles.",

        "value": "The input term for fuzzy matching.",

        "fuzziness": "Automatically adjusts the edit distance based on the input length.",

      },

    },

  ],
};
