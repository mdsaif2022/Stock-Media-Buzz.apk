/**
 * BackButtonHandler Component
 * 
 * Handles native Android/iOS back button in Capacitor apps
 * Must be rendered inside BrowserRouter context to use useNavigate hook
 */

import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { App as CapacitorApp } from '@capacitor/app';

export default function BackButtonHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPathRef = useRef<string>(location.pathname);
  const initialPathRef = useRef<string | null>(null);
  const hasNavigatedRef = useRef<boolean>(false);

  // Track current path in a ref so it's always up-to-date in the handler
  useEffect(() => {
    currentPathRef.current = location.pathname;
    
    if (initialPathRef.current === null) {
      initialPathRef.current = location.pathname;
    }
    
    // Mark that we've navigated if we're not on the initial path
    if (location.pathname !== initialPathRef.current) {
      hasNavigatedRef.current = true;
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[BackButtonHandler] Location changed', {
        currentPath: location.pathname,
        initialPath: initialPathRef.current,
        hasNavigated: hasNavigatedRef.current,
      });
    }
  }, [location.pathname]);

  useEffect(() => {
    // Only register listener if Capacitor is available (native app)
    if (typeof window !== 'undefined' && (window as any).Capacitor) {
      const handleBackButton = () => {
        // Use ref to get current path (always up-to-date)
        const currentPath = currentPathRef.current;
        const isAtRoot = currentPath === '/';
        
        // We can navigate back if we're not at root path
        // Simple check: if not at root, we can go back
        const canNavigateBack = !isAtRoot;
        
        if (process.env.NODE_ENV === 'development') {
          console.log('[BackButtonHandler] Back button pressed', {
            currentPath,
            isAtRoot,
            hasNavigated: hasNavigatedRef.current,
            canNavigateBack,
          });
        }
        
        if (canNavigateBack) {
          // Use React Router's navigate to go back
          navigate(-1);
        } else {
          // Exit app if at root
          if (process.env.NODE_ENV === 'development') {
            console.log('[BackButtonHandler] At root - exiting app');
          }
          CapacitorApp.exitApp();
        }
      };

      const listener = CapacitorApp.addListener('backButton', handleBackButton);

      if (process.env.NODE_ENV === 'development') {
        console.log('[BackButtonHandler] ✅ Capacitor back button listener registered', {
          currentPath: currentPathRef.current,
        });
      }

      return () => {
        listener.remove();
        if (process.env.NODE_ENV === 'development') {
          console.log('[BackButtonHandler] 🗑️ Capacitor back button listener removed');
        }
      };
    }
  }, [navigate]);

  // This component doesn't render anything
  return null;
}
