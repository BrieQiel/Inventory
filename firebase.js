import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyAK9MKAOJUbfcaclwmpGlpcujcDcG0X5Uw",
    authDomain: "inventory-authentication-768d1.firebaseapp.com",
    projectId: "inventory-authentication-768d1",
    storageBucket: "inventory-authentication-768d1.appspot.com",
    messagingSenderId: "708861334931",
    appId: "1:708861334931:web:6cfca631de4748b0990466",
    measurementId: "G-6RHNQHDQ85"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);