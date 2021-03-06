function createEmployeeRecord(arr) {
    return {firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []}
}

function createEmployeeRecords(arr) {
    return arr.map(a => createEmployeeRecord(a))
}

function createTimeInEvent(emp, time) {
    let fullTime = time.split(" ")
    emp.timeInEvents.push({type: "TimeIn",
    date: fullTime[0],
    hour: parseInt(fullTime[1])
    })
    return emp
}

function createTimeOutEvent(emp, time) {
    let fullTime = time.split(" ")
    emp.timeOutEvents.push({type: "TimeOut",
    date: fullTime[0],
    hour: parseInt(fullTime[1])
    })
    return emp
}

function hoursWorkedOnDate(emp, date) {
    let timeIn = emp.timeInEvents.find(d => d.date == date)
    let timeOut = emp.timeOutEvents.find(d => d.date == date)
return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(emp, date) {
    let hours = hoursWorkedOnDate(emp, date)
    return hours*emp.payPerHour
}

function allWagesFor(emp) {
    return emp.timeOutEvents.reduce( (total, e) => wagesEarnedOnDate(emp, e.date) + total, 0)
}

function calculatePayroll(emps) {
    return emps.reduce( (total, e) => allWagesFor(e) + total, 0)
}

function findEmployeeByFirstName(arr, name) {
    return arr.find(e => e.firstName == name)
}