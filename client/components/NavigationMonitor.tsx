/**
 * Navigation Monitor Component
 * 
 * Monitors navigation events to diagnose back button issues
 * Only active in development mode
 */

import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { isBackNavigationActive } from '@/utils/backNavigationDetector';

export default function NavigationMonitor() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    const isBackNav = navigationType === 'POP' || isBackNavigationActive();
    
    console.group('🔍 Navigation Event');
    console.log('Pathname:', location.pathname);
    console.log('Search:', location.search);
    console.log('Hash:', location.hash);
    console.log('Full URL:', window.location.href);
    console.log('History Length:', window.history.length);
    console.log('Can Go Back:', window.history.length > 1);
    console.log('History State:', window.history.state);
    console.log('Navigation Type:', navigationType, navigationType === 'POP' ? '← BACK/FORWARD' : navigationType === 'PUSH' ? '→ PROGRAMMATIC' : '🔄 REPLACE');
    console.log('Is Back Navigation:', isBackNav ? '✅ YES - Redirects should be BLOCKED' : '❌ NO');
    
    if (isBackNav) {
      console.warn('⚠️ BACK BUTTON PRESSED - All redirects should be blocked!');
    }
    
    console.groupEnd();
  }, [location, navigationType]);

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

