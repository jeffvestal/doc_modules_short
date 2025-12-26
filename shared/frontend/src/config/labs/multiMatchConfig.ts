import type { LabConfig } from '../../types';

export const multiMatchConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'multi_match_query',
  displayName: 'Multi-match Query',
  description: "The `multi_match` query builds on the [`match` query](https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-match-query) to allow multi-field queries.",
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
      id: '1',
      title: "Search across product name and description",
      description: "Find products that match the term \u0027wireless headphones\u0027 in either the name or description.",
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

        "Try searching for another product-related term like \u0027noise cancelling\u0027 or \u0027smartphone\u0027.",

      ],


      tooltips: {

        "query": "The search term to look for.",

        "fields": "The fields to search within. You can include multiple fields.",

      },

    },

    {
      id: '2',
      title: "Search product reviews for keywords",
      description: "Search the title and text of reviews for mentions of \u0027great performance\u0027.",
      template: `{
  "query": {
    "multi_match": {
      "query": "great performance",
      "fields": ["review_title", "review_text"]
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Try searching for phrases like \u0027excellent quality\u0027 or \u0027highly recommend\u0027.",

      ],


      tooltips: {

        "query": "The search term to look for in review content.",

        "fields": "The fields to search within, such as review title and text.",

      },

    },

    {
      id: '3',
      title: "Boost specific fields in queries",
      description: "Boost the importance of the product name field over the description when searching for \u0027smart speaker\u0027.",
      template: `{
  "query": {
    "multi_match": {
      "query": "smart speaker",
      "fields": ["product_name^2", "product_description"]
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Adjust the boost value (e.g., `^3`) to emphasize the product name even more.",

      ],


      tooltips: {

        "query": "The search term to look for.",

        "fields": "Boost a field by appending `^\u003cboost value\u003e`; higher boosts make the field more significant in scoring.",

      },

    },

    {
      id: '4',
      title: "Use the \u0027most_fields\u0027 type for field aggregation",
      description: "Search for terms in multiple fields and combine the scores of all matching fields.",
      template: `{
  "query": {
    "multi_match": {
      "query": "comfortable",
      "type": "most_fields",
      "fields": ["review_title", "review_text"]
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Switch to the \u0027best_fields\u0027 type for the highest-scoring field or try another phrase like \u0027durable\u0027.",

      ],


      tooltips: {

        "query": "The search term to look for.",

        "type": "The scoring method to use. \u0027most_fields\u0027 combines scores from all fields.",

        "fields": "The fields to search within.",

      },

    },

    {
      id: '5',
      title: "Search user interests",
      description: "Search for users with interests related to \u0027photography\u0027.",
      template: `{
  "query": {
    "multi_match": {
      "query": "photography",
      "fields": ["interests"]
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Try searching for interests like \u0027hiking\u0027 or \u0027gardening\u0027.",

      ],


      tooltips: {

        "query": "The term to search for in user interests.",

        "fields": "The fields to search, in this case, the \u0027interests\u0027 field.",

      },

    },

    {
      id: '6',
      title: "Use the \u0027phrase_prefix\u0027 type for autocomplete",
      description: "Search for terms starting with \u0027wire\u0027 in product name and description.",
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

        "Try changing the prefix to \u0027smart\u0027 or \u0027head\u0027 for other autocomplete suggestions.",

      ],


      tooltips: {

        "query": "The prefix to search for.",

        "type": "The \u0027phrase_prefix\u0027 type matches terms starting with the given prefix.",

        "fields": "The fields to search within.",

      },

    },

  ],
};
