import type { LabConfig } from '../../types';

export const regexpConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'regexp_query',
  displayName: 'Regexp Query',
  description: "Returns documents that contain terms matching a [regular expression](https://en.wikipedia.org/wiki/Regular_expression). A regular expression is a way to match patterns in data using placeholder characters, called operators. For a list of operators supported by the `regexp` query, see [Regular expression syntax](https://www.elastic.co/docs/reference/query-languages/query-dsl/regexp-syntax).",
  docUrl: 'https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-regexp-query',

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
      id: 'example2',
      title: "Find reviews with titles matching a specific pattern",
      description: "Search for reviews where the title contains variations of the word \u0027great\u0027, such as \u0027great\u0027, \u0027greater\u0027, or \u0027greatest\u0027.",
      template: `{
  "query": {
    "regexp": {
      "review_title": {
        "value": "great(er|est)?",
        "flags": "ALL",
        "case_insensitive": true
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Try changing the pattern to match other variations, such as \u0027good\u0027 or \u0027better\u0027.",

      ],


      tooltips: {

        "value": "The regular expression to match variations of the word \u0027great\u0027.",

        "flags": "Flags to define the regex behavior. \u0027ALL\u0027 is the default.",

        "case_insensitive": "Set to true to ignore case differences.",

      },

    },

    {
      id: 'example3',
      title: "Search for users with specific interests",
      description: "Find users whose interests start with the letter \u0027E\u0027 and end with \u0027ics\u0027, such as \u0027Electronics\u0027.",
      template: `{
  "query": {
    "regexp": {
      "interests": {
        "value": "E.*ics",
        "flags": "ALL",
        "case_insensitive": false
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Try searching for interests starting with other letters or ending in different patterns.",

      ],


      tooltips: {

        "value": "The regex pattern to match interests, e.g., \u0027Electronics\u0027.",

        "flags": "Defines regex behavior. \u0027ALL\u0027 enables all regex features.",

        "case_insensitive": "Set to false to make the matching case-sensitive.",

      },

    },

    {
      id: 'example5',
      title: "Search for reviews mentioning helpful hints",
      description: "Find reviews where the text contains the word \u0027help\u0027 followed by any characters and ending with \u0027ful\u0027.",
      template: `{
  "query": {
    "regexp": {
      "review_text": {
        "value": "help.*ful",
        "flags": "ALL",
        "case_insensitive": true
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Modify the regex to match other terms like \u0027useful\u0027 or \u0027beneficial\u0027.",

      ],


      tooltips: {

        "value": "The regex pattern to capture variations of \u0027helpful\u0027.",

        "flags": "Specifies the behavior of the regular expression.",

        "case_insensitive": "Set to true for case-insensitive matching.",

      },

    },

    {
      id: 'example6',
      title: "Find users with specific usernames",
      description: "Search for usernames starting with \u0027Cam\u0027 and ending with \u002720\u0027.",
      template: `{
  "query": {
    "regexp": {
      "username": {
        "value": "Cam.*20",
        "flags": "ALL",
        "case_insensitive": false
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Change the regex to find other usernames, such as those starting with \u0027Jor\u0027 or ending with \u002733\u0027.",

      ],


      tooltips: {

        "value": "The regular expression pattern to match usernames.",

        "flags": "Enables specific regex features. \u0027ALL\u0027 allows full functionality.",

        "case_insensitive": "Set to true to ignore case, or false for case-sensitive matches.",

      },

    },

  ],
};
