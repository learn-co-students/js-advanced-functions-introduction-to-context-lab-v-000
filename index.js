// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]){
    let employee = {};
    employee.firstName = firstName
    employee.familyName = familyName
    employee.title = title
    employee.payPerHour = payPerHour
    employee.timeInEvents = []
    employee.timeOutEvents = []
    return employee
}

function createEmployeeRecords(arr){
    return arr.map(f => createEmployeeRecord(f))
}

function createTimeInEvent(employee, time){
    employee.timeInEvents.push(Object.assign({}, time, {
        type: "TimeIn",
        hour: parseInt(time.split(" ")[1]),
        date: time.split(" ")[0],
    }));
    return employee
}

function createTimeOutEvent(employee, time){
    employee.timeOutEvents.push(Object.assign({}, time, {
        type: "TimeOut",
        hour: parseInt(time.split(" ")[1]),
        date: time.split(" ")[0],
    }));
    return employee
}

function hoursWorkedOnDate(employee, date){
    let dateWorkedOut = employee.timeOutEvents.filter(n => {
        return n.date === date;
    });
    let dateWorkedIn = employee.timeInEvents.filter(n => {
        return n.date === date;
    });

    let hoursWorked = (dateWorkedOut[0].hour - dateWorkedIn[0].hour) / 100;
    return parseInt(hoursWorked)
}

function wagesEarnedOnDate(employee, date){
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee){
    let datesWorked = employee.timeOutEvents.map(d => d.date);
    let wagesEarned = datesWorked.map(d => wagesEarnedOnDate(employee, d));
    return wagesEarned.reduce((total, element) => total + element);
}

function calculatePayroll(employees){
    let allEmployeeWages = employees.map(employee => allWagesFor(employee));
    let total = allEmployeeWages.reduce((total, element) => total + element);
    return total
}

function findEmployeeByFirstName(arr, str){
    if (arr.find(e => e.firstName === str)){
        return arr.find(e => e.firstName === str)
    }
    return undefined
}