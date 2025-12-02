import { RefObject, useEffect, useState } from "react";

interface UseMobileAutoplayOptions {
  /**
   * Percentage of video that must be visible in viewport center to trigger autoplay
   * Default: 0.5 (50% of video height)
   */
  threshold?: number;
  /**
   * Root margin for intersection observer (useful for preloading)
   * Default: "0px"
   */
  rootMargin?: string;
}

/**
 * Hook for mobile autoplay based on viewport intersection
 * Detects when video is in the center 50% of viewport and triggers autoplay
 * Uses Intersection Observer for efficient, smooth detection
 */
export function useMobileAutoplay<T extends Element>(
  ref: RefObject<T>,
  isMobile: boolean,
  options: UseMobileAutoplayOptions = {}
): boolean {
  const [shouldAutoplay, setShouldAutoplay] = useState(false);
  const { threshold = 0.3, rootMargin = "0px" } = options;

  useEffect(() => {
    // Only run on mobile devices
    if (!isMobile) {
      setShouldAutoplay(false);
      return;
    }

    const target = ref.current;
    if (!target) {
      // Retry if target not ready yet
      const timeout = setTimeout(() => {
        // Check again after a short delay
      }, 100);
      return () => clearTimeout(timeout);
    }

    // Check function to determine if video should autoplay
    const checkShouldAutoplay = () => {
      if (!target) return false;
      
      const rect = target.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      
      // Calculate video center position
      const videoCenter = rect.top + rect.height / 2;
      
      // Calculate distance from viewport center
      const distanceFromCenter = Math.abs(videoCenter - viewportCenter);
      
      // Calculate maximum allowed distance (60% of viewport height around center)
      // 30% above center + 30% below center = 60% total center area (more lenient)
      const maxDistance = viewportHeight * 0.3;
      
      // Video is in center area if distance is less than max
      const isInCenter = distanceFromCenter <= maxDistance;
      
      // Check if enough of video is visible
      const visibleTop = Math.max(0, viewportHeight - rect.top);
      const visibleBottom = Math.max(0, rect.bottom);
      const visibleHeight = Math.min(visibleTop, visibleBottom, rect.height, viewportHeight);
      const visibleRatio = visibleHeight / rect.height;
      
      // Video must be in center AND have enough visibility
      return isInCenter && visibleRatio >= threshold && rect.bottom > 0 && rect.top < viewportHeight;
    };

    // Use Intersection Observer to detect when video enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            // Video left viewport - pause
            setShouldAutoplay(false);
            return;
          }

          // Check if video is in center area
          const shouldPlay = checkShouldAutoplay();
          setShouldAutoplay(shouldPlay);
        });
      },
      {
        // Use multiple thresholds for smooth detection
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1],
        rootMargin,
      }
    );

    observer.observe(target);

    // Also listen to scroll for more responsive updates
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (target && target.getBoundingClientRect().bottom > 0 && target.getBoundingClientRect().top < window.innerHeight) {
          const shouldPlay = checkShouldAutoplay();
          if (shouldPlay !== shouldAutoplay) {
            console.log('[useMobileAutoplay] Scroll detected - autoplay changed:', {
              from: shouldAutoplay,
              to: shouldPlay,
            });
          }
          setShouldAutoplay(shouldPlay);
        }
      }, 50); // Debounce scroll events
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial state
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [ref, isMobile, threshold, rootMargin]);

  return shouldAutoplay;
}

