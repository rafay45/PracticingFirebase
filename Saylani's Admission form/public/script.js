import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

let form = document.getElementById('registration-form');
let countries = document.getElementById('countries');
let cities = document.getElementById('cities');
let courses = document.getElementById('courses');
let proficiency = document.getElementById('proficiency');
let fullName = document.getElementById('full-name');
let fatherName = document.getElementById('father-name');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let cnic = document.getElementById('cnic');
let fatherCnic = document.getElementById('fatherCnic');
let date = document.getElementById('date');
let gender = document.getElementById('gender');
let address = document.getElementById('address');
let qualification = document.getElementById('qualification');
let ques = document.getElementById('ques');
let addData = document.getElementById('addData')

countries.addEventListener('change', () => {
  if (countries.value === "Turkey") {
    cities.innerHTML = `
    <option disabled selected>Select city</option>
                        <option value="Istanbul">Istanbul</option>
    `
  } else {
    cities.innerHTML = `
    <option disabled selected>Select city</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Sukkur">Sukkur</option>
                        <option value="Quetta">Quetta</option>
                        <option value="Gujranwala">Gujranwala</option>
    `
  }
})


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

if (addData) {
  addData.addEventListener('click', async (e) => {
    e.preventDefault()
    try {
      if (email.value === "") {
         Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill in all fields.",
      });
      } else {
        const userData = await addDoc(collection(getStore, "usersInfo"), {
          userCountries: countries.value.trim(),
          userCities: cities.value.trim(),
          userCourses: courses.value.trim(),
          userProficiency: proficiency.value.trim(),
          userFullName: fullName.value.trim(),
          userFatherName: fatherName.value.trim(),
          userEmail: email.value.trim(),
          userPhone: phone.value.trim(),
          userCnic: cnic.value.trim(),
          userFatherCnic: fatherCnic.value.trim(),
          userDate: date.value.trim(),
          userGender: gender.value.trim(),
          userAddress: address.value.trim(),
          userQualification: qualification.value.trim(),
          UserQues: ques.value.trim(),
        })
        Swal.fire({
          icon: 'success',
          title: 'Submitted',
          text: 'Form Submitted Successfully'
        })
        form.reset()
      }
    } catch (error) {
      console.log("Error is getStore :: ", error);
    }

  })
}