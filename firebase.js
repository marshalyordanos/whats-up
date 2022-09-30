// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUwio0XIiPMUsbvG_GG_Rgkjo75DRQLCA",
  authDomain: "message-app-63810.firebaseapp.com",
  projectId: "message-app-63810",
  storageBucket: "message-app-63810.appspot.com",
  messagingSenderId: "983087416624",
  appId: "1:983087416624:web:277aa9947c8ba388d4b4f5",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export { auth, db, provider };
