import type { LabConfig } from '../../types';

export const termConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'term_query',
  displayName: 'Term Query',
  description: "Returns documents that contain an **exact** term in a provided field. You can use the `term` query to find documents based on a precise value such as a price, a product ID, or a username.",
  docUrl: 'https://elastic.co/docs/reference/query-languages/query-dsl/query-dsl-term-query',

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
      id: 'example1',
      title: "Find products in Electronics category",
      description: "Search for products that belong to the \u0027Electronics\u0027 category.",
      template: `{
  "query": {
    "term": {
      "product_category": {
        "value": "Electronics"
      }
    }
  }
}`,
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

        "`",

        "E",

        "l",

        "e",

        "c",

        "t",

        "r",

        "o",

        "n",

        "i",

        "c",

        "s",

        "`",

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

        " ",

        "l",

        "i",

        "k",

        "e",

        " ",

        "`",

        "B",

        "o",

        "o",

        "k",

        "s",

        "`",

        " ",

        "o",

        "r",

        " ",

        "`",

        "C",

        "l",

        "o",

        "t",

        "h",

        "i",

        "n",

        "g",

        "`",

        ".",

      ],


      tooltips: {

        "product_category": "Exact category name such as \u0027Electronics\u0027, \u0027Books\u0027, etc.",

      },

    },

    {
      id: 'example2',
      title: "Find products by brand",
      description: "Search for products from the \u0027GlowNaturals\u0027 brand.",
      template: `{
  "query": {
    "term": {
      "product_brand": {
        "value": "GlowNaturals"
      }
    }
  }
}`,
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

        "`",

        "G",

        "l",

        "o",

        "w",

        "N",

        "a",

        "t",

        "u",

        "r",

        "a",

        "l",

        "s",

        "`",

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

        "b",

        "r",

        "a",

        "n",

        "d",

        " ",

        "l",

        "i",

        "k",

        "e",

        " ",

        "`",

        "A",

        "u",

        "d",

        "i",

        "o",

        "M",

        "a",

        "x",

        "`",

        " ",

        "o",

        "r",

        " ",

        "`",

        "P",

        "l",

        "a",

        "y",

        "P",

        "a",

        "l",

        "s",

        "`",

        ".",

      ],


      tooltips: {

        "product_brand": "Exact brand name such as \u0027GlowNaturals\u0027, \u0027AudioMax\u0027, etc.",

      },

    },

    {
      id: 'example3',
      title: "Search for verified purchase reviews",
      description: "Find reviews where the purchase was verified.",
      template: `{
  "query": {
    "term": {
      "verified_purchase": {
        "value": "True"
      }
    }
  }
}`,
      index: 'product_reviews',

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

        "`",

        "T",

        "r",

        "u",

        "e",

        "`",

        " ",

        "t",

        "o",

        " ",

        "`",

        "F",

        "a",

        "l",

        "s",

        "e",

        "`",

        " ",

        "t",

        "o",

        " ",

        "f",

        "i",

        "n",

        "d",

        " ",

        "n",

        "o",

        "n",

        "-",

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

        "verified_purchase": "Exact match for purchase verification status (\u0027True\u0027 or \u0027False\u0027).",

      },

    },

    {
      id: 'example4',
      title: "Find user by username",
      description: "Search for a user with the username \u0027AveryWilliams55\u0027.",
      template: `{
  "query": {
    "term": {
      "username": {
        "value": "AveryWilliams55"
      }
    }
  }
}`,
      index: 'product_users',

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

        "u",

        "s",

        "e",

        "r",

        "n",

        "a",

        "m",

        "e",

        " ",

        "t",

        "o",

        " ",

        "`",

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

        "`",

        " ",

        "o",

        "r",

        " ",

        "`",

        "D",

        "a",

        "k",

        "o",

        "t",

        "a",

        "H",

        "e",

        "r",

        "n",

        "a",

        "n",

        "d",

        "e",

        "z",

        "3",

        "9",

        "`",

        ".",

      ],


      tooltips: {

        "username": "Exact username such as \u0027AveryWilliams55\u0027.",

      },

    },

    {
      id: 'example5',
      title: "Find reviews with a 5-star rating",
      description: "Search for reviews where the rating is exactly 5 stars.",
      template: `{
  "query": {
    "term": {
      "review_rating": {
        "value": 5
      }
    }
  }
}`,
      index: 'product_reviews',

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

        "r",

        "a",

        "t",

        "i",

        "n",

        "g",

        " ",

        "t",

        "o",

        " ",

        "`",

        "1",

        "`",

        ",",

        " ",

        "`",

        "3",

        "`",

        ",",

        " ",

        "o",

        "r",

        " ",

        "`",

        "4",

        "`",

        " ",

        "t",

        "o",

        " ",

        "f",

        "i",

        "n",

        "d",

        " ",

        "r",

        "e",

        "v",

        "i",

        "e",

        "w",

        "s",

        " ",

        "w",

        "i",

        "t",

        "h",

        " ",

        "t",

        "h",

        "o",

        "s",

        "e",

        " ",

        "r",

        "a",

        "t",

        "i",

        "n",

        "g",

        "s",

        ".",

      ],


      tooltips: {

        "review_rating": "Exact numeric rating (e.g., 1, 2, 3, 4, 5).",

      },

    },

  ],
};
