// Your code here
let createEmployeeRecord = function(info) {
    return {
        firstName: info[0],
        familyName: info[1],
        title: info[2],
        payPerHour: info[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(arr) {
    return arr.map(function(r) {
        return createEmployeeRecord(r)
    })
}

let createTimeInEvent = function(employee, stamp) {
    let [date, hour] = stamp.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10), 
        date: date
    })
    return employee
}

let createTimeOutEvent = function(employee, stamp) {
    let [date, hour] = stamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut", 
        hour: parseInt(hour,10), 
        date: date
    }) 
    return employee
}

let hoursWorkedOnDate = function(employee, date) {
    let inTime = employee.timeInEvents.find(function(e){
        return e.date === date
    })

    let outTime = employee.timeOutEvents.find(function(e){
       return e.date === date
    })

    return (outTime.hour - inTime.hour) / 100
}

let wagesEarnedOnDate = function(employee, date) {
    let rate = employee.payPerHour
    let hours = hoursWorkedOnDate(employee, date)
    return rate * hours
}

let allWagesFor = function(employee) {
    let allDates = employee.timeInEvents.map(function(e) {
       return e.date
    })

    let totalWages = allDates.reduce(function(total, d) {
        return wagesEarnedOnDate(employee, d) + total
    }, 0);

    return totalWages
}

let findEmployeeByFirstName = function (arr, name) {
    let employee = arr.find(function(e) {
        return e.firstName === name
    })
    return employee
}

let calculatePayroll = function(arr) {
    let payroll = arr.reduce(function(total, e) {
        return allWagesFor(e) + total
    }, 0)
    return payroll
}