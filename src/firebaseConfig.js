import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2KjXXxqajUwotsu5D1IboLa12cu4VIfo",
  authDomain: "chat-room-ed095.firebaseapp.com",
  projectId: "chat-room-ed095",
  storageBucket: "chat-room-ed095.appspot.com",
  messagingSenderId: "906184367212",
  appId: "1:906184367212:web:f5f2f521c478900a04cc49",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);
