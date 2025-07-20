import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAokzUuGqYXFc4YfJj66vC3aVPsQ7P2ixE",
  authDomain: "affitiudine.firebaseapp.com",
  projectId: "affitiudine",
  storageBucket: "affitiudine.firebasestorage.app",
  messagingSenderId: "211362755894",
  appId: "1:211362755894:web:d077df940d9cdfbbb5af97"
};

// Initialize Firebase
export const appFirebase = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const authFirebase = getAuth(appFirebase);