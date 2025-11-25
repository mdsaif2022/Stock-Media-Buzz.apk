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
    // Use a longer timeout to prevent redirects from running after back navigation
    // Need enough time for all useEffect hooks to complete and not trigger redirects
    backNavigationTimeout = setTimeout(() => {
      isBackNavigation = false;
      backNavigationTimeout = null;
      backNavigationStartTime = 0;
      if (process.env.NODE_ENV === 'development') {
        console.log('[BackNavDetector] ✅ Back nav flag reset');
      }
    }, 2000); // Increased to 2 seconds to prevent redirects after back navigation completes
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
  // Check if flag is set AND it's been less than 2 seconds since popstate
  // We need enough time to prevent redirects from running after back navigation completes
  // React Router handles the actual navigation, we just prevent unwanted redirects
  if (isBackNavigation) {
    const timeSincePopState = Date.now() - backNavigationStartTime;
    const isActive = timeSincePopState < 2000; // Active for 2 seconds after popstate
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

