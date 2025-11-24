/**
 * Navigation Debugging Utilities
 * 
 * Tools to help diagnose and debug back button and navigation issues
 */

import { getHistoryDebugInfo } from './safeNavigation';

/**
 * Log current navigation state for debugging
 */
export function logNavigationState(label: string = 'Navigation State') {
  const info = getHistoryDebugInfo();
  console.group(`🔍 ${label}`);
  console.log('Current URL:', info.currentUrl);
  console.log('Pathname:', info.pathname);
  console.log('Search:', info.search);
  console.log('Hash:', info.hash);
  console.log('History Length:', info.historyLength);
  console.log('Can Go Back:', info.canGoBack);
  console.log('State:', info.state);
  console.groupEnd();
  return info;
}

/**
 * Monitor popstate events and log them
 */
export function monitorPopstate() {
  const handler = (event: PopStateEvent) => {
    console.group('🔙 PopState Event');
    console.log('URL:', window.location.href);
    console.log('State:', event.state);
    console.log('History Length:', window.history.length);
    logNavigationState('After PopState');
    console.groupEnd();
  };
  
  window.addEventListener('popstate', handler);
  
  return () => {
    window.removeEventListener('popstate', handler);
  };
}

/**
 * Monitor all history API calls
 */
export function monitorHistoryAPI() {
  const originalPushState = window.history.pushState;
  const originalReplaceState = window.history.replaceState;
  const originalBack = window.history.back;
  const originalForward = window.history.forward;
  const originalGo = window.history.go;

  window.history.pushState = function(...args) {
    console.log('📝 pushState called:', {
      url: args[2],
      state: args[0],
      currentUrl: window.location.href,
    });
    return originalPushState.apply(window.history, args);
  };

  window.history.replaceState = function(...args) {
    console.log('🔄 replaceState called:', {
      url: args[2],
      state: args[0],
      currentUrl: window.location.href,
    });
    return originalReplaceState.apply(window.history, args);
  };

  window.history.back = function() {
    console.log('⬅️ history.back() called');
    return originalBack.apply(window.history);
  };

  window.history.forward = function() {
    console.log('➡️ history.forward() called');
    return originalForward.apply(window.history);
  };

  window.history.go = function(...args) {
    console.log('↔️ history.go() called:', args[0]);
    return originalGo.apply(window.history, args);
  };

  return () => {
    window.history.pushState = originalPushState;
    window.history.replaceState = originalReplaceState;
    window.history.back = originalBack;
    window.history.forward = originalForward;
    window.history.go = originalGo;
  };
}

/**
 * Test back button functionality
 */
export function testBackButton() {
  console.group('🧪 Testing Back Button');
  
  const initialLength = window.history.length;
  const initialUrl = window.location.href;
  
  console.log('Initial State:', {
    historyLength: initialLength,
    url: initialUrl,
    canGoBack: initialLength > 1,
  });
  
  if (initialLength <= 1) {
    console.warn('⚠️ Cannot test back button - no history to go back to');
    console.groupEnd();
    return;
  }
  
  console.log('Calling history.back()...');
  window.history.back();
  
  // Check state after a short delay
  setTimeout(() => {
    const newLength = window.history.length;
    const newUrl = window.location.href;
    
    console.log('After Back:', {
      historyLength: newLength,
      url: newUrl,
      urlChanged: newUrl !== initialUrl,
    });
    
    if (newUrl === initialUrl) {
      console.error('❌ Back button did not change URL!');
    } else {
      console.log('✅ Back button worked - URL changed');
    }
    
    console.groupEnd();
  }, 100);
}

/**
 * Check for common navigation issues
 */
export function diagnoseNavigationIssues() {
  console.group('🔍 Navigation Diagnosis');
  
  const issues: string[] = [];
  const info = getHistoryDebugInfo();
  
  // Check history length
  if (info.historyLength > 100) {
    issues.push(`⚠️ Very large history length: ${info.historyLength} (may indicate duplicate entries)`);
  }
  
  // Check if we can go back
  if (!info.canGoBack) {
    issues.push('⚠️ Cannot go back - no history entries');
  }
  
  // Check for hash in URL (might indicate issues)
  if (info.hash && !info.hash.startsWith('#')) {
    issues.push(`⚠️ Unexpected hash format: ${info.hash}`);
  }
  
  // Check state
  if (info.state && typeof info.state === 'object') {
    console.log('ℹ️ History state exists:', info.state);
  }
  
  if (issues.length === 0) {
    console.log('✅ No obvious issues detected');
  } else {
    issues.forEach(issue => console.warn(issue));
  }
  
  console.groupEnd();
  return issues;
}

/**
 * Make debugging utilities available globally in development
 */
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).navDebug = {
    logState: logNavigationState,
    monitorPopstate,
    monitorHistory: monitorHistoryAPI,
    testBack: testBackButton,
    diagnose: diagnoseNavigationIssues,
    getInfo: getHistoryDebugInfo,
  };
  
  console.log('🔧 Navigation debug utilities available at window.navDebug');
  console.log('Try: window.navDebug.diagnose() or window.navDebug.testBack()');
}
