
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCiz1L6UYidyt9kH_HHkiodBylwAXUn8z4",
  authDomain: "foodbusiness-5c989.firebaseapp.com",
  projectId: "foodbusiness-5c989",
  storageBucket: "foodbusiness-5c989.firebasestorage.app",
  messagingSenderId: "731165682284",
  appId: "1:731165682284:web:20e5926ddeee2b0c628649",
  measurementId: "G-NDJ5VMH9RV"
};



const firebaseApp=initializeApp(firebaseConfig);
const auth=getAuth(firebaseApp);
const db=getFirestore(firebaseApp);
export {auth,db};