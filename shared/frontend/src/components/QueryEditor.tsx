import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { EuiButton, EuiSpacer, EuiCallOut } from '@elastic/eui';

// Agent Builder-style brighter blue border
const editorContainerStyle: React.CSSProperties = {
  borderRadius: '16px',
  border: '2px solid #36A2EF',
  boxShadow: '0 0 20px rgba(54, 162, 239, 0.4)',
  overflow: 'hidden',
  transition: 'box-shadow 0.2s ease-in-out',
};

const editorContainerFocusedStyle: React.CSSProperties = {
  ...editorContainerStyle,
  boxShadow: '0 0 30px rgba(54, 162, 239, 0.6)',
};

interface QueryEditorProps {
  query: string;
  onChange: (value: string) => void;
  onRun: () => void;
  loading: boolean;
  error: string | null;
}

export const QueryEditor: React.FC<QueryEditorProps> = ({ query, onChange, onRun, loading, error }) => {
  const editorRef = useRef<any>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    editor.updateOptions({
      minimap: { enabled: false },
      fontSize: 14,
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

  return (
    <div>
      <div 
        style={isFocused ? editorContainerFocusedStyle : editorContainerStyle}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <div style={headerStyle}>
          <span style={{ fontSize: '14px' }}>✏️</span>
          <span style={{ color: '#98A2B3', fontSize: '14px', fontWeight: 500 }}>
            Query Editor — modify your query below
          </span>
        </div>
        <Editor
          height="300px"
          defaultLanguage="json"
          value={query}
          onChange={(val) => onChange(val || '')}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            padding: { top: 12 },
          }}
        />
      </div>
      <EuiSpacer size="m" />
      <EuiButton onClick={onRun} isLoading={loading} fill>
        Run Query
      </EuiButton>
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

