// Your code here
function createEmployeeRecord(employeeInfo) {
    let employeeObject = {};

    employeeObject.firstName = employeeInfo[0];
    employeeObject.familyName = employeeInfo[1];
    employeeObject.title = employeeInfo[2];
    employeeObject.payPerHour = employeeInfo[3];
    employeeObject.timeInEvents = [];
    employeeObject.timeOutEvents = [];

    return employeeObject;
};

function createEmployeeRecords(employeesArray) {
    return employeesArray.map(createEmployeeRecord);
};

function createDateObject(dateString) {
    let date = dateString.split(" ")
    date[0] = date[0].split("-");
    date[1] = date[1].split("");
    date[1] = date[1].splice(0,2);
    date[1] = date[1].join("");

    const year = date[0][0];
    const month = date[0][1];
    const day = date[0][2];

    const hour = date[1][0];

    return new Date(year, month, day, hour);
}

function createTimeInEvent(employeeRecord, dateStamp) {
    
    // const timeInDateObject = createDateObject(dateStamp);
    const [date, hour] = dateStamp.split(" ");
 
    const timeInRecord = { type: "TimeIn", hour: parseInt(hour, 10), date: date  };

    employeeRecord.timeInEvents.push(timeInRecord)

    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    
    const timeOutRecord = { type: "TimeOut", hour: parseInt(hour, 10), date: date  };

    employeeRecord.timeOutEvents.push(timeOutRecord)

    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, soughtDate) {

    let timeIn = employeeRecord.timeInEvents.find(e => e.date === soughtDate);
    let timeOut = employeeRecord.timeOutEvents.find(e => e.date === soughtDate);

    if (!!timeIn && !!timeOut) {
        return (timeOut.hour - timeIn.hour) / 100;
    }
}

function wagesEarnedOnDate(employeeRecord, soughtDate) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, soughtDate);

    return hoursWorked * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
    let soughtDates = employeeRecord.timeInEvents.map(event => event.date);

    let dayWages = soughtDates.map(date => wagesEarnedOnDate(employeeRecord, date));

    let grandTotal = dayWages.reduce(function(acc, cv) {return acc+cv}, 0);

    return grandTotal;

}

function findEmployeeByFirstName(employeesArray, firstName) {
    let employee = employeesArray.find(employee => employee.firstName === firstName)
    return employee;
};

function calculatePayroll(employeeRecordsArray) {
    let wagesArray = employeeRecordsArray.map(employeeRecord => allWagesFor(employeeRecord));

    let grandTotal = wagesArray.reduce((acc, cv) => acc + cv, 0);

    return grandTotal;  
}
// new Date (year, month, day, hour, minute, seconds, milliseconds)
