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
// const li = document.createElement('li')
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
        main.innerHTML = ""
        querySnapshot.forEach((doc) => {
            const getId = doc.data().id
            const getTodo = doc.data().todo
            append(getTodo)
        });
    } catch (error) {
        console.log('The error is in getDocs ::', error);

    }
}
const array = []
function append(todo) {
    todoInput.value = ""
    const setId = new Date().getTime()
    array.push(ul.innerHTML += `
             <li class="todo-item">
            <input id="${setId}" class="inp" value=${todo} type="text" readonly>
            <button id="${setId}"  class="btn-edit">Edit</button>
            <button id="${setId}" class="btn-delete">Delete</button>
            </li>
           `)
      console.log(array);
      
    main.appendChild(ul)
}


ul.addEventListener('click', (e) => {
    let inp = todoList.childNodes[1].children[0].id;
    let btn = e.target.classList.contains("btn-edit")
    let moreGet = todoList.childNodes[1].children[0]
    console.log(inp);
    
    // console.dir(moreGet);

    if (btn) {
        if (e.target.id === inp) {
            if (moreGet.hasAttribute('readonly')) {
                moreGet.removeAttribute('readonly')
                moreGet.style.border = "1px solid blue"
            } else {
                moreGet.setAttribute('readonly', true)
                moreGet.style.border = ""
            }
        }
    }


})

window.addEventListener("DOMContentLoaded", fetching)