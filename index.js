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
