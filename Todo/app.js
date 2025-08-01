import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getDocs, collection, addDoc, getFirestore, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCmUHMVGUXGvNG1WBSyyqEbLMnw3VOjbYE",
    authDomain: "todo-app-c4c22.firebaseapp.com",
    projectId: "todo-app-c4c22",
    storageBucket: "todo-app-c4c22.firebasestorage.app",
    messagingSenderId: "157194092178",
    appId: "1:157194092178:web:29d8465a6c9ac73a1ef04b",
    measurementId: "G-DPSK4KDWP6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const todoHandler = document.getElementById('addTodoBtn');
const todoInput = document.getElementById('todoInput');
const main = document.getElementById('main');
const ul = document.createElement('ul')
ul.className = "todo-list"
ul.id = "todoList"


todoHandler.addEventListener('click', async () => {
    let inputVal = todoInput.value.trim()
    let id = new Date().getTime()
    if (!inputVal) {
        alert("field is empty")
        return;
    }

    try {
        await addDoc(collection(db, 'Todo'), {
            id: id,
            todo: inputVal
        })
        append(id, inputVal)
        todoInput.value = ""
    } catch (error) {
        console.log('The Error is in addDocs ::', error);
    }
})

async function fetching() {
    try {
        const querySnapshot = await getDocs(collection(db, 'Todo'));
        main.innerHTML = ""
        querySnapshot.forEach((doc) => {
            const getId = doc.data().id
            const getTodo = doc.data().todo
            append(getId, getTodo)
            // edit(getId, getTodo)
        });
    } catch (error) {
        console.log('The error is in getDocs ::', error);

    }
}

function append(id, todo) {
    todoInput.value = ""
    ul.innerHTML += `
             <li class="todo-item">
            <input id="${id}" class="inp" value=${todo} type="text">
            <button id="${id}"  class="btn-edit">Edit</button>
            <button id="${id}" class="btn-delete">Delete</button>
            </li>
           `

    let getInput = ul.childNodes[1].childNodes[1]
    getInput.readOnly = true
    getInput.style.outline = "none"

    main.appendChild(ul)
}


ul.addEventListener('click', (e) => {
    let inp = todoList.childNodes[1].children[0].id;
    let more = document.querySelector('input')
    let btn = e.target.classList.contains("btn-edit")
    if (btn) {
        if (e.target.id === inp) {
            more.removeAttribute('readonly');
            more.focus()
        }
    }

})

window.addEventListener("DOMContentLoaded", fetching)