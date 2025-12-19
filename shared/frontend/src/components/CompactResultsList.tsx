import React, { useState } from 'react';
import { EuiText, EuiEmptyPrompt } from '@elastic/eui';
import type { SearchResponse, Document } from '../types';

interface CompactResultsListProps {
  response: SearchResponse | null;
  loading: boolean;
  error?: string | null;
  keyField: string;
  onDocClick: (doc: Document) => void;
}

// Custom modal styles (reused from ResultsPanel)
const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: 'rgba(26, 35, 50, 0.95)',
  borderRadius: '16px',
  width: '90%',
  maxWidth: '800px',
  maxHeight: '80vh',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
};

const modalHeaderStyle: React.CSSProperties = {
  padding: '16px 24px',
  borderBottom: '1px solid #343741',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const modalBodyStyle: React.CSSProperties = {
  padding: '24px',
  overflow: 'auto',
  flex: 1,
};

const closeButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#98A2B3',
  fontSize: '24px',
  cursor: 'pointer',
  padding: '4px 8px',
  borderRadius: '4px',
};

// Helper to safely get field value from document
function getFieldValue(doc: Document, fieldName: string): string {
  const value = (doc as any)[fieldName];
  if (value === undefined || value === null) return '';
  return String(value);
}

// Row style for clickable result items
const resultRowStyle: React.CSSProperties = {
  padding: '12px 16px',
  marginBottom: '8px',
  borderRadius: '8px',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  transition: 'background-color 0.2s ease',
};

const resultRowHoverStyle: React.CSSProperties = {
  ...resultRowStyle,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
};

const scoreBadgeStyle: React.CSSProperties = {
  padding: '4px 8px',
  borderRadius: '4px',
  backgroundColor: 'rgba(54, 162, 239, 0.2)',
  color: '#36A2EF',
  fontSize: '12px',
  fontWeight: 500,
  fontFamily: 'monospace',
};

export const CompactResultsList: React.FC<CompactResultsListProps> = ({
  response,
  loading,
  error,
  keyField,
  onDocClick,
}) => {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (loading) {
    return <EuiText>Loading results...</EuiText>;
  }

  if (error) {
    return <EuiText color="danger">{error}</EuiText>;
  }

  if (!response) {
    return (
      <EuiEmptyPrompt
        title={<h3>No query executed</h3>}
        body={<p>Click "Run Query" to see results</p>}
      />
    );
  }

  // Defensive check for malformed response
  if (!response || typeof response !== 'object' || !('hits' in response) || !response.hits) {
    const errorMessage = (response as any)?.error?.reason ||
                         (response as any)?.detail ||
                         (response ? JSON.stringify(response) : 'Empty response');
    return (
      <EuiText color="danger">
        <p>Unexpected response format:</p>
        <pre style={{ fontSize: '12px', overflow: 'auto', background: '#000', padding: '10px' }}>{errorMessage}</pre>
      </EuiText>
    );
  }

  const hits = response.hits?.hits || [];
  const total = response.hits?.total?.value ?? hits.length;
  const top5Hits = hits.slice(0, 5);

  return (
    <>
      <div>
        <EuiText size="s" color="subdued" style={{ marginBottom: '12px' }}>
          Top {top5Hits.length} of {total} results
        </EuiText>
        {top5Hits.length === 0 ? (
          <EuiEmptyPrompt
            title={<h3>No results found</h3>}
            body={<p>Try adjusting your query</p>}
          />
        ) : (
          <div>
            {top5Hits.map((hit, index) => {
              const fieldValue = getFieldValue(hit._source, keyField);
              const displayValue = fieldValue || '(no title)';
              const isHovered = hoveredIndex === index;

              return (
                <div
                  key={hit._id}
                  style={isHovered ? resultRowHoverStyle : resultRowStyle}
                  onClick={() => {
                    setSelectedDoc(hit._source);
                    onDocClick(hit._source);
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <span style={{ color: '#fff', fontSize: '14px', flex: 1 }}>
                    {displayValue}
                  </span>
                  <span style={scoreBadgeStyle}>
                    {hit._score.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* JSON Modal */}
      {selectedDoc && (
        <div
          style={modalOverlayStyle}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedDoc(null);
          }}
        >
          <div style={modalContentStyle}>
            <div style={modalHeaderStyle}>
              <h2 style={{ margin: 0, color: '#fff', fontSize: '20px' }}>Document JSON</h2>
              <button
                style={closeButtonStyle}
                onClick={() => setSelectedDoc(null)}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#343741')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                ✕
              </button>
            </div>
            <div style={modalBodyStyle}>
              <pre style={{
                backgroundColor: '#0B1425',
                color: '#36A2EF',
                padding: '16px',
                borderRadius: '8px',
                overflow: 'auto',
                fontSize: '14px',
                fontFamily: 'monospace',
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}>
                {JSON.stringify(selectedDoc, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

