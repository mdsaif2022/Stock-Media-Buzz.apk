/**
 * User Interaction Tracker
 * Tracks user interaction to enable autoplay on mobile devices
 * iOS Safari requires user interaction before allowing autoplay
 */

let hasUserInteracted = false;
let interactionListenersAttached = false;

/**
 * Check if user has interacted with the page
 */
export function hasUserInteractedWithPage(): boolean {
  return hasUserInteracted;
}

/**
 * Mark that user has interacted
 */
export function markUserInteraction(): void {
  hasUserInteracted = true;
}

/**
 * Setup interaction listeners
 * Call this once in your app initialization
 */
export function setupInteractionTracking(): void {
  if (interactionListenersAttached) return;
  interactionListenersAttached = true;

  const events = ['touchstart', 'touchend', 'mousedown', 'keydown', 'scroll'];
  
  const handleInteraction = () => {
    if (!hasUserInteracted) {
      hasUserInteracted = true;
      console.log('[UserInteraction] User interaction detected - autoplay enabled');
      // Remove listeners after first interaction
      events.forEach(event => {
        window.removeEventListener(event, handleInteraction, { capture: true, passive: true });
      });
    }
  };

  events.forEach(event => {
    window.addEventListener(event, handleInteraction, { capture: true, passive: true });
  });
}

