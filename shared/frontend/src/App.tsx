import React from 'react';
import { EuiProvider } from '@elastic/eui';
import { QueryLab } from './components/QueryLab';

function App() {
  return (
    <EuiProvider colorMode="dark">
      <QueryLab />
    </EuiProvider>
  );
}

export default App;

