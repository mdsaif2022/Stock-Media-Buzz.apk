/**
 * Navigation Debugging Utility
 * 
 * Use this to debug navigation issues in development.
 * Add to App.tsx temporarily to monitor navigation:
 * 
 * import { NavigationDebugger } from '@/utils/navigationDebug';
 * 
 * <BrowserRouter>
 *   <NavigationDebugger />
 *   <AppRoutes />
 * </BrowserRouter>
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function NavigationDebugger() {
  const location = useLocation();

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.group('🔍 Navigation Debug');
      console.log('Pathname:', location.pathname);
      console.log('Search:', location.search);
      console.log('Hash:', location.hash);
      console.log('History Length:', window.history.length);
      console.log('Can Go Back:', window.history.length > 1);
      console.log('Current URL:', window.location.href);
      console.groupEnd();
    }
  }, [location]);

  return null;
}

/**
 * Check if navigation is working correctly
 * Run this in browser console
 */
export function checkNavigationHealth() {
  const issues: string[] = [];
  
  if (window.history.length > 20) {
    issues.push(`⚠️ History length is very large: ${window.history.length}. This might indicate navigation loops.`);
  }
  
  if (window.history.length < 2) {
    issues.push('ℹ️ History length is very small. You might be on the first page or history was cleared.');
  }
  
  const currentPath = window.location.pathname;
  if (!currentPath || currentPath === '/') {
    issues.push('ℹ️ You are on the root path. Back button might not work if this is the first page.');
  }
  
  if (issues.length === 0) {
    console.log('✅ Navigation appears healthy');
    console.log(`History length: ${window.history.length}`);
    console.log(`Current URL: ${window.location.href}`);
  } else {
    console.warn('Navigation Health Check:', issues);
  }
  
  return {
    historyLength: window.history.length,
    currentUrl: window.location.href,
    canGoBack: window.history.length > 1,
    issues
  };
}

