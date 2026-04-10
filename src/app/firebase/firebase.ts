// src/app/firebase/firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgCG9VnBif4QlASin57AltNOHToT6x7nU",
  authDomain: "flatfinder-9ebd0.firebaseapp.com",
  projectId: "flatfinder-9ebd0",
  storageBucket: "flatfinder-9ebd0.firebasestorage.app",
  messagingSenderId: "317371018836",
  appId: "1:317371018836:web:853b69149298b2058ac7c1",
  measurementId: "G-RX8M7DDJYD"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth, analytics };
export default app;   // opcional, mas útil em alguns casos