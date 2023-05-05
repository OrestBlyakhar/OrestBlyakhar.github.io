// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3GClPj0I_6U_s_CiwQmb3YbW0wHs6bgs",
  authDomain: "resume-e9a26.firebaseapp.com",
  projectId: "resume-e9a26",
  storageBucket: "resume-e9a26.appspot.com",
  messagingSenderId: "119579651647",
  appId: "1:119579651647:web:62f307f33aae483904d28a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);