// Your code here
function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
};

function createEmployeeRecords(arrays) {
  return arrays.map(array => createEmployeeRecord(array))
  };

function createTimeInEvent(employee, dateHoursStr) {
  const timeIn = {
    type: "TimeIn",
    hour: parseInt(dateHoursStr.slice(-4)),
    date: dateHoursStr.slice(0,10)
  };
  employee['timeInEvents'].push(timeIn);
  return employee
};

function createTimeOutEvent(employee, dateHoursStr) {
  const timeOut = {
    type: "TimeOut",
    hour: parseInt(dateHoursStr.slice(-4)),
    date: dateHoursStr.slice(0,10)
  };
  employee['timeOutEvents'].push(timeOut);
  return employee
};


function hoursWorkedOnDate(employee, date) {
  const timeInObj = employee['timeInEvents'].find(element => element.date === date);
  const timeOutObj = employee['timeOutEvents'].find(element => element.date === date);
  const hours = (timeOutObj.hour - timeInObj.hour)/100;
  return hours
}

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee) {
  const dates = employee.timeInEvents.map(element => element.date);
  return dates.reduce( (total, date) => total + wagesEarnedOnDate(employee, date), 0)
  }

function calculatePayroll(employees) {
  return employees.reduce( (total, employee) => total + allWagesFor(employee), 0)
}

function findEmployeeByFirstName(srcArray, firstNameString) {
  return srcArray.find(employee => employee.firstName === firstNameString)
}

