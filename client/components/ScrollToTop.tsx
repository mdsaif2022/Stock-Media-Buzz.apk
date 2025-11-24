import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Ensures every route navigation starts at the top of the page.
 * Also handles in-page hash navigation so anchor links still work.
 * Enhanced for mobile browser compatibility.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const prevPathname = useRef(pathname);
  const isNavigatingBackRef = useRef(false);

  // Set up popstate listener outside useEffect to catch events before React Router processes them
  useEffect(() => {
    // Detect if this is a back/forward navigation by checking if popstate was fired
    // This helps ensure proper behavior on mobile browsers
    const handlePopState = () => {
      isNavigatingBackRef.current = true;
      // Reset flag after a short delay
      setTimeout(() => {
        isNavigatingBackRef.current = false;
      }, 200);
    };

    // Use capture phase to set flag before React Router handles the event
    window.addEventListener('popstate', handlePopState, true);

    return () => {
      window.removeEventListener('popstate', handlePopState, true);
    };
  }, []); // Only set up listener once

  useEffect(() => {
    // Only scroll if pathname actually changed (not just a re-render)
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;

      // Check flag asynchronously to ensure it's been set by popstate handler
      // Use a microtask to check after popstate event has been processed
      Promise.resolve().then(() => {
        const isBackNavigation = isNavigatingBackRef.current;
        const delay = isBackNavigation ? (hash ? 150 : 50) : 0;

        if (hash) {
          // Small delay to ensure DOM is ready, especially on mobile
          setTimeout(() => {
            const targetId = hash.replace("#", "");
            const element = document.getElementById(targetId);
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "start" });
              return;
            }
          }, delay);
        } else {
          // Scroll to top
          // Use a small delay on mobile to ensure layout is complete
          setTimeout(() => {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "instant" in window ? ("instant" as ScrollBehavior) : "auto",
            });
          }, delay);
        }
      });
    }
  }, [pathname, hash]);

  return null;
}

