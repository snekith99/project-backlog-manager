/**
 * This file is used to display the dashboard
 * 
 * Author: Snekith
 * Version: 1.0
 * Last Modified: 17/06/2023
 */

function runDashboard() {
    // Get the current sprint
    let sprintEndDate;
    let sprintStartDate;
    let sprints = JSON.parse(localStorage.getItem("sprints"));
    let currentSprint;
    for (let i = 0; i < sprints.length; i++) {
        currentSprint = new Sprint()
        currentSprint.fromJson(sprints[i])
        if (currentSprint.getStatus() == "in-progress") {
            break
        }
    }
    if (currentSprint == null) {
        window.alert("No active sprint")
        return
    }
    else {
        // Calculate number of days in the sprint
        sprintStartDate = new Date(currentSprint.getStartDate());
        sprintEndDate = new Date(currentSprint.getEndDate());
    }


    let startDate = new Date(document.getElementById("start-date").value);
    let endDate = new Date(document.getElementById("end-date").value);
    let numberOfDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1;

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return;
    }

    if (startDate > endDate) {
        window.alert("Start date must be before end date");
    }
    //Error check if date range is within active sprint
    if (startDate < sprintStartDate || startDate > sprintEndDate) {
        window.alert("Invalid Start Date: start date must be between sprint start and end date.\nStart Date: " + sprintStartDate.toLocaleDateString("en-AU") + " \t End Date: " + sprintEndDate.toLocaleDateString("en-AU"));
        return
    }

    if (endDate < sprintStartDate || endDate > sprintEndDate) {
        window.alert("Invalid End Date: end date must be between sprint start and end date.\nStart Date: " + sprintStartDate.toLocaleDateString("en-AU") + " \t End Date: " + sprintEndDate.toLocaleDateString("en-AU"));;
        return
    }


    let team = JSON.parse(localStorage.getItem("team"))


    let totalWork = 0;
    let avgWork = 0;

    // Go through every member of the team and check for logTime when logdate is in range of the start and end date
    let teamListContainer = document.getElementById("member-list");
    teamListContainer.innerHTML = "";
    for (let i = 0; i < team.length; i++) {
        let currentMember = new Member();
        currentMember.fromJson(team[i]);
        totalWork = 0;
        avgWork = 0;
        let currentLogHistory = currentMember.getLogHistory();
        for (let j = 0; j < currentLogHistory.length; j++) {
            // if the logDate is in the range add the logTime to totalWork
            let currentDate = new Date(currentLogHistory[j][0]);
            //let check = currentDate.toDateString() >= startDate.toDateString();
            //let check2 = currentDate.toDateString()<= endDate.toDateString()
            if (currentDate >= startDate && currentDate <= endDate) {
                totalWork += currentLogHistory[j][1];
            }
            avgWork = totalWork / numberOfDays;
        }

        teamListContainer.innerHTML += `<tr>
        <td>${currentMember.getName()} </td>
        <td>${avgWork} Minutes</td>
        </tr> `
    }
}
