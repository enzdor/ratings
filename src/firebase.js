import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBx_KfEJKeKqmQVYVKZXpky0zqNBLtr6io",
  authDomain: "ratings-463f8.firebaseapp.com",
  projectId: "ratings-463f8",
  storageBucket: "ratings-463f8.appspot.com",
  messagingSenderId: "181635086117",
  appId: "1:181635086117:web:2a4a9b56d21c82449e0ccc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
