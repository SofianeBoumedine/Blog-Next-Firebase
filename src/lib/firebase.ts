// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// import firebase from 'firebase/compat';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAdJp-sqj9xaAmRxGPMt5JSlMAtH-MgqvQ",
    authDomain: "firebasics-46dc4.firebaseapp.com",
    projectId: "firebasics-46dc4",
    storageBucket: "firebasics-46dc4.appspot.com",
    messagingSenderId: "938716391179",
    appId: "1:938716391179:web:f9c3f24754240c0e73640e",
    measurementId: "G-TTC6R5BEQY"
};
let app;
if(!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig)
    // Initialize Firebase
}

export const auth = getAuth(app);
export const Otherauth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const storage = firebase.storage();
export const increment = firebase.firestore.FieldValue.increment;
