import React, { useState } from 'react';
import { 
  EuiPanel, 
  EuiTitle, 
  EuiText, 
  EuiSpacer, 
  EuiEmptyPrompt
} from '@elastic/eui';
import { DocumentCard } from './DocumentCard';
import type { SearchResponse, Document } from '../types';
import { labConfig } from '../config/labConfig';

interface ResultsPanelProps {
  response: SearchResponse | null;
  loading: boolean;
  error?: string | null;
}

// Custom modal styles to avoid EUI icon bundling issues
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

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ response, loading, error }) => {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  if (loading) {
    return (
      <EuiPanel color="transparent" hasShadow={false}>
        <EuiText>Loading results...</EuiText>
      </EuiPanel>
    );
  }

  if (error) {
    return (
      <EuiPanel color="transparent" hasShadow={false}>
        <EuiText color="danger">{error}</EuiText>
      </EuiPanel>
    );
  }

  if (!response) {
    return (
      <EuiPanel color="transparent" hasShadow={false}>
        <EuiEmptyPrompt
          title={<h3>No query executed</h3>}
          body={<p>Write a query and click "Run Query" to see results</p>}
        />
      </EuiPanel>
    );
  }

  // Defensive check for malformed response (e.g., ES error response)
  if (!response || typeof response !== 'object' || !('hits' in response) || !response.hits) {
    const errorMessage = (response as any)?.error?.reason || 
                         (response as any)?.detail || 
                         (response ? JSON.stringify(response) : 'Empty response');
    return (
      <EuiPanel color="transparent" hasShadow={false}>
        <EuiText color="danger">
          <p>Unexpected response format:</p>
          <pre style={{ fontSize: '12px', overflow: 'auto', background: '#000', padding: '10px' }}>{errorMessage}</pre>
        </EuiText>
      </EuiPanel>
    );
  }

  const hits = response.hits?.hits || [];
  const total = response.hits?.total?.value ?? hits.length;

  return (
    <>
      <EuiPanel color="transparent" hasShadow={false} paddingSize="none">
        <EuiTitle size="s">
          <h3>Results ({total} found)</h3>
        </EuiTitle>
        <EuiSpacer size="m" />
        {hits.length === 0 ? (
          <EuiEmptyPrompt
            title={<h3>No results found</h3>}
            body={<p>Try adjusting your query</p>}
          />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {hits.map((hit) => (
              <DocumentCard 
                key={hit._id} 
                document={hit._source} 
                score={hit._score}
                displayFields={labConfig.elasticsearch.displayFields}
                onClick={() => setSelectedDoc(hit._source)}
              />
            ))}
          </div>
        )}
      </EuiPanel>

      {/* Custom modal without EUI icons */}
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
