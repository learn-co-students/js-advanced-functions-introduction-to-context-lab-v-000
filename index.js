// Your code here
const createEmployeeRecord = (arr) => {
    let employee = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employee;
}

const createEmployeeRecords = (arr) => {
    return arr.map(function(employee) {
        return createEmployeeRecord(employee);
    })
}

const createTimeInEvent = (employee, dateStamp) => {
    let newEvent = {
        type: "TimeIn",
        date: dateStamp.split(' ')[0],
        hour: parseInt(dateStamp.split(' ')[1])
    };
    employee.timeInEvents.push(newEvent);
    return employee;
}

const createTimeOutEvent = (employee, dateStamp) => {
    let newEvent = {
        type: "TimeOut",
        date: dateStamp.split(' ')[0],
        hour: parseInt(dateStamp.split(' ')[1])
    };
    employee.timeOutEvents.push(newEvent);
    return employee;
}

const hoursWorkedOnDate = (employee, date) => {
    let timeInEvent = employee.timeInEvents.find(e => e.date === date)
    let hourIn = timeInEvent.hour
    let timeOutEvent = employee.timeOutEvents.find(e => e.date === date)
    let hourOut = timeOutEvent.hour
    return parseInt((hourOut - hourIn)/100);
}

const wagesEarnedOnDate = (employee, date) => {
    return parseInt(hoursWorkedOnDate(employee, date) * employee.payPerHour);
}

const allWagesFor = (employee) => {
    let timeInEvents = Object.values(employee.timeInEvents['date']);
    return timeInEvents;
    // let totalPay = dates.map(function(date) {
    //     return wagesEarnedOnDate(employee, date);
    // });
    // return totalPay;
}

const findEmployeeByFirstName = (srcArray, firstName) => {
    return srcArray.find(employee => employee.firstName === firstName);
}

const calculatePayroll = (arr) => {

}