/**
 * Global Video Manager
 * Ensures only one video plays at a time across all VideoCard components
 */

let activeVideoId: string | null = null;
const videoInstances = new Map<string, () => void>();

/**
 * Register a video instance with pause callback
 */
export function registerVideo(id: string, pauseCallback: () => void) {
  videoInstances.set(id, pauseCallback);
}

/**
 * Unregister a video instance
 */
export function unregisterVideo(id: string) {
  videoInstances.delete(id);
  if (activeVideoId === id) {
    activeVideoId = null;
  }
}

/**
 * Activate a video (pause all others first)
 */
export function activateVideo(id: string) {
  // If same video is already active, do nothing
  if (activeVideoId === id) return;
  
  // Pause currently active video
  if (activeVideoId) {
    const pauseCallback = videoInstances.get(activeVideoId);
    if (pauseCallback) {
      pauseCallback();
    }
  }
  
  // Set new active video
  activeVideoId = id;
}

/**
 * Deactivate a video (only if it's the active one)
 */
export function deactivateVideo(id: string) {
  if (activeVideoId === id) {
    activeVideoId = null;
  }
}

/**
 * Check if a video is currently active
 */
export function isVideoActive(id: string): boolean {
  return activeVideoId === id;
}

/**
 * Pause all videos
 */
export function pauseAllVideos() {
  videoInstances.forEach((pauseCallback) => {
    pauseCallback();
  });
  activeVideoId = null;
}

