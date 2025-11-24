/**
 * Safe Navigation Hook
 * 
 * Wraps React Router's useNavigate to ensure proper history management
 * and prevent redirect loops.
 */

import { useNavigate as useReactRouterNavigate, useLocation } from 'react-router-dom';
import { setProgrammaticNavigation } from '@/utils/historyGuard';
import { useEffect, useRef } from 'react';

/**
 * Safe version of React Router's useNavigate
 * Automatically marks navigation as programmatic to prevent interference with back button
 */
export function useSafeNavigate() {
  const navigate = useReactRouterNavigate();
  const location = useLocation();
  const lastPathRef = useRef(location.pathname + location.search + location.hash);

  // Track location changes to detect programmatic navigation
  useEffect(() => {
    const currentPath = location.pathname + location.search + location.hash;
    if (currentPath !== lastPathRef.current) {
      // Path changed - this is programmatic navigation
      setProgrammaticNavigation(true);
      lastPathRef.current = currentPath;
    }
  }, [location]);

  // Wrapped navigate function that marks navigation as programmatic
  const safeNavigate = (
    to: string | number,
    options?: { replace?: boolean; state?: any }
  ) => {
    // Mark as programmatic navigation before navigating
    setProgrammaticNavigation(true);
    
    if (typeof to === 'number') {
      // For history.go(), history.back(), etc.
      navigate(to);
    } else {
      // Check if we're already on the target URL to prevent loops
      const currentPath = location.pathname + location.search + location.hash;
      const targetPath = to.split('?')[0].split('#')[0]; // Get pathname only
      
      if (currentPath === targetPath && !options?.replace) {
        // Already on target, skip navigation
        console.warn('[SafeNavigate] Already on target URL, skipping:', to);
        return;
      }
      
      navigate(to, options);
    }
  };

  return safeNavigate;
}

