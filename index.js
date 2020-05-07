// Your code here

let createEmployeeRecord = function(row) {
    return {
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: []
    };
}

let createEmployeeRecords = function(rows) {
    return rows.map(function(row){
        return createEmployeeRecord(row)
    })
};

let createTimeInEvent = function(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
};

let createTimeOutEvent = function(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
};

let hoursWorkedOnDate = function(employee, dateWorked) {
    let inEvent = employee.timeInEvents.find(function(e) {
        return e.date === dateWorked
    })

    let outEvent = employee.timeOutEvents.find(function(e) {
        return e.date === dateWorked
    })
    
    return (outEvent.hour - inEvent.hour) /100
}

let wagesEarnedOnDate = function(employee, dateWorked) {
    let employeesWage = hoursWorkedOnDate(employee, dateWorked) * employee.payPerHour
    return parseFloat(employeesWage.toString())
}

let allWagesFor = function(employee) {
    let allDates= employee.timeInEvents.map(function(e){
        return e.date
    })

    let payableDates = allDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)
    return payableDates
}

let findEmployeeByFirstName = function(theArray, firstName) {
    return theArray.find(function(rec){
        return rec.firstName === firstName
    })
}

let calculatePayroll = function(arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}


