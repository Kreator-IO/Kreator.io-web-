// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWuUM6h6d8o5xe7Rm1oPf_HgidrGmBl2c",
  authDomain: "frontend-auth-706b8.firebaseapp.com",
  projectId: "frontend-auth-706b8",
  storageBucket: "frontend-auth-706b8.firebasestorage.app",
  messagingSenderId: "838972744378",
  appId: "1:838972744378:web:4a7a2f8361cc6d08ca5883",
  measurementId: "G-4GBWBSCCT5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

async function addData(collectionName, data) {
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

export { app, analytics, auth, db, addData };
