/**
 * This file is used to view the member analytics graph and information
 * 
 * Author: Snekith
 * Version: 1.0
 * Last Modified: 16/10/22
 */

/**
 * This function is used to create a list of dates (daily) from a start date to an end date
 * @param {Date} startDate - start (first) date of the list
 * @param {Date} status - end (last) date of the list
 * @returns List of dates
 */
function getDates(startDate, endDate) {
    let dates = []
    let currentDate = startDate;
    // Add 1 day at a time until end date is reached
    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dates;
}

/**
 * This function is used to add days to a date
 * @param {*} days - number of days to be added
 * @returns date after days are added
 */
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function memberGraph() {

    // Get the current sprint
    let sprints = JSON.parse(localStorage.getItem("sprints"));
    let currentSprint;
    let sprintStartDate;
    let sprintEndDate;

    // Iterate through the sprints
    for (let i = 0; i < sprints.length; i++) {
        currentSprint = new Sprint();
        currentSprint.fromJson(sprints[i]);

        // Check if any sprint is active
        if (currentSprint.getStatus() == "in-progress") {
            // Calculate number of days in the sprint
            sprintStartDate = new Date(currentSprint.getStartDate());
            sprintEndDate = new Date(currentSprint.getEndDate());
            break;
        }
    }

    // Check if current sprint is null
    if (currentSprint == null) {

        // Alert user that there is no current active sprint
        window.alert("No active sprint!");
        return;
    }

    // Create a list of all dates between start and end date (will be used for the x axis)
    const days = getDates(sprintStartDate, sprintEndDate);

    // Get current member index
    let selectedMemberIndex = JSON.parse(localStorage.getItem("selectedMemberIndex"));

    // Get current member
    let team = JSON.parse(localStorage.getItem("team"));
    let currentMember = new Member();
    currentMember.fromJson(team[selectedMemberIndex]);


    // Creating information for pop up
    let memberName = currentMember.getName();
    let sprintName = currentSprint.getName();
    let fullInformation = sprintName + " - " + memberName;

    // Inputting information to HTML file
    document.getElementById("sprint-member-information").innerHTML = fullInformation;

    // Get log history
    let logHistory = currentMember.getLogHistory();

    // Define story points (y values for graph)
    let storyPointsList = [];

    // Fill story points list with zeros
    for (let i = 0; i < days.length; i++) {
        storyPointsList.push(0);
    }

    // Iterate through list of days
    for (let i = 0; i < days.length; i++) {

        for (let j = 0; j < logHistory.length; j++) {

            // Create log date and current date
            let logDate = new Date(logHistory[j][0]);
            let currentDate = new Date(days[i]);

            // Check if log date and current date are the same
            if (logDate.toDateString() == currentDate.toDateString()) {

                // Assign to y value for graph
                storyPointsList[i] += logHistory[j][1] / 240;

            }
        }
    }

    // Convert dates to string to be used as x axis labels
    for (let i = 0; i < days.length; i++) {
        let currentDate = new Date(days[i]);
        days[i] = currentDate.toLocaleDateString("en-AU")
    }

    // Creating new chart object
    new Chart("team-member-analytics", {

        // Creating Bar Graph
        type: "bar",
        data: {

            // X axis values
            labels: days,

            // Y axis values
            datasets:
                [{
                    data: storyPointsList
                }]
        },

        // No legend and creating title
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: "Member Analytics"
            }
        }
    });
}
