import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDl49gRtXn0euJY4Ugnm0OBfBR-a2M0_wE",
  authDomain: "blogging-65d94.firebaseapp.com",
  projectId: "blogging-65d94",
  storageBucket: "blogging-65d94.appspot.com",
  messagingSenderId: "688472591843",
  appId: "1:688472591843:web:e7f9b0fff1281b28b5e4d6",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
