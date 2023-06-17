/**
 * This file is responsible for the grid display of the tasks.
 * 
 * Author: Snekith
 * Version: 1.0
 * Last Modified: 9/9/22
 */


/**
 * This function is used to create a table/grid 
 */
function createTable() {

    // Obtain tasks from local storage amd create grid-container
    let container = document.getElementById("grid-container");

    //Clear all cards in the container
    container.innerHTML = "";

    //Get the filter
    let filterTag = document.getElementById("task-filter").value;
    let tasks;

    //Filter the array based on the tag
    if (filterTag != "none") {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        let filteredTasks = [];
        for (let i = 0; i < tasks.length; i++) {
            let currentTask = new Task();
            currentTask.fromJson(tasks[i])
            if (currentTask.getTag() == filterTag) {
                filteredTasks.push(tasks[i])
            }
        }
        tasks = filteredTasks
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    // Initialise row
    let row = document.createElement("div");
    row.classList.add("row");

    // For loop to iterate through tasks
    for (let i = 0; i < tasks.length; i++) {

        // Creating divisions
        if (i > 0 && i % 3 == 0) {
            container.appendChild(row);
            container.innerHTML += "<br>";
            row = document.createElement("div");
            row.classList.add("row");
        }

        // Initialise column
        let column = document.createElement("div");
        column.classList.add("column");

        // Setting on click attribute for card
        let card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("onclick", "openDetails(" + i + ")");

        // Create card with current task
        let currentTask = new Task();
        currentTask.fromJson(tasks[i]);

        var task_name = currentTask.getName();
        var task_description = currentTask.getDescription();
        var task_priority = currentTask.getPriority();
        var task_storyPoints = currentTask.getStoryPoints();
        var task_status = currentTask.getStatus();
        var task_type = currentTask.getType();

        card.innerHTML = `<h3>${task_name}</h3> 
        <div class="row">
            <div style="float:left; width:50%;">
                <p>Story Points: ${task_storyPoints} </p>
            </div>
            <div style="float:left; width:50%;">
                <p>Priority: ${task_priority} </p>
            </div>
        </div>
        <div class="row">
            <div style="float:left; width:50%;">
                <p>Type: ${task_type}</p>
            </div>
            <div style="float:left; width:50%;">
                <p>Status: ${task_status} </p>
            </div>
        </div>
        <div class="row">
            <div class="single-column">
                <p> Description: ${task_description} </p>
            </div>
        </div>`;
        if (currentTask.getTag() == "core") {
            card.style.backgroundColor = "Lavender"
        }
        else if (currentTask.getTag() == "testing") {
            card.style.backgroundColor = "Salmon"
        }
        else if (currentTask.getTag() == "ui") {
            card.style.backgroundColor = "Beige"
        }
        column.appendChild(card);
        row.appendChild(column);
    }

    // Add to container
    container.appendChild(row);
}

// Run create table when filter is changed
function changeFilter() {
    createTable()
}
// Runs function when page loads
window.onload = createTable;