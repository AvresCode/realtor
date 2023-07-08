// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBMscCZnMiz_ffW1uxZ23dx016ATgAfCow',
  authDomain: 'realtor-udem.firebaseapp.com',
  projectId: 'realtor-udem',
  storageBucket: 'realtor-udem.appspot.com',
  messagingSenderId: '195807720297',
  appId: '1:195807720297:web:12620f72c5b6a8a3bfc3f8',
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
// export const db = getFirestore(app);
export const db = getFirestore();
