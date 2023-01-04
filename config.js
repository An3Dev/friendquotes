import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxMGfVv1mkz_SAD2TzKd96CAaCYi_uxM8",
  authDomain: "an3apps-friendquotes.firebaseapp.com",
  projectId: "an3apps-friendquotes",
  storageBucket: "an3apps-friendquotes.appspot.com",
  messagingSenderId: "445511981378",
  appId: "1:445511981378:web:a3e674ed047ccd55d5d0db",
  measurementId: "G-XKD6Y2ZYFP"
};

// if this firebase project has initialized apps
if (!firebase.apps.length)
{
    firebase.initializeApp(firebaseConfig)
}
export { firebase };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);