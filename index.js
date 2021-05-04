// Your code here
function createEmployeeRecord(arr){
    const employee = { firstName: arr[0], familyName: arr[1], title: arr[2], payPerHour: arr[3], timeInEvents: [], timeOutEvents: [] };
    return employee;
}
function createEmployeeRecords(nestedArrs){
    const employees =  nestedArrs.map(arr => createEmployeeRecord(arr));
    return employees;
}
function createTimeInEvent(employeeRecord, date){
    employeeRecord.timeInEvents.push({ type: "TimeIn", hour: parseInt(date.slice(-4)), date: date.slice(0, -5) });
    return employeeRecord;
}
function createTimeOutEvent(employeeRecord, date){
    employeeRecord.timeOutEvents.push({ type: "TimeOut", hour: parseInt(date.slice(-4)), date: date.slice(0, -5) });
    return employeeRecord;
}
function hoursWorkedOnDate(employeeRecord, date){
// employee: {"firstName":"Julius","familyName":"Caesar","title":"General","payPerHour":1000,"timeInEvents":[{"type":"TimeIn","hour":900,"date":"0044-03-15"}],"timeOutEvents":[{"type":"TimeOut","hour":1100,"date":"
    let clockedIn = employeeRecord.timeInEvents.filter(e => e.date === date)[0].hour.toString().slice(0, -2);
    let clockedOut = employeeRecord.timeOutEvents.filter(e => e.date === date)[0].hour.toString().slice(0, -2);
    return clockedOut - clockedIn;
}
function wagesEarnedOnDate(employeeRecord, date){
    return employeeRecord.payPerHour * hoursWorkedOnDate(employeeRecord, date);
}
function datesWorked(employeeRecord){
    return employeeRecord.timeOutEvents.map(event => event.date);
}
function allWagesFor(employeeRecord){
    return datesWorked(employeeRecord).reduce((acc, curr, idx, arr) => acc + wagesEarnedOnDate(employeeRecord, arr[idx]),0);
}
function findEmployeeByFirstName(employeeRecords, firstName){
    return employeeRecords.filter(record => record.firstName === firstName)[0];
}
function calculatePayroll(employeeRecords){
    return employeeRecords.reduce((acc, curr, idx, arr) => acc + allWagesFor(arr[idx]), 0);
}
