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
    dateStamp = new Date();
    employeeObj.timeInEvents = [ { type: 'TimeIn',
                                hour: dateStamp.getHours(),
                                date: dateStamp.toDateString()
    }]
}