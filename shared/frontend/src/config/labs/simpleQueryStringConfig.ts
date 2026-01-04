import type { LabConfig } from '../../types';

export const simpleQueryStringConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'simple_query_string_query',
  displayName: 'Simple Query String Query',
  description: "Returns documents based on a provided query string, using a parser with a limited but fault-tolerant syntax. This query uses a simple syntax to parse and split the provided query string into terms based on special operators. The query then analyzes each term independently before returning matching documents. While its syntax is more limited than the `query_string` query, the `simple_query_string` query does not return errors for invalid syntax. Instead, it ignores any invalid parts of the query string.",
  docUrl: 'https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-simple-query-string-query',

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
      title: "Search for Wireless Headphones",
      description: "Find products with the terms \u0027wireless\u0027 and \u0027headphones\u0027 in the name or description.",
      template: `{
  "query": {
    "simple_query_string": {
      "query": "wireless AND headphones",
      "fields": ["product_name", "product_description"]
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Replace \u0027wireless\u0027 with \u0027Bluetooth\u0027 to see different results.",

        "Add \u0027-expensive\u0027 to exclude high-priced items.",

      ],


      tooltips: {

        "query": "The query string to search, using simple syntax.",

        "fields": "The fields to search within. Use searchable text fields.",

      },

    },

    {
      id: 'example_2',
      title: "Search for Highly Rated Reviews",
      description: "Find reviews mentioning \u0027comfortable\u0027 but exclude those with the word \u0027cheap\u0027.",
      template: `{
  "query": {
    "simple_query_string": {
      "query": "comfortable -cheap",
      "fields": ["review_title", "review_text"]
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change \u0027comfortable\u0027 to \u0027durable\u0027 to see alternate reviews.",

        "Remove \u0027-cheap\u0027 to include more results.",

      ],


      tooltips: {

        "query": "Use \u0027-\u0027 to exclude terms from the search results.",

        "fields": "Specify which fields to search in the reviews dataset.",

      },

    },

    {
      id: 'example_3',
      title: "Search for Premium Users with Specific Interests",
      description: "Find premium users interested in either Books or Electronics.",
      template: `{
  "query": {
    "simple_query_string": {
      "query": "Books OR Electronics",
      "fields": ["interests"]
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Try adding \u0027AND Premium\u0027 to limit results to premium accounts.",

        "Replace \u0027Books\u0027 with \u0027Toys\u0027 to see users with different interests.",

      ],


      tooltips: {

        "query": "Use \u0027OR\u0027 to include results with either term.",

        "fields": "Search in the \u0027interests\u0027 field to find user hobbies and preferences.",

      },

    },

    {
      id: 'example_4',
      title: "Search for Beauty Products",
      description: "Find products from the \u0027GlowNaturals\u0027 brand in the Beauty category.",
      template: `{
  "query": {
    "simple_query_string": {
      "query": "GlowNaturals AND beauty",
      "fields": ["product_name", "product_description"]
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Replace \u0027GlowNaturals\u0027 with \u0027GlowEssence\u0027 to explore products from a different brand.",

        "Add \u0027-expensive\u0027 to filter out high-priced items.",

      ],


      tooltips: {

        "query": "Combine terms with \u0027AND\u0027 to require both in the results.",

        "fields": "Search product details for the specified terms.",

      },

    },

    {
      id: 'example_5',
      title: "Search for Verified Purchases with High Ratings",
      description: "Find reviews from verified purchases with a rating of 5.",
      template: `{
  "query": {
    "simple_query_string": {
      "query": "verified_purchase:True AND review_rating:5",
      "fields": ["review_title", "review_text"]
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change \u00275\u0027 to \u00274\u0027 to include slightly lower ratings.",

        "Remove \u0027verified_purchase:True\u0027 to expand the results.",

      ],


      tooltips: {

        "query": "Use field-specific queries (e.g., \u0027field:value\u0027) for precise filtering.",

        "fields": "Search within review titles and texts for relevant content.",

      },

    },

  ],
};
