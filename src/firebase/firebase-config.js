import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyDY2PR6k9-iTcCwKcBNqpNnzVC6zMtIjuc",
    authDomain: "clinic-auth-970eb.firebaseapp.com",
    projectId: "clinic-auth-970eb",
    storageBucket: "clinic-auth-970eb.appspot.com",
    messagingSenderId: "516478523364",
    appId: "1:516478523364:web:d4939638db555476ebd9f1",
    measurementId: "G-CT7ENYSS4F"
  };
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider =new GoogleAuthProvider();
export {auth, provider}