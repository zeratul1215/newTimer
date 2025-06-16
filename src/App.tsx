import React from 'react';
import { BrowserRouter } from 'react-router';
import AppRoutes from '@/routes/AppRoutes';
import { HelmetProvider } from 'react-helmet-async';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
