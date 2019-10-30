// Your code here
function createEmployeeRecord(employeeInfo) {
  return Object.assign({}, {
    firstName: employeeInfo[0],
    familyName: employeeInfo[1],
    title: employeeInfo[2],
    payPerHour: employeeInfo[3],
    timeInEvents: [],
    timeOutEvents: [],
  });
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

// You can expand your learning by:
//
// Raise an exception if a timeIn is found without a matching timeOut
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
// Figure out how to turn a time stamp into a construct that allows for you to handle across day and non-o'clock times
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
// Raise errors if the time stamp is in an invalid format
