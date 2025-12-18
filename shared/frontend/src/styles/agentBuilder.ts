import { css } from '@emotion/react';

// Agent Builder gradient background — higher-contrast dark blue, per design
export const conversationBackgroundStyles = () => css`
  background: linear-gradient(
    180deg,
    #0B1425 16%,
    #0F1D33 48%,
    #0B1425 84%
  );
  min-height: 100vh;
`;

// 16px border radius (non-standard EUI) with Agent Builder dark semi-transparent background
export const roundedCardStyles = (euiTheme: any) => css`
  border-radius: 16px;
  background: rgba(26, 35, 50, 0.4);
  padding: ${euiTheme.size.l ?? '24px'};
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

// Glow effect for query input box (brighter highlighting)
// This style doesn't need theme values, so it's a plain css object
export const queryInputGlowStyles = css`
  border-radius: 16px;
  box-shadow: 0 0 20px rgba(0, 119, 204, 0.3);
  transition: box-shadow 0.2s ease-in-out;
  
  &:focus-within {
    box-shadow: 0 0 30px rgba(0, 119, 204, 0.5);
  }
`;

