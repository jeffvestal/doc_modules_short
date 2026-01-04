import type { LabConfig } from '../../types';

export const termsConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'terms_query',
  displayName: 'Terms Query',
  description: "Returns documents that contain one or more **exact** terms in a provided field. The `terms` query is the same as the [`term` query](https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-term-query), except you can search for multiple values. A document will match if it contains at least one of the terms. To search for documents that contain more than one matching term, use the [`terms_set` query](https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-terms-set-query).",
  docUrl: 'https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-terms-query',

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
      title: "Find products by category",
      description: "Search for products that belong to either the \u0027Electronics\u0027 or \u0027Books\u0027 categories.",
      template: `{
  "query": {
    "terms": {
      "product_category": ["Electronics", "Books"]
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try changing the categories to \u0027Home and Kitchen\u0027 or \u0027Sports and Outdoors\u0027 and observe the results.",

      ],


      tooltips: {

        "product_category": "This field contains the category of the product. Use exact values like \u0027Electronics\u0027 or \u0027Books\u0027.",

      },

    },

    {
      id: 'example_2',
      title: "Search for specific product brands",
      description: "Retrieve all products from the specified brands: \u0027PlaySmart\u0027 and \u0027GlowNaturals\u0027.",
      template: `{
  "query": {
    "terms": {
      "product_brand": ["PlaySmart", "GlowNaturals"]
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try adding another brand such as \u0027AudioMax\u0027 to the list of brands to include more results.",

      ],


      tooltips: {

        "product_brand": "This field contains the brand of the product. Use exact values like \u0027PlaySmart\u0027 or \u0027GlowNaturals\u0027.",

      },

    },

    {
      id: 'example_3',
      title: "Filter reviews by rating",
      description: "Find reviews that have a 4 or 5-star rating.",
      template: `{
  "query": {
    "terms": {
      "review_rating": [5, 4]
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Try searching for reviews with a 3-star rating by adding \u00273\u0027 to the list.",

      ],


      tooltips: {

        "review_rating": "This field contains the rating given to a product. Ratings are integers from 1 to 5.",

      },

    },

    {
      id: 'example_4',
      title: "Find users by account type",
      description: "Retrieve users who have either a \u0027Premium\u0027 or \u0027Enterprise\u0027 account.",
      template: `{
  "query": {
    "terms": {
      "account_type": ["Premium", "Enterprise"]
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Try searching for users with a \u0027Free\u0027 account by replacing the values in the query.",

      ],


      tooltips: {

        "account_type": "This field contains the type of account the user has. Use exact values such as \u0027Premium\u0027, \u0027Enterprise\u0027, or \u0027Free\u0027.",

      },

    },

    {
      id: 'example_5',
      title: "Search for verified reviews",
      description: "Find reviews where the purchase was verified.",
      template: `{
  "query": {
    "terms": {
      "verified_purchase": ["True"]
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Try searching for unverified reviews by replacing \u0027True\u0027 with \u0027False\u0027.",

      ],


      tooltips: {

        "verified_purchase": "This field indicates whether the purchase was verified. Use the string values \u0027True\u0027 or \u0027False\u0027.",

      },

    },

  ],
};
