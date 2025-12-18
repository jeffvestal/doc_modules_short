/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiTitle,
  EuiText,
  useEuiTheme,
} from '@elastic/eui';
import { QueryEditor } from './QueryEditor';
import { ResultsPanel } from './ResultsPanel';
import { Challenge } from './Challenge';
import { searchProducts, validateQuery } from '../lib/elasticsearch';
import { validateChallenge } from '../lib/validation';
import { labConfig } from '../config/labConfig';
import { roundedCardStyles } from '../styles/agentBuilder';
import type { SearchResponse, ChallengeStatus } from '../types';

// Agent Builder exact dark blue colors
const AGENT_BUILDER_DARK = '#0B1425';
const AGENT_BUILDER_MID = '#162137';

export const QueryLab: React.FC = () => {
  const { euiTheme } = useEuiTheme();
  const [query, setQuery] = useState(labConfig.introQuery.template);
  const [response, setResponse] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [challengeNumber] = useState<1 | 2>(1);
  const [challengeStatus, setChallengeStatus] = useState<ChallengeStatus | null>(null);

  const handleRunQuery = async () => {
    setError(null);
    setChallengeStatus(null);
    
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
      const result = await searchProducts(queryObj, labConfig.elasticsearch.index);
      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to execute query');
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  const handleValidateChallenge = () => {
    const status = validateChallenge(query, response, challengeNumber, labConfig);
    setChallengeStatus(status);
  };

  // Placeholder for future multi-challenge support
  // const handleNextChallenge = () => {
  //   if (challengeNumber === 1) {
  //     setChallengeNumber(2);
  //     setQuery('{\n  "query": {\n    \n  }\n}');
  //     setResponse(null);
  //     setChallengeStatus(null);
  //   }
  // };

  // Agent Builder gradient background style
  const backgroundStyle: React.CSSProperties = {
    background: `linear-gradient(180deg, ${AGENT_BUILDER_DARK} 0%, ${AGENT_BUILDER_MID} 50%, ${AGENT_BUILDER_DARK} 100%)`,
    minHeight: '100vh',
    padding: '24px',
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
        </EuiFlexItem>

        <EuiSpacer size="l" />

        {/* Challenge */}
        <EuiFlexItem grow={false}>
          <Challenge
            challengeNumber={challengeNumber}
            status={challengeStatus}
            onValidate={handleValidateChallenge}
          />
        </EuiFlexItem>

        <EuiSpacer size="l" />

        {/* Query Editor and Results */}
        <EuiFlexItem>
          <EuiFlexGroup>
            <EuiFlexItem>
              <div css={roundedCardStyles(euiTheme)}>
                <QueryEditor
                  query={query}
                  onChange={setQuery}
                  onRun={handleRunQuery}
                  loading={loading}
                  error={error}
                />
              </div>
            </EuiFlexItem>
            <EuiFlexItem>
              <div css={roundedCardStyles(euiTheme)}>
                <ResultsPanel response={response} loading={loading} error={error} />
              </div>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};
