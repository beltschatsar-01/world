// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "world-estate-51348.firebaseapp.com",
  projectId: "world-estate-51348",
  storageBucket: "world-estate-51348.appspot.com",
  messagingSenderId: "409716054767",
  appId: "1:409716054767:web:6b50df082110dd1c4e591a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
console.log('f');
