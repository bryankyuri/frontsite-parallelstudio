import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { registerSW } from 'virtual:pwa-register';
import googleAnalytics from './services/googleAnalytics';
import './styles/global.scss';

function App() {
  useEffect(() => {
    // Initialize PWA service worker
    const updateSW = registerSW({
      onNeedRefresh() {
        if (confirm('New content available. Reload?')) {
          updateSW(true);
        }
      },
      onOfflineReady() {
        console.log('App ready to work offline');
      },
    });

    // Initialize Google Analytics
    googleAnalytics.init();
    
    // Track initial page load
    googleAnalytics.trackPageView(window.location.pathname, document.title);
  }, []);

  return <RouterProvider router={router} />;
}

export default App;