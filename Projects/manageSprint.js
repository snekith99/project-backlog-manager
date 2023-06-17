/**
 * This is used to fill project and sprint task lists and allow tasks to be moved from one list to the other
 * Author: Snekith
 * Version: 1.0
 * Last Modified: 30/9/22
 */

/**
 * This function is used to fill both tables
 */
function fillTables() {

    // Getting the project tasks list and sprints list
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const sprints = JSON.parse(localStorage.getItem("sprints"));

    // Getting the selected sprint
    let selectedSprintIndex = localStorage.getItem("selectedSprintIndex");

    // Create an instance of the class sprint from the json string
    let currentSprint = new Sprint();
    currentSprint.fromJson(sprints[selectedSprintIndex]);

    // Get the list of tasks of that sprint
    const sprintTasks = currentSprint.getTasks();

    // Initialize the project list container (clear and add the list header)
    let projectContainer = document.getElementById("project-list-container");
    projectContainer.innerHTML = `<h2 align="center"> Project Backlog </h2>`;

    // Go through list of tasks and populate the list with cards
    for (let i = 0; i < tasks.length; i++) {
        // Get current task information
        let currentTask = new Task()
        currentTask.fromJson(tasks[i]);

        let task_name = currentTask.getName();
        let task_description = currentTask.getDescription();

        // Create a card with the task information
        projectContainer.innerHTML += `
        <div class = "current-sprint-card">
            <div class="current-sprint-container" onclick="moveToSprint(${i})">
                <strong>${task_name}</strong>
                <p>${task_description}</p>
            </div>
        </div>`;

    }

    // Initialize the sprint tasks list container (clear and add the list header)
    let sprintTaskContainer = document.getElementById("sprint-task-container");
    sprintTaskContainer.innerHTML = `<h2 align="center"> Sprint Backlog </h2>`;

    // Go through the list of tasks in the sprint and populate the list with cards
    for (let i = 0; i < sprintTasks.length; i++) {
        // Get current task information
        let currentTask = new Task();

        let taskList = currentSprint.getTasks()
        currentTask.fromJson(taskList[i]);

        let task_name = currentTask.getName();
        let task_description = currentTask.getDescription();

        // Create a card with the task information
        sprintTaskContainer.innerHTML += `
        <div class = "current-sprint-card">
            <div class="current-sprint-container" onclick="moveToProject(${i})">
                <strong>${task_name}</strong>
                <p>${task_description}</p>
            </div>
        </div>`;
    }

}

/**
 * This function is used to move tasks from the project backlog to the sprint backlog (on click)
 * @param {*} index - index (in the project task list) of the task to be moved 
 */
function moveToSprint(index) {
    // Get list of sprints and list of tasks
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let sprints = JSON.parse(localStorage.getItem("sprints"))

    // Remove the task from the project list and save it in movedTask
    let movedTask = new Task()
    movedTask.fromJson(tasks.splice(index, 1)[0]);

    // Getting the selected sprint
    let selectedSprintIndex = localStorage.getItem("selectedSprintIndex");

    let currentSprint = new Sprint();
    currentSprint.fromJson(sprints[selectedSprintIndex]);

    // Add the task to the sprint tasks list
    currentSprint.addTask(movedTask);

    // Put the updated sprint in the sprints list
    sprints[selectedSprintIndex] = currentSprint;

    // Update local storage entries
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("sprints", JSON.stringify(sprints));

    // Refill the tables after moving the task
    fillTables();
}

/**
 * This function is used to move tasks from the project backlog to the sprint backlog (on click)
 * @param {*} index - index (in the sprint task list) of the task to be moved
 */
function moveToProject(index) {
    // Get list of sprints and list of tasks
    let sprints = JSON.parse(localStorage.getItem("sprints"));
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    // Getting the selected sprint
    let selectedSprintIndex = localStorage.getItem("selectedSprintIndex");

    // Instance of class Sprint for the current sprint
    let currentSprint = new Sprint();
    currentSprint.fromJson(sprints[selectedSprintIndex]);

    // Delete the task from the sprint task list and save it in movedTask
    let movedTask = new Task()
    movedTask.fromJson(currentSprint.deleteTask(index));

    // Add the movedTask to the tasks list
    tasks.push(movedTask);

    // Update local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("sprints", JSON.stringify(sprints));

    // Refill table after moving tasks
    fillTables();
}

function saveSprint() {
    window.location.href = "sprintBacklog.html";
}

function startSprint() {
    let sprints = JSON.parse(localStorage.getItem("sprints"));
    let selectedSprintIndex = localStorage.getItem("selectedSprintIndex")
    let currentSprint = new Sprint();
    currentSprint.fromJson(sprints[selectedSprintIndex]);

    if (currentSprint.getTasks().length == 0) {
        window.alert("Cannot start sprint with no tasks")
        return;
    }
    currentSprint.setStatus("in-progress");
    sprints[selectedSprintIndex] = currentSprint;

    localStorage.setItem("sprints", JSON.stringify(sprints));

    window.location.href = "sprintBacklog.html";
}
// Fill tables on page load
window.onload = fillTables;