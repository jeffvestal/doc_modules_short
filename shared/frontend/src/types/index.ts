export interface Product {
  product_id: string;
  product_name: string;
  product_description: string;
  product_category: string;
  product_brand: string;
  product_price: number;
}

export interface Review {
  review_id: string;
  product_id: string;
  review_title: string;
  review_text: string;
  review_rating: number;
  review_date: string;
  review_user_id: string;
  reviewer_name: string;
  verified_purchase: string;
  helpful_votes: number;
}

export interface User {
  user_id: string;
  username: string;
  email: string;
  member_since: string;
  account_type: string;
  location_city: string;
  location_state: string;
  location_country: string;
  location: string; // geo_point
  age_group: string;
  occupation: string;
  interests: string;
  total_reviews_count: number;
  avg_rating_given: number;
  verified_purchaser: string;
  trust_score: number;
}

// Generic document type that can be any of the above
export type Document = Product | Review | User;

export interface SearchResponse {
  hits: {
    total: { value: number };
    hits: Array<{
      _id: string;
      _source: Document;
      _score: number;
    }>;
  };
}

export interface LabConfig {
  queryType: string;
  displayName: string;
  docUrl: string;
  
  // NEW: Specify which index and fields this lab queries
  elasticsearch: {
    index: 'products' | 'product_reviews' | 'product_users';
    displayFields: string[]; // Which fields to show in results
    searchFields: string[];  // Which fields are typically searched
  };
  
  introQuery: {
    description: string;
    template: string;
    hints?: string[];
  };
  challenge: {
    goal: string;
    validation: {
      mustInclude: string[];
      expectedResultIds?: string[];
    };
  };
}

export interface ChallengeStatus {
  isValid: boolean;
  message: string;
  details?: string[];
}

