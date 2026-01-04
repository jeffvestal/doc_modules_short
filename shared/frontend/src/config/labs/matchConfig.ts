import type { LabConfig } from '../../types';

export const matchConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'match_query',
  displayName: 'Match Query',
  description: "Returns documents that match a provided text, number, date or boolean value. The provided text is analyzed before matching. The `match` query is the standard query for performing a full-text search, including options for fuzzy matching. `Match` will also work against semantic_text fields. As `semantic_text` does not support lexical text search, `match` queries against `semantic_text` fields will automatically perform the correct semantic search. Because of this, options that specifically target lexical search such as `fuzziness` or `analyzer` will be ignored.",
  docUrl: 'https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-match-query',

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
      title: "Basic match query on product name",
      description: "Search for products with the term \u0027wireless\u0027 in the product name.",
      template: `{
  "query": {
    "match": {
      "product_name": {
        "query": "wireless"
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Modify the query to search for a different term like \u0027premium\u0027 or \u0027durable\u0027.",

        "Change the field to \u0027product_description\u0027 to search within product descriptions instead.",

      ],


      tooltips: {

        "query": "The term to search for in the specified field.",

        "product_name": "Searches the \u0027product_name\u0027 field for the specified term.",

      },

    },

    {
      id: 'example_2',
      title: "Match query with operator",
      description: "Search for reviews containing both \u0027comfortable\u0027 and \u0027durable\u0027 in the review text.",
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

        "Change the operator to \u0027or\u0027 to return reviews containing either \u0027comfortable\u0027 or \u0027durable\u0027.",

        "Search for other terms in the \u0027review_text\u0027 field, like \u0027stylish\u0027 or \u0027lightweight\u0027.",

      ],


      tooltips: {

        "query": "The terms to search for in the specified field.",

        "operator": "Defines whether all terms (\u0027and\u0027) or any term (\u0027or\u0027) must match.",

        "review_text": "Searches the \u0027review_text\u0027 field for the specified terms.",

      },

    },

    {
      id: 'example_3',
      title: "Match query with fuzziness",
      description: "Search for products with a term similar to \u0027wirless\u0027 in the product description using fuzzy matching.",
      template: `{
  "query": {
    "match": {
      "product_description": {
        "query": "wirless",
        "fuzziness": "AUTO"
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try misspelling other terms to see how the fuzziness parameter handles them.",

        "Change the field to \u0027product_name\u0027 and search for a similar term.",

      ],


      tooltips: {

        "query": "The term to search for in the specified field.",

        "fuzziness": "Enables fuzzy matching, allowing for minor misspellings or typos.",

        "product_description": "Searches the \u0027product_description\u0027 field for the specified term.",

      },

    },

    {
      id: 'example_4',
      title: "Match query with zero_terms_query",
      description: "Search for reviews with \u0027great product\u0027 in the text. If no terms match, return all documents.",
      template: `{
  "query": {
    "match": {
      "review_text": {
        "query": "great product",
        "zero_terms_query": "all"
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change the query to see how it behaves with different terms.",

        "Set \u0027zero_terms_query\u0027 to \u0027none\u0027 to exclude documents when no terms match.",

      ],


      tooltips: {

        "query": "The phrase to search for in the specified field.",

        "zero_terms_query": "Determines the behavior when no terms match (\u0027all\u0027 includes all documents, \u0027none\u0027 excludes them).",

        "review_text": "Searches the \u0027review_text\u0027 field for the specified phrase.",

      },

    },

    {
      id: 'example_5',
      title: "Match query with auto_generate_synonyms_phrase_query",
      description: "Search for users interested in \u0027sports equipment\u0027 without expanding synonyms.",
      template: `{
  "query": {
    "match": {
      "interests": {
        "query": "sports equipment",
        "auto_generate_synonyms_phrase_query": false
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Set \u0027auto_generate_synonyms_phrase_query\u0027 to true to see how synonyms are expanded.",

        "Change the field to search for interests like \u0027technology\u0027 or \u0027cooking\u0027.",

      ],


      tooltips: {

        "query": "The phrase to search for in the specified field.",

        "auto_generate_synonyms_phrase_query": "Determines whether to automatically expand phrases to include synonyms.",

        "interests": "Searches the \u0027interests\u0027 field for the specified phrase.",

      },

    },

    {
      id: 'example_6',
      title: "Match query with semantic text",
      description: "Search for products semantically related to \u0027wireless headphones\u0027 in the product description.",
      template: `{
  "query": {
    "match": {
      "product_description": {
        "query": "wireless headphones"
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Modify the query to search for other phrases like \u0027noise cancelling headphones\u0027 or \u0027portable speakers\u0027.",

        "Change the field to \u0027product_name\u0027 and adjust the query accordingly.",

      ],


      tooltips: {

        "query": "The phrase to search for in the specified field.",

        "product_description": "Searches the \u0027product_description\u0027 field for semantically related terms.",

      },

    },

  ],
};
