// Your code here
function createEmployeeRecord(array) {
  let record = {};
  record.firstName = array[0];
  record.familyName = array[1];
  record.title = array[2];
  record.payPerHour = array[3];
  record.timeInEvents = [];
  record.timeOutEvents = [];
  return record;
}

function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map(array => createEmployeeRecord(array));
}

function createTimeInEvent(emp, dateTime) {
  let dateArray = dateTime.split(" ");
  let date = dateArray[0];
  let time = dateArray[1];
  let e = Object.create(Object.prototype, {
    type: { value: "TimeIn" },
    date: { value: date },
    hour: { value: Number(time) }
  });
  emp.timeInEvents.push(e);
  return emp;
}

function createTimeOutEvent(emp, dateTime) {
  let dateArray = dateTime.split(" ");
  let date = dateArray[0];
  let time = dateArray[1];
  let e = Object.create(Object.prototype, {
    type: { value: "TimeOut" },
    date: { value: date },
    hour: { value: Number(time) }
  });
  emp.timeOutEvents.push(e);
  return emp;
}

function hoursWorkedOnDate(emp, date) {
  let timeIn = emp.timeInEvents.find(event => event.date == date).hour / 100;
  let timeOut = emp.timeOutEvents.find(event => event.date == date).hour / 100;
  return timeOut - timeIn;
}

function wagesEarnedOnDate(emp, date) {
  let wages = hoursWorkedOnDate(emp, date) * emp.payPerHour;
  return wages;
}

function allWagesFor(emp) {
  let daysWorked = emp.timeInEvents.map(e => e.date);

  let payOwed = daysWorked.reduce(function(accumulator, currentValue) {
    return accumulator + wagesEarnedOnDate(emp, currentValue);
  }, 0);

  return payOwed;
}

function calculatePayroll(arr) {
  let amounts = arr.map(e => allWagesFor(e));
  let payroll = amounts.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
  }, 0);

  return payroll;
}

function findEmployeeByFirstName(source, query) {
  return source.find(e => e.firstName == query);
}
