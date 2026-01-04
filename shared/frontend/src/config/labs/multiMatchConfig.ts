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
      title: "Search products by name and description",
      description: "Find products that mention \u0027wireless\u0027 in their name or description.",
      template: `{
  "query": {
    "multi_match" : {
      "query": "wireless",
      "fields": ["product_name", "product_description"]
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try changing \u0027wireless\u0027 to \u0027premium\u0027 to see different results.",

      ],


      tooltips: {

        "query": "The text you want to search for.",

        "fields": "The fields to search in.",

      },

    },

    {
      id: 'example2',
      title: "Search reviews for specific keywords",
      description: "Find reviews that mention \u0027comfortable\u0027 in their title or text.",
      template: `{
  "query": {
    "multi_match" : {
      "query": "comfortable",
      "fields": ["review_title", "review_text"]
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Try searching for \u0027durable\u0027 instead of \u0027comfortable\u0027.",

      ],


      tooltips: {

        "query": "The text to search for in review data.",

        "fields": "Specify the review title and text fields to search.",

      },

    },

    {
      id: 'example3',
      title: "Search user interests for categories",
      description: "Find users interested in \u0027Books\u0027.",
      template: `{
  "query": {
    "multi_match" : {
      "query": "Books",
      "fields": ["interests"]
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Try searching for \u0027Electronics\u0027 instead of \u0027Books\u0027.",

      ],


      tooltips: {

        "query": "The category or interest to search for.",

        "fields": "Specify the user interests field.",

      },

    },

    {
      id: 'example4',
      title: "Boost specific fields in product search",
      description: "Search for \u0027audio\u0027 and prioritize matches in the product name over the description.",
      template: `{
  "query": {
    "multi_match" : {
      "query": "audio",
      "fields": ["product_name^2", "product_description"]
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Change the boost factor (e.g., \u0027product_name^3\u0027) to prioritize name matches further.",

      ],


      tooltips: {

        "query": "The text you want to search for.",

        "fields": "Use \u0027^\u0027 to boost the relevance of specific fields.",

      },

    },

    {
      id: 'example5',
      title: "Search reviews with cross-fields type",
      description: "Search for reviews mentioning \u0027durable\u0027 across multiple fields.",
      template: `{
  "query": {
    "multi_match" : {
      "query": "durable",
      "type": "cross_fields",
      "fields": ["review_title", "review_text"]
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Try using the \u0027best_fields\u0027 type for comparison.",

      ],


      tooltips: {

        "query": "The text to search for in review data.",

        "type": "The type of multi-match query to use.",

        "fields": "Specify the fields to search across.",

      },

    },

  ],
};
