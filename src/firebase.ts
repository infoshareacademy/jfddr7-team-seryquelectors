import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: "gogather-c6cdc.firebaseapp.com",
  // projectId: "gogather-c6cdc",
  // storageBucket: "gogather-c6cdc.appspot.com",
  // messagingSenderId: "990152753450",
  // appId: "1:990152753450:web:06133f8f1832359bf9de53",
  apiKey: "AIzaSyBKxHTMwYG8_DJxXcesAF6zRwHcea772H0",
  authDomain: "morningproject-d427d.firebaseapp.com",
  projectId: "morningproject-d427d",
  storageBucket: "morningproject-d427d.appspot.com",
  messagingSenderId: "640544320239",
  appId: "1:640544320239:web:0deeaeb7de06c2f849491a",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
