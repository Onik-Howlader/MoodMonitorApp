// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZM9apJqzUPGWngkilWsNEPuw9W9H29rg",
  authDomain: "moodmonitorapp.firebaseapp.com",
  projectId: "moodmonitorapp",
  storageBucket: "moodmonitorapp.firebasestorage.app",
  messagingSenderId: "133159713220",
  appId: "1:133159713220:web:127370de05bc4397d18c91",
  measurementId: "G-QGT7FKFXFZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };