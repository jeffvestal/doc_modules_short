// This file is injected at build/deploy time per lab
// For now, we'll use a default config that can be overridden

import type { LabConfig } from '../types';

// Default config - will be replaced per lab
export const labConfig: LabConfig = {
  queryType: 'match',
  displayName: 'Match Query',
  docUrl: 'https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-match-query',
  
  elasticsearch: {
    index: 'product_reviews',
    displayFields: ['review_title', 'review_text', 'review_rating', 'reviewer_name'],
    searchFields: ['review_title', 'review_text'],
  },
  
  introQuery: {
    description: "Search for reviews mentioning 'comfortable' and 'durable'",
    template: `{
  "query": {
    "match": {
      "review_text": "comfortable durable"
    }
  }
}`,
    hints: [
      'The match query analyzes the text before searching',
      'It finds documents containing any of the analyzed terms',
    ],
  },
  challenge: {
    goal: "Find reviews that mention 'waterproof' in the title or text",
    validation: {
      mustInclude: ['match'],
    },
  },
};

