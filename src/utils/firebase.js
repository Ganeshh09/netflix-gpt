// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByo8TWHcVMuNw6T_yc8TIpL5yFUeCO16Y",
  authDomain: "netflixgpt-5ce1d.firebaseapp.com",
  projectId: "netflixgpt-5ce1d",
  storageBucket: "netflixgpt-5ce1d.firebasestorage.app",
  messagingSenderId: "217135984224",
  appId: "1:217135984224:web:0906a0cd1637b206d8dd05",
  measurementId: "G-ML94P2N47S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();