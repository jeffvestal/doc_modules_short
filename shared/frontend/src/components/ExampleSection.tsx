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
import { searchProducts, validateQuery } from '../lib/elasticsearch';
import type { QueryExample, SearchResponse, Document } from '../types';

interface ExampleSectionProps {
  example: QueryExample;
  keyDisplayField: string;
}

export const ExampleSection: React.FC<ExampleSectionProps> = ({ example, keyDisplayField }) => {
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

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        // Call handleRunQuery directly
        const runQuery = async () => {
          setError(null);
          let queryObj;
          try {
            queryObj = JSON.parse(query);
          } catch (err) {
            setError('Invalid JSON. Please check your query syntax.');
            return;
          }
          const validation = validateQuery(queryObj);
          if (!validation.isValid) {
            setError(validation.error || 'Invalid query');
            return;
          }
          if (enableHighlighting) {
            const field = detectFieldFromQuery(queryObj);
            if (field) {
              queryObj.highlight = { fields: { [field]: {} } };
            }
          }
          setLoading(true);
          try {
            const result = await searchProducts(queryObj, example.index);
            setResponse(result.data);
            setQueryTime(result.took);
            setGlowSide('results');
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to execute query');
            setResponse(null);
            setQueryTime(null);
          } finally {
            setLoading(false);
          }
        };
        runQuery();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [query, enableHighlighting, example.index]);

  // Helper to detect field from query
  const detectFieldFromQuery = (queryObj: any): string | null => {
    if (queryObj?.query?.match) {
      const matchQuery = queryObj.query.match;
      // Handle both { "field": "value" } and { "field": { "query": "value" } }
      for (const [field, value] of Object.entries(matchQuery)) {
        if (typeof value === 'string' || (typeof value === 'object' && value !== null && 'query' in value)) {
          return field;
        }
      }
    }
    return null;
  };

  const handleRunQuery = async () => {
    setError(null);

    let queryObj;
    try {
      queryObj = JSON.parse(query);
    } catch (err) {
      setError('Invalid JSON. Please check your query syntax.');
      return;
    }

    const validation = validateQuery(queryObj);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid query');
      return;
    }

    // Add highlighting if enabled
    if (enableHighlighting) {
      const field = detectFieldFromQuery(queryObj);
      if (field) {
        queryObj.highlight = {
          fields: {
            [field]: {},
          },
        };
      }
    }

    setLoading(true);
    try {
      const result = await searchProducts(queryObj, example.index);
      setResponse(result.data);
      setQueryTime(result.took);
      setGlowSide('results');
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

