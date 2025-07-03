import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

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
const signupFormEmail = document.getElementById("signup-email");
const signupFormPassword = document.getElementById("signup-password");
const loginFormEmail = document.getElementById("login-email");
const loginFormPassword = document.getElementById("login-password");
const para = document.querySelector('.para')
let text = document.getElementById("h2");

const log = document.getElementById('log');
const logout = document.getElementById('logout')

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const signupEmail = signupFormEmail.value;
        const signupPassword = signupFormPassword.value;

        createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
            .then((userCredential) => {

                window.location.href = "login.html"

            })
            .catch((error) => {
                console.log(error.message);
            });

    })
}

if (log) {
    log.addEventListener('click', (e) => {
        e.preventDefault()
        window.location.href = "login.html"
    })
}

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const loginEmail = loginFormEmail.value;
        const loginPassword = loginFormPassword.value;

        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            .then((userCredential) => {

                window.location.href = "home.html"
                console.log(userCredential.user);

            })
            .catch((error) => {
                console.log(error.message);
            });
    })

}

onAuthStateChanged(auth, (user) => {
    if (user) {
        para.textContent = user.email
        text.textContent = `Log In SuccessFul `
    } else {
        console.log("User is logged out");
    }
});

if (logout) {
    logout.addEventListener('click', () => {
        signOut(auth).then(() => {
            window.location.href = "index.html"
        }).catch((error) => {
            console.log(error.message);

        });
    })
}


