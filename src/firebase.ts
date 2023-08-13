import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const {
   VITE_FIREBASE_API_KEY,
   VITE_FIREBASE_APP_ID,
   VITE_FIREBASE_AUTH_DOMAIN2,
   VITE_FIREBASE_MESSAGING_SENDER_ID,
   VITE_FIREBASE_PROJECT_ID,
   VITE_FIREBASE_STORAGE_BUCKET,
} = import.meta.env

const firebaseConfig = {
   apiKey: VITE_FIREBASE_API_KEY,
   authDomain: VITE_FIREBASE_AUTH_DOMAIN2,
   projectId: VITE_FIREBASE_PROJECT_ID,
   storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
   appId: VITE_FIREBASE_APP_ID,
}

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseDatabase = getFirestore(firebaseApp)
