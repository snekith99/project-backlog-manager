/**
 * This file is used to add member
 * 
 * Author: Snekith
 * Version: 1.0
 * Last Modified: 17/06/2023
 */


/**
 * This function is used to create a member and add to local storage
 */
function addMember() {

    // Retreive inputs (name, email)
    var name = document.getElementById("full-name").value;
    var email = document.getElementById("email-address").value;

    // Check for null inputs
    if (name == "" || email == "" || !email.includes("@")) {
        return;
    }

    // Create an instance of class member
    try {
        var member = new Member(name, email);
    } catch (err) {
        window.alert(err);
        return;
    }

    // Add the member to the list in local storage
    if (localStorage.getItem("team") == null) {
        const team = [];
        team.push(member);
        localStorage.setItem("team", JSON.stringify(team));
    } else {
        const team = JSON.parse(localStorage.getItem("team"));
        team.push(member);
        localStorage.setItem("team", JSON.stringify(team));
    }

    // Alert user that member has been added
    window.alert("Member " + name + " added!");
}