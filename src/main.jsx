import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppProvider } from "./context/AppContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';
import './styles/global.scss';
import NProgress from 'nprogress';
import './styles/nprogress-custom.css'; // Use custom styles instead

// Configure NProgress
NProgress.configure({ 
  showSpinner: false,
  easing: 'ease',
  speed: 500,
  minimum: 0.1,
  trickleSpeed: 200
});

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime in v5)
    },
    mutations: {
      retry: 1,
    },
  },
});

// Get the root element
const container = document.getElementById('app');
const root = createRoot(container);

// Render the app
root.render(
  <AppProvider>
    <QueryClientProvider client={queryClient}>
      <App />
      {/* Only show React Query DevTools in development */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools 
          initialIsOpen={false}
          buttonPosition="bottom-right"
        />
      )}
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