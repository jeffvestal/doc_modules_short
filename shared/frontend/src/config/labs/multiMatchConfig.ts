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
      id: '1',
      title: "Basic multi-match query on product fields",
      description: "Search for products with the phrase \u0027wireless headphones\u0027 in their name or description.",
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

        "Try searching for other product features, like \u0027premium sound\u0027 or \u0027smartwatch\u0027.",

      ],


      tooltips: {

        "query": "The text to search for.",

        "fields": "The fields to be searched. Use fields relevant to the dataset.",

      },

    },

    {
      id: '2',
      title: "Boosting specific fields",
      description: "Boost the importance of the product name field when searching for \u0027smartphone\u0027.",
      template: `{
  "query": {
    "multi_match": {
      "query": "smartphone",
      "fields": ["product_name^2", "product_description"]
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Experiment with different boosts, e.g., \u0027product_description^3\u0027.",

      ],


      tooltips: {

        "fields": "Boost specific fields by appending a caret (^) and a numeric value.",

      },

    },

    {
      id: '3',
      title: "Multi-match query on review fields",
      description: "Search for reviews mentioning \u0027comfortable\u0027 or \u0027durable\u0027 in the title or text.",
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

        "Try searching for reviews mentioning other qualities like \u0027affordable\u0027 or \u0027long-lasting\u0027.",

      ],


      tooltips: {

        "query": "Search terms can include multiple words, separated by spaces.",

        "fields": "Search across multiple fields relevant to the review content.",

      },

    },

    {
      id: '4',
      title: "Using type \u0027phrase_prefix\u0027",
      description: "Search for products with descriptions starting with \u0027wireless\u0027.",
      template: `{
  "query": {
    "multi_match": {
      "query": "wireless",
      "type": "phrase_prefix",
      "fields": ["product_description"]
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try changing the prefix to \u0027bluetooth\u0027 or \u0027smart\u0027.",

      ],


      tooltips: {

        "type": "The `phrase_prefix` type matches terms starting with the provided prefix.",

        "query": "The prefix to match at the start of the terms.",

      },

    },

    {
      id: '5',
      title: "Cross-field search for user interests",
      description: "Search for users interested in \u0027Books\u0027 or related terms.",
      template: `{
  "query": {
    "multi_match": {
      "query": "Books",
      "type": "cross_fields",
      "fields": ["interests"]
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Try searching for other interests like \u0027Electronics\u0027 or \u0027Toys\u0027.",

      ],


      tooltips: {

        "type": "The `cross_fields` type combines fields to find the best match.",

        "fields": "The fields to combine in the search.",

      },

    },

    {
      id: '6',
      title: "Tie breaker for multiple fields",
      description: "Search for reviews mentioning \u0027great quality\u0027, balancing matches across title and text.",
      template: `{
  "query": {
    "multi_match": {
      "query": "great quality",
      "type": "best_fields",
      "fields": ["review_title", "review_text"],
      "tie_breaker": 0.3
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Adjust the tie_breaker value to see how it affects scoring.",

      ],


      tooltips: {

        "type": "The `best_fields` type selects the best matching field for scoring.",

        "tie_breaker": "Adjusts the scoring for matches in multiple fields.",

      },

    },

  ],
};
