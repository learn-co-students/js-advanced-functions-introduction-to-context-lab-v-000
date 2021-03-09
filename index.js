// Your code here
function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array){
    return array.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(record, dateStamp){
    let dateArray = dateStamp.split(" ")
    let obj = {
        type: "TimeIn",
        hour: parseInt(dateArray[1]),
        date: dateArray[0]

    }
    record.timeInEvents.push(obj)
    return record
}

function createTimeOutEvent(record, dateStamp){
    let dateArray = dateStamp.split(" ")
    let obj = {
        type: "TimeOut",
        hour: parseInt(dateArray[1]),
        date: dateArray[0]

    }
    record.timeOutEvents.push(obj)
    return record
}

function hoursWorkedOnDate(record, date){
    let timeIn = record.timeInEvents.find(e => e.date === date).hour
    let timeOut = record.timeOutEvents.find(e => e.date === date).hour
    return ((timeOut - timeIn)/100)
}

function wagesEarnedOnDate(record, date){
    return record.payPerHour * hoursWorkedOnDate(record, date)
}

function allWagesFor(record){
    let allDates = record.timeInEvents.map(e => e.date)
    let allWages = allDates.map(d => wagesEarnedOnDate(record, d))
    return allWages.reduce((total, wage)=> total + wage)
}

function calculatePayroll(array){
    return array.map(record => allWagesFor(record)).reduce((total, wage)=> total + wage)
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(record => record.firstName === firstName)
}