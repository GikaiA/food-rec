// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPJpCNuCr8zMRdVDCEO0auCJKjoggeiGo",
  authDomain: "food-55ec2.firebaseapp.com",
  projectId: "food-55ec2",
  storageBucket: "food-55ec2.firebasestorage.app",
  messagingSenderId: "839994028655",
  appId: "1:839994028655:web:9676f702376973eb29939a",
  measurementId: "G-CXK568R939"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

