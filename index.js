// Your code here
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arr) {
    return arr.map(subArray => createEmployeeRecord(subArray));
}

function createTimeInEvent(record, timeIn) {
    let [ date, hour ] = timeIn.split(" ");
    hour = parseInt(hour);
    record.timeInEvents.push({
        type: "TimeIn",
        hour: hour,
        date: date
    });
    return record;
}

function createTimeOutEvent(record, timeOut) {
    let [ date, hour ] = timeOut.split(" ");
    hour = parseInt(hour);
    record.timeOutEvents.push({
        type: "TimeOut",
        hour: hour,
        date: date
    });
    return record;
}

function hoursWorkedOnDate(record, date) {
    const timeIn = record.timeInEvents.find(event => {
        return event.date === date;
    })
    const timeOut = record.timeOutEvents.find(event => {
        return event.date === date;
    })
    return (timeOut.hour - timeIn.hour)/100;
}

function wagesEarnedOnDate(record, date) {
    return hoursWorkedOnDate(record, date) * record.payPerHour;
}

function allWagesFor(record) {
    const reducer = (accumulator, timeIn) => accumulator + wagesEarnedOnDate(record, timeIn.date);
    return record.timeInEvents.reduce(reducer, 0);
}

function calculatePayroll(records) {
    const reducer = (accumulator, record) => accumulator + allWagesFor(record);
    return records.reduce(reducer, 0);
}

function findEmployeeByFirstName(emps, name) {
    return emps.find(emp => emp.firstName === name);
}