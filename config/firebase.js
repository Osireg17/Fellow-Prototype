// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { initializeFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGvMhFPwedcFA4xhY3gECeQHIQq7VxDaQ",
  authDomain: "fellow-database-1.firebaseapp.com",
  projectId: "fellow-database-1",
  storageBucket: "fellow-database-1.appspot.com",
  messagingSenderId: "96165196004",
  appId: "1:96165196004:web:ac291cfd9c4d9cf4cffcf1",
  measurementId: "G-X43V8CTSSR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// export const database = getFirestore();
const database = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  ignoreUndefinedProperties: true,
});
const storage = getStorage();

export { auth, database, storage }