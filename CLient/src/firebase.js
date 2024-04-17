import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "foodzie-bcbf4.firebaseapp.com",
    projectId: "foodzie-bcbf4",
    storageBucket: "foodzie-bcbf4.appspot.com",
    messagingSenderId: "497805468792",
    appId: "1:497805468792:web:5a348ac6de96db178af98d",
    measurementId: "G-V7ZXH364V4"
};

const app = initializeApp(firebaseConfig);
export default app;