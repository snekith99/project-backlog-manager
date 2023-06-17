/**
 * This file is used to delete tasks from the project backlog.
 * 
 * Author: Snekith
 * Version: 1.0
 * Last Modified: 9/9/22
 */


/**
 * This function is used to delete a task from the tasks array
 */
function deleteTask() {

    // Confirmation message
    if (window.confirm("Are you sure you want to delete this task?")) {

        // Obtain selected index to get task currently being modified
        let selectedIndex = localStorage.getItem("selectedIndex");
        let tasks = JSON.parse(localStorage.getItem("tasks"));

        // Delete from array and setItem to localStorage
        tasks.splice(selectedIndex, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // Refresh card layout
        closeDetails();
        location.reload();
    }

    else {
        return;
    }


} 