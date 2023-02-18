import firebase from "firebase/compat/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyC-Tsl65inGzyhLWLZk_EzhaUkMuaIflK8",
    authDomain: "nextfire-6760b.firebaseapp.com",
    projectId: "nextfire-6760b",
    storageBucket: "nextfire-6760b.appspot.com",
    messagingSenderId: "484104357806",
    appId: "1:484104357806:web:ce4410be185846b5df6a3f",
    measurementId: "G-1MMWX99MR3"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();