import type { LabConfig } from '../../types';

export const boolConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'bool_query',
  displayName: 'Boolean Query',
  description: "A query that matches documents matching boolean combinations of other queries. The bool query maps to Lucene `BooleanQuery`. It is built using one or more boolean clauses, each clause with a typed occurrence. The occurrence types are:",
  docUrl: 'https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-bool-query',

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
      title: "Filter products by category and price range",
      description: "This query retrieves products in the \u0027Electronics\u0027 category with a price between $50 and $100.",
      template: `{
  "query": {
    "bool": {
      "must": [
        {
          "term": {
            "product_category": "Electronics"
          }
        }
      ],
      "filter": [
        {
          "range": {
            "product_price": {
              "gte": 50,
              "lte": 100
            }
          }
        }
      ]
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try changing the product_category to \u0027Home and Kitchen\u0027 or modifying the price range.",

      ],


      tooltips: {

        "must": "Defines the mandatory conditions for the query.",

        "range": "Filters results based on a range of numeric or date values.",

      },

    },

    {
      id: 'example_2',
      title: "Search for reviews containing specific words",
      description: "This query finds reviews that mention either \u0027comfortable\u0027 or \u0027durable\u0027.",
      template: `{
  "query": {
    "bool": {
      "should": [
        {
          "match": {
            "review_text": "comfortable"
          }
        },
        {
          "match": {
            "review_text": "durable"
          }
        }
      ],
      "minimum_should_match": 1
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Try adding more terms to the \u0027should\u0027 clause, such as \u0027high quality\u0027 or \u0027affordable\u0027.",

      ],


      tooltips: {

        "should": "Defines optional conditions that increase the relevance score.",

        "minimum_should_match": "Specifies the minimum number of \u0027should\u0027 clauses that must be satisfied.",

      },

    },

    {
      id: 'example_4',
      title: "Exclude products with a specific brand and price range",
      description: "This query retrieves products that are not from the \u0027PlaySmart\u0027 brand and have a price outside the $30-$70 range.",
      template: `{
  "query": {
    "bool": {
      "must": [
        {
          "match_all": {}
        }
      ],
      "must_not": [
        {
          "term": {
            "product_brand": "PlaySmart"
          }
        },
        {
          "range": {
            "product_price": {
              "gte": 30,
              "lte": 70
            }
          }
        }
      ]
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try changing the product_brand to another value like \u0027AudioMax\u0027 or adjusting the price range.",

      ],


      tooltips: {

        "must_not": "Excludes documents that match the specified conditions.",

        "match_all": "Matches all documents in the index.",

      },

    },

    {
      id: 'example_5',
      title: "Combine multiple conditions for product reviews",
      description: "This query retrieves reviews for verified purchases with a rating of 4 or higher and filters out reviews with less than 10 helpful votes.",
      template: `{
  "query": {
    "bool": {
      "must": [
        {
          "term": {
            "verified_purchase": "True"
          }
        },
        {
          "range": {
            "review_rating": {
              "gte": 4
            }
          }
        }
      ],
      "filter": [
        {
          "range": {
            "helpful_votes": {
              "gte": 10
            }
          }
        }
      ]
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Try changing the review_rating range or the minimum helpful_votes.",

      ],


      tooltips: {

        "must": "Defines the mandatory conditions for matching documents.",

        "filter": "Applies additional filtering to the query results without affecting scoring.",

      },

    },

  ],
};
