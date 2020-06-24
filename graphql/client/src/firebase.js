import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyA_335WKIoFMBaSx1tAAUzQd7-M_ZN1JF0",
    authDomain: "social-media60.firebaseapp.com",
    // databaseURL: "https://social-media60.firebaseio.com",
    projectId: "social-media60",
    storageBucket: "social-media60.appspot.com",
    // messagingSenderId: "686855079081",
    appId: "1:686855079081:web:f8139c4ec7a717687e55b8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();