function createEmployeeRecord(employeeArray) {
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

function createEmployeeRecords(arrayOfEmployees) {
    var employees = arrayOfEmployees.map(employee => createEmployeeRecord(employee));
    return employees;
}

function createTimeInEvent(employee, timeIn) {
    var timeArray = timeIn.split(" ")
    employee.timeInEvents = [{
        type: "TimeIn",
        hour: Number(timeArray[1]),
        date: timeArray[0]
    }]
    return employee;
}

function createTimeOutEvent(employee, timeOut) {
    var timeArray = timeOut.split(" ")
    employee.timeOutEvents = [{
        type: "TimeOut",
        hour: Number(timeArray[1]),
        date: timeArray[0]
    }]
    return employee;
}

function hoursWorkedonDate(employee, dateWorked) {

}

function wagesEarnedOnDate(employee, dateWorked) {

}

function allWagesFor(employee) {

}

function findEmployeeByFirstName(employees, firstName) {

}