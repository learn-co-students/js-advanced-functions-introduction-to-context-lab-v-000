function createEmployeeRecord(employeeInfo) {
  return {
    firstName: employeeInfo[0],
    familyName: employeeInfo[1],
    title: employeeInfo[2],
    payPerHour: employeeInfo[3],
    timeInEvents: [],
    timeOutEvents: []
  };
};

function createEmployeeRecords(employees) {
  return employees.map(e => createEmployeeRecord(e))
};

function createTimeInEvent(employeeObject, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employeeObject.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employeeObject
};

function createTimeOutEvent(employeeObject, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employeeObject.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employeeObject
};

function hoursWorkedOnDate(employee, date){
    let clockIn = employee.timeInEvents.find(function(e){
        return e.date === date
    })

    let clockOut = employee.timeOutEvents.find(function(e){
        return e.date === date
    })

    return (clockOut.hour - clockIn.hour) / 100
};

function wagesEarnedOnDate(employee, date){
    let wagesEarned = hoursWorkedOnDate(employee, date) * employee.payPerHour
    return parseFloat(wagesEarned.toString())
};

function allWagesFor(employee) {
  let dailyWages = []
  employee.timeInEvents.map(clockIn => dailyWages.push(wagesEarnedOnDate(employee, clockIn.date)));

  let totalWages = dailyWages.reduce((runningTotal, wages) => runningTotal + wages);
  return totalWages
};

function calculatePayroll(employees) {
  return employees.reduce((runningTotal, employee) => runningTotal + allWagesFor(employee), 0);
};

function findEmployeeByFirstName(employeeRecords, firstName) {
  return employeeRecords.find(employeeRecord => employeeRecord.firstName === firstName);
};
