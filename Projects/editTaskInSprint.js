/**
 * This is used to sort tasks in current sprint in the sprint backlog from not started, in progress and complete
 * Author: Snekith
 * Version: 1.0
 * Last Modified: 17/06/2023
 */

/**
 * This function is used to fill edit task pop up fields
 */
function openTaskView(index) {

    localStorage.setItem("selectedTaskIndex", index)

    if (document.getElementById("TaskViewPopup").style.display = "block") {
        closeTaskView();
    }

    document.getElementById("TaskViewPopup").style.display = "block";

    // Obtain index from tasks array
    let selectedSprintIndex = localStorage.getItem("selectedSprintIndex");
    let sprints = JSON.parse(localStorage.getItem("sprints"));

    let currentSprint = new Sprint();
    currentSprint.fromJson(sprints[selectedSprintIndex]);

    const tasks = currentSprint.getTasks();

    // Intialise the task into currentTask to be able to use the properties of the currentTask
    let currentTask = new Task();
    currentTask.fromJson(tasks[index]);

    // Get the empty field entries and intialise them into variables
    let status, logDate, logTime, totalLoggedTime;
    status = document.getElementById("task-state");
    logDate = document.getElementById("log-date");
    logTime = document.getElementById("log-time");
    totalLoggedTime = document.getElementById("total-time");

    // Fill fields with data from the current task
    status.value = currentTask.getStatus();
    totalLoggedTime.value = currentTask.getTotalLoggedTime();
}

function editSprint() {

    // Obtain index from tasks array
    let selectedSprintIndex = localStorage.getItem("selectedSprintIndex");
    let sprints = JSON.parse(localStorage.getItem("sprints"));

    let currentSprint = new Sprint();
    currentSprint.fromJson(sprints[selectedSprintIndex]);

    const tasks = currentSprint.getTasks();
    // Create task object
    let selectedTaskIndex = localStorage.getItem("selectedTaskIndex");
    let currentTask = new Task();
    currentTask.fromJson(tasks[selectedTaskIndex]);

    // Get the edited field entries and intialise them into variables
    let newStatus, newLogDate, newLogTime;
    newStatus = document.getElementById("task-state").value;
    newLogDate = new Date(document.getElementById("log-date").value);
    newLogTime = parseInt(document.getElementById("log-time").value);

    // Check if the new log date is later than end date or earlier than start date
    let startDate = new Date(currentSprint.getStartDate())
    let endDate = new Date(currentSprint.getEndDate())
    if (newLogDate < startDate || newLogDate > endDate) {
        window.alert("Invalid Date: date must be between sprint start and end date.\nStart Date: " + startDate.toLocaleDateString("en-AU") + " \t End Date: " + endDate.toLocaleDateString("en-AU"));
        return;
    }

    // Set new task properties in place of the old ones using set method of task class
    try {

        currentTask.setStatus(newStatus)

        currentTask.setLogDate(newLogDate);

        currentTask.setLogTime(newLogTime);

        if (currentTask.getTotalLoggedTime() == 0) {
            currentTask.setTotalLoggedTime(newLogTime)
        }
        else {
            currentTask.addTime(newLogTime)
        }
        // Calculate story points and add to sprint log history
        let storyPoints = (newLogTime / 60) / 4
        currentSprint.addToLogHistory([newLogDate, storyPoints]);

        // Add logged date and time to the member's log history
        let assignee = currentTask.getAssignee();
        const team = JSON.parse(localStorage.getItem("team"));
        for (let i = 0; i < team.length; i++) {
            let member = new Member();
            member.fromJson(team[i])
            if (assignee == member.getName()) {
                member.addToLogHistory(newLogDate, newLogTime);
                team[i] = member;
                localStorage.setItem("team", JSON.stringify(team));
                break;
            }
        }
    }
    catch (err) {
        window.alert(err);
        return;
    }

    // Save the changes done to currentTask to the class
    tasks[selectedTaskIndex] = currentTask;

    currentSprint.setTasks(tasks);

    sprints[selectedSprintIndex] = currentSprint;

    // Update local storage
    localStorage.setItem("sprints", JSON.stringify(sprints));

    // Rearrange tasks
    rearrangeTasks();

    // Close the popup
    closeTaskView();
}

function closeTaskView() {
    // Close task view
    document.getElementById("log-date").value = "";
    document.getElementById("log-time").value = "";
    document.getElementById("total-time").value = "";

    document.getElementById("TaskViewPopup").style.display = "none";
}

function rearrangeTasks() {
    // Initialize the containers for the three possible statuses
    let notStartedContainter = document.getElementById("not-started-column");
    notStartedContainter.innerHTML = `<h2 align="center">Not Started</h2>`;

    let inProgressContainer = document.getElementById("in-progress-column");
    inProgressContainer.innerHTML = `<h2 align="center">In progress</h2>`;

    let completedContainer = document.getElementById("completed-column");
    completedContainer.innerHTML = `<h2 align="center">Completed</h2>`;


    let selectedIndex = localStorage.getItem("selectedSprintIndex");
    let sprints = JSON.parse(localStorage.getItem("sprints"));

    let currentSprint = new Sprint();
    currentSprint.fromJson(sprints[selectedIndex]);

    const tasks = currentSprint.getTasks();
    let canComplete = true

    // Allocate to correct column
    for (let i = 0; i < tasks.length; i++) {
        let currentTask = new Task();
        currentTask.fromJson(tasks[i]);
        let taskStatus = currentTask.getStatus();
        let taskName = currentTask.getName();
        let taskAssignee = currentTask.getAssignee();

        if (taskStatus == "not-started") {
            canComplete = false
            notStartedContainter.innerHTML += `
            <div class="current-sprint-card">
                <div class="current-sprint-container" onclick="openTaskView(${i})">
                    <strong> ${taskName} </strong>
                    <br> <br> Assignee: ${taskAssignee}
                </div>
            </div>`
        }

        else if (taskStatus == "in-progress") {
            canComplete = false
            inProgressContainer.innerHTML += `
            <div class="current-sprint-card">
                <div class="current-sprint-container" onclick="openTaskView(${i})">
                    <strong> ${taskName} </strong>
                    <br> <br> Assignee: ${taskAssignee}
                </div>
            </div>`
        }

        else if (taskStatus == "completed") {
            completedContainer.innerHTML += `
            <div class="current-sprint-card">
                <div class="current-sprint-container" onclick="openTaskView(${i})">
                    <strong> ${taskName} </strong>
                    <br> <br> Assignee: ${taskAssignee}
                </div>
            </div>`
        }
    }

    if (!canComplete) {
        let button = document.getElementById("complete-sprint-button");
        button.disabled = true;
        button.style.backgroundColor = "#4c6785"
    } else {
        let button = document.getElementById("complete-sprint-button");
        button.disabled = false;
        button.style.backgroundColor = "green"
    }

}

window.onload = rearrangeTasks();