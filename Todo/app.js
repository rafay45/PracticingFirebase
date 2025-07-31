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
const todoList = document.getElementById('todoList');
const li = document.createElement('li')


todoHandler.addEventListener('click', async () => {
    let inputVal = todoInput.value.trim()
    if (!inputVal) {
        alert("field is empty")
        return;
    }

    try {
        await addDoc(collection(db, 'Todo'), {
            id: new Date().getTime(),
            todo: inputVal
        })
        append(inputVal)
        todoInput.value = ""
    } catch (error) {
        console.log('The Error is in addDocs ::', error);
    }
})

async function fetching() {
    try {
        const querySnapshot = await getDocs(collection(db, 'Todo'));
        todoList.innerHTML = ""
        querySnapshot.forEach((doc) => {
            const getId = doc.data().id
            const getTodo = doc.data().todo
            append(getTodo)
        });
    } catch (error) {
        console.log('The error is in getDocs ::', error);

    }
}

function append(todo) {
    todoInput.value = ""
    li.innerHTML += `
            <li class="todo-item">
            <input  class="inp" value=${todo} type="text" readonly>
            <button  class="btn-edit">Edit</button>
            <button  class="btn-delete">Delete</button>
            </li>
           `
    todoList.appendChild(li)
}

window.addEventListener("DOMContentLoaded", fetching)