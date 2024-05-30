document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todo-form');
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task');
    const searchTaskInput = document.getElementById('search-task');

    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addTask(newTaskInput.value);
        newTaskInput.value = '';
    });

    taskList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete')) {
            const taskItem = event.target.parentElement.parentElement;
            taskItem.classList.add('fade-out');
            taskItem.addEventListener('animationend', function() {
                removeTask(taskItem);
            });
        } else if (event.target.classList.contains('edit')) {
            const taskItem = event.target.parentElement.parentElement;
            editTask(taskItem);
        }
    });

    searchTaskInput.addEventListener('input', function(event) {
        const searchQuery = event.target.value.toLowerCase();
        filterTasks(searchQuery);
    });

    function addTask(task) {
        const li = document.createElement('li');
        li.textContent = task;

        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('actions');

        const editBtn = document.createElement('span');
        editBtn.innerHTML = '✎'; // Unicode pencil icon
        editBtn.classList.add('edit');
        actionsDiv.appendChild(editBtn);

        const deleteBtn = document.createElement('span');
        deleteBtn.innerHTML = '✗'; // Unicode cross icon
        deleteBtn.classList.add('delete');
        actionsDiv.appendChild(deleteBtn);

        li.appendChild(actionsDiv);

        taskList.appendChild(li);
    }

    function removeTask(taskElement) {
        taskList.removeChild(taskElement);
    }

    function editTask(taskElement) {
        const currentText = taskElement.firstChild.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.classList.add('editing');
        taskElement.innerHTML = '';
        taskElement.appendChild(input);
        input.focus();

        input.addEventListener('blur', function() {
            taskElement.textContent = input.value;
            taskElement.appendChild(createActionsDiv());
        });

        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                input.blur();
            }
        });
    }

    function createActionsDiv() {
        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('actions');

        const editBtn = document.createElement('span');
        editBtn.innerHTML = '✎'; // Unicode pencil icon
        editBtn.classList.add('edit');
        actionsDiv.appendChild(editBtn);

        const deleteBtn = document.createElement('span');
        deleteBtn.innerHTML = '✗'; // Unicode cross icon
        deleteBtn.classList.add('delete');
        actionsDiv.appendChild(deleteBtn);

        return actionsDiv;
    }

    function filterTasks(query) {
        const tasks = taskList.getElementsByTagName('li');
        Array.from(tasks).forEach(function(task) {
            const taskText = task.firstChild.textContent.toLowerCase();
            if (taskText.includes(query)) {
                task.style.display = '';
            } else {
                task.style.display = 'none';
            }
        });
    }
});
