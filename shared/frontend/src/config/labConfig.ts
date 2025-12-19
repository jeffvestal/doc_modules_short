// This file is injected at build/deploy time per lab
// For now, we'll use a default config that can be overridden

import type { LabConfig } from '../types';

// Default config - will be replaced per lab
export const labConfig: LabConfig = {
  queryType: 'match',
  displayName: 'Match Query',
  docUrl: 'https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-match-query',
  
  keyDisplayFields: {
    products: 'product_name',
    product_reviews: 'review_title',
    product_users: 'username',
  },
  
  examples: [
    {
      id: 'basic-match',
      title: 'Basic Match Query',
      description: 'Standard full-text search with explicit query parameter. The match query analyzes the text before searching and finds documents containing any of the analyzed terms.',
      template: `{
  "query": {
    "match": {
      "review_text": {
        "query": "comfortable durable"
      }
    }
  }
}`,
      index: 'product_reviews',
    },
    {
      id: 'short-request',
      title: 'Short Request Example',
      description: 'Simplified syntax combining the field and query parameters. This is equivalent to the basic match query but with a more concise syntax.',
      template: `{
  "query": {
    "match": {
      "review_text": "comfortable durable"
    }
  }
}`,
      index: 'product_reviews',
    },
    {
      id: 'operator-and',
      title: 'Match with Operator',
      description: 'Require ALL terms to match using operator: "and". This finds documents that contain both "comfortable" AND "durable", not just either one.',
      template: `{
  "query": {
    "match": {
      "review_text": {
        "query": "comfortable durable",
        "operator": "and"
      }
    }
  }
}`,
      index: 'product_reviews',
    },
    {
      id: 'fuzziness',
      title: 'Fuzziness',
      description: 'Handle typos and misspellings with fuzzy matching. The fuzziness parameter allows approximate matching based on edit distance.',
      template: `{
  "query": {
    "match": {
      "review_text": {
        "query": "comfortabel",
        "fuzziness": "AUTO"
      }
    }
  }
}`,
      index: 'product_reviews',
    },
    {
      id: 'zero-terms',
      title: 'Zero Terms Query',
      description: 'Control behavior when the analyzer removes all tokens (e.g., stop words). When zero_terms_query is "all", it returns all documents if no tokens remain.',
      template: `{
  "query": {
    "match": {
      "review_text": {
        "query": "to be or not to be",
        "operator": "and",
        "zero_terms_query": "all"
      }
    }
  }
}`,
      index: 'product_reviews',
    },
    {
      id: 'synonyms',
      title: 'Synonyms',
      description: 'Control how multi-term synonyms are handled. When auto_generate_synonyms_phrase_query is false, synonyms are matched with conjunctions instead of phrase queries.',
      template: `{
  "query": {
    "match": {
      "review_text": {
        "query": "great product",
        "auto_generate_synonyms_phrase_query": false
      }
    }
  }
}`,
      index: 'product_reviews',
    },
  ],
};

