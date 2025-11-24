/**
 * Safe Navigation Utilities
 * 
 * Provides utilities to prevent redirect loops and ensure proper history management
 * for both mobile and desktop browsers.
 */

/**
 * Safely push a new history entry only if URL is different
 */
export function safePush(url: string, state: any = {}): void {
  const current = window.location.pathname + window.location.search + window.location.hash;
  const target = url.startsWith('/') ? url : `/${url}`;
  
  // Only push if URL is actually different
  if (current !== target) {
    window.history.pushState(state, '', target);
  }
}

/**
 * Safely redirect only if not already on target URL
 */
export function redirectIfNeeded(targetUrl: string): void {
  const here = window.location.href;
  const target = new URL(targetUrl, window.location.origin).href;
  
  // Only redirect if not already on target
  if (here !== target) {
    window.location.assign(targetUrl);
  }
}

/**
 * Check if we're currently navigating programmatically
 * This helps distinguish between user-initiated back button and programmatic navigation
 */
let isNavigatingProgrammatically = false;
let navigationTimeout: ReturnType<typeof setTimeout> | null = null;

export function setNavigatingProgrammatically(value: boolean): void {
  isNavigatingProgrammatically = value;
  
  // Auto-reset after a short delay to prevent stale state
  if (navigationTimeout) {
    clearTimeout(navigationTimeout);
  }
  
  if (value) {
    navigationTimeout = setTimeout(() => {
      isNavigatingProgrammatically = false;
      navigationTimeout = null;
    }, 100);
  }
}

export function getIsNavigatingProgrammatically(): boolean {
  return isNavigatingProgrammatically;
}

/**
 * Install a popstate handler that works with React Router
 * This should be called once during app initialization
 */
export function installPopstateHandler(handleRoute: (path: string, state: any) => void): () => void {
  const handler = (event: PopStateEvent) => {
    // Don't interfere if we're navigating programmatically
    if (isNavigatingProgrammatically) {
      return;
    }
    
    const path = window.location.pathname + window.location.search + window.location.hash;
    handleRoute(path, event.state);
  };
  
  // Use bubble phase so React Router can handle it first if needed
  window.addEventListener('popstate', handler);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('popstate', handler);
  };
}

/**
 * Debug utility to check history state
 */
export function getHistoryDebugInfo() {
  return {
    currentUrl: window.location.href,
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
    historyLength: window.history.length,
    canGoBack: window.history.length > 1,
    state: window.history.state,
  };
}

