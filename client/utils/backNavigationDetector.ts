/**
 * Back Navigation Detector
 * 
 * Provides a reliable way to detect browser back/forward navigation
 * by tracking popstate events globally.
 */

let isBackNavigation = false;
let backNavigationTimeout: ReturnType<typeof setTimeout> | null = null;

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

    // Reset flag after navigation completes (React Router processes it)
    // Use a longer timeout to ensure React Router has time to handle it
    backNavigationTimeout = setTimeout(() => {
      isBackNavigation = false;
      backNavigationTimeout = null;
    }, 500); // Longer timeout to ensure React Router processes it
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
  return isBackNavigation;
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

