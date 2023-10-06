// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHKCEF7u26SX9Pb37SEZeikO7Cln38iqg",
  authDomain: "full-stack-mern-auth.firebaseapp.com",
  projectId: "full-stack-mern-auth",
  storageBucket: "full-stack-mern-auth.appspot.com",
  messagingSenderId: "1013545027728",
  appId: "1:1013545027728:web:5d5b071d6011f3e77d7015"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);