import type { LabConfig } from '../../types';

export const prefixConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'prefix_query',
  displayName: 'Prefix Query',
  description: "Returns documents that contain a specific prefix in a provided field.",
  docUrl: 'https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-prefix-query',

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
      id: 'prefix_products_name',
      title: "Find Products by Name Prefix",
      description: "Search for products where the name starts with \u0027wire\u0027.",
      template: `{
  "query": {
    "prefix": {
      "product_name": {
        "value": "wire"
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Change the prefix value to \u0027lap\u0027 to find laptop-related products.",

        "Try searching with \u0027head\u0027 to find products like headphones.",

      ],


      tooltips: {

        "product_name": "Field to look for the prefix in product names.",

        "value": "The prefix to search for in the specified field. Must match the beginning of the field\u0027s value.",

      },

    },

    {
      id: 'prefix_products_description',
      title: "Find Products by Description Prefix",
      description: "Search for products where the description starts with \u0027premium\u0027.",
      template: `{
  "query": {
    "prefix": {
      "product_description": {
        "value": "premium"
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Change the prefix to \u0027durable\u0027 to find products described as durable.",

        "Test with \u0027light\u0027 to find products with lightweight descriptions.",

      ],


      tooltips: {

        "product_description": "Field to look for the prefix in product descriptions.",

        "value": "The prefix to search for in the provided field.",

      },

    },

    {
      id: 'prefix_reviews_title',
      title: "Find Reviews by Title Prefix",
      description: "Search for reviews where the title starts with \u0027great\u0027.",
      template: `{
  "query": {
    "prefix": {
      "review_title": {
        "value": "great"
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change the prefix to \u0027amazing\u0027 to find reviews with titles starting with \u0027amazing\u0027.",

        "Use \u0027good\u0027 to find reviews with a positive title prefix.",

      ],


      tooltips: {

        "review_title": "Field to look for the prefix in review titles.",

        "value": "The prefix to search for in the review title field.",

      },

    },

    {
      id: 'prefix_reviews_text',
      title: "Find Reviews by Text Prefix",
      description: "Search for reviews where the text starts with \u0027easy\u0027.",
      template: `{
  "query": {
    "prefix": {
      "review_text": {
        "value": "easy"
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change the prefix to \u0027comfortable\u0027 to find reviews talking about comfort.",

        "Try \u0027durable\u0027 to locate reviews mentioning durability.",

      ],


      tooltips: {

        "review_text": "Field to look for the prefix in review text.",

        "value": "The prefix to search for in the review text field.",

      },

    },

    {
      id: 'prefix_users_username',
      title: "Find Users by Username Prefix",
      description: "Search for users whose username starts with \u0027Cam\u0027.",
      template: `{
  "query": {
    "prefix": {
      "username": {
        "value": "Cam"
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Change the prefix to \u0027Ave\u0027 to search for usernames beginning with \u0027Ave\u0027.",

        "Try \u0027Dak\u0027 to find usernames that start with \u0027Dak\u0027.",

      ],


      tooltips: {

        "username": "Field to look for the prefix in usernames.",

        "value": "The prefix to search for in the username field.",

      },

    },

    {
      id: 'prefix_users_interests',
      title: "Find Users by Interest Prefix",
      description: "Search for users whose interests start with \u0027Elect\u0027.",
      template: `{
  "query": {
    "prefix": {
      "interests": {
        "value": "Elect"
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Change the prefix to \u0027Books\u0027 to find users interested in books.",

        "Try \u0027Sports\u0027 to locate users interested in sports activities.",

      ],


      tooltips: {

        "interests": "Field to look for the prefix in user interests.",

        "value": "The prefix to search for in the interests field.",

      },

    },

  ],
};
