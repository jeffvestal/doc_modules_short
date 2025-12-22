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
      id: 'example_1',
      title: "Basic multi-match query",
      description: "Search for products with \u0027wireless headphones\u0027 in the name or description.",
      template: `{"query": {"multi_match": {"query": "wireless headphones", "fields": ["product_name", "product_description"]}}}`,
      index: 'products',

      tryThis: [

        "Try changing the query to \u0027premium speakers\u0027 or adding another field like \u0027product_category\u0027 to the fields list.",

      ],


      tooltips: {

        "query": "The search term you want to find matches for.",

        "fields": "The list of fields to search in. Use relevant fields to narrow down your query.",

      },

    },

    {
      id: 'example_2',
      title: "Best fields type",
      description: "Search product reviews where \u0027durable\u0027 matches the best fields.",
      template: `{"query": {"multi_match": {"query": "durable", "fields": ["review_title", "review_text"], "type": "best_fields"}}}`,
      index: 'product_reviews',

      tryThis: [

        "Try changing the type to \u0027most_fields\u0027 or modifying the query to \u0027comfortable\u0027.",

      ],


      tooltips: {

        "type": "The scoring behavior for matching documents. \u0027best_fields\u0027 chooses the best matching field.",

        "fields": "The fields where Elasticsearch will search for the query term.",

      },

    },

    {
      id: 'example_3',
      title: "Phrase prefix type",
      description: "Search for reviews with text phrases starting with \u0027quick brown\u0027.",
      template: `{"query": {"multi_match": {"query": "quick brown", "fields": ["review_text"], "type": "phrase_prefix"}}}`,
      index: 'product_reviews',

      tryThis: [

        "Experiment with other prefixes like \u0027comfortable chair\u0027 or \u0027high quality\u0027.",

      ],


      tooltips: {

        "type": "The type for matching phrases. \u0027phrase_prefix\u0027 searches for phrases that start with the query term.",

        "query": "The phrase prefix you want to search.",

      },

    },

    {
      id: 'example_4',
      title: "Cross fields type",
      description: "Search for users interested in \u0027Electronics\u0027 across multiple fields.",
      template: `{"query": {"multi_match": {"query": "Electronics", "fields": ["interests"], "type": "cross_fields"}}}`,
      index: 'product_users',

      tryThis: [

        "Add another query term like \u0027Books\u0027 or use \u0027Electronics\u0027 with a different type, such as \u0027best_fields\u0027.",

      ],


      tooltips: {

        "type": "The scoring behavior for cross-field matching. \u0027cross_fields\u0027 looks for matches across multiple fields.",

        "fields": "The fields where Elasticsearch will search for the query term.",

      },

    },

    {
      id: 'example_5',
      title: "Tie breaker parameter",
      description: "Use a tie breaker to balance scores across fields when searching for \u0027wireless\u0027.",
      template: `{"query": {"multi_match": {"query": "wireless", "fields": ["product_name", "product_description"], "tie_breaker": 0.3}}}`,
      index: 'products',

      tryThis: [

        "Try adjusting the tie breaker value or changing the query term to \u0027Bluetooth\u0027.",

      ],


      tooltips: {

        "tie_breaker": "A value used to combine scores from multiple fields. Higher values will prioritize matches across fields.",

        "fields": "The fields where Elasticsearch will search for the query term.",

      },

    },

  ],
};
