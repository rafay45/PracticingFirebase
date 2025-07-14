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
const todoItems = document.getElementById('todoItems');

todoHandler.addEventListener('click', async () => {
    let inputValue = todoInput.value
    try {
        await addDoc(collection(db, "Todo"), {
            id: new Date().getTime(),
            task: inputValue
        })
        getting()
    } catch (error) {
        console.log("The Error is todoHandler", error);
    }
})

async function getting() {
    try {
        const querySnapshot = await getDocs(collection(db, "Todo"));
        querySnapshot.forEach(doc => {
            const { id, task } = doc.data()
            todoList.innerHTML += `<li class="todo-item"><span>${task}</span> <div><button class="btn-edit">Edit</button><button id=${id} class="btn-delete">Delete</button></div></li>`
            todoInput.value = ""
        });
    } catch (error) {
        console.log("The error is getting function", error);

    }
}

todoList.childNodes.forEach(items => {
    items.addEventListener('click', async function deleteTodo() {
    const id = this.id
    try {
        await deleteDoc(doc(db, "Todo", id));
    } catch (error) {
        console.log("The Error is DeleteDocs", error);
    }
});
});
