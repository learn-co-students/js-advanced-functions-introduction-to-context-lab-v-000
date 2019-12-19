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

function createEmployeeRecords(employeesInfo) {
  return employeesInfo.map(employeeInfo => createEmployeeRecord(employeeInfo));
}

function createTimeInEvent(employee, timeIn){
  let timeInObj = {
    type: "TimeIn",
    date: timeIn.split(" ")[0],
    hour: parseInt(timeIn.split(" ")[1]),
  };
  employee.timeInEvents.push(timeInObj);
  return employee;
}

function createTimeOutEvent(employee, timeOut) {
  let timeOutObj = {
    type: "TimeOut",
    date: timeOut.split(" ")[0],
    hour: parseInt(timeOut.split(" ")[1]),
  };
  employee.timeOutEvents.push(timeOutObj);
  return employee;
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

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee) {
  let workDates = employee.timeInEvents.map(time => time.date);
  return workDates.reduce((allWages, date) => {
    return wagesEarnedOnDate(employee, date) + allWages;
  }, 0);
}

function calculatePayroll(employees) {
  return employees.reduce((totalPay, employee) => {
    return allWagesFor(employee) + totalPay;
  }, 0);
}

function findEmployeeByFirstName(employees, name) {
  return employees.find(function(employee) {
    return employee.firstName === name
  });
}
