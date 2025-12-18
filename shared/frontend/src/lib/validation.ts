import type { LabConfig, ChallengeStatus, SearchResponse } from '../types';

export function validateChallenge(
  query: string,
  response: SearchResponse | null,
  challengeNumber: 1 | 2,
  config: LabConfig
): ChallengeStatus {
  if (challengeNumber === 1) {
    // Intro challenge - just needs to be valid JSON and run successfully
    if (!response) {
      return {
        isValid: false,
        message: 'Please run your query first',
      };
    }
    return {
      isValid: true,
      message: 'Great! Your query executed successfully.',
    };
  }

  // Challenge 2 - validate query structure and results
  const challenge = config.challenge;
  const validation = challenge.validation;

  try {
    const queryObj = JSON.parse(query);
    
    // Check if query includes required elements
    const queryStr = JSON.stringify(queryObj).toLowerCase();
    const missing: string[] = [];
    
    for (const required of validation.mustInclude) {
      if (!queryStr.includes(required.toLowerCase())) {
        missing.push(`Query must include "${required}"`);
      }
    }
    
    if (missing.length > 0) {
      return {
        isValid: false,
        message: 'Query is missing required elements',
        details: missing,
      };
    }
    
    // Check if expected results are present (if specified)
    if (validation.expectedResultIds && response) {
      const resultIds = response.hits.hits.map((hit) => hit._id);
      const missingIds = validation.expectedResultIds.filter(
        (id) => !resultIds.includes(id)
      );
      
      if (missingIds.length > 0) {
        return {
          isValid: false,
          message: 'Query found some results, but not all expected documents',
          details: [`Missing document IDs: ${missingIds.join(', ')}`],
        };
      }
    }
    
    // If we have results and all checks passed
    if (response && response.hits.hits.length > 0) {
      return {
        isValid: true,
        message: `Perfect! Found ${response.hits.hits.length} matching document(s).`,
      };
    }
    
    return {
      isValid: false,
      message: 'Query executed but returned no results. Check your query syntax.',
    };
  } catch (error) {
    return {
      isValid: false,
      message: 'Invalid JSON query',
      details: [String(error)],
    };
  }
}

