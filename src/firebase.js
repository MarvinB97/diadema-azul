// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaDhY8HIAuyqpLDTc3mvioCwVMLj7ozAw",
  authDomain: "diadema-azul.firebaseapp.com",
  projectId: "diadema-azul",
  storageBucket: "diadema-azul.appspot.com",
  messagingSenderId: "1039022247527",
  appId: "1:1039022247527:web:096adc8f4aa2741c33cec2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);