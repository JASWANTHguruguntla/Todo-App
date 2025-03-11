// Function to update the task counter
function updateTaskCounter() {
    const count = document.querySelectorAll(".todo-item-container").length;
    document.getElementById("taskCounter").textContent = `${count} task${count !== 1 ? 's' : ''} remaining`;
}

// Function to add a new task
function addTodo() {
    const todoUserInput = document.getElementById("todoUserInput");
    const todoText = todoUserInput.value.trim();
    if (todoText === "") {
        alert("Please enter a valid task.");
        return;
    }

    const todoItemsContainer = document.getElementById("todoItemsContainer");
    const todoItemContainer = document.createElement("li");
    todoItemContainer.classList.add("todo-item-container");

    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.classList.add("checkbox-input");
    checkboxInput.onclick = function() {
        checkboxLabel.classList.toggle("checked", checkboxInput.checked);
        updateTaskCounter();
    };

    const checkboxLabel = document.createElement("span");
    checkboxLabel.textContent = todoText;
    checkboxLabel.classList.add("checkbox-label");

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash", "delete-icon");
    deleteIcon.onclick = function() {
        todoItemsContainer.removeChild(todoItemContainer);
        updateTaskCounter();
    };

    todoItemContainer.appendChild(checkboxInput);
    todoItemContainer.appendChild(checkboxLabel);
    todoItemContainer.appendChild(deleteIcon);
    todoItemsContainer.appendChild(todoItemContainer);

    todoUserInput.value = "";
    updateTaskCounter();
}

// Function to save tasks to local storage
function saveTodos() {
    const todoItems = document.querySelectorAll(".todo-item-container");
    const todos = [];

    todoItems.forEach((item) => {
        const text = item.querySelector(".checkbox-label").textContent;
        const completed = item.querySelector(".checkbox-input").checked;
        todos.push({
            text,
            completed
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
    alert("Tasks saved successfully!");
}

// Function to load tasks from local storage
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const todoItemsContainer = document.getElementById("todoItemsContainer");
    todoItemsContainer.innerHTML = "";

    todos.forEach((todo) => {
        const todoItemContainer = document.createElement("li");
        todoItemContainer.classList.add("todo-item-container");

        const checkboxInput = document.createElement("input");
        checkboxInput.type = "checkbox";
        checkboxInput.classList.add("checkbox-input");
        checkboxInput.checked = todo.completed;
        checkboxInput.onclick = function() {
            checkboxLabel.classList.toggle("checked", checkboxInput.checked);
            updateTaskCounter();
        };

        const checkboxLabel = document.createElement("span");
        checkboxLabel.textContent = todo.text;
        checkboxLabel.classList.add("checkbox-label");
        if (todo.completed) {
            checkboxLabel.classList.add("checked");
        }

        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fas", "fa-trash", "delete-icon");
        deleteIcon.onclick = function() {
            todoItemsContainer.removeChild(todoItemContainer);
            updateTaskCounter();
        };

        todoItemContainer.appendChild(checkboxInput);
        todoItemContainer.appendChild(checkboxLabel);
        todoItemContainer.appendChild(deleteIcon);
        todoItemsContainer.appendChild(todoItemContainer);
    });

    updateTaskCounter();
}

// Event listeners
document.getElementById("addTodoButton").addEventListener("click", addTodo);
document.getElementById("saveTodoButton").addEventListener("click", saveTodos);
document.getElementById("clearAllButton").addEventListener("click", function() {
    if (confirm("Are you sure you want to delete all tasks?")) {
        document.getElementById("todoItemsContainer").innerHTML = "";
        localStorage.removeItem("todos");
        updateTaskCounter();
    }
});
document.getElementById("todoUserInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTodo();
    }
});

// Load saved tasks when the page loads
window.onload = loadTodos;