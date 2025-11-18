import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Ensures every route navigation starts at the top of the page.
 * Also handles in-page hash navigation so anchor links still work.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Only scroll if pathname actually changed (not just a re-render)
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;

      if (hash) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          const targetId = hash.replace("#", "");
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
          }
        }, 0);
      } else {
        // Scroll to top
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant" in window ? ("instant" as ScrollBehavior) : "auto",
        });
      }
    }
  }, [pathname, hash]);

  return null;
}

