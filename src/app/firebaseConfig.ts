import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAokzUuGqYXFc4YfJj66vC3aVPsQ7P2ixE",
  authDomain: "affitiudine.firebaseapp.com",
  projectId: "affitiudine",
  storageBucket: "affitiudine.firebasestorage.app",
  messagingSenderId: "211362755894",
  appId: "1:211362755894:web:d077df940d9cdfbbb5af97"
};

// Initialize Firebase
const appFirebase = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication and get a reference to the service
const authFirebase = getAuth(appFirebase);

export { appFirebase, authFirebase, GoogleAuthProvider, signInWithPopup, signOut };