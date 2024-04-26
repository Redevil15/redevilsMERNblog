// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-66892.firebaseapp.com",
  projectId: "mern-blog-66892",
  storageBucket: "mern-blog-66892.appspot.com",
  messagingSenderId: "455854194266",
  appId: "1:455854194266:web:5f8dbca5f81b36d1a4e263"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);