document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const todoForm = document.getElementById('todo-form');
    const loginContainer = document.getElementById('login-container');
    const todoContainer = document.getElementById('todo-container');
    const todoList = document.getElementById('todo-list');
    const headerTitle = document.querySelector('.todo-container h1');

    let currentUser = null;

    // Function to save data to local storage
    function saveUserData() {
        if (currentUser) {
            const todoItems = [];
            document.querySelectorAll('#todo-list li').forEach(item => {
                todoItems.push({
                    text: item.querySelector('.task-text').textContent,
                    category: item.querySelector('.task-category').textContent,
                    date: item.querySelector('.task-date').textContent,
                    time: item.querySelector('.task-time').textContent
                });
            });
            localStorage.setItem(currentUser, JSON.stringify(todoItems));
        }
    }

    // Function to load data from local storage
    function loadUserData() {
        if (currentUser) {
            const todoItems = JSON.parse(localStorage.getItem(currentUser)) || [];
            todoItems.forEach(item => addTodoItem(item.text, item.category, item.date, item.time));
        }
    }

    // Function to update the header with the user's name
    function updateHeaderWithUsername(username) {
        headerTitle.textContent = `Welcome to your To-Do list, ${username}!`;
    }

    // Function to handle login
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const storedPassword = localStorage.getItem(`${username}_password`);

        if (storedPassword === password || !storedPassword) {
            currentUser = username;
            if (!storedPassword) {
                // Save password if it's a new user
                localStorage.setItem(`${username}_password`, password);
            }
            loginContainer.style.display = 'none';
            todoContainer.style.display = 'block';
            loadUserData();
            updateHeaderWithUsername(username); // Update the header with the user's name
        } else {
            alert('Incorrect password. Please try again.');
        }
    });

    // Function to add a to-do item
    function addTodoItem(task, category = 'General', date = 'No date', time = 'No time') {
        const li = document.createElement('li');

        // Create elements for task details
        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.textContent = task;

        const taskCategory = document.createElement('span');
        taskCategory.classList.add('task-category');
        taskCategory.textContent = `  ${category}`;

        const taskDate = document.createElement('span');
        taskDate.classList.add('task-date');
        taskDate.textContent = `  ${date}`;

        const taskTime = document.createElement('span');
        taskTime.classList.add('task-time');
        taskTime.textContent = `  ${time}`;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.addEventListener('click', function () {
            li.remove();
            saveUserData();
        });

        // Append details to the list item
        li.appendChild(taskText);
        li.appendChild(taskCategory);
        li.appendChild(taskDate);
        li.appendChild(taskTime);
        li.appendChild(removeBtn);

        // Add the item to the list
        todoList.appendChild(li);
        saveUserData();
    }

    // Handle adding new to-do items
    todoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const todoItem = document.getElementById('todo-item').value;
        const category = document.getElementById('category').value;
        const date = document.getElementById('due-date').value || 'No date';
        const time = document.getElementById('due-time').value || 'No time';

        addTodoItem(todoItem, category, date, time);
        todoForm.reset();
    });
});
