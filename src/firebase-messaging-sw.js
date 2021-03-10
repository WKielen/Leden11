importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyBrkqBOtSElrG76AIjsaHe9SrmZA_0gjrY",
  authDomain: "ttvn-app.firebaseapp.com",
  databaseURL: "https://ttvn-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ttvn-app",
  storageBucket: "ttvn-app.appspot.com",
  messagingSenderId: "953979335612",
  appId: "1:953979335612:web:7cdfc82b92decee36231b9",
  measurementId: "G-FKPQBQ8CTR"
});

const messaging = firebase.messaging();
