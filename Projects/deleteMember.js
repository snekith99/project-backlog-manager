/**
 * This file is used to delete member from the team list.
 * 
 * Author: Snekith
 * Version: 1.0
 * Last Modified: 17/10/22
 */


/**
 * This function is used to delete a member from the team list
 */
function deleteMember(selectedMemberIndex) {

    // Confirmation message
    if (window.confirm("Are you sure you want to remove this member?")) {

        // Get team list
        let team = JSON.parse(localStorage.getItem("team"));

        // Delete from array and setItem to localStorage
        team.splice(selectedMemberIndex, 1);
        localStorage.setItem("team", JSON.stringify(team));

        // Refresh card layout
        location.reload();
    }
    else {
        return;
    }

} 