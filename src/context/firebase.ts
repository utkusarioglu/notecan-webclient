import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const CONFIG = {
    apiKey: "AIzaSyA18e8yueckdfjqJ13Y3zRQnN143ANkf6c",
    authDomain: "notecan.firebaseapp.com",
    databaseURL: "https://notecan.firebaseio.com",
    projectId: "notecan",
    storageBucket: "notecan.appspot.com",
    messagingSenderId: "1047721142749",
    appId: "1:1047721142749:web:48999d06a703db18e02e34",
    measurementId: "G-HVQH4XMKTP"
  };

const Firebase = firebase.initializeApp(CONFIG)

export const Auth = Firebase.auth();
export const Firestore = Firebase.firestore();