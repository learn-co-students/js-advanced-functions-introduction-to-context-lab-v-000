// Your code here

function createEmployeeRecord(array) {
    
    return {firstName: array[0], familyName: array[1], title: array[2], payPerHour: array[3], timeInEvents: [],
        timeOutEvents: []}
}

function createEmployeeRecords(array) {
    return array.map(record => createEmployeeRecord(record))
}

function createTimeInEvent(record, date) {
    const info = date.split(' ')
    record.timeInEvents.push({type: "TimeIn", hour: parseInt(info[1]), date: info[0]})
    return record
}

function createTimeOutEvent(record, date) {
    const info = date.split(' ')
    record.timeOutEvents.push({type: "TimeOut", hour: parseInt(info[1]), date: info[0]})
    return record
}

function hoursWorkedOnDate(record, date) {
    let timeOut = record.timeOutEvents.find(element => element.date === date)
    let timeIn = record.timeInEvents.find(element => element.date === date)
    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(record, date) {
    let wages = record.payPerHour
    return hoursWorkedOnDate(record, date) * wages;
}

function allWagesFor(record) {
    let wages = record.timeOutEvents.map(element => wagesEarnedOnDate(record, element.date));
    return wages.reduce( (total, element) => element + total, 0);
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce( (total, element) => allWagesFor(element) + total, 0);
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.find(element => element.firstName === firstName)
}