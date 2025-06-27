import React from 'react';
import { BrowserRouter } from 'react-router';
import AppRoutes from '@/routes/AppRoutes';
import { ThemeProvider } from '@/contexts/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
