import type { LabConfig } from '../../types';

export const termConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'term_query',
  displayName: 'Term Query',
  description: "Returns documents that contain an **exact** term in a provided field. You can use the `term` query to find documents based on a precise value such as a price, a product ID, or a username.",
  docUrl: 'https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-term-query',

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
      title: "Find products by category",
      description: "Search for products in the \u0027Electronics\u0027 category.",
      template: `{ "query": { "term": { "product_category": { "value": "Electronics" } } } }`,
      index: 'products',

      tryThis: [

        "T",

        "r",

        "y",

        " ",

        "c",

        "h",

        "a",

        "n",

        "g",

        "i",

        "n",

        "g",

        " ",

        "t",

        "h",

        "e",

        " ",

        "v",

        "a",

        "l",

        "u",

        "e",

        " ",

        "t",

        "o",

        " ",

        "a",

        "n",

        "o",

        "t",

        "h",

        "e",

        "r",

        " ",

        "c",

        "a",

        "t",

        "e",

        "g",

        "o",

        "r",

        "y",

        ",",

        " ",

        "s",

        "u",

        "c",

        "h",

        " ",

        "a",

        "s",

        " ",

        "\u0027",

        "B",

        "o",

        "o",

        "k",

        "s",

        "\u0027",

        " ",

        "o",

        "r",

        " ",

        "\u0027",

        "C",

        "l",

        "o",

        "t",

        "h",

        "i",

        "n",

        "g",

        "\u0027",

        ".",

      ],


      tooltips: {

        "product_category": "The category of the product. Exact match required, e.g., \u0027Electronics\u0027.",

      },

    },

    {
      id: '2',
      title: "Find reviews with a specific rating",
      description: "Retrieve all reviews that have a 5-star rating.",
      template: `{ "query": { "term": { "review_rating": { "value": 5 } } } }`,
      index: 'product_reviews',

      tryThis: [

        "T",

        "r",

        "y",

        " ",

        "s",

        "e",

        "t",

        "t",

        "i",

        "n",

        "g",

        " ",

        "t",

        "h",

        "e",

        " ",

        "v",

        "a",

        "l",

        "u",

        "e",

        " ",

        "t",

        "o",

        " ",

        "a",

        "n",

        "o",

        "t",

        "h",

        "e",

        "r",

        " ",

        "r",

        "a",

        "t",

        "i",

        "n",

        "g",

        " ",

        "(",

        "e",

        ".",

        "g",

        ".",

        ",",

        " ",

        "1",

        ",",

        " ",

        "3",

        ")",

        " ",

        "t",

        "o",

        " ",

        "s",

        "e",

        "e",

        " ",

        "d",

        "i",

        "f",

        "f",

        "e",

        "r",

        "e",

        "n",

        "t",

        " ",

        "r",

        "e",

        "s",

        "u",

        "l",

        "t",

        "s",

        ".",

      ],


      tooltips: {

        "review_rating": "The rating assigned to the review. Exact match required (possible values: 1-5).",

      },

    },

    {
      id: '3',
      title: "Find users by username",
      description: "Locate a user with the username \u0027AveryWilliams55\u0027.",
      template: `{ "query": { "term": { "username": { "value": "AveryWilliams55" } } } }`,
      index: 'product_users',

      tryThis: [

        "T",

        "r",

        "y",

        " ",

        "s",

        "e",

        "a",

        "r",

        "c",

        "h",

        "i",

        "n",

        "g",

        " ",

        "f",

        "o",

        "r",

        " ",

        "o",

        "t",

        "h",

        "e",

        "r",

        " ",

        "u",

        "s",

        "e",

        "r",

        "n",

        "a",

        "m",

        "e",

        "s",

        ",",

        " ",

        "s",

        "u",

        "c",

        "h",

        " ",

        "a",

        "s",

        " ",

        "\u0027",

        "C",

        "a",

        "m",

        "e",

        "r",

        "o",

        "n",

        "L",

        "o",

        "p",

        "e",

        "z",

        "2",

        "0",

        "\u0027",

        " ",

        "o",

        "r",

        " ",

        "\u0027",

        "J",

        "o",

        "r",

        "d",

        "a",

        "n",

        "M",

        "a",

        "r",

        "t",

        "i",

        "n",

        "e",

        "z",

        "3",

        "3",

        "\u0027",

        ".",

      ],


      tooltips: {

        "username": "The unique username of the user. Exact match required.",

      },

    },

    {
      id: '4',
      title: "Find products by brand",
      description: "Search for products from the \u0027GlowNaturals\u0027 brand.",
      template: `{ "query": { "term": { "product_brand": { "value": "GlowNaturals" } } } }`,
      index: 'products',

      tryThis: [

        "E",

        "x",

        "p",

        "e",

        "r",

        "i",

        "m",

        "e",

        "n",

        "t",

        " ",

        "w",

        "i",

        "t",

        "h",

        " ",

        "o",

        "t",

        "h",

        "e",

        "r",

        " ",

        "b",

        "r",

        "a",

        "n",

        "d",

        "s",

        " ",

        "s",

        "u",

        "c",

        "h",

        " ",

        "a",

        "s",

        " ",

        "\u0027",

        "A",

        "u",

        "d",

        "i",

        "o",

        "M",

        "a",

        "x",

        "\u0027",

        " ",

        "o",

        "r",

        " ",

        "\u0027",

        "P",

        "l",

        "a",

        "y",

        "S",

        "m",

        "a",

        "r",

        "t",

        "\u0027",

        ".",

      ],


      tooltips: {

        "product_brand": "The brand of the product. Exact match required, e.g., \u0027GlowNaturals\u0027.",

      },

    },

    {
      id: '5',
      title: "Find reviews marked as verified purchase",
      description: "Retrieve all reviews that are verified purchases.",
      template: `{ "query": { "term": { "verified_purchase": { "value": "True" } } } }`,
      index: 'product_reviews',

      tryThis: [

        "C",

        "h",

        "a",

        "n",

        "g",

        "e",

        " ",

        "t",

        "h",

        "e",

        " ",

        "v",

        "a",

        "l",

        "u",

        "e",

        " ",

        "t",

        "o",

        " ",

        "\u0027",

        "F",

        "a",

        "l",

        "s",

        "e",

        "\u0027",

        " ",

        "t",

        "o",

        " ",

        "f",

        "i",

        "n",

        "d",

        " ",

        "u",

        "n",

        "v",

        "e",

        "r",

        "i",

        "f",

        "i",

        "e",

        "d",

        " ",

        "p",

        "u",

        "r",

        "c",

        "h",

        "a",

        "s",

        "e",

        "s",

        ".",

      ],


      tooltips: {

        "verified_purchase": "Indicates whether the purchase was verified (\u0027True\u0027 or \u0027False\u0027).",

      },

    },

    {
      id: '6',
      title: "Find users by account type",
      description: "Find users with a \u0027Premium\u0027 account type.",
      template: `{ "query": { "term": { "account_type": { "value": "Premium" } } } }`,
      index: 'product_users',

      tryThis: [

        "T",

        "r",

        "y",

        " ",

        "s",

        "e",

        "a",

        "r",

        "c",

        "h",

        "i",

        "n",

        "g",

        " ",

        "f",

        "o",

        "r",

        " ",

        "u",

        "s",

        "e",

        "r",

        "s",

        " ",

        "w",

        "i",

        "t",

        "h",

        " ",

        "\u0027",

        "F",

        "r",

        "e",

        "e",

        "\u0027",

        " ",

        "o",

        "r",

        " ",

        "\u0027",

        "E",

        "n",

        "t",

        "e",

        "r",

        "p",

        "r",

        "i",

        "s",

        "e",

        "\u0027",

        " ",

        "a",

        "c",

        "c",

        "o",

        "u",

        "n",

        "t",

        " ",

        "t",

        "y",

        "p",

        "e",

        "s",

        ".",

      ],


      tooltips: {

        "account_type": "The account type of the user. Exact match required, e.g., \u0027Premium\u0027.",

      },

    },

  ],
};
