//returns a JS Object
function createEmployeeRecord(array) {
    let employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3], 
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

//returns an array of Objects
function createEmployeeRecords(arrayofArrays) { 
    let newArray = arrayofArrays.map(array => createEmployeeRecord(array))
    return newArray
}

//returns the employee record
function createTimeInEvent(employeeObj, dateStamp) {
    let timeIn = employeeObj.timeInEvents 
    timeIn.push({
                type: "TimeIn",
                hour: parseInt(dateStamp.slice(11, 15)),
                date: dateStamp.slice(0, 10)
    });
    return employeeObj
}

//returns the employee record
function createTimeOutEvent(employeeObj, dateStamp) {
    let timeOut = employeeObj.timeOutEvents 
    timeOut.push({
                type: "TimeOut",
                hour: parseInt(dateStamp.slice(11, 15)),
                date: dateStamp.slice(0, 10)
    });
    return employeeObj
}

//returns hours worked - an integer
function hoursWorkedOnDate(employeeObj, day) {
    let dayIn = employeeObj.timeInEvents.find(timeEvent => timeEvent.date === day);
    let dayOut = employeeObj.timeOutEvents.find(timeEvent => timeEvent.date === day);
    let hourIn = parseInt(dayIn.hour.toString().slice(0, -2))
    let hourOut = parseInt(dayOut.hour.toString().slice(0, -2))
    return (hourOut - hourIn)
}

//returns pay owed on specific day
function wagesEarnedOnDate(employeeObj, day) {
    let hours = hoursWorkedOnDate(employeeObj, day);
    let rate = employeeObj.payPerHour
    return hours * rate
}

//returns pay owned for all dates
function allWagesFor(employeeObj) {
    let dates = employeeObj.timeInEvents.map(e => {return e.date});
    let dailyWages = dates.map(date => wagesEarnedOnDate(employeeObj, date))    
    let allWages = dailyWages.reduce((total, w) => w + total, 0)
    return allWages
}

//returns matching record or undefined
function findEmployeeByFirstName(srcArray, name) { 
    let empArray = srcArray.filter(o => o.firstName === name)
    return empArray[0]
}

//returns sum of pay owed to all employees for all dates, as a number
function calculatePayroll(empRecordsArray) {
    let allWages = empRecordsArray.map(empObj => {return allWagesFor(empObj)})
    let payroll = allWages.reduce((total, w) => w + total, 0)
    return payroll
}

