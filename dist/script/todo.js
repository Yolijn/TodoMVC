'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var todos = [],
    filter = 'all',
    // 'all', 'todo', 'done'
todoForm = document.forms.todos,
    todoInput = todoForm['create-todo'],
    todoList = document.getElementById('todo-items');

var generateId = function generateId() {
    return Math.floor(Number.MAX_SAFE_INTEGER * Math.random()).toString(16);
};

var escapeHTML = function escapeHTML(str) {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;').replace(/`/g, '&#x0060;');
};

var Todo = function Todo(desc) {
    _classCallCheck(this, Todo);

    this.description = desc;
    this.id = generateId();
    this.created = Date.now();
    this.completed = false;
};

/** */


function resetValue(el) {
    el.value = '';
}

/** */
function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/** */
function renderTodo(todo) {
    var htmlString = '<tr class="' + (todo.completed ? 'completed' : '') + '">\n        <td>\n            <input type="checkbox" ' + (todo.completed ? 'checked' : '') + ' id="' + escapeHTML(todo.id) + '" name="toggleTodo">\n        </td>\n        <td>\n            <label for="' + escapeHTML(todo.id) + '">' + escapeHTML(todo.description) + '</label>\n        </td>\n    </tr>';

    return htmlString;
}

/** */
function renderTodos(list) {
    removeChildNodes(todoList);

    if (filter !== 'all') {
        var showDone = filter === 'done';

        list = todos.filter(function (todo) {
            return todo.completed === showDone;
        });
    }

    list = list.sort(function (a, b) {
        return b.created - a.created;
    }).map(renderTodo);

    todoList.insertAdjacentHTML('beforeEnd', list.join(''));
}

/** */
function addTodo(evt) {
    var todo = new Todo(todoInput.value);

    evt.preventDefault();
    todos.push(todo);
    resetValue(todoInput);
    renderTodos(todos);
}

/** */
function handleChange(evt) {
    if (evt.target.name === 'filter') {
        filter = evt.target.value;
        renderTodos(todos);
    } else if (evt.target.name === 'toggleTodo') {
        var id = evt.target.id;

        todos.filter(function (todo) {
            return todo.id === id;
        }).forEach(function (todo) {
            todo.completed = !todo.completed;
        });

        renderTodos(todos);
    }
}

todoForm.addEventListener('submit', addTodo, false);
todoForm.addEventListener('change', handleChange, true);