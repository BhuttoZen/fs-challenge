import firebase from 'firebase/compat/app';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC6kf49zPsCbAoTOTJnXAcmdOwnPL6Sjr4",
    authDomain: "fs-challenge-1ce40.firebaseapp.com",
    projectId: "fs-challenge-1ce40",
    storageBucket: "fs-challenge-1ce40.appspot.com",
    messagingSenderId: "715895671752",
    appId: "1:715895671752:web:e079b526fd436817cb0efd",
    measurementId: "G-ZTDZXDC5EN"
  };
  
  // Initialize Firebase
  export const app = firebase.initializeApp(firebaseConfig);