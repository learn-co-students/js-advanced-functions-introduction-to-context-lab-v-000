// Your code here

function createEmployeeRecord(array) {
    let newEmployee = {};
    newEmployee.firstName = array[0];
    newEmployee.familyName = array[1];
    newEmployee.title = array[2];
    newEmployee.payPerHour = array[3];
    newEmployee.timeInEvents = [];
    newEmployee.timeOutEvents = [];
    return newEmployee;
}

function createEmployeeRecords(array) {
    return array.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, dateStamp) {
    let timeInObj = {
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(11, 16),10),
        date: dateStamp.slice(0,10)
    }
    employeeRecord.timeInEvents.push(timeInObj);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    let timeInObj = {
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(11, 16), 10),
        date: dateStamp.slice(0, 10)
    }
    employeeRecord.timeOutEvents.push(timeInObj);
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    let timeIn = employeeRecord.timeInEvents.find(d => d.date === date);
    let timeOut = employeeRecord.timeOutEvents.find(d => d.date === date);
    let hoursWorked = (timeOut.hour - timeIn.hour)/100;
    return hoursWorked;
}

function wagesEarnedOnDate(employeeRecord, date) {
    let wage = hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
    return wage;
}

function allWagesFor(employeeRecord) {
    let totalWages = employeeRecord.timeInEvents.reduce(function (total, currentValue) {
        let wages = wagesEarnedOnDate(employeeRecord, currentValue.date) + total
        return wages;
    }, 0)
    return totalWages;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(e => e.firstName === firstName);
}

function calculatePayroll(employeeRecords) {
    let totalWages = employeeRecords.reduce(function (total, currentValue) {
        let newTotal = allWagesFor(currentValue) + total
        return newTotal;
    }, 0)
    return totalWages;
}