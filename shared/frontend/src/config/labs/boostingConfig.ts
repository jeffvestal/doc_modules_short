import type { LabConfig } from '../../types';

export const boostingConfig: LabConfig = {
  queryLanguage: 'query_dsl',
  queryType: 'boosting_query',
  displayName: 'Boosting Query',
  description: "Returns documents matching a `positive` query while reducing the relevance score of documents that also match a `negative` query. You can use the `boosting` query to demote certain documents without excluding them from the search results.",
  docUrl: 'https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-boosting-query',

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
      id: 'boosting_products_wireless',
      title: "Boost wireless products while demoting wired ones",
      description: "This query boosts products with \u0027wireless\u0027 in their description while reducing the score of products with \u0027wired\u0027 in their description.",
      template: `{
  "query": {
    "boosting": {
      "positive": {
        "match": {
          "product_description": "wireless"
        }
      },
      "negative": {
        "match": {
          "product_description": "wired"
        }
      },
      "negative_boost": 0.3
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try changing the positive query to \u0027premium\u0027 and the negative query to \u0027cheap\u0027.",

      ],


      tooltips: {

        "positive": "The query that matches documents to be boosted.",

        "negative": "The query that matches documents to be demoted.",

        "negative_boost": "The factor by which the relevance score of matching negative documents is reduced.",

      },

    },

    {
      id: 'boosting_reviews_comfortable',
      title: "Boost reviews mentioning comfort while demoting durability",
      description: "This query boosts reviews containing \u0027comfortable\u0027 while reducing the score of reviews mentioning \u0027durable\u0027.",
      template: `{
  "query": {
    "boosting": {
      "positive": {
        "term": {
          "review_text": "comfortable"
        }
      },
      "negative": {
        "term": {
          "review_text": "durable"
        }
      },
      "negative_boost": 0.2
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Try modifying the positive term to \u0027amazing\u0027 and the negative term to \u0027terrible\u0027.",

      ],


      tooltips: {

        "positive": "Choose a term that highlights desirable features.",

        "negative": "Select terms that describe features to demote.",

        "negative_boost": "Lower values further reduce the negative score.",

      },

    },

    {
      id: 'boosting_users_electronics',
      title: "Boost users interested in electronics while demoting those interested in books",
      description: "This query boosts users with interests in \u0027Electronics\u0027 and reduces the score of users interested in \u0027Books\u0027.",
      template: `{
  "query": {
    "boosting": {
      "positive": {
        "match": {
          "interests": "Electronics"
        }
      },
      "negative": {
        "match": {
          "interests": "Books"
        }
      },
      "negative_boost": 0.5
    }
  }
}`,
      index: 'product_users',

      tryThis: [

        "Try boosting \u0027Sports and Outdoors\u0027 and demoting \u0027Beauty\u0027.",

      ],


      tooltips: {

        "positive": "Match interests you want to prioritize.",

        "negative": "Match interests you want to deprioritize.",

        "negative_boost": "Choose a suitable reduction factor based on your priorities.",

      },

    },

    {
      id: 'boosting_products_category',
      title: "Boost Electronics category while demoting Home and Kitchen",
      description: "This query boosts products in the \u0027Electronics\u0027 category while reducing the score of products in \u0027Home and Kitchen\u0027.",
      template: `{
  "query": {
    "boosting": {
      "positive": {
        "term": {
          "product_category": "Electronics"
        }
      },
      "negative": {
        "term": {
          "product_category": "Home and Kitchen"
        }
      },
      "negative_boost": 0.4
    }
  }
}`,
      index: 'products',

      tryThis: [

        "Try boosting \u0027Beauty\u0027 and demoting \u0027Automotive\u0027 instead.",

      ],


      tooltips: {

        "positive": "Specify the category you want to boost.",

        "negative": "Specify the category you want to demote.",

        "negative_boost": "Adjust the reduction factor to balance scores.",

      },

    },

    {
      id: 'boosting_reviews_verified_purchase',
      title: "Boost verified purchase reviews while demoting unverified ones",
      description: "This query boosts reviews where \u0027verified_purchase\u0027 is true while reducing the score of unverified purchase reviews.",
      template: `{
  "query": {
    "boosting": {
      "positive": {
        "term": {
          "verified_purchase": "True"
        }
      },
      "negative": {
        "term": {
          "verified_purchase": "False"
        }
      },
      "negative_boost": 0.5
    }
  }
}`,
      index: 'product_reviews',

      tryThis: [

        "Try boosting reviews with high helpful votes while demoting low votes.",

      ],


      tooltips: {

        "positive": "Focus on verified purchase reviews for trustworthiness.",

        "negative": "Demote reviews that are not verified purchases.",

        "negative_boost": "Fine-tune the weight to balance the scores.",

      },

    },

  ],
};
