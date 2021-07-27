// Your code here
function createEmployeeRecord(employeeDetails){
    let employee = {
        firstName: employeeDetails[0],
        familyName: employeeDetails[1],
        title: employeeDetails[2],
        payPerHour: employeeDetails[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employee;
};

function createEmployeeRecords(arOfAr){
    return arOfAr.map(e => createEmployeeRecord(e));
};

function createTimeInEvent(employee, date){
    let d = date.split(" ");
    const time = {};
    time.type = "TimeIn";
    time.hour = parseInt(d[1], 10);
    time.date = d[0];
    
    employee.timeInEvents.push(time);
    return employee
};

function createTimeOutEvent(employee, date){
    let d = date.split(" ");
    const time = {};
    time.type = "TimeOut";
    time.hour = parseInt(d[1], 10);
    time.date = d[0];
    
    employee.timeOutEvents.push(time);
    return employee
};

function hoursWorkedOnDate(employee, date){
    let i = employee.timeInEvents.find(d => d.date === date);
    let o = employee.timeOutEvents.find(d => d.date === date);

    return (o.hour - i.hour)  / 100
};

function wagesEarnedOnDate(employee, date){
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
};

function allWagesFor(employee){
    let dates = employee.timeInEvents.map(d => d.date)
    let payable = dates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    },0)

    return payable

};

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find( e => e.firstName === firstName)
};

function calculatePayroll(employees){
    let payroll = employees.reduce(function(memo, e){
        return memo + allWagesFor(e);
    },0)
    return payroll 
};