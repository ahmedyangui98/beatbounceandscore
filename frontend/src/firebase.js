// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFxijAY3GWQzdf_JiFJUO2vzhAYkyfHCM",
  authDomain: "beatbounceandscore.firebaseapp.com",
  projectId: "beatbounceandscore",
  storageBucket: "beatbounceandscore.appspot.com",
  messagingSenderId: "835810414015",
  appId: "1:835810414015:web:4f70baffce68f4696ea50a",
  measurementId: "G-740SECVD5V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);