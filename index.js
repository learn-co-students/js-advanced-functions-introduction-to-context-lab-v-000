let createEmployeeRecord = function(employeeArray) {
    var employee = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employee;
};

let createEmployeeRecords = function(arrayOfEmployees) {
    var employees = arrayOfEmployees.map(employee => createEmployeeRecord(employee));
    return employees;
}

let createTimeInEvent = function(employee, timeIn) {
    var timeArray = timeIn.split(" ")
    employee.timeInEvents = [{
        type: "TimeIn",
        hour: Number(timeArray[1]),
        date: timeArray[0]
    }]
    return employee;
}

let createTimeOutEvent = function(employee, timeOut) {
    var timeArray = timeOut.split(" ")
    employee.timeOutEvents = [{
        type: "TimeOut",
        hour: Number(timeArray[1]),
        date: timeArray[0]
    }]
    return employee;
}

let hoursWorkedOnDate = function(employee, dateWorked) {
    let timeIn = employee.timeInEvents.find(function(e) { return e.date === dateWorked });
    let timeOut = employee.timeOutEvents.find(function(e) { return e.date === dateWorked });
    return (timeOut.hour - timeIn.hour) / 100;
}

let wagesEarnedOnDate = function(employee, dateWorked) {
    return employee.payPerHour * hoursWorkedOnDate(employee, dateWorked);
}

let allWagesFor = function(employee) {
    let datesWorked = employee.timeInEvents.map(function(e) {
        return e.date;
    })

    let wages = datesWorked.reduce(function(memo, d) {
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return wages;

}

let findEmployeeByFirstName = function(employees, firstName) {
    return employees.find(function(e) { return e.firstName === firstName })
}

let calculatePayroll = function(employees) {
    return employees.reduce(function(memo, e) {
        return allWagesFor(e)
    }, 0)
}