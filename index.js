// Your code here

// map over employee array and assign each element as a key in a new object
function createEmployeeRecord(employeeArray) {
    const employeeObj = {firstName: employeeArray[0],
                          familyName: employeeArray[1],
                          title: employeeArray[2],
                          payPerHour: employeeArray[3],
                          timeInEvents: [],
                          timeOutEvents: []}
    return employeeObj;
}

const createEmployeeRecords = function(employeeRowInfo) {
    return employeeRowInfo.map(function(employeeArray) {
        return createEmployeeRecord(employeeArray)
    })
}

const createTimeInEvent = function(employeeObj, dateStamp) {
    let date = dateStamp.split(" ")[0];
    let hour = parseInt(dateStamp.split(" ")[1]);

    employeeObj['timeInEvents'].push({type: 'TimeIn',
                               date: date,
                               hour: hour
    })
    return employeeObj;
}

const createTimeOutEvent = function (employeeObj, dateStamp) {
    let date = dateStamp.split(" ")[0];
    let hour = parseInt(dateStamp.split(" ")[1]);

    employeeObj['timeOutEvents'].push({
        type: 'TimeOut',
        date: date,
        hour: hour
    })
    return employeeObj;
}

const hoursWorkedOnDate = function(employeeObj, date) {
    employeeObj['timeInEvents'].map
}