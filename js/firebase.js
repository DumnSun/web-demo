// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWc_peSub4npDGLM4a_kU5DLgmKX4TXIE",
  authDomain: "john-graphics-website.firebaseapp.com",
  projectId: "john-graphics-website",
  storageBucket: "john-graphics-website.firebasestorage.app",
  messagingSenderId: "485213012297",
  appId: "1:485213012297:web:09445fb7679b26a0d71a98",
  measurementId: "G-YFZL0WE8DP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);