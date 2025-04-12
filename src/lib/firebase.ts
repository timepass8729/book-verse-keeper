
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBD3RvrU8dNgboGffodkakFiGf_iJN3m78",
  authDomain: "bookmanagement-99402.firebaseapp.com",
  projectId: "bookmanagement-99402",
  storageBucket: "bookmanagement-99402.firebasestorage.app",
  messagingSenderId: "232407882114",
  appId: "1:232407882114:web:77daa9871e0f5c03a8179b",
  measurementId: "G-W95DH95DYM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
