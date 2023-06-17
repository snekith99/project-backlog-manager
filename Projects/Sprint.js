/**
 * This file is used as a constructor to create/delete/edit Sprint objects
 * 
 * Author: Snekith
 * Version: 1.0
 * Last Modified: 29/9/22
 */


/**
 * Sprint class used to store information about the sprint
 */
class Sprint {
    /**
     * Constructor of task class
     * @param {*} name - Name of sprint
     * @param {*} startDate - Start date of the sprint
     * @param {*} endDate - End date of the sprint
     * @param {*} tasks - List of tasks assigned to the sprint
     * @param {*} status - Status of the Sprint
     
     */
    constructor(name, startDate, endDate, tasks, status) {
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.tasks = tasks;
        this.status = status;
        this.logHistory = [];
    }

    /**
     * Getter for name
     * @returns Name of sprint
     */
    getName() {
        return this.name
    }

    /**
     * Getter for tasks
     * @returns List of tasks
     */
    getTasks() {
        if (this.tasks == null) {
            this.tasks = []
        }
        return this.tasks;
    }

    /**
     * Getter for status
     * @returns status of the sprint
     */
    getStatus() {
        return this.status;
    }

    /**
     * Getter for log history
     * @returns log history of dates and story points
     */
    getLogHistory() {
        return this.logHistory;
    }

    /**
     * Adds a log entry to the log history list
     * @param {[Date, storyPoints]} - Log date and story points completed on that date
     */
    addToLogHistory(newLogEntry) {
        this.logHistory.push(newLogEntry);
    }

    /**
     * Getter for total story points
     * @returns total story points of all tasks in a sprint
     */
    getTotalStoryPoints() {
        var totalStoryPoints = 0;
        for (let i = 0; i < this.tasks.length; i++) {
            totalStoryPoints += parseInt(this.tasks[i].storyPoints);
        }
        return totalStoryPoints;
    }

    /**
     * Getter for start date
     * @returns startDate of the sprint
     */
    getStartDate() {
        return this.startDate;
    }

    /**
     * Getter for end date
     * @returns endDate of the sprint
     */
    getEndDate() {
        return this.endDate;
    }

    /**
     * Setter for sprint tasks
     * @param {*} newTasks - New task list
     */
    setTasks(newTasks) {
        this.tasks = newTasks;
    }

    /**
     * Setter for sprint status
     * @param {*} newStatus - New sprint status
     */
    setStatus(newStatus) {
        this.status = newStatus;
    }

    /**
     * Converts JSON content
     * @param {*} json - JSON content
     */
    fromJson(json) {
        this.name = json.name;
        this.startDate = json.startDate;
        this.endDate = json.endDate;
        this.tasks = json.tasks;
        this.status = json.status;
        this.logHistory = json.logHistory;
    }

    /**
     * Adds a task to the task list
     * @param {*} task - Task to be added
     */
    addTask(task) {
        if (this.tasks == null) {
            this.tasks = [];
        }
        this.tasks.push(task);
    }

    /**
     * Removes a Task from the task list
     * @param {*} index - Index of task to be removed
     */
    deleteTask(index) {
        return this.tasks.splice(index, 1)[0];
    }
}