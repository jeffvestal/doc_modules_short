import type { SearchResponse, AnalyzeResponse, ExplainResponse } from '../types';

// In Instruqt, the frontend is served by the backend on port 8000
// The backend proxies /api/elasticsearch/* requests to Elasticsearch
// This avoids CORS issues and Instruqt cross-tab authentication errors
const ELASTICSEARCH_URL = '/api/elasticsearch';

export async function searchProducts(query: any, indexName?: string): Promise<{ data: SearchResponse; took: number }> {
  const index = indexName || 'product_reviews'; // default to reviews
  const url = `${ELASTICSEARCH_URL}/${index}/_search`;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  const startTime = performance.now();
  
  // Backend handles authentication, no need to add API key here
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(query),
  });
  
  const endTime = performance.now();
  const took = Math.round(endTime - startTime);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Elasticsearch error: ${response.status} - ${errorText}`);
  }
  
  const data = await response.json();
  return { data, took };
}

export async function analyzeText(text: string, index: string, analyzer: string = 'standard'): Promise<AnalyzeResponse> {
  const url = `${ELASTICSEARCH_URL}/${index}/_analyze`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      analyzer,
    }),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Elasticsearch analyze error: ${response.status} - ${errorText}`);
  }
  
  return response.json();
}

export async function explainHit(index: string, docId: string, query: any): Promise<ExplainResponse> {
  const url = `${ELASTICSEARCH_URL}/${index}/_explain/${docId}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Elasticsearch explain error: ${response.status} - ${errorText}`);
  }
  
  return response.json();
}

export function validateQuery(query: any): { isValid: boolean; error?: string } {
  try {
    if (!query || typeof query !== 'object') {
      return { isValid: false, error: 'Query must be a JSON object' };
    }
    
    if (!query.query) {
      return { isValid: false, error: 'Query must have a "query" field' };
    }
    
    return { isValid: true };
  } catch (error) {
    return { isValid: false, error: String(error) };
  }
}

