import { initializeApp } from "firebase/app";
import "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsV_BSnwAzPYG-K6JReFsjbBQAEyQiNh4",
  authDomain: "rntest-f0c40.firebaseapp.com",
  projectId: "rntest-f0c40",
  storageBucket: "rntest-f0c40.appspot.com",
  messagingSenderId: "564130301164",
  appId: "1:564130301164:web:342b95f646e0e3a02391c9",
};

// Initialize Firebase
const app = () => initializeApp(firebaseConfig);

export default app;
