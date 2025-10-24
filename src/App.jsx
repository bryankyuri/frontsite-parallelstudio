import React, { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { registerSW } from 'virtual:pwa-register';
import googleAnalytics from './services/googleAnalytics';
import { useNProgressIntegration } from './hooks/useNProgressIntegration';
import './styles/global.scss';

function App() {
  // Initialize NProgress integration with React Query
  useNProgressIntegration();
  const [showUpdateToast, setShowUpdateToast] = useState(false);
  const [updateSWCallback, setUpdateSWCallback] = useState(null);

  useEffect(() => {
    // Initialize PWA service worker with auto-update
    const updateSW = registerSW({
      immediate: true,
      onNeedRefresh() {
        // Show toast notification for update
        setUpdateSWCallback(() => updateSW);
        setShowUpdateToast(true);
        
        // Auto-reload after 3 seconds
        setTimeout(() => {
          updateSW(true);
        }, 3000);
      },
      onOfflineReady() {
        console.log('App ready to work offline');
      },
      onRegistered(registration) {
        console.log('Service Worker registered');
        // Check for updates every hour
        if (registration) {
          setInterval(() => {
            registration.update();
          }, 60 * 60 * 1000); // 1 hour
        }
      },
      onRegisterError(error) {
        console.error('Service Worker registration error:', error);
      },
    });

    // Initialize Google Analytics
    googleAnalytics.init();
    
    // Track initial page load
    googleAnalytics.trackPageView(window.location.pathname, document.title);
  }, []);

  const handleUpdateNow = () => {
    if (updateSWCallback) {
      updateSWCallback(true);
    }
  };

  return (
    <>
      <RouterProvider router={router} />
      
      {/* Update Toast Notification */}
      {showUpdateToast && (
        <div className="fixed bottom-4 right-4 bg-black text-white px-6 py-4 rounded-lg shadow-lg z-[9999] animate-slideUp">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="font-semibold mb-1">Update Available</p>
              <p className="text-sm text-gray-300">Updating in 3 seconds...</p>
            </div>
            <button
              onClick={handleUpdateNow}
              className="bg-white text-black px-4 py-2 rounded font-semibold hover:bg-gray-200 transition-colors text-sm"
            >
              Update Now
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;