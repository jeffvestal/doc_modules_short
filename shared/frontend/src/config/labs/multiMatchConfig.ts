import type { LabConfig } from '../../types';

export const multiMatchConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'multi_match_query',
  displayName: 'Multi-match Query',
  description: "The `multi_match` query builds on the `match` query to allow multi-field queries.",
  docUrl: 'https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-multi-match-query',

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
      id: 'example1',
      title: "Search across product name and description",
      description: "Find products related to \u0027wireless headphones\u0027 by searching both name and description fields.",
      template: `{
  "query": {
    "multi_match": {
      "query": "wireless headphones",
      "fields": ["product_name", "product_description"]
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try replacing \u0027wireless headphones\u0027 with \u0027premium speakers\u0027 to see different results.",

      ],


      tooltips: {

        "query": "The search term to match against the specified fields.",

        "fields": "The fields to search within. Specify multiple fields for multi-field matching.",

      },

    },

    {
      id: 'example2',
      title: "Search product reviews",
      description: "Find reviews mentioning \u0027comfortable\u0027 and \u0027durable\u0027, searching across title and text fields.",
      template: `{
  "query": {
    "multi_match": {
      "query": "comfortable durable",
      "fields": ["review_title", "review_text"]
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Try modifying the query to \u0027stylish durable\u0027 to find reviews emphasizing style.",

      ],


      tooltips: {

        "query": "The search terms to look for in the review title and text.",

        "fields": "Specifies the fields to search within review documents.",

      },

    },

    {
      id: 'example3',
      title: "Cross-field search for user interests",
      description: "Search for users interested in both \u0027Electronics\u0027 and \u0027Books\u0027 across the interests field.",
      template: `{
  "query": {
    "multi_match": {
      "query": "Electronics Books",
      "fields": ["interests"]
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Replace \u0027Electronics Books\u0027 with \u0027Sports Outdoors\u0027 to find users with different interests.",

      ],


      tooltips: {

        "query": "The keywords to search for within user interests.",

        "fields": "The field to perform the search on. Here, searching within interests.",

      },

    },

    {
      id: 'example4',
      title: "Weighted search across fields",
      description: "Boost results from the product name field while searching \u0027wireless headphones\u0027.",
      template: `{
  "query": {
    "multi_match": {
      "query": "wireless headphones",
      "fields": ["product_name^2", "product_description"]
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Adjust the boost factor on \u0027product_name^2\u0027 to prioritize this field more strongly.",

      ],


      tooltips: {

        "query": "The search term to match against the fields.",

        "fields": "Use field boosting (e.g., \u0027field^2\u0027) to prioritize results from specific fields.",

      },

    },

    {
      id: 'example5',
      title: "Search using phrase prefix type",
      description: "Find reviews starting with \u0027durable\u0027 or \u0027comfortable\u0027 in the title and text fields.",
      template: `{
  "query": {
    "multi_match": {
      "query": "durable comfortable",
      "type": "phrase_prefix",
      "fields": ["review_title", "review_text"]
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Try replacing \u0027durable comfortable\u0027 with \u0027easy assembly\u0027 to find reviews with similar prefixes.",

      ],


      tooltips: {

        "query": "The search term to match with prefix logic.",

        "type": "Specifies the query type. \u0027phrase_prefix\u0027 matches the beginning of phrases.",

        "fields": "The fields to search within for matching prefixes.",

      },

    },

  ],
};
