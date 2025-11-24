/**
 * History Guard - Prevents duplicate URL entries in browser history
 * 
 * This utility prevents the issue where multiple history entries are created
 * with the same URL, making the back button ineffective.
 * 
 * Usage: Import and call `setupHistoryGuard()` in main.tsx
 */

let lastUrl: string | null = null;
let isGuarding = false;

/**
 * Get a unique identifier for the current URL
 */
function getUrlKey(): string {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

/**
 * Check if URL actually changed
 */
function hasUrlChanged(): boolean {
  const currentUrl = getUrlKey();
  if (lastUrl === null) {
    lastUrl = currentUrl;
    return true; // First load
  }
  const changed = lastUrl !== currentUrl;
  lastUrl = currentUrl;
  return changed;
}

/**
 * Monitor history API to detect duplicate entries
 */
export function setupHistoryGuard() {
  if (typeof window === 'undefined' || isGuarding) {
    return;
  }

  isGuarding = true;
  lastUrl = getUrlKey();

  // Override pushState to prevent duplicate entries
  const originalPushState = window.history.pushState;
  window.history.pushState = function(state: any, title: string, url?: string | URL | null) {
    const urlString = url ? String(url) : window.location.href;
    const urlKey = urlString.split('?')[0].split('#')[0]; // Get pathname only
    
    // Check if this URL is the same as current
    const currentPath = window.location.pathname;
    
    if (urlKey === currentPath && urlString === window.location.href) {
      // Same URL - use replaceState instead to avoid duplicate entry
      console.warn('[History Guard] Preventing duplicate history entry:', urlString);
      return window.history.replaceState(state, title, url);
    }
    
    // URL is different - allow pushState
    return originalPushState.call(window.history, state, title, url);
  };

  // Monitor popstate events to track URL changes
  window.addEventListener('popstate', () => {
    lastUrl = getUrlKey();
  });

  // Monitor location changes
  let lastLocation = window.location.href;
  const checkLocation = () => {
    const currentLocation = window.location.href;
    if (currentLocation !== lastLocation) {
      lastUrl = getUrlKey();
      lastLocation = currentLocation;
    }
  };

  // Check location periodically (fallback)
  setInterval(checkLocation, 100);

  console.log('[History Guard] Active - preventing duplicate history entries');
}

/**
 * Reset the guard (useful for testing)
 */
export function resetHistoryGuard() {
  lastUrl = null;
}

/**
 * Get current history state for debugging
 */
export function getHistoryState() {
  return {
    currentUrl: window.location.href,
    urlKey: getUrlKey(),
    historyLength: window.history.length,
    lastTrackedUrl: lastUrl,
  };
}

