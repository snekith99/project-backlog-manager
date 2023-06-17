/**
 * This file is used to add tasks to the project backlog.
 * 
 * Author: Snekith
 * Version: 1.0
 * Last Modified: 9/9/22
 */


/**
 * This function is used for the pop up in the add task section
 */
function openAdd() {
    document.getElementById("AddTaskPopup").style.display = "block";
    assigneeList("task-assignee");
}

/**
 * This function is used for the pop up if they select cancel
 */
function cancelAdd() {
    document.getElementById("AddTaskPopup").style.display = "none";
}

/**
 * This function is used for adding these tasks to local storage
 */
function confirmAdd() {

    // Initialise variables
    let taskName, assignee, storyPoints, priority, status, description, tag;
    taskName = document.getElementById("task-name").value;
    assignee = document.getElementById("task-assignee").value;
    storyPoints = document.getElementById("task-story-points").value;
    priority = document.getElementById("task-priority").value;
    status = document.getElementById("task-status").value;
    description = document.getElementById("task-description").value;
    type = document.getElementById("task-type").value

    // Check if tags have been selected
    try {
        if (document.getElementById("tag1").checked) {
            tag = document.getElementById("tag1").value;
        }
        else if (document.getElementById("tag2").checked) {
            tag = document.getElementById("tag2").value;
        }
        else if (document.getElementById("tag3").checked) {
            tag = document.getElementById("tag3").value;
        }
        else {
            throw 'Input a tag';

        }

    }
    catch (err) {
        window.alert(err);
        return;
    }

    let task;
    // Create new task with these variables
    try {
        task = new Task(taskName, assignee, storyPoints, priority, status, description, tag, type);
    }

    catch (err) {
        window.alert(err);
        return;
    }


    // Check if any tasks have been added prior, else, create new tasks array
    if (localStorage.getItem("tasks") == null) {
        const tasks = [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Alert user that task has been added
    window.alert("Task " + taskName + " added!");
}