// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBme7CdOSIoGpRDxR5gAw6Ditwwcs9qkAg",
  authDomain: "console-fun.firebaseapp.com",
  projectId: "console-fun",
  storageBucket: "console-fun.appspot.com",
  messagingSenderId: "946664969864",
  appId: "1:946664969864:web:690de51f2831efb2b3713d"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

export {db}