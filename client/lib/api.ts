import { Capacitor } from '@capacitor/core';

const normalizeBaseUrl = (url: string) => {
  if (!url) return "";
  return url.endsWith("/") ? url.slice(0, -1) : url;
};

// Determine API_BASE_URL dynamically at runtime (not module load time)
// This ensures it works correctly in native apps where Capacitor may not be initialized yet
const getApiBaseUrl = (): string => {
  // 1. Check if explicitly set in environment variable (from .env.production)
  // Vite replaces import.meta.env.VITE_* at build time
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) {
    console.log('[apiFetch] Using API URL from VITE_API_BASE_URL:', envUrl);
    return normalizeBaseUrl(envUrl);
  }

  // 2. Check if running in Capacitor native app
  if (typeof window !== 'undefined') {
    try {
      if (Capacitor.isNativePlatform()) {
        // In native app, use the backend URL from environment or fallback
        // For Android app, this MUST be set in .env.production during build
        const nativeBackendUrl = 'https://stock-mediabuzz-1.onrender.com';
        console.warn('[apiFetch] Running in native app. Using backend URL:', nativeBackendUrl);
        console.warn('[apiFetch] VITE_API_BASE_URL not found in build. Add it to .env.production before building.');
        return normalizeBaseUrl(nativeBackendUrl);
      }
    } catch (e) {
      // Capacitor might not be available, continue to next check
      console.warn('[apiFetch] Capacitor check failed:', e);
    }
  }

  // 3. Web browser - use same origin or environment URL
  if (typeof window !== 'undefined' && window.location.origin) {
    // In development, might be localhost, in production might be the website
    const origin = normalizeBaseUrl(window.location.origin);
    console.log('[apiFetch] Using API URL from window.location.origin:', origin);
    return origin;
  }

  // 4. Fallback (shouldn't happen)
  console.error('[apiFetch] Unable to determine API base URL!');
  return '';
};

// Don't compute at module load - compute at runtime in apiFetch
let cachedApiBaseUrl: string | null = null;

// Export function to get API base URL (for use in other components)
// Use this function when you need the API base URL at runtime
export const getApiBaseUrlValue = (): string => {
  if (cachedApiBaseUrl === null) {
    cachedApiBaseUrl = getApiBaseUrl();
  }
  return cachedApiBaseUrl;
};

// Export API_BASE_URL as a computed value (for backward compatibility)
// This is computed at runtime when first accessed via the function
// For direct access, use getApiBaseUrlValue() function instead
export { getApiBaseUrlValue as API_BASE_URL };

export const apiFetch = (path: string, options?: RequestInit) => {
  const targetPath = path.startsWith("/") ? path : `/${path}`;
  
  // Determine API base URL at runtime (not module load time)
  // This ensures it works correctly in all environments, especially native apps
  const API_BASE_URL = getApiBaseUrlValue();
  
  // Construct full URL
  let url: string;
  if (API_BASE_URL) {
    url = `${API_BASE_URL}${targetPath}`;
    
    // Always log in native apps for debugging
    if (typeof window !== 'undefined') {
      try {
        if (Capacitor.isNativePlatform()) {
          console.log(`[apiFetch] Native app API call: ${url}`);
        }
      } catch (e) {
        // Ignore Capacitor errors
      }
    }
  } else {
    // No API URL configured - this will likely fail
    console.error('[apiFetch] No API_BASE_URL configured!');
    console.error('[apiFetch] Set VITE_API_BASE_URL in .env.production before building');
    url = targetPath;
  }
  
  // Log the fetch request for debugging (always log in native apps)
  if (typeof window !== 'undefined') {
    try {
      if (Capacitor.isNativePlatform()) {
        console.log(`[apiFetch] Native app - Fetching: ${url}`);
      } else {
        console.log(`[apiFetch] Web - Fetching: ${url}`);
      }
    } catch (e) {
      // Ignore Capacitor errors
      console.log(`[apiFetch] Fetching: ${url}`);
    }
  }
  
  return fetch(url, options).catch((error) => {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[apiFetch] ❌ Fetch failed for ${url}`);
    console.error(`[apiFetch] Error:`, errorMessage);
    console.error(`[apiFetch] API_BASE_URL was: ${API_BASE_URL}`);
    console.error(`[apiFetch] Full URL was: ${url}`);
    
    // In native apps, provide more helpful error
    if (typeof window !== 'undefined') {
      try {
        if (Capacitor.isNativePlatform()) {
          console.error(`[apiFetch] 💡 TROUBLESHOOTING:`);
          console.error(`[apiFetch] 1. Check if VITE_API_BASE_URL is set in .env.production`);
          console.error(`[apiFetch] 2. Rebuild the app: pnpm build:android`);
          console.error(`[apiFetch] 3. Verify backend is running: ${API_BASE_URL}/api/ping`);
          console.error(`[apiFetch] 4. Check CORS settings on backend`);
        }
      } catch (e) {
        // Ignore
      }
    }
    
    throw error;
  });
};

