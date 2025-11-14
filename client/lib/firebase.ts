// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBU80OBWXjtynAXMTvRK_rrDpfCPxd918",
  authDomain: "stock-media-bb8cd.firebaseapp.com",
  projectId: "stock-media-bb8cd",
  storageBucket: "stock-media-bb8cd.firebasestorage.app",
  messagingSenderId: "113681560607",
  appId: "1:113681560607:web:39e9310b2764305727512a",
  measurementId: "G-60JKS04FTK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Analytics - disabled for now to avoid initialization issues
// Can be enabled later if needed
export const analytics = null;

export default app;

