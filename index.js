// Your code here
function createEmployeeRecord(empArray) {
    let employeeRecord = Object.assign({}, {firstName: empArray[0], familyName: empArray[1], title: empArray[2], payPerHour: empArray[3]})
    employeeRecord.timeInEvents = [];
    employeeRecord.timeOutEvents = [];
    return employeeRecord
}

function createEmployeeRecords(employees) {
    return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employee, dateTimeString) {
    let timeIn = {
        type: "TimeIn",
        date: dateTimeString.split(' ')[0],
        hour: parseInt(dateTimeString.split(' ')[1])
    }
    employee.timeInEvents.push(timeIn);
    return employee;
}

function createTimeOutEvent(employee, dateTimeString) {
    let timeOut = {
        type: "TimeOut",
        date: dateTimeString.split(' ')[0],
        hour: parseInt(dateTimeString.split(' ')[1])
    }
    employee.timeOutEvents.push(timeOut);
    return employee
}

function hoursWorkedOnDate(employeeRecord, date) {
    let timeIn = employeeRecord.timeInEvents.find(event => event.date === date).hour
    let timeOut = employeeRecord.timeOutEvents.find(event => event.date === date).hour
    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate (employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
}

function allWagesFor(employee) {
    let wages = employee.timeOutEvents.map(e => wagesEarnedOnDate(employee, e.date))
    return wages.reduce( (total, wage) => total + wage, 0)
}

function calculatePayroll(employees) {
    return employees.map(emp => allWagesFor(emp)).reduce( (total, wage) => total + wage, 0);
}

function findEmployeeByFirstName(employees, name) {
    return employees.find(emp => emp.firstName === name)
}