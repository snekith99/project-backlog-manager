/**
 * This file is responsible for displaying the burndown chart
 * 
 * Author: Snekith
 * Version: 1.0
 * Last Modified: 9/10/22
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

function openBurndown() {
  document.getElementById("burndown-popup").style.display = "block";

  // Get the current sprint
  let selectedSprintIndex = localStorage.getItem("selectedSprintIndex")
  let sprints = JSON.parse(localStorage.getItem("sprints"));

  let currentSprint = new Sprint();
  currentSprint.fromJson(sprints[selectedSprintIndex]);

  // Get total story points
  let totalStoryPoints = currentSprint.getTotalStoryPoints();

  // Get logging history for the sprint
  const logHistory = currentSprint.getLogHistory();

  // Calculate number of days in the sprint
  let startDate = new Date(currentSprint.getStartDate());
  let endDate = new Date(currentSprint.getEndDate());
  let numberOfDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));

  // Create a list of all dates between start and end date (will be used for the x axis)
  const days = getDates(startDate, endDate);

  // Calculate ideal velocity's story points per day
  let storyPointsPerDay = totalStoryPoints / numberOfDays;

  // Initialize lists for chart
  const actualVelocity = [];
  const accumulateEffort = [];
  const idealVelocity = [];

  // Calculate Y axis values for ideal velocity
  for (let i = 0; i < days.length; i++) {
    idealVelocity.push(totalStoryPoints - i * storyPointsPerDay);
  }

  // Fill accumlate effort list with zeros
  for (let i = 0; i < days.length; i++) {
    accumulateEffort.push(0)
  }

  // Keep track of last logged date
  let lastLogIndex;

  // Go through every day in the sprint and check if any logHistory entries match that date
  for (let i = 0; i < days.length; i++) {
    for (let j = 0; j < logHistory.length; j++) {
      let logDate = new Date(logHistory[j][0])
      let currentDate = new Date(days[i])
      // If an entry matches, add the story points to the accumulate effort and update lastLogIndex
      if (logDate.toDateString() == currentDate.toDateString()) {
        accumulateEffort[i] += logHistory[j][1]
        lastLogIndex = i;
      }
    }
    // Accumulate previous dates' effort
    if (i > 0) {
      accumulateEffort[i] += accumulateEffort[i - 1]
    }
  }
  // Remove entries after the last log date (to prevent flat line to end date in chart)
  accumulateEffort.splice(lastLogIndex + 1)

  // Fill actual velocity list by subtracting total story points from accumulate effort list
  for (let i = 0; i < accumulateEffort.length; i++) {
    actualVelocity.push(totalStoryPoints - accumulateEffort[i])
  }

  // Convert dates to string to be used as x axis labels
  for (let i = 0; i < days.length; i++) {
    let currentDate = new Date(days[i]);
    days[i] = currentDate.toLocaleDateString("en-AU")
  }

  // Make minimum and maximum Y axis values adaptive (based on time logged)
  let minY = 0;
  let maxY = totalStoryPoints;
  if (totalStoryPoints < accumulateEffort[accumulateEffort.length - 1]) {
    maxY = accumulateEffort[accumulateEffort.length - 1];
  }
  if (actualVelocity[actualVelocity.length - 1] < 0) {
    minY = actualVelocity[actualVelocity.length - 1];
  }
  // Draw the chart
  new Chart("burndown-chart", {
    type: 'line',
    data: {
      labels: days,
      // Use the lists as Y values for 3 line graphs
      datasets: [
        {
          label: "Actual Velocity",
          fill: false,
          lineTension: 0,
          backgroundColor: "green",
          borderColor: "green",
          steppedLine: true,
          data: actualVelocity
        },
        {
          label: "Accumulate Effort",
          fill: false,
          lineTension: 0,
          backgroundColor: "blue",
          borderColor: "blue",
          steppedLine: true,
          data: accumulateEffort
        },
        {
          label: "Ideal Velocity",
          fill: false,
          lineTension: 0,
          backgroundColor: "red",
          borderColor: "red",
          data: idealVelocity
        }]
    },
    options: {
      lineTension: 0,
      legend: { display: true, position: 'bottom' },
      scales: {
        yAxes: [{ ticks: { min: minY, max: maxY } }],
      }
    }
  });
}
