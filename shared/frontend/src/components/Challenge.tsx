import React from 'react';
import {
  EuiPanel,
  EuiTitle,
  EuiText,
  EuiSpacer,
  EuiCallOut,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
} from '@elastic/eui';
import { labConfig } from '../config/labConfig';
import type { ChallengeStatus } from '../types';

interface ChallengeProps {
  challengeNumber: 1 | 2;
  status: ChallengeStatus | null;
  onValidate: () => void;
}

export const Challenge: React.FC<ChallengeProps> = ({ challengeNumber, status, onValidate }) => {
  const isIntro = challengeNumber === 1;
  const challenge = isIntro ? labConfig.introQuery : labConfig.challenge;

  return (
    <EuiPanel color="transparent" hasShadow={false} style={{ border: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(26, 35, 50, 0.4)', borderRadius: '16px' }}>
      <EuiTitle size="s">
        <h3 style={{ color: '#fff' }}>{isIntro ? '📖 Learn' : '🎯 Challenge'}</h3>
      </EuiTitle>
      <EuiSpacer size="m" />
      
      {isIntro ? (
        <>
          <EuiText>
            <p>{'description' in challenge ? challenge.description : ''}</p>
            {'hints' in challenge && challenge.hints && challenge.hints.length > 0 && (
              <>
                <EuiSpacer size="s" />
                <EuiText size="s" color="subdued">
                  <strong>Hints:</strong>
                  <ul>
                    {challenge.hints.map((hint: string, i: number) => (
                      <li key={i}>{hint}</li>
                    ))}
                  </ul>
                </EuiText>
              </>
            )}
          </EuiText>
        </>
      ) : (
        <>
          <EuiText>
            <p><strong>Goal:</strong> {'goal' in challenge ? challenge.goal : ''}</p>
          </EuiText>
          <EuiSpacer size="m" />
          <EuiFlexGroup justifyContent="flexEnd">
            <EuiFlexItem grow={false}>
              <EuiButton onClick={onValidate} fill>
                Validate Query
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
          
          {status && (
            <>
              <EuiSpacer size="m" />
              <EuiCallOut
                title={status.isValid ? '✅ Valid!' : '❌ Not quite right'}
                color={status.isValid ? 'success' : 'warning'}
              >
                <p>{status.message}</p>
                {status.details && status.details.length > 0 && (
                  <ul>
                    {status.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                )}
              </EuiCallOut>
            </>
          )}
        </>
      )}
    </EuiPanel>
  );
};

