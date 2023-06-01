import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDvvMmAUGHYmAOTkdY0acXwlZi1YO7RNvw",
  authDomain: "movielist-2883f.firebaseapp.com",
  projectId: "movielist-2883f",
  storageBucket: "movielist-2883f.appspot.com",
  messagingSenderId: "558056391267",
  appId: "1:558056391267:web:82ed91c117f9c706da6e56",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
