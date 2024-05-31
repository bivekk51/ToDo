function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

function addTaskToDOM(task) {
    const taskList = document.getElementById('taskList');
    const newTaskItem = document.createElement('li');
    newTaskItem.textContent = task;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = function() {
        deleteTask(task, newTaskItem);
    };

    newTaskItem.appendChild(deleteButton);
    taskList.appendChild(newTaskItem);
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(task, taskElement) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t !== task);
    saveTasks(tasks);
    taskElement.remove();
}

function dataCheck() {
    const taskInput = document.getElementById('task');
    const taskValue = taskInput.value.trim();

    if (taskValue !== "") {
        addTaskToDOM(taskValue);
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(taskValue);
        saveTasks(tasks);
        taskInput.value = "";
    }
}

document.getElementById('task').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        dataCheck();
    }
});

window.onload = loadTasks;
