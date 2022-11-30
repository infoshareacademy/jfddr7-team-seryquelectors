import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "gogather-c6cdc.firebaseapp.com",
  projectId: "gogather-c6cdc",
  storageBucket: "gogather-c6cdc.appspot.com",
  messagingSenderId: "990152753450",
  appId: "1:990152753450:web:06133f8f1832359bf9de53",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
