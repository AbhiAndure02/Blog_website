// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-here.firebaseapp.com",
  projectId: "blog-here",
  storageBucket: "blog-here.appspot.com",
  messagingSenderId: "327549937339",
  appId: "1:327549937339:web:2f4e391de941d4024b2b9e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
