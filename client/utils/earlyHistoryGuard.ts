/**
 * Early History Guard Setup
 * 
 * This script should be loaded as early as possible to prevent duplicate history entries
 * It sets up a basic guard before React Router or any other code runs
 */

(function() {
  'use strict';
  
  if (typeof window === 'undefined') {
    return;
  }
  
  // Store original pushState before anything else can use it
  const originalPushState = window.history.pushState;
  let isEarlyGuardActive = false;
  let lastUrl = window.location.pathname + window.location.search + window.location.hash;
  let lastPushTime = 0;
  
  // Early guard - very simple, just blocks rapid same-URL pushState
  window.history.pushState = function(state: any, title: string, url?: string | URL | null) {
    const now = Date.now();
    const timeSinceLastPush = now - lastPushTime;
    lastPushTime = now;
    
    // Get current and new URLs
    const currentUrl = window.location.pathname + window.location.search + window.location.hash;
    let newUrl = currentUrl;
    
    if (url) {
      const urlStr = String(url);
      if (urlStr.startsWith('http://') || urlStr.startsWith('https://')) {
        try {
          const urlObj = new URL(urlStr);
          newUrl = urlObj.pathname + urlObj.search + urlObj.hash;
        } catch {
          newUrl = currentUrl;
        }
      } else {
        try {
          const urlObj = new URL(urlStr, window.location.origin);
          newUrl = urlObj.pathname + urlObj.search + urlObj.hash;
        } catch {
          newUrl = urlStr.startsWith('/') ? urlStr : `/${urlStr}`;
        }
      }
    }
    
    // If URL is different, always allow
    if (newUrl !== currentUrl) {
      lastUrl = newUrl;
      return originalPushState.call(window.history, state, title, url);
    }
    
    // Same URL - block if rapid (< 10ms) - likely spam
    if (timeSinceLastPush < 10) {
      console.warn('[Early History Guard] Blocking rapid duplicate:', newUrl);
      // Use replaceState instead
      return window.history.replaceState(state, title, url);
    }
    
    // Same URL but not rapid - allow (might be legitimate)
    lastUrl = newUrl;
    return originalPushState.call(window.history, state, title, url);
  };
  
  isEarlyGuardActive = true;
  console.log('[Early History Guard] Active (before main guard)');
})();

