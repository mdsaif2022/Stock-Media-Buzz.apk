const normalizeBaseUrl = (url: string) => {
  if (!url) return "";
  return url.endsWith("/") ? url.slice(0, -1) : url;
};

// Get API base URL from environment variable
// For native apps, this should be set in .env.production and included in build
export const API_BASE_URL = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL || "");

export const apiFetch = (path: string, options?: RequestInit) => {
  const targetPath = path.startsWith("/") ? path : `/${path}`;
  
  // In native app, if API_BASE_URL is set, use it
  // Otherwise, try to construct from current origin (won't work in native app)
  let url: string;
  if (API_BASE_URL) {
    // Use configured API URL (from .env.production)
    url = `${API_BASE_URL}${targetPath}`;
  } else if (typeof window !== 'undefined' && window.location.origin) {
    // Fallback to same origin (web browser only)
    url = `${window.location.origin}${targetPath}`;
  } else {
    // Native app without API_BASE_URL - this will fail
    console.warn('[apiFetch] No API_BASE_URL configured! Set VITE_API_BASE_URL in .env.production');
    url = targetPath;
  }
  
  return fetch(url, options);
};

