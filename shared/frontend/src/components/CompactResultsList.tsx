import React, { useState, useEffect } from 'react';
import { EuiText, EuiEmptyPrompt } from '@elastic/eui';
import Editor from '@monaco-editor/react';
import type { SearchResponse, Document, QueryExample } from '../types';
import { analyzeText, explainHit } from '../lib/elasticsearch';
import type { AnalyzeResponse, ExplainResponse } from '../types';

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

// Helper to simplify cryptic Lucene explanation strings into human-readable format
function simplifyDescription(desc: string): string {
  // Pattern for weight(field:term in doc) [PerFieldSimilarity]
  const weightRegex = /weight\((\w+):(.+?) in \d+\)/;
  const match = desc.match(weightRegex);
  if (match) {
    const field = match[1];
    const term = match[2];
    return `Matched "${term}" in ${field}`;
  }
  
  // Clean up common Lucene phrases
  let simplified = desc
    .replace(/, result of:/g, '')
    .replace(/sum of:/g, 'Combined score of:')
    .replace(/product of:/g, 'Combined score of:')
    .trim();
  
  return simplified;
}

// Row style for clickable result items
const resultRowStyle: React.CSSProperties = {
  padding: '10px 14px',
  marginBottom: '6px',
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

type ViewMode = 'results' | 'raw' | 'tokens';

interface CompactResultsListProps {
  response: SearchResponse | null;
  loading: boolean;
  error?: string | null;
  keyField: string;
  onDocClick: (doc: Document) => void;
  queryTime?: number | null;
  example: QueryExample;
  currentQuery: string;
  effectiveIndex?: string;
}

export const CompactResultsList: React.FC<CompactResultsListProps> = ({
  response,
  loading,
  error,
  keyField,
  onDocClick,
  queryTime,
  example,
  currentQuery,
  effectiveIndex,
}) => {
  const indexToUse = effectiveIndex || example.index;
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('results');
  const [tokens, setTokens] = useState<AnalyzeResponse | null>(null);
  // Per-doc explain data
  const [explainDataMap, setExplainDataMap] = useState<Record<string, ExplainResponse>>({});
  const [explainLoadingId, setExplainLoadingId] = useState<string | null>(null);
  const [showExplainPopup, setShowExplainPopup] = useState<string | null>(null);

  // Extract query text for analysis
  useEffect(() => {
    if (viewMode === 'tokens' && response) {
      try {
        const queryObj = JSON.parse(currentQuery);
        let queryText = '';
        if (queryObj?.query?.match) {
          const matchQuery = queryObj.query.match;
          for (const [_field, value] of Object.entries(matchQuery)) {
            if (typeof value === 'string') {
              queryText = value;
              break;
            } else if (typeof value === 'object' && value !== null && 'query' in value) {
              queryText = (value as any).query;
              break;
            }
          }
        }
        if (queryText) {
          analyzeText(queryText, indexToUse).then(setTokens).catch(() => {});
        }
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, [viewMode, response, currentQuery, example]);

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

  const handleExplainClick = async (e: React.MouseEvent, docId: string) => {
    e.stopPropagation(); // Don't trigger row click
    
    // If already have data, just toggle popup
    if (explainDataMap[docId]) {
      setShowExplainPopup(showExplainPopup === docId ? null : docId);
      return;
    }
    
    setExplainLoadingId(docId);
    try {
      const queryObj = JSON.parse(currentQuery);
      const explainQuery = queryObj.query || queryObj;
      const explain = await explainHit(indexToUse, docId, explainQuery);
      setExplainDataMap(prev => ({ ...prev, [docId]: explain }));
      setShowExplainPopup(docId);
    } catch (err) {
      console.error('Explain error:', err);
    } finally {
      setExplainLoadingId(null);
    }
  };

  const handleCopyResponse = () => {
    if (viewMode === 'raw' && response) {
      navigator.clipboard.writeText(JSON.stringify(response, null, 2));
    } else if (viewMode === 'tokens' && tokens) {
      navigator.clipboard.writeText(JSON.stringify(tokens, null, 2));
    }
  };

  const hits = response?.hits?.hits || [];
  const total = response?.hits?.total?.value ?? hits.length;
  const top5Hits = hits.slice(0, 5);

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  };

  const tabButtonStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    color: '#98A2B3',
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const tabButtonActiveStyle: React.CSSProperties = {
    ...tabButtonStyle,
    backgroundColor: '#36A2EF',
    color: '#fff',
  };

  return (
    <>
      <style>{`.highlight-snippet em { color: #DCDCAA; font-style: normal; font-weight: 500; }`}</style>
      <div>
        <div style={headerStyle}>
          <EuiText size="s" color="subdued" style={{ margin: 0 }}>
            {viewMode === 'results' && `Top ${top5Hits.length} of ${total} results`}
            {viewMode === 'raw' && 'Raw JSON Response'}
            {viewMode === 'tokens' && 'Analyzed Tokens'}
            {queryTime !== null && queryTime !== undefined && (
              <span style={{ marginLeft: '12px', color: '#36A2EF' }}>
                • Took {queryTime}ms
              </span>
            )}
          </EuiText>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {(viewMode === 'raw' || viewMode === 'tokens') && (
              <button
                style={tabButtonStyle}
                onClick={handleCopyResponse}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Copy
              </button>
            )}
          </div>
        </div>

        {/* View Tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <button
            style={viewMode === 'results' ? tabButtonActiveStyle : tabButtonStyle}
            onClick={() => setViewMode('results')}
            onMouseOver={(e) => {
              if (viewMode !== 'results') {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }
            }}
            onMouseOut={(e) => {
              if (viewMode !== 'results') {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            Results
          </button>
          <button
            style={viewMode === 'raw' ? tabButtonActiveStyle : tabButtonStyle}
            onClick={() => setViewMode('raw')}
            onMouseOver={(e) => {
              if (viewMode !== 'raw') {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }
            }}
            onMouseOut={(e) => {
              if (viewMode !== 'raw') {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            RAW JSON
          </button>
          <button
            style={viewMode === 'tokens' ? tabButtonActiveStyle : tabButtonStyle}
            onClick={() => setViewMode('tokens')}
            onMouseOver={(e) => {
              if (viewMode !== 'tokens') {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }
            }}
            onMouseOut={(e) => {
              if (viewMode !== 'tokens') {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            Tokens
          </button>
        </div>

        {/* View Content */}
        {viewMode === 'raw' && response && (
          <div style={{ height: '400px', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
            <Editor
              height="400px"
              defaultLanguage="json"
              value={JSON.stringify(response, null, 2)}
              theme="vs-dark"
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 12,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                padding: { top: 12 },
              }}
            />
          </div>
        )}

        {viewMode === 'tokens' && (
          <div>
            {tokens ? (
              <div>
                <EuiText size="s" color="subdued" style={{ marginBottom: '12px' }}>
                  Tokens from analyzed query text:
                </EuiText>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {tokens.tokens.map((token, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(54, 162, 239, 0.2)',
                        color: '#36A2EF',
                        fontSize: '12px',
                        fontFamily: 'monospace',
                      }}
                    >
                      {token.token}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <EuiEmptyPrompt
                title={<h3>No tokens available</h3>}
                body={<p>Run a query first to see analyzed tokens</p>}
              />
            )}
          </div>
        )}


        {viewMode === 'results' && (
          <>
            {top5Hits.length === 0 ? (
              <EuiEmptyPrompt
                title={<h3>No results found</h3>}
                body={<p>Try adjusting your query</p>}
              />
            ) : (
              <div>
                {top5Hits.map((hit: any, index: number) => {
                  const fieldValue = getFieldValue(hit._source, keyField);
                  const displayValue = fieldValue || '(no title)';
                  const isHovered = hoveredIndex === index;
                  const allHighlights = hit.highlight || {};
                  const highlightSnippets = Object.values(allHighlights).flat() as string[];
                  const docExplain = explainDataMap[hit._id];
                  const isExplainOpen = showExplainPopup === hit._id;

                  return (
                    <div key={hit._id} style={{ position: 'relative', marginBottom: '4px' }}>
                      <div
                        style={isHovered ? resultRowHoverStyle : resultRowStyle}
                        onClick={() => {
                          setSelectedDoc(hit._source);
                          onDocClick(hit._source);
                        }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <div style={{ flex: 1 }}>
                          <span style={{ color: '#fff', fontSize: '13px' }}>
                            {displayValue}
                          </span>
                          {highlightSnippets.length > 0 && (
                            <div style={{ marginTop: '4px' }}>
                              {highlightSnippets.slice(0, 1).map((snippet: string, idx: number) => (
                                <EuiText
                                  key={idx}
                                  size="xs"
                                  style={{ color: '#98A2B3' }}
                                >
                                  <span 
                                    dangerouslySetInnerHTML={{ __html: `...${snippet}...` }}
                                    style={{ }}
                                    className="highlight-snippet"
                                  />
                                </EuiText>
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={(e) => handleExplainClick(e, hit._id)}
                          style={{
                            background: isExplainOpen ? '#36A2EF' : 'rgba(54, 162, 239, 0.2)',
                            border: 'none',
                            color: isExplainOpen ? '#fff' : '#36A2EF',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            cursor: 'pointer',
                            marginRight: '8px',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {explainLoadingId === hit._id ? '...' : 'Why?'}
                        </button>
                        <span style={scoreBadgeStyle}>
                          {hit._score.toFixed(2)}
                        </span>
                      </div>
                      
                      {/* Inline explain popup */}
                      {isExplainOpen && docExplain && (
                        <div style={{
                          marginTop: '4px',
                          padding: '12px',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(54, 162, 239, 0.1)',
                          border: '1px solid rgba(54, 162, 239, 0.3)',
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <EuiText size="xs" style={{ color: '#36A2EF' }}>
                              Total Score: <strong>{docExplain.explanation.value.toFixed(2)}</strong>
                            </EuiText>
                            <button
                              onClick={() => setShowExplainPopup(null)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#98A2B3',
                                cursor: 'pointer',
                                fontSize: '14px',
                              }}
                            >
                              ✕
                            </button>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <EuiText size="xs" style={{ color: '#98A2B3' }}>
                              This document matched because:
                            </EuiText>
                            <EuiText size="xs" style={{ color: '#98A2B3' }}>
                              Contribution
                            </EuiText>
                          </div>
                          {docExplain.explanation.details && docExplain.explanation.details.map((detail, idx) => {
                            const simplified = simplifyDescription(detail.description);
                            const termMatch = simplified.match(/Matched "(.+?)" in (.+)/);
                            const scorePercent = ((detail.value / docExplain.explanation.value) * 100).toFixed(0);
                            return (
                              <div key={idx} style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                                marginBottom: '6px',
                                padding: '6px 8px',
                                borderRadius: '4px',
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                              }}>
                                <EuiText size="xs" style={{ color: '#E0E0E0' }}>
                                  {termMatch ? (
                                    <>Matched <strong style={{ color: '#36A2EF' }}>"{termMatch[1]}"</strong> in {termMatch[2]}</>
                                  ) : simplified}
                                </EuiText>
                                <span style={{ 
                                  color: '#36A2EF', 
                                  fontSize: '11px',
                                  marginLeft: '12px',
                                  whiteSpace: 'nowrap',
                                }}>
                                  +{detail.value.toFixed(2)} ({scorePercent}%)
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* JSON Modal */}
      {selectedDoc && (
        <div
          style={modalOverlayStyle}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedDoc(null);
            }
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

