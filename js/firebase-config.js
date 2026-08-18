/**
 * MAA ENTERPRISES - FIREBASE V10+ MODULAR CONFIGURATION
 * Strict Modular SDK implementation using official CDN ESM imports.
 * Replace the placeholder firebaseConfig with your actual project credentials.
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
  getFirestore, 
  collection, 
  doc, 
  addDoc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Firebase Configuration Placeholder
// REPLACE WITH YOUR FIREBASE PROJECT SETTINGS
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY_HERE",
  authDomain: "maa-enterprises-services.firebaseapp.com",
  projectId: "maa-enterprises-services",
  storageBucket: "maa-enterprises-services.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
const auth = getAuth(app);
const db = getFirestore(app);

// Export instances and modular methods
export {
  app,
  auth,
  db,
  // Auth Functions
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  // Firestore Functions
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp
};
