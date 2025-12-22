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
      id: 'example_1',
      title: "Search product by name and description",
      description: "Find products that match the query \u0027wireless\u0027 in both the name and description fields.",
      template: `{
  "query": {
    "multi_match": {
      "query": "wireless",
      "fields": ["product_name", "product_description"]
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try searching for \u0027premium\u0027 or \u0027Bluetooth\u0027 to explore the results for different keywords.",

      ],


      tooltips: {

        "query": "The text you want to search for.",

        "fields": "The fields to search against. Specify multiple fields for multi-field search.",

      },

    },

    {
      id: 'example_2',
      title: "Search reviews with boosted fields",
      description: "Prioritize matches in the review title field over the review text field using field boosting.",
      template: `{
  "query": {
    "multi_match": {
      "query": "comfortable",
      "fields": ["review_title^2", "review_text"]
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Experiment with boosting other fields, such as \u0027review_text^3\u0027.",

      ],


      tooltips: {

        "fields": "Boosting a field increases its importance in the scoring. Use \u0027^\u0027 followed by a number.",

      },

    },

    {
      id: 'example_3',
      title: "Search users based on interests",
      description: "Find users with interests containing the keyword \u0027Electronics\u0027.",
      template: `{
  "query": {
    "multi_match": {
      "query": "Electronics",
      "fields": ["interests"]
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Try searching for interests like \u0027Books\u0027 or \u0027Gaming\u0027.",

      ],


      tooltips: {

        "query": "The keyword or phrase to search for.",

        "fields": "Specify the field or fields to search in.",

      },

    },

    {
      id: 'example_4',
      title: "Cross-fields search with AND operator",
      description: "Perform a cross-fields search requiring all terms in the query \u0027durable comfortable\u0027 to match.",
      template: `{
  "query": {
    "multi_match": {
      "query": "durable comfortable",
      "type": "cross_fields",
      "fields": ["review_title", "review_text"],
      "operator": "and"
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Use \u0027or\u0027 as the operator to allow partial matches.",

      ],


      tooltips: {

        "type": "The type of multi-match query. \u0027cross_fields\u0027 combines multiple fields as if they were one.",

        "operator": "The logical operator to combine matches. Use \u0027and\u0027 for strict matching and \u0027or\u0027 for flexible matching.",

      },

    },

    {
      id: 'example_5',
      title: "Phrase prefix search for products",
      description: "Search for products where the name or description starts with \u0027wire\u0027.",
      template: `{
  "query": {
    "multi_match": {
      "query": "wire",
      "type": "phrase_prefix",
      "fields": ["product_name", "product_description"]
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try searching for prefixes like \u0027blue\u0027 or \u0027smart\u0027.",

      ],


      tooltips: {

        "type": "The type of multi-match query. \u0027phrase_prefix\u0027 matches documents that start with the given prefix.",

      },

    },

    {
      id: 'example_6',
      title: "Most fields query for products",
      description: "Find products where the query \u0027premium wireless\u0027 matches the most fields.",
      template: `{
  "query": {
    "multi_match": {
      "query": "premium wireless",
      "type": "most_fields",
      "fields": ["product_name", "product_description"]
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Test multi-field queries such as \u0027Bluetooth headphones\u0027 or \u0027durable stylish\u0027.",

      ],


      tooltips: {

        "type": "The type of multi-match query. \u0027most_fields\u0027 scores documents higher if the query matches more fields.",

      },

    },

  ],
};
