// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'stumart-8c877.firebaseapp.com',
  projectId: 'stumart-8c877',
  storageBucket: 'stumart-8c877.appspot.com',
  messagingSenderId: '89730360000',
  appId: '1:89730360000:web:10cfa2d63fb47e4727c325',
  measurementId: 'G-D55QR8YMRW',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
