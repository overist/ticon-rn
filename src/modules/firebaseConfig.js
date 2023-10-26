import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsV_BSnwAzPYG-K6JReFsjbBQAEyQiNh4",
  authDomain: "rntest-f0c40.firebaseapp.com",
  projectId: "rntest-f0c40",
  storageBucket: "rntest-f0c40.appspot.com",
  messagingSenderId: "564130301164",
  appId: "1:564130301164:web:342b95f646e0e3a02391c9",
  measurementId: "G-EVKCPVSG13",
};

const app = initializeApp(firebaseConfig);

const myReactNativeLocalPersistence = getReactNativePersistence({
  getItem(...args) {
    // Called inline to avoid deprecation warnings on startup.
    return AsyncStorage.getItem(...args);
  },
  setItem(...args) {
    // Called inline to avoid deprecation warnings on startup.
    return AsyncStorage.setItem(...args);
  },
  removeItem(...args) {
    // Called inline to avoid deprecation warnings on startup.
    return AsyncStorage.removeItem(...args);
  },
});

// Function to initialize and return the auth instance
export function getAuthInstance() {
  return initializeAuth(app, {
    persistence: myReactNativeLocalPersistence,
  });
}
