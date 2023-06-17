/**
 * This file is used to edit tasks in the project backlog.
 * 
 * Author: Snekith
 * Version: 1.0
 * Last Modified: 17/06/2023
 */

/**
 * This function is used to fill edit task pop up fields
 */
function openEdit() {
    document.getElementById("task-details").style.display = "none";

    if (document.getElementById("edit-task-details").style.display = "block") {
        closeEdit();
    }

    document.getElementById("edit-task-details").style.display = "block";

    // Fill assignee list with member from the team list
    assigneeList("edit-assignee");

    // Obtain index from tasks array
    let selectedIndex = localStorage.getItem("selectedIndex");
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    // Intialise the task into currentTask to be able to use the properties of the currentTask
    let currentTask = new Task();
    currentTask.fromJson(tasks[selectedIndex]);

    // Get the empty field entries and intialise them into variables
    let taskName, assignee, storyPoints, priority, status, description, tag;
    taskName = document.getElementById("edit-taskName");
    assignee = document.getElementById("edit-assignee");
    storyPoints = document.getElementById("edit-storyPoints");
    priority = document.getElementById("edit-priority");
    status = document.getElementById("edit-taskStatus");
    description = document.getElementById("edit-description");
    type = document.getElementById("edit-taskType");

    // Fill fields with data from the current task
    taskName.innerHTML = currentTask.getName();
    assignee.value = currentTask.getAssignee();
    storyPoints.innerHTML = currentTask.getStoryPoints();
    status.value = currentTask.getStatus();
    priority.value = currentTask.getPriority();
    description.innerHTML = currentTask.getDescription();
    type.value = currentTask.getType();

    //Clear all checkboxes
    document.getElementById("edit-tag1").checked = false
    document.getElementById("edit-tag2").checked = false
    document.getElementById("edit-tag3").checked = false

    // Check tag based on the current task's tag
    tag = currentTask.getTag()
    if (tag == "core") {
        document.getElementById("edit-tag1").checked = true;
    }
    if (tag == "testing") {
        document.getElementById("edit-tag2").checked = true;
    }
    if (tag == "ui") {
        document.getElementById("edit-tag3").checked = true;
    }
}
/**
 * This function is used to modify the task
 */
function editTask() {
    // Obtain index from tasks array
    let selectedIndex = localStorage.getItem("selectedIndex");
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    // Intialise the edited task into currentTask to be able to use the properties of the currentTask
    let currentTask = new Task();
    currentTask.fromJson(tasks[selectedIndex]);

    // Get the edited field entries and intialise them into variables
    let newTaskName, newAssignee, newStoryPoints, newPriority, newStatus, newDescription, newTag;
    newTaskName = document.getElementById("edit-taskName").innerHTML;
    newAssignee = document.getElementById("edit-assignee").value;
    newStoryPoints = document.getElementById("edit-storyPoints").innerHTML;
    newPriority = document.getElementById("edit-priority").value;
    newStatus = document.getElementById("edit-taskStatus").value;
    newDescription = document.getElementById("edit-description").innerHTML;
    newType = document.getElementById("edit-taskType").value;

    // Add new tags to the tag list
    if (document.getElementById("edit-tag1").checked) {
        newTag = document.getElementById("edit-tag1").value;
    } else if (document.getElementById("edit-tag2").checked) {
        newTag = document.getElementById("edit-tag2").value;
    } else if (document.getElementById("edit-tag3").checked) {
        newTag = document.getElementById("edit-tag3").value;
    }


    // Set new task properties in place of the old ones using set method of task class
    try {

        currentTask.setName(newTaskName);

        currentTask.setAssignee(newAssignee);

        currentTask.setStoryPoints(newStoryPoints);

        currentTask.setPriority(newPriority);

        currentTask.setStatus(newStatus)

        currentTask.setDescription(newDescription);

        currentTask.setTag(newTag);

        currentTask.setType(newType);

    }
    catch (err) {
        window.alert(err);
        return;
    }


    // Save the changes done to currenTask to the class
    tasks[selectedIndex] = currentTask;

    // Update local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Close the popup
    closeEdit()
    // Reload cards
    location.reload()
}
// This function closes the edit popup screen
function closeEdit() {
    document.getElementById("edit-task-details").style.display = "none";
}