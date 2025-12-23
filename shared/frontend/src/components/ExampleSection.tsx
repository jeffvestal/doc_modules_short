import React, { useState, useEffect, useRef } from 'react';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiTitle,
  EuiText,
  EuiButton,
} from '@elastic/eui';
import { QueryEditor } from './QueryEditor';
import { CompactResultsList } from './CompactResultsList';
import { searchProducts, validateQuery, executeEsqlQuery, validateEsqlQuery } from '../lib/elasticsearch';
import { detectFieldFromQuery, swapQueryField, detectQueryType } from '../lib/queryFieldUtils';
import { labConfig } from '../config/labConfig';
import type { QueryExample, SearchResponse, Document } from '../types';

interface ExampleSectionProps {
  example: QueryExample;
  keyDisplayField: string;
  selectedIndex?: string;
  onIndexChange?: (index: string) => void;
  availableIndices?: readonly string[];
}

export const ExampleSection: React.FC<ExampleSectionProps> = ({ 
  example, 
  keyDisplayField,
  selectedIndex,
  onIndexChange,
  availableIndices,
}) => {
  const storageKey = `query-lab-${example.id}`;
  const savedQuery = localStorage.getItem(storageKey);
  const [query, setQuery] = useState(savedQuery || example.template);
  const [response, setResponse] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [glowSide, setGlowSide] = useState<'editor' | 'results'>('editor');
  const [queryTime, setQueryTime] = useState<number | null>(null);
  const [enableHighlighting, setEnableHighlighting] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 900);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setQuery(saved);
    }
  }, [storageKey]);

  // Save to localStorage on query change
  useEffect(() => {
    if (query !== example.template) {
      localStorage.setItem(storageKey, query);
    }
  }, [query, storageKey, example.template]);

  // Swap query field when selectedIndex changes (for Query DSL and ES|QL)
  useEffect(() => {
    if (!selectedIndex) return;

    // Determine the effective index to use
    const effectiveIndex = selectedIndex;

    if (labConfig.queryLanguage === 'esql') {
      // Handle ES|QL queries
      try {
        // Find FROM clause
        const fromMatch = query.match(/FROM\s+(\w+)/i);
        if (!fromMatch) return; // Can't find FROM clause
        
        const currentIndex = fromMatch[1];
        if (currentIndex === effectiveIndex) return; // Already using the correct index
        
        // Replace FROM clause with new index
        let updatedQuery = query.replace(/FROM\s+\w+/i, `FROM ${effectiveIndex}`);
        
        // Try to update search terms in WHERE clauses
        // Look for LIKE patterns with wildcards: LIKE "*term*"
        const likePattern = /LIKE\s+["']\*([^*]+)\*["']/gi;
        const sampleQueryText = labConfig.sampleQueries[effectiveIndex as keyof typeof labConfig.sampleQueries];
        
        if (sampleQueryText && likePattern.test(query)) {
          // Replace LIKE patterns with new search term
          updatedQuery = updatedQuery.replace(likePattern, () => {
            return `LIKE "*${sampleQueryText}*"`;
          });
        }
        
        // Also handle == comparisons with string literals
        const eqPattern = /==\s+["']([^"']+)["']/gi;
        if (sampleQueryText && eqPattern.test(query)) {
          // Replace first string literal in == comparisons (be conservative)
          let replaced = false;
          updatedQuery = updatedQuery.replace(eqPattern, (match, value) => {
            if (!replaced && value.length > 0) {
              replaced = true;
              return `== "${sampleQueryText}"`;
            }
            return match;
          });
        }
        
        setQuery(updatedQuery);
      } catch (err) {
        // If parsing fails, don't update (user might be editing)
        // Silently ignore the error
      }
    } else {
      // Handle Query DSL (existing logic)
      try {
        const queryObj = JSON.parse(query);
        const queryType = detectQueryType(queryObj);
        
        if (!queryType) return; // Can't detect query type
        
        const currentField = detectFieldFromQuery(queryObj, queryType);
        
        if (currentField) {
          // Get the target field for the selected index (can be string or string[])
          const targetFieldRaw = labConfig.searchFields[effectiveIndex as keyof typeof labConfig.searchFields];
          // If it's an array, use the first field; otherwise use as-is
          const targetField = Array.isArray(targetFieldRaw) ? targetFieldRaw[0] : targetFieldRaw;
          
          // Only swap if the current field is different from target and is a known search field
          const knownSearchFields = Object.values(labConfig.searchFields).flat();
          const shouldSwap = targetField && 
                            currentField !== targetField && 
                            knownSearchFields.includes(currentField);
          
          if (shouldSwap) {
            // Get the sample query text for the selected index
            const sampleQueryText = labConfig.sampleQueries[effectiveIndex as keyof typeof labConfig.sampleQueries];
            
            // Use generic swap function
            const swappedQueryObj = swapQueryField(
              queryObj,
              currentField,
              targetField,
              sampleQueryText,
              queryType
            );
            
            // Update the query string with proper formatting
            const updatedQuery = JSON.stringify(swappedQueryObj, null, 2);
            setQuery(updatedQuery);
          }
        }
      } catch (err) {
        // If JSON parsing fails, don't update (user might be editing)
        // Silently ignore the error
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]); // Trigger on any selectedIndex change

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRunQuery();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [query, enableHighlighting, example.index, selectedIndex]);


  const handleRunQuery = async () => {
    setError(null);
    setLoading(true);

    try {
      if (labConfig.queryLanguage === 'esql') {
        // ES|QL: query is a string, not JSON
        const validation = validateEsqlQuery(query);
        if (!validation.isValid) {
          setError(validation.error || 'Invalid ES|QL query');
          setLoading(false);
          return;
        }

        const result = await executeEsqlQuery(query);
        setResponse(result.data);
        setQueryTime(result.took);
        setGlowSide('results');
      } else {
        // Query DSL: query is JSON
        let queryObj;
        try {
          queryObj = JSON.parse(query);
        } catch (err) {
          setError('Invalid JSON. Please check your query syntax.');
          setLoading(false);
          return;
        }

        const validation = validateQuery(queryObj);
        if (!validation.isValid) {
          setError(validation.error || 'Invalid query');
          setLoading(false);
          return;
        }

        // Add highlighting if enabled (Query DSL only)
        if (enableHighlighting) {
          const queryType = detectQueryType(queryObj);
          const field = detectFieldFromQuery(queryObj, queryType);
          if (field) {
            queryObj.highlight = {
              fields: {
                [field]: {},
              },
            };
          }
        }

        const indexToUse = selectedIndex || example.index;
        const result = await searchProducts(queryObj, indexToUse);
        setResponse(result.data);
        setQueryTime(result.took);
        setGlowSide('results');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to execute query');
      setResponse(null);
      setQueryTime(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setQuery(example.template);
    setResponse(null);
    setError(null);
    setGlowSide('editor');
    setQueryTime(null);
    setEnableHighlighting(false);
    localStorage.removeItem(storageKey);
  };

  const handleDocClick = (_doc: Document) => {
    // Handled by CompactResultsList modal
  };

  const boxBaseStyle: React.CSSProperties = {
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '20px',
    background: 'rgba(26, 35, 50, 0.4)',
    transition: 'all 0.3s ease-in-out',
    height: '100%',
  };

  const boxGlowStyle: React.CSSProperties = {
    ...boxBaseStyle,
    border: '2px solid #36A2EF',
    boxShadow: '0 0 15px rgba(54, 162, 239, 0.4)',
  };

  return (
    <div>
      <EuiTitle size="m">
        <h2 style={{ color: '#fff', marginBottom: '4px' }}>{example.title}</h2>
      </EuiTitle>
      <EuiText>
        <p style={{ color: '#98A2B3', marginBottom: '40px', fontSize: '14px' }}>{example.description}</p>
      </EuiText>

      <EuiFlexGroup direction={isMobile ? 'column' : 'row'}>
        <EuiFlexItem style={{ flexBasis: isMobile ? '100%' : '50%' }}>
          <div style={glowSide === 'editor' ? boxGlowStyle : boxBaseStyle} ref={editorRef}>
            <QueryEditor
              query={query}
              onChange={setQuery}
              error={error}
              height="180px"
              onFocus={() => setGlowSide('editor')}
              enableHighlighting={enableHighlighting}
              onHighlightingChange={setEnableHighlighting}
              onCopyQuery={() => navigator.clipboard.writeText(query)}
              tooltips={example.tooltips}
              selectedIndex={selectedIndex || example.index}
              onIndexChange={onIndexChange}
              availableIndices={availableIndices}
            />
            <EuiSpacer size="m" />
            <EuiFlexGroup gutterSize="s">
              <EuiFlexItem grow={false}>
                <EuiButton onClick={handleRunQuery} isLoading={loading} fill>
                  Run Query
                </EuiButton>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButton onClick={handleReset} disabled={loading}>
                  Reset
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </div>
        </EuiFlexItem>
        <EuiFlexItem style={{ flexBasis: isMobile ? '100%' : '50%' }}>
          <div style={glowSide === 'results' ? boxGlowStyle : boxBaseStyle}>
            <CompactResultsList
              response={response}
              loading={loading}
              error={error}
              keyField={keyDisplayField}
              onDocClick={handleDocClick}
              queryTime={queryTime}
              example={example}
              currentQuery={query}
              effectiveIndex={selectedIndex || example.index}
            />
          </div>
        </EuiFlexItem>
      </EuiFlexGroup>

      {/* Try This Suggestions */}
      {example.tryThis && example.tryThis.length > 0 && (
        <>
          <EuiSpacer size="m" />
          <div style={{ padding: '16px', backgroundColor: 'rgba(54, 162, 239, 0.1)', borderRadius: '8px', border: '1px solid rgba(54, 162, 239, 0.2)' }}>
            <EuiText size="s" style={{ color: '#36A2EF', fontWeight: 600, marginBottom: '8px' }}>
              💡 Try This:
            </EuiText>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#98A2B3' }}>
              {example.tryThis.map((suggestion, idx) => (
                <li key={idx} style={{ marginBottom: '4px', fontSize: '13px' }}>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

