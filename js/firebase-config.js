// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPgIKdCcvjWAYHt34q3L1HTZn282G9fv0",
  authDomain: "globalmind-db762.firebaseapp.com",
  projectId: "globalmind-db762",
  storageBucket: "globalmind-db762.firebasestorage.app",
  messagingSenderId: "1014902071750",
  appId: "1:1014902071750:web:21e47d4e566d5d5f8492c7",
  measurementId: "G-NN7WX72Y9L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };