import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getDocs, collection, addDoc, getFirestore, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

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
    if (!inputVal) {
        alert("field is empty")
        return;
    }

    try {
        await addDoc(collection(db, 'Todo'), {
            todo: inputVal
        })
        todoInput.value = ""
        append(inputVal)
    } catch (error) {
        console.log('The Error is in addDocs ::', error);
    }
})

async function fetching() {
    try {
        const querySnapshot = await getDocs(collection(db, 'Todo'));
        main.innerHTML = ""
        querySnapshot.forEach((doc) => {
            const getTodo = doc.data().todo
            const setId = doc.id
            append(getTodo, setId)
        });
    } catch (error) {
        console.log('The error is in getDocs ::', error);

    }
}

function append(todo, id) {
    todoInput.value = ""
    ul.innerHTML += `
             <li class="todo-item">
            <input id="${id}"  class="inp" value=${todo} type="text" readonly>
            <button  class="btn-edit">Edit</button>
            <button class="btn-delete">Delete</button>
            </li>
           `
    main.appendChild(ul)
}

ul.addEventListener('click', async (e) => {
    let btn = e.target.classList.contains("btn-edit")
    let input = e.target.previousElementSibling;

    if (btn) {
        if (input.hasAttribute('readonly')) {
            input.removeAttribute('readonly')
            input.style.border = "1px solid #ccc"
            input.nextElementSibling.innerText = "Save"
        } else {
            input.setAttribute('readonly', true)
            input.style.border = ""
            input.nextElementSibling.innerText = "Edit"
        }

        let newVal = input.value
        let id = input.id
        try {
            await updateDoc(doc(db, "Todo", id), {
                todo: newVal
            })
        } catch (error) {
            console.log("The Error is in UpdateDoc", error);

        }
    }
})

window.addEventListener("DOMContentLoaded", fetching)