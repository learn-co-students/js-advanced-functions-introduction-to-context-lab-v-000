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

    employeeObj['timeInEvents'].push({
        type: 'TimeIn',
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
    let inEvent = employeeObj.timeInEvents.find(event => event.date === date);
    
    let outEvent = employeeObj.timeOutEvents.find(event => event.date === date);
    
    return (outEvent.hour - inEvent.hour) / 100
}

const wagesEarnedOnDate = function(employeeObj, date) {
    let wage = hoursWorkedOnDate(employeeObj, date) * employeeObj.payPerHour;
    return wage;
}

const allWagesFor = function(employeeObj) {
    
    let datesWorked = employeeObj.timeInEvents.map(function(dateObj) {
        return dateObj.date
    })
    // wagesEarnedOnDate(employeeObj, datesWorked)
    let accWages = datesWorked.reduce(function(total, date) {return total + wagesEarnedOnDate(employeeObj, date)}, 0)

    return accWages;
    // use reduce here
    // wagesEarnedOnDate(employeeObj, date)
}

const calculatePayroll = function() {

}

const findEmployeeByFirstName = function(srcArray, firstName) {
    let employeeFirstName = srcArray.map(employeeObj => employeeObj.firstName)
}