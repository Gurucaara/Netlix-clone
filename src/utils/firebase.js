// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1ajXKXwRBcvVlNkQhb3rWTvu12VgYkBo",
  authDomain: "netflixgpt-9018e.firebaseapp.com",
  projectId: "netflixgpt-9018e",
  storageBucket: "netflixgpt-9018e.appspot.com",
  messagingSenderId: "925231890203",
  appId: "1:925231890203:web:151df817e7363728b29dbe",
  measurementId: "G-QSNY7N15BR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
