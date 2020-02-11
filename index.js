// Your code here

function createEmployeeRecord(row){
    let newEmployee = {}
    newEmployee.firstName = row[0];
    newEmployee.familyName = row[1];
    newEmployee.title = row[2];
    newEmployee.payPerHour = row[3];
    newEmployee.timeInEvents = [];
    newEmployee.timeOutEvents = [];
    return newEmployee;
}

function createEmployeeRecords(rows){
    return rows.map(r => createEmployeeRecord(r));
}

function createTimeInEvent(employeeRecord, dateStamp){
    let [date, hour] = dateStamp.split(" ");
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp){
    let [date, hour] = dateStamp.split(" ");
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })
    return employeeRecord;
}

let hoursWorkedOnDate = function(employeeRecord, targetDate){
    let inHour = employeeRecord.timeInEvents.find(e =>{
        return e.date === targetDate;
    })

    let outHour = employeeRecord.timeOutEvents.find(e =>{
        return e.date === targetDate;
    })

    return (outHour.hour - inHour.hour)/100 
}

let wagesEarnedOnDate = function(employeeRecord, date){
    return parseInt(employeeRecord.payPerHour) * hoursWorkedOnDate(employeeRecord, date);
}

let allWagesFor = function(employeeRecord){
    let workDay = employeeRecord.timeInEvents.map(e => {return e.date;})

    let allWage = workDay.reduce((total, d) => {
       return  wagesEarnedOnDate(employeeRecord, d) + total
    }, 0)

    return allWage;
}

function findEmployeeByFirstName(employeeRecords, firstName){
   return employeeRecords.find(rec =>{
       return rec.firstName === firstName
    })
}

function calculatePayroll(employeeRecords){
    return employeeRecords.reduce((total, employee) =>{
        return allWagesFor(employee) + total
    }, 0)
}