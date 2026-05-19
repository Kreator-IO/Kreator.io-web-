// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";

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
