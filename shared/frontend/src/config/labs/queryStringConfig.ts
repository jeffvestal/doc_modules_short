import type { LabConfig } from '../../types';

export const queryStringConfig: LabConfig = {
  queryType: 'query_string',
  displayName: 'Query String Query',
  description: 'Returns documents based on a provided query string, using a parser with a strict syntax. This query uses a syntax to parse and split the provided query string based on operators, such as AND or NOT.',
  docUrl: 'https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-query-string-query',
  
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
    products: 'premium AND wireless',
    product_reviews: 'comfortable OR durable',
    product_users: 'Electronics OR Books',
  },
  
  queryStructure: {
    type: 'query_string',
    fieldPath: 'default_field',
  },
  
  examples: [
    {
      id: 'basic-query-string',
      title: 'Basic Query String',
      description: 'Standard query string search with default_field. The query string is parsed and analyzed before matching.',
      template: `{
  "query": {
    "query_string": {
      "query": "(comfortable OR durable)",
      "default_field": "review_text"
    }
  }
}`,
      index: 'product_reviews',
      tryThis: [
        'Try changing the operators (AND, OR) to see different results',
        'Add more terms to the query string',
        'Use parentheses to group terms',
      ],
      tooltips: {
        query: 'The query string to parse. Supports operators like AND, OR, NOT.',
        default_field: 'The default field to search if no field is specified in the query string.',
      },
    },
    {
      id: 'multi-field',
      title: 'Multi-Field Search',
      description: 'Search across multiple fields using the fields parameter. Each term is expanded to search all specified fields.',
      template: `{
  "query": {
    "query_string": {
      "fields": ["review_text", "review_title"],
      "query": "comfortable durable"
    }
  }
}`,
      index: 'product_reviews',
      tryThis: [
        'Try adding more fields to the fields array',
        'Use field boosting syntax: "review_title^5"',
        'Compare results with single-field search',
      ],
      tooltips: {
        fields: 'Array of fields to search. Supports wildcards and field boosting.',
      },
    },
    {
      id: 'field-specific',
      title: 'Field-Specific Syntax',
      description: 'Use field:value syntax to search specific fields directly in the query string.',
      template: `{
  "query": {
    "query_string": {
      "query": "review_text:comfortable AND review_title:excellent"
    }
  }
}`,
      index: 'product_reviews',
      tryThis: [
        'Try searching different field combinations',
        'Use OR to search multiple fields: "review_text:comfortable OR review_title:excellent"',
      ],
    },
    {
      id: 'fuzziness',
      title: 'Fuzziness',
      description: 'Handle typos with fuzzy matching using the ~ operator.',
      template: `{
  "query": {
    "query_string": {
      "query": "comfortabel~",
      "default_field": "review_text"
    }
  }
}`,
      index: 'product_reviews',
      tryThis: [
        'Try different fuzzy distances: "comfortabel~1" or "comfortabel~2"',
        'Compare with exact match (no ~)',
      ],
      tooltips: {
        '~': 'Fuzzy operator. ~1 means edit distance of 1, ~2 means edit distance of 2.',
      },
    },
    {
      id: 'wildcards',
      title: 'Wildcards',
      description: 'Use * and ? wildcards for pattern matching. * matches multiple characters, ? matches a single character.',
      template: `{
  "query": {
    "query_string": {
      "query": "comfor*",
      "default_field": "review_text"
    }
  }
}`,
      index: 'product_reviews',
      tryThis: [
        'Try different wildcard patterns: "comfor*", "com?ortable", "*durable"',
        'Note: Leading wildcards can be slow',
      ],
      tooltips: {
        '*': 'Matches zero or more characters',
        '?': 'Matches exactly one character',
      },
    },
    {
      id: 'default-operator',
      title: 'Default Operator',
      description: 'Control how terms are combined when no operators are specified. Default is OR.',
      template: `{
  "query": {
    "query_string": {
      "query": "comfortable durable",
      "default_field": "review_text",
      "default_operator": "AND"
    }
  }
}`,
      index: 'product_reviews',
      tryThis: [
        'Change default_operator from "AND" to "OR" and compare results',
        'Try explicit operators: "comfortable AND durable"',
      ],
      tooltips: {
        default_operator: 'Controls how terms are combined. "AND" requires all terms, "OR" requires any term.',
      },
    },
  ],
};

