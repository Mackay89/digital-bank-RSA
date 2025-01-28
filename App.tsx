import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainComponent } from './components/MainComponent';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainComponent />
    </QueryClientProvider>
  );
}

export default App;