/**
 * Used to rearrange sprints in order of 'Completed', 'In Progress' and 'Not Started'
 * Author: Snekith
 * Version 1.0
 * Last Modified - 30/09/2022
 */

/**
 * This function is used to redirect the user to the correct page (according to task status)
 * @param {*} index - Index of the selected sprint in the sprint list
 */
function viewSprint(index) {
    // Get the selected sprint and initialize it
    let sprints = JSON.parse(localStorage.getItem("sprints"));

    // Save the index of the sprint to local storage
    localStorage.setItem("selectedSprintIndex", index);

    let currentSprint = new Sprint();
    currentSprint.fromJson(sprints[index]);

    // Check the status of the selected sprint and redirect the user
    if (currentSprint.getStatus() == "not-started") {
        window.location.href = "manage-sprint.html";
    } else if (currentSprint.getStatus() == "in-progress") {
        window.location.href = "current-sprint.html";
    } else if (currentSprint.getStatus() == "completed") {
        window.location.href = "current-sprint.html";
    }

}

/**
 * This function is used to populate the lists in the sprint backlog page according to the status
 */
function rearrangeSprints() {
    // Get all sprints
    let sprints = JSON.parse(localStorage.getItem('sprints'))

    // Initialize the containers for the three possible statuses
    let inProgressContainer = document.getElementById("in-progress");
    inProgressContainer.innerHTML = `<h3>Active Sprints</h3>`;

    let notStartedContainter = document.getElementById("not-started");
    notStartedContainter.innerHTML = `<h3>Not Started</h3>`;

    let completedContainer = document.getElementById("completed");
    completedContainer.innerHTML = `<h3>Completed Sprints</h3>`;

    // Go through all sprints and put each sprint in the relevant container
    for (let i = 0; i < sprints.length; i++) {
        let currentSprint = new Sprint()
        currentSprint.fromJson(sprints[i]);

        let sprintName = currentSprint.getName();

        // Checking status and creating list entries in the appropriate containers
        if (currentSprint.getStatus() == "not-started") {
            // Adding list entry and button to view the sprint details
            notStartedContainter.innerHTML += `
            <li>${sprintName} 
                <button onclick="viewSprint(${i})">
                    <i class = "current-sprint-button"></i>
                    View Sprint
                </button>
            </li>`
        } else if (currentSprint.getStatus() == "in-progress") {
            inProgressContainer.innerHTML += `
            <li>${sprintName} 
                <button onclick="viewSprint(${i})">
                    <i class = "current-sprint-button"></i>
                    View Sprint
                </button>
            </li>`
        } else if (currentSprint.getStatus() == "completed") {
            completedContainer.innerHTML += `
            <li>${sprintName} 
                <button onclick="viewSprint(${i})">
                    <i class = "current-sprint-button"></i>
                    View Sprint
                </button>
            </li>`
        }

    }
}
// Run the function on page load to fill the lists
window.onload = rearrangeSprints();