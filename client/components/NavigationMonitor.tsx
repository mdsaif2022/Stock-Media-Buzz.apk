/**
 * Navigation Monitor Component
 * 
 * Monitors navigation events to diagnose back button issues
 * Only active in development mode
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function NavigationMonitor() {
  const location = useLocation();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    console.group('🔍 Navigation Event');
    console.log('Pathname:', location.pathname);
    console.log('Search:', location.search);
    console.log('Hash:', location.hash);
    console.log('Full URL:', window.location.href);
    console.log('History Length:', window.history.length);
    console.log('Can Go Back:', window.history.length > 1);
    console.log('History State:', window.history.state);
    console.groupEnd();
  }, [location]);

  // Monitor popstate events
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    const handlePopState = (event: PopStateEvent) => {
      console.group('🔙 PopState Event Detected');
      console.log('URL Changed to:', window.location.href);
      console.log('State:', event.state);
      console.log('History Length:', window.history.length);
      console.log('Timestamp:', new Date().toISOString());
      console.groupEnd();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return null;
}

