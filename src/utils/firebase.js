// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5dOsMf_QONcqu9MCcBUNFB01qo2iQ2Mc",
  authDomain: "netf-da307.firebaseapp.com",
  projectId: "netf-da307",
  storageBucket: "netf-da307.firebasestorage.app",
  messagingSenderId: "857693427624",
  appId: "1:857693427624:web:fbf67bf3ae2e1ec8c56f9d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();