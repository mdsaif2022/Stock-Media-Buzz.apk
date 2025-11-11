import "./global.css";
import { createRoot } from "react-dom/client";
import App from "./App";

// Load Adsterra script (replace with actual Adsterra ID)
const loadAdsterraScript = () => {
  const script = document.createElement("script");
  script.src = "//adsterra.com/scripts/display.js";
  script.async = true;
  script.onload = () => {
    (window as any).adsterraScript?.init?.();
  };
  document.head.appendChild(script);
};

// Load Adsterra on app start
loadAdsterraScript();

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<App />);
}
