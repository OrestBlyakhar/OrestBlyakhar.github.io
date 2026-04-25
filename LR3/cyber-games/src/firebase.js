import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBA92fQMkKQB7_-nfHEHsFMUPgGPyrhubw",
  authDomain: "cyber-games-20499.firebaseapp.com",
  projectId: "cyber-games-20499",
  storageBucket: "cyber-games-20499.firebasestorage.app",
  messagingSenderId: "736314462481",
  appId: "1:736314462481:web:016afbe15d4a83d6f43cb0",
  measurementId: "G-5V4TKYGKBB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);