import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

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
const signupUsername = document.getElementById("signup-username");
const signupFormEmail = document.getElementById("signup-email");
const signupFormPassword = document.getElementById("signup-password");
const loginFormEmail = document.getElementById("login-email");
const loginFormPassword = document.getElementById("login-password");
const alert = document.getElementById("alert");

if(signupForm){
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const signupEmail = signupFormEmail.value;
        const signupPassword = signupFormPassword.value;
        const userName = signupUsername.value;
    
        createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
            .then((userCredential) => {
               
                window.location.href = "login.html"
    
            })
            .catch((error) => {
                console.log("Error is signup listner" , error);
                
                // ..
            });
    
    })
}



