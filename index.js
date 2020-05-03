// Your code here

function createEmployeeRecord(employeeArray) {
    var newEmployee = new Object();
    newEmployee.firstName = employeeArray[0];
    newEmployee.familyName = employeeArray[1];
    newEmployee.title = employeeArray[2];
    newEmployee.payPerHour = employeeArray[3];
    newEmployee.timeInEvents = [];
    newEmployee.timeOutEvents = [];

    return newEmployee
}


function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(createEmployeeRecord)
}


function createTimeInEvent(employeeRecord, dateStamp){
    let dateAndTime = dateStamp.split(' ')
    var checkInObj = new Object();
    checkInObj.type = "TimeIn";
    checkInObj.hour = parseInt(dateAndTime[1]);
    checkInObj.date = dateAndTime[0];
    employeeRecord.timeInEvents.push(checkInObj)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
    let dateAndTime = dateStamp.split(' ')
    var checkOutObj = new Object();
    checkOutObj.type = "TimeOut";
    checkOutObj.hour = parseInt(dateAndTime[1]);
    checkOutObj.date = dateAndTime[0];
    employeeRecord.timeOutEvents.push(checkOutObj)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, dateWorked){
    let inEvent = employeeRecord.timeInEvents.find(event => event.date === dateWorked)
    let outEvent = employeeRecord.timeOutEvents.find(event => event.date === dateWorked)
    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(employeeRecord, dateWorked){
    let totalHours = hoursWorkedOnDate(employeeRecord, dateWorked)
    return totalHours * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord){
    return employeeRecord.timeInEvents.map(event => wagesEarnedOnDate(employeeRecord, event.date)).reduce((total, hoursWorked) => total + hoursWorked)
}

function calculatePayroll(employeeRecords){
    return employeeRecords.map(allWagesFor).reduce((total, hoursWorked) => total + hoursWorked)
}

function findEmployeeByFirstName(srcArray, name){
    return srcArray.find(employee => employee.firstName.toUpperCase() === name.toUpperCase())
}