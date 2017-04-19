// Input for todo item
// 'Save' on Enter
// Show 'Saved' items if they exist and show filter options (all, unfinished, finished)
// Each item has a checkbox and a 'state' of finished/unfinished checked=finished
// Toggle all, unfinished or finished => show items with the correct 'state' when toggle changes
'use strict';

// Model
let todos = [];


// Rendering state
let filter = "all";

let generateId = () => Math.floor(Number.MAX_SAFE_INTEGER * Math.random()).toString(16);


let removeChildren = node => {
    while (node.firstChild)
        node.removeChild(node.firstChild);
};

class Todo {
    constructor(description)
    {
        this.description = description;
        this.completed = false;
        this.created = Date.now();
        this.id = generateId();
    }

    toggleState()
    {
        this.completed = !this.completed;
    }
}

let todoHTML = (todo) => `<li class="todo-item ${todo.completed ? 'completed' : ''}">
                            <input type="checkbox" id="${todo.id}" name="${todo.id}" ${todo.completed ? 'checked' : ''}>
                            <label for="${todo.id}">${todo.description} ${todo.completed}</label>
                         </li>`;

let renderTodos = () => {
    let html,
        list = document.getElementById('todolist'),
        visibleTodos = [...todos];

    visibleTodos.sort((a, b) => a.created - b.created);

    if (filter === "active")
    {
        visibleTodos = visibleTodos.filter(todo => !todo.completed);
    }
    else if (filter === "done")
    {
        visibleTodos = visibleTodos.filter(todo => todo.completed);
    }

    html = visibleTodos.map(todoHTML).join('');

    removeChildren(list);

    list.insertAdjacentHTML('beforeEnd', html);
};

let addTodo = (evt) => {
    evt.preventDefault();
    todos.push(new Todo(evt.target.todo.value));

    renderTodos();
};

let toggle = (evt) => {
    if (evt.target.name == 'filter')
    {
        filter = evt.target.value;
        renderTodos();
    }
    else
    {
        var id = evt.target.name;

        var todo = todos.filter(todo => todo.id === id)[0];
console.log(id, todos)
        if (todo)
            todo.toggleState();

        renderTodos();
    }
};

document.forms.todo.addEventListener('submit', addTodo, false);
document.forms.todo.addEventListener('change', toggle, true);
