// Your code here
let createEmployeeRecord = function(employeeInfo) {
    return {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

let createEmployeeRecords = function(employees) {
    return employees.map(function(employee) {
        return createEmployeeRecord(employee)
    })
}

let createTimeInEvent = function(employee, timeStamp) {
    let [date, hour] = timeStamp.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })
    return employee
}

let createTimeOutEvent = function(employee, timeStamp) {
    let [date, hour] = timeStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })
    return employee
}

let hoursWorkedOnDate = function(employee, workDate) {
    let timeIn = employee.timeInEvents.find(function(event) {
        return event.date === workDate
    })
    let timeOut = employee.timeOutEvents.find(function(event) {
        return event.date === workDate
    })
    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function(employee, workDate) {
    let dayWages = hoursWorkedOnDate(employee, workDate) * employee.payPerHour
    return parseFloat(dayWages.toString())
}

let allWagesFor = function(employee) {
    let datesWorked = employee.timeInEvents.map(function(event) {
        return event.date
    })
    let datesPayable = datesWorked.reduce(function(ledger, date) {
        return ledger + wagesEarnedOnDate(employee, date)
    }, 0)
    return datesPayable
}

let calculatePayroll = function(employees) {
    return employees.reduce(function(ledger, employee) {
        return ledger + allWagesFor(employee)
    }, 0)
}

let findEmployeeByFirstName = function(array, firstName) {
    return array.find(function(record) {
        return record.firstName === firstName
    })
}