import React, { useState } from 'react';
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
  const [query, setQuery] = useState(example.template);
  const [response, setResponse] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [glowSide, setGlowSide] = useState<'editor' | 'results'>('editor');

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

    setLoading(true);
    try {
      const result = await searchProducts(queryObj, example.index);
      setResponse(result);
      setGlowSide('results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to execute query');
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setQuery(example.template);
    setResponse(null);
    setError(null);
    setGlowSide('editor');
  };

  const handleDocClick = (_doc: Document) => {
    // Handled by CompactResultsList modal
  };

  const boxBaseStyle: React.CSSProperties = {
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '24px',
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
        <h2 style={{ color: '#fff', marginBottom: '16px' }}>{example.title}</h2>
      </EuiTitle>
      <EuiText>
        <p style={{ color: '#98A2B3', marginBottom: '80px' }}>{example.description}</p>
      </EuiText>

      <EuiFlexGroup>
        <EuiFlexItem>
          <div style={glowSide === 'editor' ? boxGlowStyle : boxBaseStyle}>
            <QueryEditor
              query={query}
              onChange={setQuery}
              error={error}
              height="200px"
              onFocus={() => setGlowSide('editor')}
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
        <EuiFlexItem>
          <div style={glowSide === 'results' ? boxGlowStyle : boxBaseStyle}>
            <CompactResultsList
              response={response}
              loading={loading}
              error={error}
              keyField={keyDisplayField}
              onDocClick={handleDocClick}
            />
          </div>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};

