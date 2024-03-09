// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-blog-41868.firebaseapp.com",
    projectId: "mern-blog-41868",
    storageBucket: "mern-blog-41868.appspot.com",
    messagingSenderId: "972674145991",
    appId: "1:972674145991:web:bc7d66b50b94158172e8e2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);