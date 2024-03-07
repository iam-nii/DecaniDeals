// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:  import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "decanideals.firebaseapp.com",
  projectId: "decanideals",
  storageBucket: "decanideals.appspot.com",
  messagingSenderId: "900352013176",
  appId: "1:900352013176:web:64c493985631574575ce8d"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);