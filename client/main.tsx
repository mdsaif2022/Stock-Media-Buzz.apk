import "./global.css";
import { createRoot } from "react-dom/client";
import App from "./App";
import { setupHistoryGuard } from "./utils/historyGuard";

// Load Adsterra script (replace with actual Adsterra ID)
const loadAdsterraScript = () => {
  try {
    const script = document.createElement("script");
    script.src = "//adsterra.com/scripts/display.js";
    script.async = true;
    script.onload = () => {
      (window as any).adsterraScript?.init?.();
    };
    script.onerror = () => {
      console.warn("Failed to load Adsterra script");
    };
    document.head.appendChild(script);
  } catch (error) {
    console.warn("Error loading Adsterra script:", error);
  }
};

// Load Adsterra on app start (non-blocking)
if (typeof window !== "undefined") {
  // Setup history guard FIRST to prevent duplicate URL entries
  setupHistoryGuard();
  // Suppress console warnings from ad iframes (not our code)
  // Set this up BEFORE loading Adsterra to catch early errors
  const originalWarn = console.warn;
  const originalError = console.error;
  
  console.warn = (...args: any[]) => {
    const message = args[0]?.toString() || '';
    const fullMessage = args.map(arg => String(arg)).join(' ').toLowerCase();
    
    // Ignore font preload warnings from ad networks
    if (message.includes('preload') && message.includes('was preloaded')) {
      return;
    }
    // Ignore Adsterra script warnings
    if (fullMessage.includes('adsterra') || fullMessage.includes('adsterra.com')) {
      return;
    }
    // Ignore ad network warnings
    if (fullMessage.includes('camterest.com') || fullMessage.includes('effectivegatecpm.com')) {
      return;
    }
    // Ignore autofocus blocking warnings
    if (fullMessage.includes('blocked autofocusing') || fullMessage.includes('autofocus')) {
      return;
    }
    originalWarn.apply(console, args);
  };
  
  // Suppress errors from ad networks and example URLs
  console.error = (...args: any[]) => {
    const message = args[0]?.toString() || '';
    const fullMessage = args.map(arg => String(arg)).join(' ').toLowerCase();
    
    // Ignore 403 Forbidden errors from ad networks
    if (fullMessage.includes('403') && (fullMessage.includes('camterest.com') || fullMessage.includes('forbidden'))) {
      return;
    }
    // Ignore autofocus blocking errors from ad network iframes (browser security feature)
    if (fullMessage.includes('blocked autofocusing') || 
        (fullMessage.includes('autofocus') && fullMessage.includes('cross-origin'))) {
      return;
    }
    // Ignore ERR_NAME_NOT_RESOLVED for example.com URLs (demo/placeholder data)
    if (fullMessage.includes('err_name_not_resolved') && fullMessage.includes('example.com')) {
      return;
    }
    // Ignore network errors for cloudinary.example.com (demo media)
    if (message.includes('cloudinary.example.com')) {
      return;
    }
    // Ignore Adsterra script loading errors
    if (fullMessage.includes('adsterra') || fullMessage.includes('adsterra.com')) {
      return;
    }
    // Ignore ad network errors (camterest, effectivegatecpm, etc.)
    if (fullMessage.includes('camterest.com') || fullMessage.includes('effectivegatecpm.com')) {
      return;
    }
    // Ignore Intervention messages about ads
    if (fullMessage.includes('[intervention]') && fullMessage.includes('ad was removed')) {
      return;
    }
    originalError.apply(console, args);
  };
  
  // Also suppress unhandled errors from ad networks
  window.addEventListener('error', (event) => {
    const message = event.message?.toLowerCase() || '';
    const source = event.filename?.toLowerCase() || '';
    
    // Suppress errors from ad networks
    if (message.includes('blocked autofocusing') || 
        message.includes('autofocus') ||
        source.includes('camterest.com') ||
        source.includes('effectivegatecpm.com') ||
        source.includes('adsterra.com')) {
      event.preventDefault();
      return false;
    }
  }, true);
  
  // Suppress unhandled promise rejections from ad networks
  window.addEventListener('unhandledrejection', (event) => {
    const reason = String(event.reason || '').toLowerCase();
    
    // Suppress rejections from ad networks
    if (reason.includes('camterest.com') || 
        reason.includes('effectivegatecpm.com') ||
        reason.includes('adsterra.com') ||
        reason.includes('blocked autofocusing')) {
      event.preventDefault();
    }
  });
  
  // Now load Adsterra after error suppression is set up
  loadAdsterraScript();
  
  // Also suppress fetch/network errors in console
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    try {
      return await originalFetch(...args);
    } catch (error: any) {
      // Suppress errors for example.com URLs
      let url = '';
      if (typeof args[0] === 'string') {
        url = args[0];
      } else if (args[0] instanceof Request) {
        url = args[0].url;
      } else if (args[0] instanceof URL) {
        url = args[0].href;
      }
      if (url.includes('example.com') || url.includes('cloudinary.example.com')) {
        // Return a rejected promise but don't log error
        return Promise.reject(new Error('Example URL - suppressed'));
      }
      throw error;
    }
  };
}

const root = document.getElementById("root");
if (root) {
  try {
    createRoot(root).render(<App />);
  } catch (error) {
    console.error("Failed to render app:", error);
    root.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h1>Error loading application</h1>
        <p>Please refresh the page or contact support.</p>
        <pre>${error instanceof Error ? error.message : String(error)}</pre>
      </div>
    `;
  }
} else {
  console.error("Root element not found");
}
