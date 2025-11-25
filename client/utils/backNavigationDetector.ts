/**
 * Back Navigation Detector
 * 
 * Provides a reliable way to detect browser back/forward navigation
 * by tracking popstate events globally.
 */

let isBackNavigation = false;
let backNavigationTimeout: ReturnType<typeof setTimeout> | null = null;
let backNavigationStartTime = 0;

/**
 * Initialize the back navigation detector
 * Call this once in your app initialization
 */
export function setupBackNavigationDetector() {
  if (typeof window === 'undefined') return;

  const handlePopState = () => {
    // Clear any existing timeout
    if (backNavigationTimeout !== null) {
      clearTimeout(backNavigationTimeout);
      backNavigationTimeout = null;
    }

    // Set flag immediately when popstate fires
    isBackNavigation = true;
    backNavigationStartTime = Date.now();

    if (process.env.NODE_ENV === 'development') {
      console.log('[BackNavDetector] 🔙 PopState detected - setting back nav flag', {
        timestamp: new Date().toISOString(),
        historyLength: window.history.length
      });
    }

    // Reset flag after navigation completes (React Router processes it)
    // Use a shorter timeout to allow React Router to handle navigation naturally
    // We only need to block redirects briefly, not prevent navigation itself
    backNavigationTimeout = setTimeout(() => {
      isBackNavigation = false;
      backNavigationTimeout = null;
      backNavigationStartTime = 0;
      if (process.env.NODE_ENV === 'development') {
        console.log('[BackNavDetector] ✅ Back nav flag reset');
      }
    }, 500); // Reduced to 500ms - just enough to block redirects, not navigation
  };

  // Listen for popstate events (browser back/forward button)
  // Use bubble phase so React Router handles it first
  window.addEventListener('popstate', handlePopState, false);

  // Return cleanup function
  return () => {
    window.removeEventListener('popstate', handlePopState, false);
    if (backNavigationTimeout !== null) {
      clearTimeout(backNavigationTimeout);
      backNavigationTimeout = null;
    }
  };
}

/**
 * Check if current navigation is from browser back/forward button
 * This is more reliable than useNavigationType which can have timing issues
 */
export function isBackNavigationActive(): boolean {
  // Check if flag is set AND it's been less than 500ms since popstate
  // We only need to block redirects briefly, not prevent navigation itself
  // React Router handles the actual navigation, we just prevent unwanted redirects
  if (isBackNavigation) {
    const timeSincePopState = Date.now() - backNavigationStartTime;
    const isActive = timeSincePopState < 500; // Active for 500ms after popstate
    if (process.env.NODE_ENV === 'development' && isActive) {
      console.log('[BackNavDetector] ✅ Back nav active (blocking redirects only)', {
        timeSincePopState: timeSincePopState + 'ms'
      });
    }
    return isActive;
  }
  return false;
}

/**
 * Reset the back navigation flag (useful for testing)
 */
export function resetBackNavigationFlag(): void {
  isBackNavigation = false;
  if (backNavigationTimeout !== null) {
    clearTimeout(backNavigationTimeout);
    backNavigationTimeout = null;
  }
}

