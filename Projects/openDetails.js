/**
 * This function is used to show the details of task 
 * @param {*} index - Index in tasks array that is being showed currently
 */
function openDetails(index) {

    // Close details function
    if (document.getElementById("task-details").style.display == "block") {
        closeDetails();
    }
    if (document.getElementById("edit-task-details").style.display = "block") {
        closeEdit();
    }

    // Task details retrieval
    document.getElementById("task-details").style.display = "block";
    localStorage.setItem("selectedIndex", index);
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    // Create task object and store task details to the newly created task object
    let task = new Task();
    task.fromJson(tasks[index]);
    let name, assignee, storyPoints, priority, status, description, tag;

    // Get task details
    name = task.getName();
    assignee = task.getAssignee();
    storyPoints = task.getStoryPoints();
    priority = task.getPriority();
    status = task.getStatus();
    description = task.getDescription();
    tag = task.getTag();
    type = task.getType();

    // Display task details 
    document.getElementById("details-taskName").innerHTML = "<strong>Task name</strong>: " + name;
    document.getElementById("details-assignee").innerHTML = "<strong>Assignee</strong>: " + assignee;
    document.getElementById("details-storyPoints").innerHTML = "<strong>Story points</strong>: " + storyPoints;
    document.getElementById("details-priority").value = priority;
    document.getElementById("details-status").value = status;
    document.getElementById("details-description").innerHTML = "<strong>Description</strong>: " + description;
    document.getElementById("details-type").value = type;

    //Clear all checkboxes
    document.getElementById("details-tag1").checked = false;
    document.getElementById("details-tag2").checked = false;
    document.getElementById("details-tag3").checked = false;

    // Tag selection display
    if (tag == "core") {
        document.getElementById("details-tag1").checked = true;
    }
    if (tag == "testing") {
        document.getElementById("details-tag2").checked = true;
    }
    if (tag == "ui") {
        document.getElementById("details-tag3").checked = true;
    }
}

// Close the popup
function closeDetails() {
    document.getElementById("task-details").style.display = "none";
}