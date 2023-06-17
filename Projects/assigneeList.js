/**
 * This file is used to fill assignee list with member from the team list
 * 
 * Author: Snekith
 * Version: 1.0
 * Last Modified: 17/06/2023
 */


/**
 * This function is used to fill the assignee list
 * @param {*} htmlId - Id of the html select element that will have the team list
 */
function assigneeList(htmlId) {
    // Getting the team list
    const team = JSON.parse(localStorage.getItem("team"));

    if (team == null || team.length == 0) {
        window.alert("No member in team list found. Please add members through the team list page")
    }
    let assigneeListContainer = document.getElementById(htmlId);
    assigneeListContainer.innerHTML = "";

    // Adding options for every member with value = member's name
    for (let i = 0; i < team.length; i++) {
        let member = new Member();
        member.fromJson(team[i]);
        let name = member.getName();

        assigneeListContainer.innerHTML += `
        <option value="${name}">${name}</option>`
    }
}