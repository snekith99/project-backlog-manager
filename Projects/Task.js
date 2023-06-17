/**
 * This file is used as a constructor to create/delete/edit Task objects
 * 
 * Author: Snekith
 * Version: 1.0
 * Last Modified: 9/9/22
 */


/**
 * Task class used to store information of the tasks 
 */
class Task {
    /**
     * Constructor of task class
     * @param {*} taskName - Name of task
     * @param {*} assignee - Assignee of task
     * @param {*} storyPoints - Story points for task
     * @param {*} priority - Priority of task
     * @param {*} status - Status of task
     * @param {*} description - Description of task
     * @param {*} tag - Tag assigned for task
     * @param {*} type - Type of task     
     */
    constructor(taskName, assignee, storyPoints, priority, status, description, tag, type) {

        // Check if empty field
        if (taskName == "" || status == "" || assignee == "" || description == "" || type == "") {
            throw 'No input has been entered. Please try again!';
        }

        // Initialising varaibles in constructor
        this.taskName = taskName;
        this.assignee = assignee;
        this.storyPoints = storyPoints;
        this.description = description;
        this.priority = priority;
        this.status = status;
        this.tag = tag;
        this.type = type;
        this.logDate;
        this.logTime;
        this.totalLoggedTime;
    }

    /**
     * Getter for name
     * @returns Name of task
     */
    getName() {
        return this.taskName;
    }

    /**
     * Getter for type
     * @returns Type of task
     */
    getType() {
        return this.type;
    }

    /**
     * Getter for assignee
     * @returns Assignee of task
     */
    getAssignee() {
        return this.assignee;
    }

    /**
     * Getter for story points
     * @returns Story points of task
     */
    getStoryPoints() {
        return this.storyPoints;
    }

    /**
     * Getter for priority
     * @returns Priority of task
     */
    getPriority() {
        return this.priority;
    }

    /**
     * Getter for status 
     * @returns Status of task
     */
    getStatus() {
        return this.status;
    }

    /**
     * Getter for description
     * @returns Description of task
     */
    getDescription() {
        return this.description;
    }

    /**
     * Getter for tags
     * @returns Tags of task
     */
    getTag() {
        return this.tag;
    }

    /**
     * Getter for log date
     * @returns Log date of task
     */
    getLogDate() {
        return this.logDate;
    }

    /**
     * Getter for log time
     * @returns Log time of task
     */
    getLogTime() {
        return this.logTime;
    }

    /**
     * Getter for total logged time
     * @returns Total logged time of task
     */
    getTotalLoggedTime() {
        if (isNaN(this.totalLoggedTime)) {
            return 0;
        }
        return this.totalLoggedTime;
    }


    /**
     * Setter for task name
     * @param {*} newTaskName - New task name
     */
    setName(newTaskName) {
        newTaskName = newTaskName.trim();
        if (newTaskName == "") {
            throw 'Enter a name for the task';
        }
        this.taskName = newTaskName;
    }

    /**
     * Setter for task type
     * @param {*} newType - New type
     */
    setType(newType) {
        newType = newType.trim();
        if (newType == "") {
            throw 'Enter a type task';
        }
        this.type = newType;
    }

    /**
     * Setter for task assignee
     * @param {*} newAssignee - New assignee
     */
    setAssignee(newAssignee) {
        newAssignee = newAssignee.trim();
        if (newAssignee == "") {
            throw "Enter assignee's name";
        }
        this.assignee = newAssignee;
    }

    /**
     * Setter for task story points
     * @param {} newStoryPoints - New story points
     */
    setStoryPoints(newStoryPoints) {
        var storyPointsInt = parseInt(newStoryPoints);
        if (newStoryPoints == 0 || newStoryPoints == "" || Number.isNaN(storyPointsInt)) {
            throw "Invalid story point";
        }
        this.storyPoints = newStoryPoints;
    }

    /**
     * Setter for task priority
     * @param {} newPriority - New priority
     */
    setPriority(newPriority) {
        newPriority = newPriority.trim();
        if (newPriority == "") {
            throw "Enter a priority";
        }
        this.priority = newPriority;
    }

    /**
     * Setter for task status
     * @param {*} newStatus - New status
     */
    setStatus(newStatus) {
        newStatus = newStatus.trim();
        if (newStatus == "") {
            throw "Enter a status";
        }
        this.status = newStatus;
    }

    /**
     * Setter for task description
     * @param {} newDescription - New description
     */
    setDescription(newDescription) {
        newDescription = newDescription.trim();
        if (newDescription == "") {
            throw "Enter a description";
        }
        this.description = newDescription;
    }

    /**
     * Setter for task tags
     * @param {} newTags - New tags
     */
    setTag(newTag) {
        if (newTag == "") {
            throw "Select tag";
        }
        this.tag = newTag;
    }

    /**
     * Setter for log date
     * @param {} newLogDate - New log date
     */
    setLogDate(newLogDate) {
        if (newLogDate == "") {
            throw "Select Log Date"
        }
        this.logDate = newLogDate
    }

    /**
     * Setter for log time
     * @param {*} newLogTime - New log time
     */
    setLogTime(newLogTime) {
        if (newLogTime == "") {
            throw "Select Log Time"
        }
        this.logTime = newLogTime
    }

    /**
     * Setter for total logged time
     * @param {} newTotalLogTime - New total logged time
     */
    setTotalLoggedTime(newTotalLoggedTime) {
        if (newTotalLoggedTime == "") {
            throw "Select Total Logged Time"
        }
        this.totalLoggedTime = newTotalLoggedTime
    }

    /**
   * Adds time to total logged time
   * @param {*} time - Time to be added
   */
    addTime(time) {
        if (isNaN(time)) {
            throw "Invalid input";
        } else {
            this.totalLoggedTime += time;
        }
    }

    /**
     * Converts JSON content
     * @param {*} json - JSON content
     */
    fromJson(json) {
        this.taskName = json.taskName;
        this.assignee = json.assignee;
        this.storyPoints = json.storyPoints;
        this.priority = json.priority;
        this.status = json.status;
        this.description = json.description;
        this.tag = json.tag;
        this.type = json.type;
        this.logDate = json.logDate;
        this.logTime = json.logTime;
        this.totalLoggedTime = json.totalLoggedTime;
    }
}