import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import googleAnalytics from '../services/googleAnalytics';

// Simple hook for basic page view tracking
export const useGoogleAnalytics = () => {
  const location = useLocation();
  const previousLocation = useRef(location.pathname);

  // Track page views on route changes
  useEffect(() => {
    if (location.pathname !== previousLocation.current) {
      // Track new page view
      const pageTitle = document.title || 'Unknown Page';
      googleAnalytics.trackPageView(location.pathname, pageTitle);
      
      // Update previous location
      previousLocation.current = location.pathname;
    }
  }, [location]);

  // Return empty object since we're not doing specific tracking
  return {};
};