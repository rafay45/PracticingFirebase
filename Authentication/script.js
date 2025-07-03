import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBqnr4-p-Eo8nmz-napE-CYlLS6GhvPapk",
    authDomain: "authentication-5d8cc.firebaseapp.com",
    projectId: "authentication-5d8cc",
    storageBucket: "authentication-5d8cc.firebasestorage.app",
    messagingSenderId: "476938309467",
    appId: "1:476938309467:web:b196236c7ed085aecc547e",
    measurementId: "G-S7LH63JXJS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");