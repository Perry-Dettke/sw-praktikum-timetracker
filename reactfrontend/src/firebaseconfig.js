// Hier die Daten von Firebase einfügen

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBa-E8Q7ByWdPYcK04xat13Y2z-jc3vVZ4",
  authDomain: "timetracker-72c63.firebaseapp.com",
  projectId: "timetracker-72c63",
  storageBucket: "timetracker-72c63.appspot.com",
  messagingSenderId: "285158961633",
  appId: "1:285158961633:web:e2919982cf8c403bd922a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig;