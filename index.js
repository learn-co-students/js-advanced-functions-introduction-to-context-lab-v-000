// Your code here
let createEmployeeRecord = function(row){
  return {
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

// https://learn.co/tracks/full-stack-web-development-v8/module-14-front-end-web-programming-in-javascript/section-9-advanced-function-usage/js-advanced-functions-introduction-to-context-lab
// A 4-element Array of a String, String, String, and Number corresponding to a first name, family name, title, and pay rate per hour
function createEmployeeRecords(array) {
  return array.map(innerArray => createEmployeeRecord(innerArray));
}
/* This will accomplish the same thing:
let createEmployeeRecords = (array) => {
  return array.map(nestedArray => createEmployeeRecord(nestedArray))
}
*/

// Argument(s): arrray of arrays....returns array of objects:
function createTimeInEvent(array, time){
  let object = {
    type: "TimeIn",
    date: time.split(" ")[0],
    hour: parseInt(time.split(" ")[1]),
  };
  array.timeInEvents.push(object);
  return array;
}

function createTimeOutEvent(array2, time2) {
  let object2 = {
    type: "TimeOut",
    date: time2.split(" ")[0],
    hour: parseInt(time2.split(" ")[1]),
  };
  array2.timeOutEvents.push(object2);
  return array2;
}

function hoursWorkedOnDate(employee, date) {
  let timeIn = employee.timeInEvents.find(timeInObj => {
    return timeInObj.date === date;
  });
  let timeOut = employee.timeOutEvents.find(timeOutObj => {
    return timeOutObj.date === date;
  });
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, time) {
  return hoursWorkedOnDate(employee, time) * employee.payPerHour;
}

function allWagesFor(employee) {
  let workDates = employee.timeInEvents.map(time => time.date);
  return workDates.reduce((allWages, date) => {
    return wagesEarnedOnDate(employee, date) + allWages;
  }, 0);
}

function calculatePayroll(firstVar) {
  return firstVar.reduce((secondVar, thirdvar) => {
    return allWagesFor(thirdvar) + secondVar;
  }, 0);
}
/* Alternatvely:
let calculatePayroll = (firstVar) => {
    let outputValue = firstVar.reduce((secondVar, thirdVar) => {return secondVar + allWagesFor(thirdVar)}, 0)
    return outputValue
}
*/


function findEmployeeByFirstName(firstVar, secondVar) {
  return firstVar.find(function(thirdVar) {
    return thirdVar.firstName === secondVar
  });
}
/* Alternatvely:
let findEmployeeByFirstName = (firstVar,secondVar) => {
   let output = firstVar.find(thirdVar => thirdVar.firstName === secondVar)
   return output
}
*/
