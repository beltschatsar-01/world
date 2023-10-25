// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBAS_API_KEY ,
  authDomain: "world-estate-9e0af.firebaseapp.com",
  projectId: "world-estate-9e0af",
  storageBucket: "world-estate-9e0af.appspot.com",
  messagingSenderId: "428898071706",
  appId: "1:428898071706:web:e2b9d1e58a200fa4dc5b23"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);