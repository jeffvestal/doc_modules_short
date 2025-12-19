import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';
import { EuiSpacer, EuiCallOut } from '@elastic/eui';

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
}) => {
  const editorRef = useRef<any>(null);

  // Field names for autocomplete
  const fieldNames = ['review_text', 'review_title', 'product_name', 'product_description', 'username', 'email'];
  const commonParams = ['query', 'operator', 'fuzziness', 'analyzer', 'zero_terms_query', 'auto_generate_synonyms_phrase_query'];

  const handleEditorDidMount = (editorInstance: any, monacoInstance: any) => {
    editorRef.current = editorInstance;
    editorInstance.updateOptions({
      minimap: { enabled: false },
      fontSize: 12,
      lineNumbers: 'on',
      scrollBeyondLastLine: false,
    });

    if (!monacoInstance) return;

    // Register autocomplete provider
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

    // Add hover tooltips
    if (tooltips) {
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
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {onHighlightingChange && (
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
          defaultLanguage="json"
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

