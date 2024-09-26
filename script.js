document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('addTaskBtn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }
    
    const task = {
        id: Date.now(),
        text: taskText
    };
    
    saveTask(task);
    appendTaskToDOM(task);
    taskInput.value = '';
}

function saveTask(task) {
    let tasks = getTasksFromStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromStorage() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}

function loadTasks() {
    const tasks = getTasksFromStorage();
    tasks.forEach(task => appendTaskToDOM(task));
}

function appendTaskToDOM(task) {
    const taskList = document.getElementById('taskList');
    
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.setAttribute('data-id', task.id);
    
    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = task.text;
    
    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-secondary btn-sm edit-task';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => editTask(task.id));
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm delete-task';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));
    
    li.appendChild(taskText);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function editTask(id) {
    const tasks = getTasksFromStorage();
    const task = tasks.find(task => task.id === id);
    
    const newTaskText = prompt('Edit task:', task.text);
    if (newTaskText === null || newTaskText.trim() === '') {
        return;
    }
    
    task.text = newTaskText.trim();
    localStorage.setItem('tasks', JSON.stringify(tasks));
    refreshTaskList();
}

function deleteTask(id) {
    let tasks = getTasksFromStorage();
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    refreshTaskList();
}

function refreshTaskList() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    loadTasks();
}
