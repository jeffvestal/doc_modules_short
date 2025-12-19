// This file is injected at build/deploy time per lab
// For now, we'll use a default config that can be overridden

import type { LabConfig } from '../types';

// Default config - will be replaced per lab
export const labConfig: LabConfig = {
  queryType: 'match',
  displayName: 'Match Query',
  description: 'Returns documents that match a provided text, number, date or boolean value. The provided text is analyzed before matching. The match query is the standard query for performing a full-text search, including options for fuzzy matching.',
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
      tryThis: [
        'Try changing the query text to see different results',
        'Add more terms to the query and observe how the result count changes',
      ],
      tooltips: {
        query: 'The text to search for. This will be analyzed before matching.',
        review_text: 'The field to search in. This is a text field that supports full-text search.',
      },
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
      tryThis: [
        'Change operator from "and" to "or" and compare the result counts',
        'Try adding more terms to see how operator affects matching',
      ],
      tooltips: {
        operator: 'Controls how multiple terms are combined. "and" requires all terms, "or" requires any term.',
      },
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
      tryThis: [
        'Try removing fuzziness and see how many fewer results you get',
        'Change fuzziness to a number like 1 or 2 to see the difference',
      ],
      tooltips: {
        fuzziness: 'Allows approximate matching. "AUTO" automatically determines edit distance based on term length.',
      },
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

