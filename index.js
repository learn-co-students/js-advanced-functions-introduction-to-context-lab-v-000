function createEmployeeRecord(arr) {
  const employee = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  };
  return employee;
}

function createEmployeeRecords(arr) {
  const employees = arr.map(function (employee) {
    return createEmployeeRecord(employee);
  });
  return employees;
}

function createTimeInEvent(employee, date) {
  const dateTime = date.split(" ");
  const stamp = {
    type: "TimeIn",
    date: dateTime[0],
    hour: Number(dateTime[1])
  }
  employee.timeInEvents.push(stamp);
  return employee;
}

function createTimeOutEvent(employee, date) {
  const dateTime = date.split(" ");
  const stamp = {
    type: "TimeOut",
    date: dateTime[0],
    hour: Number(dateTime[1])
  }
  employee.timeOutEvents.push(stamp);
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  const start = employee.timeInEvents.find(time => time.date === date);
  const end = employee.timeOutEvents.find(time => time.date === date);
  return (end.hour - start.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  return employee.payPerHour * hoursWorkedOnDate(employee, date);
}

function allWagesFor(employee) {
  let wagesEarned = employee.timeInEvents.map(function (dateTime) {
    return wagesEarnedOnDate(employee, dateTime.date);
  })
  return wagesEarned.reduce((total, wage) => wage + total);
}

function calculatePayroll(employees) {
  const wagesEarned = employees.map(function (employee) {
    return allWagesFor(employee);
  })
  return wagesEarned.reduce((total, wage) => wage + total)
}

function findEmployeeByFirstName(employees, firstName) {
  return employees.find(employee => employee.firstName === firstName)
}
