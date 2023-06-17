/**
 * This is used to Complete a Sprint
 * Author: Snekith
 * Version: 1.0
 * Last Modified: 29/9/22
 */

function completeSprint() {
    // Confirmation message
    if (window.confirm("Do you wish to complete this sprint?")) {

        // get data of the sprint to complete
        let selectedSprintIndex = localStorage.getItem("selectedSprintIndex")
        let sprints = JSON.parse(localStorage.getItem("sprints"))

        //current sprint to edit
        let currentSprint = new Sprint()
        currentSprint.fromJson(sprints[selectedSprintIndex])

        // setting status to complete
        currentSprint.setStatus("completed")

        // save
        sprints[selectedSprintIndex] = currentSprint

        // Updating local storage
        localStorage.setItem("sprints", JSON.stringify(sprints))

        // Clear members' log history
        const team = JSON.parse(localStorage.getItem("team"));
        for (let i = 0; i < team.length; i++) {
            let currentMember = new Member();
            currentMember.fromJson(team[i]);
            currentMember.setLogHistory([]);
            team[i] = currentMember;
        }

        localStorage.setItem("team", JSON.stringify(team))

        window.location.href = "sprintBacklog.html"
    }

}