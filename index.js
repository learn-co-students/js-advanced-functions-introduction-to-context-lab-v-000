// let createEmployeeRecord = function(employeeArray) {
//     return {
//         firstName: employeeArray[0],
//         familyName: employeeArray[1],
//         title: employeeArray[2],
//         payPerHour: employeeArray[3],
//         timeInEvents: [],
//         timeOutEvents: []
//     };
// };

// let createEmployeeRecords = function(arrayOfEmployees) {
//     var employees = arrayOfEmployees.map(employee => createEmployeeRecord(employee));
//     return employees;
// }


// let createTimeInEvent = function(employee, timeIn) {
//     var timeArray = timeIn.split(" ")
//     employee.timeInEvents = [{
//         type: "TimeIn",
//         hour: Number(timeArray[1]),
//         date: timeArray[0]
//     }]
//     return employee;
// }

// let createTimeOutEvent = function(employee, timeOut) {
//     var timeArray = timeOut.split(" ")
//     employee.timeOutEvents = [{
//         type: "TimeOut",
//         hour: Number(timeArray[1]),
//         date: timeArray[0]
//     }]
//     return employee;
// }

// let hoursWorkedOnDate = function(employee, dateWorked) {
//     let timeIn = employee.timeInEvents.find(function(e) { return e.date === dateWorked });
//     let timeOut = employee.timeOutEvents.find(function(e) { return e.date === dateWorked });
//     return (timeOut.hour - timeIn.hour) / 100;
// }

// let wagesEarnedOnDate = function(employee, dateWorked) {
//     return employee.payPerHour * hoursWorkedOnDate(employee, dateWorked);
// }

// let allWagesFor = function(employee) {
//     let datesWorked = employee.timeInEvents.map(function(e) {
//         return e.date;
//     })

//     let wages = datesWorked.reduce(function(memo, d) {
//         return memo + wagesEarnedOnDate(employee, d)
//     }, 0)

//     return wages;

// }

// let findEmployeeByFirstName = function(employees, firstName) {
//     return employees.find(function(e) { return e.firstName === firstName })
// }


// let calculatePayroll = function(employees) {
//     return employees.reduce(function(memo, e) {
//         return allWagesFor(e)
//     }, 0)
// }

let createEmployeeRecord = function(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row) {
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let createTimeOutEvent = function(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let hoursWorkedOnDate = function(employee, soughtDate) {
    let inEvent = employee.timeInEvents.find(function(e) {
        return e.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function(e) {
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateSought) {
    let rawWage = hoursWorkedOnDate(employee, dateSought) *
        employee.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(employee) {
    let eligibleDates = employee.timeInEvents.map(function(e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d) {
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec) {
        return rec.firstName === firstName
    })
}

let calculatePayroll = function(arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce(function(memo, rec) {
        return memo + allWagesFor(rec)
    }, 0)
}