//Selector

const todoInput = document.querySelector('.todo-inp');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteChecked);
filterOption.addEventListener('click', filterTodo);

// Functions

function addTodo(event) {
    //prevent form form submitting
    event.preventDefault();
    if (todoInput.value.length > 0) {
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo');
        //Create LI
        const newTodo = document.createElement('li')
        newTodo.innerText = todoInput.value
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //ADD TODO TO LOCALSTORAGE
        saveLocalTodo(todoInput.value);

        //Check mark button 
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add("complete-btn")
        todoDiv.appendChild(completedButton);

        //Check trash button 
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add("trash-btn")
        todoDiv.appendChild(trashButton);

        //Append to list
        todoList.appendChild(todoDiv);
        // todoInput.value = ''
    }
}

function deleteChecked(event) {
    const item = event.target;
    //Delete
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall')
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })
    }
    //CHECK MARK 
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
    // console.log(event.target);
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex"
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = "none"
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break;
        }
    });
}

function saveLocalTodo(todo) {
    //CHECK---> HEY Do I already have thing in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}


function getTodos() {
    //CHECK---> HEY Do I already have thing in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){

        //Create Div
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo');

        //Create LI
        const newTodo = document.createElement('li')
        newTodo.innerText = todo
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //ADD TODO TO LOCALSTORAGE
        if(todoInput.value.length>0){
            saveLocalTodo(todoInput.value);
        }
        
        //Check mark button 
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add("complete-btn")
        todoDiv.appendChild(completedButton);
        //Check trash button 
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add("trash-btn")
        todoDiv.appendChild(trashButton);
        //Append to list
        todoList.appendChild(todoDiv)
    })
}

function removeLocalTodos(todo) {
    //CHECK---> HEY Do I already have thing in there?
    console.log(todo);
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1)
    localStorage.setItem("todos",JSON.stringify(todos));
}


