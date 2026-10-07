import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Web app configuration for the codenexon-141cc Firebase project. These values identify
// the project to Firebase and are public by design; access is controlled by Firestore
// security rules, not by keeping them secret. Environment variables override them.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyD_U3dJRANKHDHC9cDAqQrf2oeejW8vwkk",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "codenexon-141cc.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "codenexon-141cc",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "codenexon-141cc.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "478767705081",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:478767705081:web:d1cd013d5aaa039e172b28",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-84JH7QEXBN",
};

// Initialize Firebase safely for Next.js SSR / Client
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Newsletter subscription helper. Reports failure honestly so the form never
// tells a visitor they are subscribed when the address was not saved.
export async function subscribeNewsletter(email: string) {
  try {
    const docRef = await addDoc(collection(db, "newsletter_subscribers"), {
      email: email.trim().toLowerCase(),
      subscribedAt: new Date().toISOString(),
      source: "website_newsletter_banner",
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.warn("Newsletter subscription could not be saved:", error);
    return { success: false };
  }
}
