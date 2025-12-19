import React from 'react';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiTitle,
  EuiText,
} from '@elastic/eui';
import { ExampleSection } from './ExampleSection';
import { labConfig } from '../config/labConfig';

// Agent Builder exact dark blue colors
const AGENT_BUILDER_DARK = '#0B1425';
const AGENT_BUILDER_MID = '#162137';

export const QueryLab: React.FC = () => {
  // Agent Builder gradient background style
  const backgroundStyle: React.CSSProperties = {
    background: `linear-gradient(180deg, ${AGENT_BUILDER_DARK} 0%, ${AGENT_BUILDER_MID} 50%, ${AGENT_BUILDER_DARK} 100%)`,
    minHeight: '100vh',
    padding: '24px',
  };

  // Divider style between sections
  const dividerStyle: React.CSSProperties = {
    border: 'none',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    margin: '24px 0',
  };

  // Double divider style for header separation
  const doubleDividerStyle: React.CSSProperties = {
    border: 'none',
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    height: '4px',
    margin: '24px 0',
  };

  return (
    <div style={backgroundStyle}>
      <EuiFlexGroup direction="column">
        {/* Header */}
        <EuiFlexItem grow={false}>
          <EuiTitle size="l">
            <h1 style={{ color: '#fff' }}>{labConfig.displayName}</h1>
          </EuiTitle>
          <EuiSpacer size="s" />
          <EuiText>
            <p>
              <a 
                href={labConfig.docUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#36A2EF' }}
              >
                View official documentation ↗
              </a>
            </p>
          </EuiText>
          <EuiSpacer size="m" />
          <EuiText>
            <p style={{ color: '#98A2B3', maxWidth: '800px' }}>
              {labConfig.description}
            </p>
          </EuiText>
        </EuiFlexItem>

        <hr style={doubleDividerStyle} />

        {/* Example Sections */}
        {labConfig.examples.map((example, index) => {
          const keyDisplayField = labConfig.keyDisplayFields[example.index];
          
          return (
            <React.Fragment key={example.id}>
              <EuiFlexItem grow={false}>
                <ExampleSection
                  example={example}
                  keyDisplayField={keyDisplayField}
                />
              </EuiFlexItem>
              {index < labConfig.examples.length - 1 && (
                <hr style={dividerStyle} />
              )}
            </React.Fragment>
          );
        })}
      </EuiFlexGroup>
    </div>
  );
};
