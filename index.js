function createEmployeeRecord (employeeInfo) {
    let record = {}
    record.firstName = employeeInfo["0"]
    record.familyName = employeeInfo["1"]
    record.title = employeeInfo["2"]
    record.payPerHour = employeeInfo[3]
    record.timeInEvents = []
    record.timeOutEvents = []
    return record
}

function createEmployeeRecords(workerArrays) {
    return workerArrays.map(w => {return createEmployeeRecord(w)})
}

function createTimeInEvent(eRecord, dateStamp) {
    let clockedIn = {}
    clockedIn.type  = "TimeIn"
    clockedIn.hour = parseInt(dateStamp.split(' ')[1])
    clockedIn.date = dateStamp.split(' ')[0]

    eRecord.timeInEvents.push(clockedIn)
    return eRecord
}

function createTimeOutEvent(eRecord, dateStamp){
     let clockedOut = {}
     clockedOut.type = "TimeOut"
     clockedOut.hour = parseInt(dateStamp.split(' ')[1])
     clockedOut.date = dateStamp.split(' ')[0]
     
     eRecord.timeOutEvents.push(clockedOut)

     return eRecord
}

function hoursWorkedOnDate(eRecord, dateStamp) {
    const hourStarted = eRecord.timeInEvents.find( function(event) {
        if (event.date === dateStamp){
            return true;
        }
    });

    const hourEnd = eRecord.timeOutEvents.find( function(event) {
        if (event.date === dateStamp){
            return true;
        }
    });

    const hoursWorked = (hourEnd.hour - hourStarted.hour)/100

    return hoursWorked
}

function wagesEarnedOnDate(eRecord, dateStamp) {
    let wage = hoursWorkedOnDate(eRecord, dateStamp) * eRecord.payPerHour
    return wage
}

function allWagesFor(eRecord) {
    let allDates = eRecord.timeInEvents.map(timeEvent => timeEvent.date)

    let totalPay = allDates.reduce((total, date) => total + wagesEarnedOnDate(eRecord, date), 0)

    return totalPay
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(e => e.firstName === firstName)
}

function calculatePayroll(employees) {
    return employees.reduce(function(payroll, employee){
        return payroll + allWagesFor(employee)
    }, 0)
}