import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

let form = document.getElementById('registration-form').value;
let countries = document.getElementById('countries').value;
let cities = document.getElementById('cities').value;
let courses = document.getElementById('countries').value;
let proficiency = document.getElementById('proficiency').value;
let fullName = document.getElementById('full-name').value;
let fatherName = document.getElementById('father-name').value;
let email = document.getElementById('email').value;
let phone = document.getElementById('phone').value;
let cnic = document.getElementById('cnic').value;
let fatherCnic = document.getElementById('fatherCnic').value;
let date = document.getElementById('date').value;
let gender = document.getElementById('gender').value;
let address = document.getElementById('address').value;
let qualification = document.getElementById('qualification').value;
let ques = document.getElementById('ques').value;

const firebaseConfig = {
  apiKey: "AIzaSyDCmifs89jRdGoZgoke8URa9tibVuEQGBk",
  authDomain: "saylani-s-registration-form.firebaseapp.com",
  projectId: "saylani-s-registration-form",
  storageBucket: "saylani-s-registration-form.firebasestorage.app",
  messagingSenderId: "1078821106443",
  appId: "1:1078821106443:web:e081c3909ca989ee1b680e",
  measurementId: "G-2ZYV5Z538W"
};

const app = initializeApp(firebaseConfig)

const getStore = getFirestore(app)

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  try {
    await addDoc(collection(getStore, "users"), {
      countries,
      cities,
      courses,
      proficiency,
      cnic,
      fatherCnic,
      date,
      qualification,
      ques,
      fullName,
      fatherName,
      email,
      phone,
      gender,
      address
    })
  } catch (error) {
    console.log("Error is getStore :: ", error);

  }
})




