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

const createTimeInEvent = function(employeeRowInfo) {
    return employeeRowInfo.map(function() {
        return employeeRowInfo[timeInEvents] = {type: "TimeIn",
        hour: Date.time.now,
        date: Date.time.now
    }
    })
}