import type { LabConfig } from '../../types';

export const fuzzyConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'fuzzy_query',
  displayName: 'Fuzzy Query',
  description: "Returns documents that contain terms similar to the search term, as measured by a Levenshtein edit distance. An edit distance is the number of one-character changes needed to turn one term into another. These changes can include: - Changing a character (b**ox \u2192 f**ox) - Removing a character (b**lack \u2192 lack) - Inserting a character (sic \u2192 sic**k**) - Transposing two adjacent characters (ac**t \u2192 ca**t)",
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
      title: "Search for products with fuzzy match on name",
      description: "This example demonstrates fuzzy matching on the product_name field to find products with names similar to \u0027wireless\u0027.",
      template: `{
  "query": {
    "fuzzy": {
      "product_name": {
        "value": "wireless",
        "fuzziness": "AUTO"
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Experiment with different values for fuzziness, such as 1 or 2, to control the edit distance.",

      ],


      tooltips: {

        "value": "The term to match against, allowing for fuzzy variations.",

        "fuzziness": "The maximum edit distance allowed. AUTO calculates the distance based on the term length.",

      },

    },

    {
      id: '2',
      title: "Find reviews with fuzzy match on title",
      description: "This example finds reviews with titles similar to \u0027durable\u0027, allowing for fuzzy matches.",
      template: `{
  "query": {
    "fuzzy": {
      "review_title": {
        "value": "durable",
        "max_expansions": 20
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Try increasing max_expansions to include more variations of the term.",

      ],


      tooltips: {

        "value": "The term to match against.",

        "max_expansions": "The maximum number of variations to consider for the fuzzy match.",

      },

    },

    {
      id: '3',
      title: "Search for users with fuzzy match on interests",
      description: "This query searches for users whose interests are similar to \u0027Books\u0027, allowing fuzzy matches.",
      template: `{
  "query": {
    "fuzzy": {
      "interests": {
        "value": "Books",
        "prefix_length": 2
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Adjust prefix_length to require a fixed number of matching characters at the start.",

      ],


      tooltips: {

        "value": "The term to match against.",

        "prefix_length": "The number of initial characters that must match exactly.",

      },

    },

    {
      id: '4',
      title: "Find products with fuzzy match and custom transpositions",
      description: "Use this query to find products where the name is similar to \u0027premium\u0027 and allows transpositions.",
      template: `{
  "query": {
    "fuzzy": {
      "product_name": {
        "value": "premium",
        "transpositions": true
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Experiment with transpositions set to false to see how results differ.",

      ],


      tooltips: {

        "value": "The term to match against.",

        "transpositions": "Allows swapping of adjacent characters during fuzzy matching.",

      },

    },

    {
      id: '5',
      title: "Search reviews with fuzzy match and constant_score rewrite",
      description: "This query demonstrates fuzzy matching on review text, using a custom rewrite method.",
      template: `{
  "query": {
    "fuzzy": {
      "review_text": {
        "value": "comfortable",
        "rewrite": "constant_score"
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Test other rewrite options like \u0027scoring_boolean\u0027 or \u0027constant_score_blended\u0027 to observe scoring behavior.",

      ],


      tooltips: {

        "value": "The term to match against.",

        "rewrite": "Specifies how the query is rewritten internally; affects scoring and performance.",

      },

    },

  ],
};
