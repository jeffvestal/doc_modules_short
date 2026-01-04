import type { LabConfig } from '../../types';

export const disMaxConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'dis_max_query',
  displayName: 'Disjunction Max Query',
  description: "Returns documents matching one or more wrapped queries, called query clauses or clauses. If a returned document matches multiple query clauses, the `dis_max` query assigns the document the highest relevance score from any matching clause, plus a tie breaking increment for any additional matching subqueries.",
  docUrl: 'https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-dis-max-query',

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
      title: "Match product name or description",
      description: "Search for products where the name or description contains the term \u0027wireless\u0027.",
      template: `{
  "query": {
    "dis_max": {
      "queries": [
        { "match": { "product_name": "wireless" } },
        { "match": { "product_description": "wireless" } }
      ],
      "tie_breaker": 0.3
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try changing the term \u0027wireless\u0027 to \u0027premium\u0027 and observe the difference in results.",

      ],


      tooltips: {

        "tie_breaker": "Specifies the fraction of the score from other matching clauses to include in the final score.",

      },

    },

    {
      id: '2',
      title: "Match review title or text",
      description: "Search for reviews where the title or text contains the term \u0027durable\u0027.",
      template: `{
  "query": {
    "dis_max": {
      "queries": [
        { "match": { "review_title": "durable" } },
        { "match": { "review_text": "durable" } }
      ],
      "tie_breaker": 0.5
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Try changing the term \u0027durable\u0027 to \u0027comfortable\u0027 to find reviews mentioning comfort.",

      ],


      tooltips: {

        "tie_breaker": "A higher value includes more influence from additional matching clauses.",

      },

    },

    {
      id: '3',
      title: "Search for users with interests",
      description: "Search for users whose interests include \u0027Books\u0027 or \u0027Electronics\u0027.",
      template: `{
  "query": {
    "dis_max": {
      "queries": [
        { "match": { "interests": "Books" } },
        { "match": { "interests": "Electronics" } }
      ],
      "tie_breaker": 0.4
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Try adding another term like \u0027Sports\u0027 to the interests field.",

      ],


      tooltips: {

        "tie_breaker": "Allows scores from additional matching clauses to incrementally boost the final score.",

      },

    },

    {
      id: '4',
      title: "Search for products by category or brand",
      description: "Search for products in the \u0027Electronics\u0027 category or with the brand \u0027AudioMax\u0027.",
      template: `{
  "query": {
    "dis_max": {
      "queries": [
        { "term": { "product_category": "Electronics" } },
        { "term": { "product_brand": "AudioMax" } }
      ],
      "tie_breaker": 0.2
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try changing the category to \u0027Home and Kitchen\u0027 or the brand to \u0027GlowNaturals\u0027.",

      ],


      tooltips: {

        "term": "The term query matches documents that have an exact term in a field.",

      },

    },

    {
      id: '5',
      title: "Search for highly rated reviews",
      description: "Search for reviews with a rating of 5 or helpful votes greater than 20.",
      template: `{
  "query": {
    "dis_max": {
      "queries": [
        { "term": { "review_rating": 5 } },
        { "range": { "helpful_votes": { "gt": 20 } } }
      ],
      "tie_breaker": 0.6
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Try lowering the rating to 4 or changing the helpful votes threshold to 15.",

      ],


      tooltips: {

        "range": "The range query matches documents with values within a specified range.",

        "tie_breaker": "Combines scores from additional matching clauses to refine the result ranking.",

      },

    },

    {
      id: '6',
      title: "Search for premium or enterprise users",
      description: "Find users who are either \u0027Premium\u0027 or \u0027Enterprise\u0027 account holders.",
      template: `{
  "query": {
    "dis_max": {
      "queries": [
        { "term": { "account_type": "Premium" } },
        { "term": { "account_type": "Enterprise" } }
      ],
      "tie_breaker": 0.1
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Try adding \u0027Free\u0027 to the term queries for account type.",

      ],


      tooltips: {

        "term": "Use exact matches for keyword fields like \u0027account_type\u0027 to ensure accurate results.",

        "tie_breaker": "Set a low value to minimize influence from additional matching clauses.",

      },

    },

  ],
};
