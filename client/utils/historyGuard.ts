/**
 * History Guard - Prevents duplicate URL entries in browser history
 * 
 * This utility prevents the issue where multiple history entries are created
 * with the same URL, making the back button ineffective, especially on mobile devices.
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
 * Normalize URL for comparison (handles relative/absolute URLs)
 * Always returns pathname+search+hash format for consistent comparison
 */
function normalizeUrl(url: string | URL | null | undefined, baseUrl: string = window.location.origin): string {
  // If url is null/undefined, use current location but normalize to pathname+search+hash format
  if (!url) {
    return getUrlKey(); // Use getUrlKey() for consistency
  }
  
  const urlString = String(url);
  
  // If it's already a full URL, extract pathname+search+hash
  if (urlString.startsWith('http://') || urlString.startsWith('https://')) {
    try {
      const urlObj = new URL(urlString);
      return `${urlObj.pathname}${urlObj.search}${urlObj.hash}`;
    } catch {
      // If URL parsing fails, try to extract pathname manually
      const match = urlString.match(/^https?:\/\/[^/]+(\/.*)$/);
      return match ? match[1] : urlString;
    }
  }
  
  // If it's a relative URL, resolve it against the current location
  try {
    const urlObj = new URL(urlString, baseUrl);
    return `${urlObj.pathname}${urlObj.search}${urlObj.hash}`;
  } catch {
    // If URL parsing fails, treat as relative path
    // Remove leading slash if present to handle both /path and path
    const cleanPath = urlString.startsWith('/') ? urlString : `/${urlString}`;
    return cleanPath;
  }
}

/**
 * Monitor history API to detect duplicate entries
 * Very conservative - only blocks obvious spam, never interferes with React Router
 */
export function setupHistoryGuard() {
  if (typeof window === 'undefined' || isGuarding) {
    return;
  }

  isGuarding = true;
  lastUrl = getUrlKey();

  // Store original methods
  const originalPushState = window.history.pushState;

  // Track the last URL that was pushed (not replaced)
  let lastPushedUrl: string | null = null;
  let lastPushStateCallTime = 0;

  // Override pushState to prevent duplicate entries
  // VERY CONSERVATIVE: Only block if it's the EXACT same URL pushed multiple times in rapid succession (< 50ms)
  // This catches ad scripts but never interferes with legitimate navigation
  window.history.pushState = function(state: any, title: string, url?: string | URL | null) {
    const now = Date.now();
    const timeSinceLastPush = now - lastPushStateCallTime;
    lastPushStateCallTime = now;

    // Normalize URLs for comparison
    const currentUrlKey = getUrlKey();
    const newUrlKey = normalizeUrl(url);
    
    // VERY STRICT: Only block if:
    // 1. It's the EXACT same URL as current (including query/hash)
    // 2. AND it's the same as the last pushed URL
    // 3. AND it happened within 50ms (very rapid - definitely spam)
    // This ensures we NEVER block legitimate React Router navigation
    const isRapidExactDuplicate = 
      newUrlKey === currentUrlKey && 
      lastPushedUrl === newUrlKey && 
      timeSinceLastPush < 50;
    
    if (isRapidExactDuplicate) {
      // This is definitely spam - use replaceState instead
      console.warn('[History Guard] Blocking rapid duplicate:', newUrlKey);
      return window.history.replaceState(state, title, url);
    }
    
    // Update tracking for next comparison
    lastPushedUrl = newUrlKey;
    
    // Allow all other pushState calls (including React Router navigation)
    return originalPushState.call(window.history, state, title, url);
  };

  // Monitor popstate events ONLY for tracking (don't interfere with React Router)
  // Use bubble phase so React Router handles it first
  window.addEventListener('popstate', () => {
    const newUrl = getUrlKey();
    if (lastUrl !== newUrl) {
      lastUrl = newUrl;
      lastPushedUrl = null; // Reset on navigation
      lastPushStateCallTime = 0; // Reset timing
    }
  }); // Use default bubble phase - let React Router handle it first

  console.log('[History Guard] Active - very conservative mode (mobile-optimized)');
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

