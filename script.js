const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// 1. Load tasks from localStorage on startup
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

function saveAndRender() {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    render();
}

function render() {
    todoList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}" onclick="toggleTask(${index})">
                ${task.text}
            </span>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        `;
        todoList.appendChild(li);
    });
}

// 2. Add Task
addBtn.addEventListener('click', () => {
    if (input.value.trim() === "") return;
    tasks.push({ text: input.value, completed: false });
    input.value = '';
    saveAndRender();
});

// 3. Toggle Complete
window.toggleTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    saveAndRender();
};

// 4. Delete Task
window.deleteTask = (index) => {
    tasks.splice(index, 1);
    saveAndRender();
};

// Initial render
render();