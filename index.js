// Your code here
function createEmployeeRecord(employee) {
  return Object.assign({}, {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
  });
}


function createEmployeeRecords(employees) {
  return employees.map(createEmployeeRecord);
}


function createTimeInEvent(employee, dateTime) {
  const type = 'TimeIn';
  const dateTimeArray = dateTime.split(' ');
  const date = dateTimeArray[0];
  const hour = parseInt(dateTimeArray[1]);
  employee.timeInEvents.push({
    type: type,
    date: date,
    hour: hour
  });
  return employee;
}


function createTimeOutEvent(employee, dateTime) {
  const type = 'TimeOut';
  const dateTimeArray = dateTime.split(' ');
  const date = dateTimeArray[0];
  const hour = parseInt(dateTimeArray[1]);
  employee.timeOutEvents.push({
    type: type,
    date: date,
    hour: hour
  });
  return employee;
}


function hoursWorkedOnDate(employee, dateWorked) {
  const timeInRecord = employee.timeInEvents.find(function(timeInEvent){
      return timeInEvent.date === dateWorked;
  })
  const hourIn = timeInRecord.hour;

  const timeOutRecord = employee.timeOutEvents.find(function(timeOutEvent){
      return timeOutEvent.date === dateWorked;
  })
  const hourOut = timeOutRecord.hour;
  const hoursWorked = (hourOut - hourIn) / 100;
  return hoursWorked;
}



function wagesEarnedOnDate(employee, dateWorked) {
  const hoursWorked = hoursWorkedOnDate(employee, dateWorked);
  const wage = employee.payPerHour;
  return hoursWorked * wage;
}



function allWagesFor(employee) {
  const dates = employee.timeInEvents.map(function(timeInEvent){
    return timeInEvent.date;
  })

  const wages = dates.map(function(date){
    return wagesEarnedOnDate(employee, date);
  })

  const totalWages = wages.reduce((total, element) => element + total, 0);

  return totalWages;
}



function calculatePayroll(employees) {
  const wages = employees.map(function(employee) {
    return allWagesFor(employee);
  })

  const totalWages = wages.reduce((total, element) => element + total, 0);

  return totalWages;
}



function findEmployeeByFirstName(employees, firstName) {
  return employees.find(function(employee) {
    return employee.firstName === firstName;
  })
}
