import type { LabConfig } from '../../types';

export const queryStringConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'query_string_query',
  displayName: 'Query String Query',
  description: "\u003ctip\u003e This page contains information about the `query_string` query type. For information about running a search query in Elasticsearch, see [*The search API*](https://www.elastic.co/docs/solutions/search/querying-for-search). \u003c/tip\u003e",
  docUrl: 'https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-query-string-query',

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
      title: "Simple Keyword Search",
      description: "Search for products that contain \u0027wireless\u0027 in the product name.",
      template: `{
  "query": {
    "query_string": {
      "query": "product_name:wireless"
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Change \u0027wireless\u0027 to another keyword like \u0027premium\u0027 or \u0027headphones\u0027.",

        "Try searching in product_description instead of product_name.",

      ],


      tooltips: {

        "query": "The query field specifies the search term and the field to search in.",

      },

    },

    {
      id: 'example_2',
      title: "Boolean Search with Multiple Fields",
      description: "Search for reviews that mention \u0027comfortable\u0027 or \u0027durable\u0027 in the review text.",
      template: `{
  "query": {
    "query_string": {
      "query": "review_text:(comfortable OR durable)"
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Add another keyword like \u0027lightweight\u0027 using the OR operator.",

        "Replace OR with AND to narrow the results.",

      ],


      tooltips: {

        "query": "You can use Boolean operators like AND, OR, and NOT for more complex queries.",

      },

    },

    {
      id: 'example_3',
      title: "Range Query on Numeric Field",
      description: "Find products in the \u0027Electronics\u0027 category with prices between $50 and $100.",
      template: `{
  "query": {
    "query_string": {
      "query": "product_category:Electronics AND product_price:[50 TO 100]"
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Change the price range to [30 TO 60] or [100 TO 200].",

        "Try searching in a different category like \u0027Clothing\u0027.",

      ],


      tooltips: {

        "query": "Use square brackets [ ] for inclusive ranges and curly braces { } for exclusive ranges.",

      },

    },

    {
      id: 'example_4',
      title: "Phrase Search",
      description: "Search for reviews that include the exact phrase \u0027highly recommended\u0027.",
      template: `{
  "query": {
    "query_string": {
      "query": "\"highly recommended\"",
      "default_field": "review_text"
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Search for other phrases like \u0027great quality\u0027 or \u0027fast shipping\u0027.",

        "Try adding a wildcard to your phrase like \u0027highly *\u0027.",

      ],


      tooltips: {

        "query": "Wrap exact phrases in double quotes to search for the exact sequence of words.",

      },

    },

    {
      id: 'example_5',
      title: "Wildcard Search",
      description: "Search for users with interests containing the word \u0027Electro\u0027 followed by any characters.",
      template: `{
  "query": {
    "query_string": {
      "query": "interests:Electro*"
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Replace \u0027Electro*\u0027 with \u0027Books*\u0027 to find users interested in books.",

        "Remove the wildcard (*) to search for an exact match instead.",

      ],


      tooltips: {

        "query": "Use * as a wildcard to match zero or more characters at the end of a term.",

      },

    },

    {
      id: 'example_6',
      title: "Combining Multiple Queries",
      description: "Search for users who have \u0027Premium\u0027 accounts and are interested in \u0027Sports\u0027.",
      template: `{
  "query": {
    "query_string": {
      "query": "account_type:Premium AND interests:Sports"
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Change \u0027Premium\u0027 to \u0027Free\u0027 or \u0027Enterprise\u0027.",

        "Add another condition using OR, such as \u0027interests:Outdoors\u0027.",

      ],


      tooltips: {

        "query": "Combine multiple conditions using Boolean operators for complex searches.",

      },

    },

  ],
};
