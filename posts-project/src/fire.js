

// Your web app's Firebase configuration

// fire.js
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBPP7Z-gOc0g7VInhomTkUTCcxMUBkla4U",
    authDomain: "posts-project-84627.firebaseapp.com",
    projectId: "posts-project-84627",
    storageBucket: "posts-project-84627.appspot.com",
    messagingSenderId: "1002644922931",
    appId: "1:1002644922931:web:490a6507fdaf6cd6f9f946"
};
try {
    firebase.initializeApp(firebaseConfig);
} catch (err) {
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack);
    }
}
const fire = firebase;
export default fire;

