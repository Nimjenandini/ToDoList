const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const clearCompletedButton = document.getElementById("clearCompleted");

// Load tasks from local storage
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""}>
            <span class="task-text ${task.completed ? "completed" : ""}">${task.text}</span>
            <button class="delete-btn">Delete</button>
        `;
        taskList.appendChild(taskItem);

        // Mark task as complete or incomplete
        const checkbox = taskItem.querySelector("input");
        checkbox.addEventListener("change", () => {
            tasks[index].completed = checkbox.checked;
            updateLocalStorage();
            renderTasks();
        });

        // Delete task
        const deleteButton = taskItem.querySelector(".delete-btn");
        deleteButton.addEventListener("click", () => {
            tasks.splice(index, 1);
            updateLocalStorage();
            renderTasks();
        });
    });
}

// Update local storage
function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add new task
addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        tasks.push({ text: taskText, completed: false });
        updateLocalStorage();
        renderTasks();
        taskInput.value = "";
    }
});

// Clear completed tasks
clearCompletedButton.addEventListener("click", () => {
    for (let i = tasks.length - 1; i >= 0; i--) {
        if (tasks[i].completed) {
            tasks.splice(i, 1);
        }
    }
    updateLocalStorage();
    renderTasks();
});

// Initial rendering
renderTasks();

