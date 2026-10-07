import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { LanguageProvider } from './i18n/LanguageContext';
import { AppProvider } from './context/AppContext';
import { RouterProvider } from './router/Router';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <AppProvider>
        <RouterProvider>
          <App />
        </RouterProvider>
      </AppProvider>
    </LanguageProvider>
  </React.StrictMode>
);
