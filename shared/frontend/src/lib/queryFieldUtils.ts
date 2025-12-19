// Generic query field detection utilities

/**
 * Detects the query type from a query object
 */
export function detectQueryType(queryObj: any): string | null {
  if (!queryObj?.query) return null;
  
  const query = queryObj.query;
  
  // Check for common query types
  if (query.match) return 'match';
  if (query.query_string) return 'query_string';
  if (query.bool) return 'bool';
  if (query.match_phrase) return 'match_phrase';
  if (query.multi_match) return 'multi_match';
  if (query.term) return 'term';
  if (query.terms) return 'terms';
  if (query.range) return 'range';
  
  // Return first key as fallback
  const keys = Object.keys(query);
  return keys.length > 0 ? keys[0] : null;
}

/**
 * Detects the current field(s) from a query object based on query type
 */
export function detectFieldFromQuery(queryObj: any, queryType?: string | null): string | null {
  if (!queryObj?.query) return null;
  
  const detectedType = queryType || detectQueryType(queryObj);
  if (!detectedType) return null;
  
  const query = queryObj.query;
  
  switch (detectedType) {
    case 'match':
    case 'match_phrase':
    case 'term':
    case 'terms':
      // Inline field: { "match": { "field": "value" } }
      const matchQuery = query[detectedType];
      if (matchQuery && typeof matchQuery === 'object') {
        for (const [field, value] of Object.entries(matchQuery)) {
          if (typeof value === 'string' || (typeof value === 'object' && value !== null && 'query' in value)) {
            return field;
          }
        }
      }
      return null;
      
    case 'query_string':
      // default_field or fields array
      const qsQuery = query.query_string;
      if (qsQuery?.default_field) {
        return qsQuery.default_field;
      }
      if (qsQuery?.fields && Array.isArray(qsQuery.fields) && qsQuery.fields.length > 0) {
        // Return first field, removing boost notation (field^5 -> field)
        return qsQuery.fields[0].split('^')[0];
      }
      return null;
      
    case 'bool':
      // Nested: check must/should/must_not/filter clauses
      const boolQuery = query.bool;
      const clauses = ['must', 'should', 'must_not', 'filter'];
      
      for (const clause of clauses) {
        if (Array.isArray(boolQuery?.[clause])) {
          for (const nestedQuery of boolQuery[clause]) {
            const nestedField = detectFieldFromQuery({ query: nestedQuery });
            if (nestedField) return nestedField;
          }
        } else if (boolQuery?.[clause]) {
          const nestedField = detectFieldFromQuery({ query: boolQuery[clause] });
          if (nestedField) return nestedField;
        }
      }
      return null;
      
    case 'multi_match':
      // fields array
      const mmQuery = query.multi_match;
      if (mmQuery?.fields && Array.isArray(mmQuery.fields) && mmQuery.fields.length > 0) {
        return mmQuery.fields[0].split('^')[0];
      }
      return null;
      
    default:
      // Fallback: try to find a field in the query object
      const queryValue = query[detectedType];
      if (queryValue && typeof queryValue === 'object') {
        for (const [key, value] of Object.entries(queryValue)) {
          if (typeof value === 'string' || (typeof value === 'object' && value !== null && 'query' in value)) {
            return key;
          }
        }
      }
      return null;
  }
}

/**
 * Swaps the field in a query object based on query type
 */
export function swapQueryField(
  queryObj: any,
  oldField: string,
  newField: string,
  newQueryText: string,
  queryType?: string | null
): any {
  if (!queryObj?.query) return queryObj;
  
  const detectedType = queryType || detectQueryType(queryObj);
  if (!detectedType) return queryObj;
  
  const newQueryObj = JSON.parse(JSON.stringify(queryObj)); // Deep clone
  
  switch (detectedType) {
    case 'match':
    case 'match_phrase':
    case 'term':
    case 'terms':
      // Inline field swap
      const matchQuery = newQueryObj.query[detectedType];
      if (matchQuery && matchQuery[oldField]) {
        const fieldValue = matchQuery[oldField];
        delete matchQuery[oldField];
        
        if (typeof fieldValue === 'string') {
          matchQuery[newField] = newQueryText;
        } else if (typeof fieldValue === 'object' && fieldValue !== null) {
          matchQuery[newField] = {
            ...fieldValue,
            query: newQueryText,
          };
        } else {
          matchQuery[newField] = fieldValue;
        }
      }
      break;
      
    case 'query_string':
      // Swap default_field or first field in fields array
      const qsQuery = newQueryObj.query.query_string;
      if (qsQuery?.default_field === oldField) {
        qsQuery.default_field = newField;
        qsQuery.query = newQueryText;
      } else if (qsQuery?.fields && Array.isArray(qsQuery.fields)) {
        // Replace first matching field
        const fieldIndex = qsQuery.fields.findIndex((f: string) => f.split('^')[0] === oldField);
        if (fieldIndex >= 0) {
          const oldFieldWithBoost = qsQuery.fields[fieldIndex];
          const boost = oldFieldWithBoost.includes('^') ? oldFieldWithBoost.split('^')[1] : '';
          qsQuery.fields[fieldIndex] = boost ? `${newField}^${boost}` : newField;
          qsQuery.query = newQueryText;
        }
      }
      break;
      
    case 'bool':
      // Recursively swap in nested clauses
      const boolQuery = newQueryObj.query.bool;
      const clauses = ['must', 'should', 'must_not', 'filter'];
      
      for (const clause of clauses) {
        if (Array.isArray(boolQuery?.[clause])) {
          boolQuery[clause] = boolQuery[clause].map((nestedQuery: any) =>
            swapQueryField({ query: nestedQuery }, oldField, newField, newQueryText)
          );
        } else if (boolQuery?.[clause]) {
          boolQuery[clause] = swapQueryField({ query: boolQuery[clause] }, oldField, newField, newQueryText).query;
        }
      }
      break;
      
    case 'multi_match':
      // Swap first field in fields array
      const mmQuery = newQueryObj.query.multi_match;
      if (mmQuery?.fields && Array.isArray(mmQuery.fields) && mmQuery.fields.length > 0) {
        const oldFieldWithBoost = mmQuery.fields[0];
        const boost = oldFieldWithBoost.includes('^') ? oldFieldWithBoost.split('^')[1] : '';
        mmQuery.fields[0] = boost ? `${newField}^${boost}` : newField;
        mmQuery.query = newQueryText;
      }
      break;
      
    default:
      // Fallback: try inline swap
      const queryValue = newQueryObj.query[detectedType];
      if (queryValue && queryValue[oldField]) {
        const fieldValue = queryValue[oldField];
        delete queryValue[oldField];
        queryValue[newField] = typeof fieldValue === 'string' 
          ? newQueryText 
          : { ...fieldValue, query: newQueryText };
      }
  }
  
  return newQueryObj;
}

