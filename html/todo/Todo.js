// Select DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Event Listener for adding a task
addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    // Create task list item
    const listItem = document.createElement('li');

    // Task content
    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;
    listItem.appendChild(taskContent);

    // Complete button
    taskContent.addEventListener('click', () => {
        listItem.classList.toggle('completed');
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(listItem);
    });
    listItem.appendChild(deleteBtn);

    // Append list item to task list
    taskList.appendChild(listItem);

    // Clear input field
    taskInput.value = '';
}
