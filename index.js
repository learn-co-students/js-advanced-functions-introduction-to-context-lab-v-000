// Your code here
function createEmployeeRecord(arrOfEmployee) {
  return Object.assign({}, { firstName: arrOfEmployee[0], familyName: arrOfEmployee[1], title: arrOfEmployee[2], payPerHour: arrOfEmployee[3], timeInEvents: [], timeOutEvents: []})
}

function createEmployeeRecords(arrOfEmployees) {
  return arrOfEmployees.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(employee, datestamp) {
  const [date, hour] = datestamp.split(' ');
  const newTimeInEvent = Object.assign({}, { type: 'TimeIn', hour: parseInt(hour), date: date})
  employee.timeInEvents.push(newTimeInEvent);
  return employee;
}

function createTimeOutEvent(employee, datestamp) {
  const [date, hour] = datestamp.split(' ');
  const newTimeOutEvent = Object.assign({}, { type: 'TimeOut', hour: parseInt(hour), date: date})
  employee.timeOutEvents.push(newTimeOutEvent);
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  const timeInHour = employee.timeInEvents.find( x => x.date === date).hour;
  const timeOutHour = employee.timeOutEvents.find( x => x.date === date).hour;
  return (timeOutHour - timeInHour)/100;
}

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee) {
  return employee.timeInEvents.map( x => {
    const date = x.date;
    return wagesEarnedOnDate(employee, date);
  })
  .reduce( (total, wage) => total + wage, 0);
}

function calculatePayroll(employees) {
  return employees.map(employee => allWagesFor(employee)).reduce( (total, wage) => total + wage)
}

function findEmployeeByFirstName () {

}
