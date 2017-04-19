// Input for todo item
// 'Save' on Enter
// Show 'Saved' items if they exist and show filter options (all, unfinished, finished)
// Each item has a checkbox and a 'state' of finished/unfinished checked=finished
// Toggle all, unfinished or finished => show items with the correct 'state' when toggle changes
'use strict';

// Model

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var todos = [];

// Rendering state
var filter = "all";

var generateId = function generateId() {
    return Math.floor(Number.MAX_SAFE_INTEGER * Math.random()).toString(16);
};

var removeChildren = function removeChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
};

var Todo = function () {
    function Todo(description) {
        _classCallCheck(this, Todo);

        this.description = description;
        this.completed = false;
        this.created = Date.now();
        this.id = generateId();
    }

    _createClass(Todo, [{
        key: 'toggleState',
        value: function toggleState() {
            this.completed = !this.completed;
        }
    }]);

    return Todo;
}();

var todoHTML = function todoHTML(todo) {
    return '<li class="todo-item ' + (todo.completed ? 'completed' : '') + '">\n                            <input type="checkbox" id="' + todo.id + '" name="' + todo.id + '" ' + (todo.completed ? 'checked' : '') + '>\n                            <label for="' + todo.id + '">' + todo.description + ' ' + todo.completed + '</label>\n                         </li>';
};

var renderTodos = function renderTodos() {
    var html = void 0,
        list = document.getElementById('todolist'),
        visibleTodos = [].concat(todos);

    visibleTodos.sort(function (a, b) {
        return a.created - b.created;
    });

    if (filter === "active") {
        visibleTodos = visibleTodos.filter(function (todo) {
            return !todo.completed;
        });
    } else if (filter === "done") {
        visibleTodos = visibleTodos.filter(function (todo) {
            return todo.completed;
        });
    }

    html = visibleTodos.map(todoHTML).join('');

    removeChildren(list);

    list.insertAdjacentHTML('beforeEnd', html);
};

var addTodo = function addTodo(evt) {
    evt.preventDefault();
    todos.push(new Todo(evt.target.todo.value));

    renderTodos();
};

var toggle = function toggle(evt) {
    if (evt.target.name == 'filter') {
        filter = evt.target.value;
        renderTodos();
    } else {
        var id = evt.target.name;

        var todo = todos.filter(function (todo) {
            return todo.id === id;
        })[0];
        console.log(id, todos);
        if (todo) todo.toggleState();

        renderTodos();
    }
};

document.forms.todo.addEventListener('submit', addTodo, false);
document.forms.todo.addEventListener('change', toggle, true);