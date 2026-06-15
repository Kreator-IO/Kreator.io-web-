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
  apiKey: "AIzaSyAy8hjvZZp-flIXMOlWgwxap6FTIrhNmpI",
  authDomain: "vexquorai-97e83.firebaseapp.com",
  projectId: "vexquorai-97e83",
  storageBucket: "vexquorai-97e83.firebasestorage.app",
  messagingSenderId: "332423666194",
  appId: "1:332423666194:web:978169b2a8eb0082f756cb",
  measurementId: "G-4TBYT4CQGZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Firestore collections
export const projectsCollection = collection(db, 'projects');
export const tasksCollection = collection(db, 'tasks');
export const messagesCollection = collection(db, 'messages');
export const notificationsCollection = collection(db, 'notifications');

async function addData(collectionName, data) {
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

export { app, analytics, auth, db, addData };
