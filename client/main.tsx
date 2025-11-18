import "./global.css";
import { createRoot } from "react-dom/client";
import App from "./App";

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
  loadAdsterraScript();
  
  // Suppress console warnings from ad iframes (not our code)
  const originalWarn = console.warn;
  const originalError = console.error;
  
  console.warn = (...args: any[]) => {
    const message = args[0]?.toString() || '';
    // Ignore font preload warnings from ad networks
    if (message.includes('preload') && message.includes('was preloaded')) {
      return;
    }
    originalWarn.apply(console, args);
  };
  
  // Suppress 403 errors from ad network APIs (camterest.com, etc.)
  console.error = (...args: any[]) => {
    const message = args[0]?.toString() || '';
    // Ignore 403 Forbidden errors from ad networks
    if (message.includes('403') && (message.includes('camterest.com') || message.includes('Forbidden'))) {
      return;
    }
    originalError.apply(console, args);
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
