import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { EuiSpacer, EuiCallOut } from '@elastic/eui';
import { labConfig } from '../config/labConfig';

// Removed Agent Builder-style brighter blue border styles from here as they moved to parent container
// ... existing code ...

interface QueryEditorProps {
  query: string;
  onChange: (value: string) => void;
  error: string | null;
  height?: string;
  onFocus?: () => void;
  enableHighlighting?: boolean;
  onHighlightingChange?: (enabled: boolean) => void;
  onCopyQuery?: () => void;
  tooltips?: Record<string, string>;
  selectedIndex?: string;
  onIndexChange?: (index: string) => void;
  availableIndices?: readonly string[];
}

export const QueryEditor: React.FC<QueryEditorProps> = ({ 
  query, 
  onChange, 
  error, 
  height = '300px',
  onFocus,
  enableHighlighting = false,
  onHighlightingChange,
  onCopyQuery,
  tooltips,
  selectedIndex,
  onIndexChange,
  availableIndices = [],
}) => {
  const editorRef = useRef<any>(null);
  const [showDatasetDropdown, setShowDatasetDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const queryLanguage = labConfig.queryLanguage || 'query_dsl';
  const isEsql = queryLanguage === 'esql';
  
  // Field names for autocomplete (Query DSL only)
  const fieldNames = ['review_text', 'review_title', 'product_name', 'product_description', 'username', 'email'];
  const commonParams = ['query', 'operator', 'fuzziness', 'analyzer', 'zero_terms_query', 'auto_generate_synonyms_phrase_query'];
  
  // ES|QL keywords for autocomplete
  const esqlKeywords = ['FROM', 'WHERE', 'KEEP', 'DROP', 'RENAME', 'DISSECT', 'GROK', 'EVAL', 'STATS', 'SORT', 'LIMIT', 'LIKE', 'IN', 'AND', 'OR', 'NOT'];

  const handleEditorDidMount = (editorInstance: any, monacoInstance: any) => {
    editorRef.current = editorInstance;
    editorInstance.updateOptions({
      minimap: { enabled: false },
      fontSize: 12,
      lineNumbers: 'on',
      scrollBeyondLastLine: false,
    });

    if (!monacoInstance) return;

    // Register autocomplete provider for Query DSL (JSON)
    if (!isEsql) {
      monacoInstance.languages.registerCompletionItemProvider('json', {
      provideCompletionItems: (model: any, position: any) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        const suggestions: any[] = [];

        // Add field name suggestions
        fieldNames.forEach((field) => {
          suggestions.push({
            label: field,
            kind: monacoInstance.languages.CompletionItemKind.Field,
            insertText: `"${field}"`,
            range,
            detail: 'Field name',
          });
        });

        // Add parameter suggestions
        commonParams.forEach((param) => {
          suggestions.push({
            label: param,
            kind: monacoInstance.languages.CompletionItemKind.Property,
            insertText: `"${param}": `,
            range,
            detail: tooltips?.[param] || 'Query parameter',
            documentation: tooltips?.[param] || undefined,
          });
        });

        return { suggestions };
      },
      });
    }
    
    // Register autocomplete provider for ES|QL (SQL)
    if (isEsql) {
      monacoInstance.languages.registerCompletionItemProvider('sql', {
        provideCompletionItems: (model: any, position: any) => {
          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };

          const suggestions: any[] = [];

          // Add ES|QL keyword suggestions
          esqlKeywords.forEach((keyword) => {
            suggestions.push({
              label: keyword,
              kind: monacoInstance.languages.CompletionItemKind.Keyword,
              insertText: keyword,
              range,
              detail: 'ES|QL keyword',
            });
          });

          // Add index suggestions
          ['product_reviews', 'products', 'product_users'].forEach((index) => {
            suggestions.push({
              label: index,
              kind: monacoInstance.languages.CompletionItemKind.Value,
              insertText: index,
              range,
              detail: 'Index name',
            });
          });

          return { suggestions };
        },
      });
    }

    // Add hover tooltips (Query DSL only)
    if (tooltips && !isEsql) {
      monacoInstance.languages.registerHoverProvider('json', {
        provideHover: (model: any, position: any) => {
          const word = model.getWordAtPosition(position);
          if (word) {
            const tooltip = tooltips[word.word];
            if (tooltip) {
              return {
                range: new monacoInstance.Range(
                  position.lineNumber,
                  word.startColumn,
                  position.lineNumber,
                  word.endColumn
                ),
                contents: [
                  { value: `**${word.word}**` },
                  { value: tooltip },
                ],
              };
            }
          }
          return null;
        },
      });
    }
  };

  const headerStyle: React.CSSProperties = {
    padding: '12px 16px',
    borderBottom: '1px solid #343741',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  };

  const buttonStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    color: '#E0E0E0',
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const buttonActiveStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: enableHighlighting ? '#36A2EF' : 'transparent',
    borderColor: enableHighlighting ? '#36A2EF' : 'rgba(255, 255, 255, 0.2)',
    color: enableHighlighting ? '#fff' : '#98A2B3',
  };

  const editorWrapperStyle: React.CSSProperties = {
    borderRadius: '16px',
    border: '1px solid #343741',
    overflow: 'hidden',
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDatasetDropdown(false);
      }
    };
    if (showDatasetDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showDatasetDropdown]);

  const dropdownStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: '4px',
    backgroundColor: 'rgba(26, 35, 50, 0.95)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '6px',
    padding: '4px',
    minWidth: '180px',
    zIndex: 1000,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  };

  const dropdownItemStyle: React.CSSProperties = {
    padding: '8px 12px',
    color: '#E0E0E0',
    fontSize: '12px',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
  };

  const dropdownItemActiveStyle: React.CSSProperties = {
    ...dropdownItemStyle,
    backgroundColor: 'rgba(54, 162, 239, 0.2)',
    color: '#36A2EF',
  };

  return (
    <div>
      <div style={editorWrapperStyle} onFocus={onFocus}>
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px' }}>✏️</span>
            <span style={{ color: '#98A2B3', fontSize: '13px', fontWeight: 500 }}>
              Query Editor — modify your query below
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', position: 'relative' }}>
            {onIndexChange && availableIndices.length > 0 && (
              <div ref={dropdownRef} style={{ position: 'relative' }}>
                <button
                  style={buttonStyle}
                  onClick={() => setShowDatasetDropdown(!showDatasetDropdown)}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  }}
                >
                  Dataset: {selectedIndex || 'product_reviews'} ▼
                </button>
                {showDatasetDropdown && (
                  <div style={dropdownStyle}>
                    {availableIndices.map((index) => (
                      <div
                        key={index}
                        style={selectedIndex === index ? dropdownItemActiveStyle : dropdownItemStyle}
                        onClick={() => {
                          onIndexChange(index);
                          setShowDatasetDropdown(false);
                        }}
                        onMouseOver={(e) => {
                          if (selectedIndex !== index) {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                          }
                        }}
                        onMouseOut={(e) => {
                          if (selectedIndex !== index) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        {index}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {onHighlightingChange && !isEsql && (
              <button
                style={buttonActiveStyle}
                onClick={() => onHighlightingChange(!enableHighlighting)}
                onMouseOver={(e) => {
                  if (!enableHighlighting) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!enableHighlighting) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  }
                }}
              >
                {enableHighlighting ? '✓ Highlighting' : 'Add Highlighting'}
              </button>
            )}
            {onCopyQuery && (
              <button
                style={buttonStyle}
                onClick={onCopyQuery}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                }}
              >
                Copy Query
              </button>
            )}
          </div>
        </div>
        <Editor
          height={height}
          defaultLanguage={isEsql ? "sql" : "json"}
          value={query}
          onChange={(val) => onChange(val || '')}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 12,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            padding: { top: 12 },
          }}
        />
      </div>
      {error && (
        <>
          <EuiSpacer size="m" />
          <EuiCallOut title="Error" color="danger">
            <p>{error}</p>
          </EuiCallOut>
        </>
      )}
    </div>
  );
};

