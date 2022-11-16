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
  apiKey: "AIzaSyC9J_vK1BkegkgVsJQaor783p8RFnVx_Qo",
  authDomain: "homework-32847.firebaseapp.com",
  projectId: "homework-32847",
  storageBucket: "homework-32847.appspot.com",
  messagingSenderId: "589892572340",
  appId: "1:589892572340:web:8d909a07ed39627aafb3e1",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
