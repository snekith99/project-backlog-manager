/**
 * This file is used to add tasks to the sprint backlog
 * 
 * Author: Snekith
 * Version: 1.0
 * Last Modified: 29/9/22
 */


/**
 * This function is used to create a sprint and add to local storage
 */
function createSprint() {

    // Retreive inputs (name, start date, end date)
    var name = document.getElementById("sprint-name").value;
    var startDate = new Date(document.getElementById("sprint-start").value);
    var endDate = new Date(document.getElementById("sprint-end").value);
    var status = "not-started";

    // Check for null inputs
    if (name == "" || isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return;
    }
    // Check if endDate has already passed
    if (endDate < Date.now()) {
        window.alert("End date cannot be in the past");
        return;
    }
    // Check if start date is later than end date
    if (startDate > endDate) {
        window.alert("Start date can't be later than end date");
        return;
    }

    // Create an instance of class Sprint
    try {
        var sprint = new Sprint(name, startDate, endDate, [], status);
    } catch (err) {
        window.alert(err);
        return;
    }

    // Add the sprint to the list in local storage
    if (localStorage.getItem("sprints") == null) {
        const sprints = [];
        sprints.push(sprint);
        localStorage.setItem("sprints", JSON.stringify(sprints));
    } else {
        const sprints = JSON.parse(localStorage.getItem("sprints"));
        sprints.push(sprint);
        localStorage.setItem("sprints", JSON.stringify(sprints));
    }

    // Alert user that sprint has been added
    window.alert("Sprint " + name + " added!");
}