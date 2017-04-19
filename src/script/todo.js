'use strict';

let todos = [],
    filter = 'all', // 'all', 'todo', 'done'
    todoForm = document.forms.todos,
    todoInput = todoForm['create-todo'],
    todoList = document.getElementById('todo-items');

let generateId = () => Math.floor(Number.MAX_SAFE_INTEGER * Math.random()).toString(16);

let escapeHTML = str => str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/`/g, '&#x0060;');

class Todo
{
    constructor(desc)
    {
        this.description = desc;
        this.id = generateId();
        this.created = Date.now();
        this.completed = false;
    }
}

/** */
function resetValue(el)
{
    el.value = '';
}

/** */
function removeChildNodes(parent)
{
    while (parent.firstChild)
    {
        parent.removeChild(parent.firstChild);
    }
}

/** */
function renderTodo(todo)
{
    let htmlString =
    `<tr class="${todo.completed ? 'completed' : ''}">
        <td>
            <input type="checkbox" ${todo.completed ? 'checked' : ''} id="${escapeHTML(todo.id)}" name="toggleTodo">
        </td>
        <td>
            <label for="${escapeHTML(todo.id)}">${escapeHTML(todo.description)}</label>
        </td>
    </tr>`;

    return htmlString;
}

/** */
function renderTodos(list)
{
    removeChildNodes(todoList);

    if (filter !== 'all')
    {
        let showDone = (filter === 'done');

        list = todos.filter(function (todo)
        {
            return todo.completed === showDone;
        });
    }

    list = list.sort((a, b) => b.created - a.created).map(renderTodo);

    todoList.insertAdjacentHTML('beforeEnd', list.join(''));
}

/** */
function addTodo(evt)
{
    let todo = new Todo(todoInput.value);

    evt.preventDefault();
    todos.push(todo);
    resetValue(todoInput);
    renderTodos(todos);
}

/** */
function handleChange(evt)
{
    if (evt.target.name === 'filter')
    {
        filter = evt.target.value;
        renderTodos(todos);
    }
    else if (evt.target.name === 'toggleTodo')
    {
        let id = evt.target.id;

        todos.filter(todo => todo.id === id)
             .forEach(todo =>
             {
                 todo.completed = !todo.completed;
             });

        renderTodos(todos);
    }
}

todoForm.addEventListener('submit', addTodo, false);
todoForm.addEventListener('change', handleChange, true);
