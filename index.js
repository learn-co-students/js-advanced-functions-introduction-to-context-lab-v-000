function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  };
};


function createEmployeeRecords(array) {
  return array.map(e => createEmployeeRecord(e));
};


function createTimeInEvent(employee, timeIn) {
  const dateTime = timeIn.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    date: dateTime[0],
    hour: parseInt(dateTime[1], 10)
  });
  return employee;
};


function createTimeOutEvent(employee, timeOut) {
  const dateTime = timeOut.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    date: dateTime[0],
    hour: parseInt(dateTime[1], 10)
  });
  return employee;
};

function totalHoursWorked(employee) {
  const timeInArray = [];
  const timeOutArray = [];
  employee.timeInEvents.map(function(e) {
    timeInArray.push(e.hour);
  });
  employee.timeOutEvents.map(function(e) {
    timeOutArray.push(e.hour);
  });
  const timeIn = timeInArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  const timeOut = timeOutArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  return (timeOut - timeIn)/100;
};


function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.filter(e => e.date === date)[0].hour;
  const timeOut = employee.timeOutEvents.filter(e => e.date === date)[0].hour;
  return (timeOut - timeIn)/100;
};


function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  return hoursWorked * employee.payPerHour;
};

function allWagesFor(employee) {
  return totalHoursWorked(employee) * employee.payPerHour;
};

function calculatePayroll(employees) {
  return employees.reduce((accumulator, element) => accumulator + allWagesFor(element), 0);
};

function findEmployeeByFirstName(employees, name) {
  return employees.find(element => element.firstName === name);
}
