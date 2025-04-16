import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppProvider } from "./context/AppContext";
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import './styles/global.scss';

// Create a client
const queryClient = new QueryClient();

// Get the root element
const container = document.getElementById('app');
const root = createRoot(container);

// Render the app
root.render(
  <AppProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </AppProvider>
);

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
      })
      .catch(error => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}