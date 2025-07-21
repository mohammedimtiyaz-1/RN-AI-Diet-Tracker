// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { Platform } from "react-native";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-diet-tracker-c1c03.firebaseapp.com",
  projectId: "ai-diet-tracker-c1c03",
  storageBucket: "ai-diet-tracker-c1c03.firebasestorage.app",
  messagingSenderId: "949514868295",
  appId: "1:949514868295:web:5eb543700f0dbc53170362",
  measurementId: "G-5SCZN9TTFQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth =
  Platform.OS === "web"
    ? getAuth(app)
    : initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage),
      });
