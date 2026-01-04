import type { LabConfig } from '../../types';

export const wildcardConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'wildcard_query',
  displayName: 'Wildcard Query',
  description: "Returns documents that contain terms matching a wildcard pattern. A wildcard operator is a placeholder that matches one or more characters. For example, the `*` wildcard operator matches zero or more characters. You can combine wildcard operators with other characters to create a wildcard pattern.",
  docUrl: 'https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-wildcard-query',

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
      title: "Find products with a name containing \u0027wireless\u0027",
      description: "Search for products where the product name includes the word \u0027wireless\u0027, using the wildcard operator.",
      template: `{
  "query": {
    "wildcard": {
      "product_name": {
        "value": "*wireless*",
        "boost": 1.0
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Change the wildcard value to \u0027*smart*\u0027 to find products containing \u0027smart\u0027 in their name.",

        "Try searching in product_description instead of product_name.",

      ],


      tooltips: {

        "product_name": "The field to search within. Use fields from searchable_text_fields.",

        "value": "The wildcard pattern to match. Use \u0027*\u0027 for zero or more characters.",

        "boost": "Adjust the importance of this query in the overall relevance score.",

      },

    },

    {
      id: '2',
      title: "Search product descriptions ending with \u0027durable\u0027",
      description: "Retrieve products where the product description ends with \u0027durable\u0027.",
      template: `{
  "query": {
    "wildcard": {
      "product_description": {
        "value": "*durable",
        "boost": 1.0
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Modify the value to \u0027*lightweight\u0027 to find descriptions ending with \u0027lightweight\u0027.",

        "Experiment with different wildcard patterns like \u0027eco-*\u0027.",

      ],


      tooltips: {

        "product_description": "The field to search within. Use fields from searchable_text_fields.",

        "value": "The wildcard pattern. Use a leading \u0027*\u0027 to match any prefix.",

        "boost": "Boost controls how much this query affects scoring.",

      },

    },

    {
      id: '3',
      title: "Find reviews mentioning \u0027comfortable\u0027 in the title",
      description: "Search for product reviews where the review title includes the word \u0027comfortable\u0027.",
      template: `{
  "query": {
    "wildcard": {
      "review_title": {
        "value": "*comfortable*",
        "boost": 1.0
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change the wildcard pattern to \u0027*amazing*\u0027 to find reviews with \u0027amazing\u0027 in the title.",

        "Try using a narrower pattern like \u0027*easy to use*\u0027.",

      ],


      tooltips: {

        "review_title": "The field to search within. Use fields from searchable_text_fields.",

        "value": "The wildcard pattern. Use \u0027*\u0027 to match zero or more characters.",

        "boost": "Higher boost values make matches in this query more relevant.",

      },

    },

    {
      id: '5',
      title: "Find reviews mentioning \u0027great\u0027 at the start",
      description: "Retrieve product reviews where the review text starts with \u0027great\u0027.",
      template: `{
  "query": {
    "wildcard": {
      "review_text": {
        "value": "great*",
        "boost": 1.0
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change the value to \u0027excellent*\u0027 to find reviews starting with \u0027excellent\u0027.",

        "Try using a broader pattern like \u0027*awesome*\u0027.",

      ],


      tooltips: {

        "review_text": "The field to search within. Use fields from searchable_text_fields.",

        "value": "The wildcard pattern. Avoid leading \u0027*\u0027 for better performance.",

        "boost": "Boost increases the relevance of this query\u0027s matches.",

      },

    },

  ],
};
