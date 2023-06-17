/**
 * This file is used to define a member class
 * 
 * Author: Snekith
 * Version: 1.0
 * Last Modified: 13/10/22
 */

class Member {
    /**
     * Constructor of member class
     * @param {*} name - Name of member
     * @param {*} email - Email of member
     */
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.logHistory = [];
    }
    /**
     * Getter for name
     * @returns Name of member
     */
    getName() {
        return this.name;
    }
    /**
     * Getter for email
     * @returns email of member
     */
    getEmail() {
        return this.email;
    }
    /**
     * Getter for log history
     * @returns log history array of member
     */
    getLogHistory() {
        return this.logHistory;
    }
    /**
     * Setter for log history
     * @param {*} newLogHistory - New log history list
     */
    setLogHistory(newLogHistory) {
        this.logHistory = newLogHistory;
    }
    /**
     * Adds an entry to the log history
     * @param {Date} logDate - Logging date
     * @param {number} minutes - minutes logged to task
     */
    addToLogHistory(logDate, minutes) {
        this.logHistory.push([logDate, minutes]);
    }
    /**
     * Setter for member name
     * @param {*} newName - New member name
     */
    setName(newName) {
        this.name = newName;
    }
    /**
     * Setter for member email
     * @param {*} newEmail - New member email
     */
    setEmail(newEmail) {
        this.email = newEmail;
    }
    /**
     * Fill attributes using json string
     * @param {*} json - json string for member
     */
    fromJson(json) {
        this.name = json.name;
        this.email = json.email;
        this.logHistory = json.logHistory;
    }
}