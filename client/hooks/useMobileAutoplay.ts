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
  const { threshold = 0.5, rootMargin = "0px" } = options;

  useEffect(() => {
    // Only run on mobile devices
    if (!isMobile) {
      setShouldAutoplay(false);
      return;
    }

    const target = ref.current;
    if (!target) return;

    // Use Intersection Observer to detect when video enters center viewport
    // This is more performant than scroll listeners
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            // Video left viewport - pause
            setShouldAutoplay(false);
            return;
          }

          // Calculate position in viewport to determine if video is in center area
          const rect = entry.boundingClientRect;
          const viewportHeight = window.innerHeight;
          const viewportCenter = viewportHeight / 2;
          
          // Calculate video center position
          const videoCenter = rect.top + rect.height / 2;
          
          // Calculate distance from viewport center
          const distanceFromCenter = Math.abs(videoCenter - viewportCenter);
          
          // Calculate maximum allowed distance (50% of viewport height around center)
          // 25% above center + 25% below center = 50% total center area
          const maxDistance = viewportHeight * 0.25;
          
          // Video is in center area if distance is less than max
          const isInCenter = distanceFromCenter <= maxDistance;
          
          // Also check intersection ratio to ensure enough video is visible
          const isVisibleEnough = entry.intersectionRatio >= threshold;
          
          // Autoplay if video is in center area AND visible enough
          setShouldAutoplay(isInCenter && isVisibleEnough);
        });
      },
      {
        // Use multiple thresholds for smooth detection as video enters/exits
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1],
        rootMargin,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [ref, isMobile, threshold, rootMargin]);

  return shouldAutoplay;
}

