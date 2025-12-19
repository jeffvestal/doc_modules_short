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
}

export const QueryEditor: React.FC<QueryEditorProps> = ({ 
  query, 
  onChange, 
  error, 
  height = '300px',
  onFocus
}) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    editor.updateOptions({
      minimap: { enabled: false },
      fontSize: 13,
      lineNumbers: 'on',
      scrollBeyondLastLine: false,
    });
  };

  const headerStyle: React.CSSProperties = {
    padding: '12px 16px',
    borderBottom: '1px solid #343741',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'transparent',
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
          <span style={{ fontSize: '14px' }}>✏️</span>
          <span style={{ color: '#98A2B3', fontSize: '14px', fontWeight: 500 }}>
            Query Editor — modify your query below
          </span>
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
            fontSize: 13,
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

