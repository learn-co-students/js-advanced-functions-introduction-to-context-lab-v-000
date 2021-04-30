// Your code here
let createEmployeeRecord = function(record) {
    return {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeRecordData){
    return employeeRecordData.map(function(record){
        return createEmployeeRecord(record)
    })
}

let createTimeInEvent = function(employee, dateTimeInStamp){
    let [date, hour] = dateTimeInStamp.split(' ');
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date,
    })
    return employee
}

let createTimeOutEvent = function(employee, dateTimeOutStamp){
    let [date, hour] = dateTimeOutStamp.split(' ');
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date,
    })
    return employee
}

let hoursWorkedOnDate = function(employee, dateRequested){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === dateRequested;
    })
    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === dateRequested;
    })
    return (outEvent.hour - inEvent.hour) / 100;
}

let wagesEarnedOnDate = function(employee, dateRequested){
    let wage = hoursWorkedOnDate(employee, dateRequested) * employee.payPerHour
    return parseFloat(wage.toString())
}

let allWagesFor = function(employee){
    let workedDates = employee.timeInEvents.map(function(e){
        return e.date
    })
    let payable = workedDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let findEmployeeByFirstName = function(employees, firstName){
    return employees.find(function(record){
        return record.firstName === firstName
    })
}


let calculatePayroll = function(employees){
    return employees.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}