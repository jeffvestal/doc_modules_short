import type { LabConfig } from '../../types';

export const rangeConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'range_query',
  displayName: 'Range Query',
  description: "Returns documents that contain terms within a provided range.",
  docUrl: 'https://elastic.co/docs/reference/query-languages/query-dsl/query-dsl-range-query',

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
      id: '1',
      title: "Find products within a price range",
      description: "Retrieve all products that have a price between $20 and $50.",
      template: `{
  "query": {
    "range": {
      "product_price": {
        "gte": 20,
        "lte": 50
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Change the range to find products between $30 and $70.",

        "Add a \u0027boost\u0027 parameter to prioritize these results.",

      ],


      tooltips: {

        "gte": "Specifies the lower bound of the range (greater than or equal).",

        "lte": "Specifies the upper bound of the range (less than or equal).",

      },

    },

    {
      id: '2',
      title: "Retrieve highly rated reviews",
      description: "Find all reviews with a rating of 4 or higher.",
      template: `{
  "query": {
    "range": {
      "review_rating": {
        "gte": 4
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change the range to find reviews with a rating of 3 or lower.",

        "Add a sort clause to order results by the review date.",

      ],


      tooltips: {

        "gte": "Defines the minimum rating to consider.",

        "review_rating": "Field representing the numeric rating of the review.",

      },

    },

    {
      id: '3',
      title: "Filter users by trust score",
      description: "Retrieve users with a trust score between 70 and 90.",
      template: `{
  "query": {
    "range": {
      "trust_score": {
        "gte": 70,
        "lte": 90
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Expand the range to include users with trust scores of 60 to 95.",

        "Add a condition to filter users by account type (e.g., Premium).",

      ],


      tooltips: {

        "gte": "Defines the minimum trust score to include.",

        "lte": "Defines the maximum trust score to include.",

      },

    },

    {
      id: '4',
      title: "Find recent reviews",
      description: "Retrieve reviews posted within the last 30 days.",
      template: `{
  "query": {
    "range": {
      "review_date": {
        "gte": "now-30d/d",
        "lte": "now/d"
      }
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Change the range to find reviews from the last 7 days.",

        "Use a specific date range instead (e.g., \u00272023-01-01\u0027 to \u00272023-01-31\u0027).",

      ],


      tooltips: {

        "gte": "Defines the starting date of the range (inclusive).",

        "lte": "Defines the ending date of the range (inclusive).",

        "now": "Represents the current date and time.",

      },

    },

    {
      id: '5',
      title: "Filter products by price with boost",
      description: "Find products priced between $50 and $100, giving them a higher relevance boost.",
      template: `{
  "query": {
    "range": {
      "product_price": {
        "gte": 50,
        "lte": 100,
        "boost": 2.0
      }
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Adjust the boost value to prioritize these results differently.",

        "Narrow the price range to between $60 and $80.",

      ],


      tooltips: {

        "boost": "Specifies the relevance boost for matching documents.",

        "gte": "Defines the minimum price to include.",

        "lte": "Defines the maximum price to include.",

      },

    },

    {
      id: '6',
      title: "Find users by age group",
      description: "Retrieve users between the ages of 25 and 35.",
      template: `{
  "query": {
    "range": {
      "age_group": {
        "gte": 25,
        "lte": 35
      }
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Change the range to target users aged 18 to 29.",

        "Combine this query with a term query on the \u0027account_type\u0027 field.",

      ],


      tooltips: {

        "age_group": "Field representing the age range of the user.",

        "gte": "Specifies the minimum age to include.",

        "lte": "Specifies the maximum age to include.",

      },

    },

  ],
};
