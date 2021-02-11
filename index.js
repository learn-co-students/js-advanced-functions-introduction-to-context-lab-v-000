
let createEmployeeRecord = function(record) {
  return {
    firstName: record[0],
    familyName: record[1],
    title: record[2],
    payPerHour: record[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

let createEmployeeRecords = function(records) {
  return records.map(record => {
    return createEmployeeRecord(record);
  })
}

function createTimeInEvent(employee, datetime) {
  let [date, hour] = datetime.split(' ');
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date
  })
  return employee;
}

function createTimeOutEvent(employee, datetime) {
  let [date, hour] = datetime.split(' ');
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date
  })
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  let clockedIn = employee.timeInEvents.find(element => element.date === date);
  let clockedOut = employee.timeOutEvents.find(element => element.date === date);
  return (clockedOut.hour - clockedIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  let totalAmountEarned = (hoursWorkedOnDate(employee, date))* employee.payPerHour;
  return totalAmountEarned;
}

function allWagesFor(employee) {
  let workingDates = employee.timeOutEvents.map(element => {
    return element.date;
  });
  let allWages = workingDates.reduce(function(base, date){
    return base + wagesEarnedOnDate(employee, date)
  }, 0)
  return allWages;
}

function calculatePayroll(employees) {
  let outstandingWages = employees.map(employee => {
    return allWagesFor(employee);
  })
  let totalPayRoll = outstandingWages.reduce(function(acumulator, currentValue){
    return acumulator + currentValue
  }, 0)
  return totalPayRoll;
}

let findEmployeeByFirstName = function(employees, firstName) {
  return employees.find(function(employee){
    return employee.firstName === firstName
  })
}
