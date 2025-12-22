import type { LabConfig } from '../../types';

export const boolConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'bool',
  displayName: 'Bool Query',
  description: 'A query that matches documents matching boolean combinations of other queries. The bool query maps to Lucene BooleanQuery. It is built using one or more boolean clauses, each clause with a typed occurrence.',
  docUrl: 'https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-bool-query',
  
  keyDisplayFields: {
    products: 'product_name',
    product_reviews: 'review_title',
    product_users: 'username',
  },
  
  searchFields: {
    products: 'product_description',
    product_reviews: 'review_text',
    product_users: 'interests',
  },
  
  sampleQueries: {
    products: 'premium',
    product_reviews: 'comfortable',
    product_users: 'Electronics',
  },
  
  queryStructure: {
    type: 'bool',
    fieldPath: 'nested',
  },
  
  examples: [
    {
      id: 'must-clause',
      title: 'Must Clause',
      description: 'The must clause (query) must appear in matching documents and will contribute to the score. Documents must match all queries in the must clause.',
      template: `{
  "query": {
    "bool": {
      "must": [
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
      ]
    }
  }
}`,
      index: 'product_reviews',
      tryThis: [
        'Try adding more queries to the must array',
        'Compare with using operator: "and" in a single match query',
        'Notice how all must clauses must match',
      ],
      tooltips: {
        must: 'All queries in must must match. Equivalent to AND logic.',
      },
    },
    {
      id: 'should-clause',
      title: 'Should Clause',
      description: 'The should clause (query) should appear in matching documents. If the bool query is in a query context and has a must or filter clause, then should clauses are optional. Otherwise, at least one should clause must match.',
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
      ]
    }
  }
}`,
      index: 'product_reviews',
      tryThis: [
        'Try adding minimum_should_match: 2 to require both terms',
        'Compare with using operator: "or" in a single match query',
        'Notice how any should clause can match',
      ],
      tooltips: {
        should: 'At least one query in should should match. Equivalent to OR logic.',
      },
    },
    {
      id: 'must-not-clause',
      title: 'Must Not Clause',
      description: 'The must_not clause (query) must not appear in matching documents. Clauses are executed in filter context, meaning that scoring is ignored and clauses are considered for caching.',
      template: `{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "review_text": "comfortable"
          }
        }
      ],
      "must_not": [
        {
          "match": {
            "review_text": "cheap"
          }
        }
      ]
    }
  }
}`,
      index: 'product_reviews',
      tryThis: [
        'Try excluding different terms',
        'Combine with should and filter clauses',
        'Notice how must_not excludes documents',
      ],
      tooltips: {
        must_not: 'Documents matching must_not queries are excluded from results.',
      },
    },
    {
      id: 'filter-clause',
      title: 'Filter Clause',
      description: 'The filter clause (query) must appear in matching documents. However, unlike must, the score of the query will be ignored. Filter clauses are executed in filter context, meaning that scoring is ignored and clauses are considered for caching.',
      template: `{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "review_text": "comfortable"
          }
        }
      ],
      "filter": [
        {
          "range": {
            "review_rating": {
              "gte": 4
            }
          }
        }
      ]
    }
  }
}`,
      index: 'product_reviews',
      tryThis: [
        'Try different range values',
        'Compare scores with and without filter (use must instead)',
        'Notice how filter doesn\'t affect scoring',
      ],
      tooltips: {
        filter: 'Like must, but doesn\'t affect the score. Good for exact matches and ranges.',
      },
    },
    {
      id: 'combined-clauses',
      title: 'Combined Clauses',
      description: 'Combine multiple clause types to create complex queries. This example uses must, should, and filter together.',
      template: `{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "review_text": "comfortable"
          }
        }
      ],
      "should": [
        {
          "match": {
            "review_text": "durable"
          }
        },
        {
          "match": {
            "review_text": "quality"
          }
        }
      ],
      "filter": [
        {
          "range": {
            "review_rating": {
              "gte": 4
            }
          }
        }
      ],
      "minimum_should_match": 1
    }
  }
}`,
      index: 'product_reviews',
      tryThis: [
        'Try changing minimum_should_match to 2',
        'Remove the filter clause and see how scores change',
        'Experiment with different clause combinations',
      ],
      tooltips: {
        minimum_should_match: 'Minimum number of should clauses that must match.',
      },
    },
    {
      id: 'minimum-should-match',
      title: 'Minimum Should Match',
      description: 'Control how many should clauses must match. Useful for fine-tuning relevance.',
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
        },
        {
          "match": {
            "review_text": "quality"
          }
        }
      ],
      "minimum_should_match": 2
    }
  }
}`,
      index: 'product_reviews',
      tryThis: [
        'Try different minimum_should_match values: 1, 2, 3',
        'Use percentage: "minimum_should_match": "75%"',
        'Compare with must clause (requires all)',
      ],
      tooltips: {
        minimum_should_match: 'Can be a number (2) or percentage ("75%"). Controls how many should clauses must match.',
      },
    },
  ],
};

