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
      title: "Search products by name and description",
      description: "This query searches for products with the term \u0027wireless headphones\u0027 in either the name or the description.",
      template: `{ "query": { "multi_match": { "query": "wireless headphones", "fields": ["product_name", "product_description"] } } }`,
      index: 'products',

      tryThis: [

        "Try searching for \u0027premium sound\u0027 or \u0027Bluetooth speakers\u0027.",

      ],


      tooltips: {

        "query": "The search term to match across fields.",

        "fields": "List of fields to search within.",

      },

    },

    {
      id: 'example_2',
      title: "Find reviews mentioning comfort",
      description: "This query searches for reviews that mention \u0027comfortable chair\u0027 in the title or text.",
      template: `{ "query": { "multi_match": { "query": "comfortable chair", "fields": ["review_title", "review_text"] } } }`,
      index: 'product_reviews',

      tryThis: [

        "Try searching for \u0027ergonomic design\u0027 or \u0027durable build\u0027.",

      ],


      tooltips: {

        "query": "The search term to find in review fields.",

        "fields": "List of fields to search within, such as review title and text.",

      },

    },

    {
      id: 'example_3',
      title: "Search user interests",
      description: "This query searches for users interested in \u0027Electronics\u0027.",
      template: `{ "query": { "multi_match": { "query": "Electronics", "fields": ["interests"] } } }`,
      index: 'product_users',

      tryThis: [

        "Try searching for \u0027Books\u0027 or \u0027Outdoor activities\u0027.",

      ],


      tooltips: {

        "query": "The search term that matches user interests.",

        "fields": "List of fields to search within, in this case, interests.",

      },

    },

    {
      id: 'example_4',
      title: "Boost scoring for product name matches",
      description: "This query searches for products with the term \u0027wireless headphones\u0027 and boosts matches in the product name field.",
      template: `{ "query": { "multi_match": { "query": "wireless headphones", "fields": ["product_name^2", "product_description"] } } }`,
      index: 'products',

      tryThis: [

        "Try boosting \u0027product_description\u0027 by using \u0027^2\u0027 after the field name.",

      ],


      tooltips: {

        "query": "The term to search for across specified fields.",

        "fields": "List of fields to search within, with optional field boosting using \u0027^\u0027.",

      },

    },

    {
      id: 'example_5',
      title: "Use \u0027best_fields\u0027 type for review searches",
      description: "This query uses the \u0027best_fields\u0027 type to find reviews mentioning \u0027durable and comfortable\u0027.",
      template: `{ "query": { "multi_match": { "query": "durable and comfortable", "type": "best_fields", "fields": ["review_title", "review_text"] } } }`,
      index: 'product_reviews',

      tryThis: [

        "Change the type to \u0027most_fields\u0027 and observe the difference in results.",

      ],


      tooltips: {

        "query": "The search term to find.",

        "type": "Defines how matching across multiple fields is scored. \u0027best_fields\u0027 selects the highest scoring field.",

        "fields": "List of fields to search within.",

      },

    },

    {
      id: 'example_6',
      title: "Search user interests using \u0027phrase_prefix\u0027",
      description: "This query uses the \u0027phrase_prefix\u0027 type to find users interested in topics starting with \u0027Electro\u0027.",
      template: `{ "query": { "multi_match": { "query": "Electro", "type": "phrase_prefix", "fields": ["interests"] } } }`,
      index: 'product_users',

      tryThis: [

        "Try searching for \u0027Books\u0027 or \u0027Outdoor\u0027.",

      ],


      tooltips: {

        "query": "The partial search term to match.",

        "type": "Specifies the type of matching, \u0027phrase_prefix\u0027 matches terms starting with the given prefix.",

        "fields": "List of fields to search within.",

      },

    },

  ],
};
