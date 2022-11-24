import { initializeApp } from "firebase/app"
import { getFirestore } from "@firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBmcjL-w72Ixulg2YjmTl3f63yPzi3rlpM",
    authDomain: "patient-portal-950da.firebaseapp.com",
    databaseURL: "https://patient-portal-950da-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "patient-portal-950da",
    storageBucket: "patient-portal-950da.appspot.com",
    messagingSenderId: "980284456038",
    appId: "1:980284456038:web:8680c2505d12f21360c1a7",
    measurementId: "G-W2NPL2TG05"
};
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

export const auth = getAuth(app)