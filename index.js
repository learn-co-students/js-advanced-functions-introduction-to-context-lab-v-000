// Your code here
function calculatePayroll(array){
    let ePay = array.map(function(e){return allWagesFor(e)})
    return ePay.reduce(function(a,c){return a + c})
};

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(e => e.firstName === firstName)
};

function allWagesFor(eObj){
    let payRate = eObj.payPerHour
    //array of dates worked
   let allDates = eObj.timeInEvents.map(function(e){return e.date});
   //array of hours worked
   let h = allDates.map(function(e){return hoursWorkedOnDate(eObj, e)})
   let totalH = h.reduce(function(a, c){return a + c});
   return payRate * totalH;
};

function wagesEarnedOnDate(eObj, aDate){
    let payRate = eObj.payPerHour
    let hours = hoursWorkedOnDate(eObj, aDate)
    return payRate * hours;
};

function hoursWorkedOnDate(eObj, aDate){
   let n = eObj.timeInEvents.find(({date}) => date === aDate)
   let o = eObj.timeOutEvents.find(({date}) => date === aDate)
   return (o.hour - n.hour) / 100;
};

function createTimeOutEvent(eObj, aDate){
    let timeOutObj = {}
    timeOutObj.type = "TimeOut"
    timeOutObj.hour = parseInt(aDate.split(' ')[1], 10)
    timeOutObj.date = aDate.split(' ')[0]
    eObj.timeOutEvents.push(timeOutObj);
    return eObj;
};

function createTimeInEvent(eObj, aDate){
    let timeIObj = {}
    timeIObj.type = "TimeIn"
    timeIObj.hour = parseInt(aDate.split(' ')[1], 10)
    timeIObj.date = aDate.split(' ')[0]
    eObj.timeInEvents.push(timeIObj);
    return eObj;
};

function createEmployeeRecords(employees){
    return employees.map(e => createEmployeeRecord(e));
};

function createEmployeeRecord(eData){
    let employee = {}
    employee.firstName = eData[0]
    employee.familyName = eData[1]
    employee.title = eData[2]
    employee.payPerHour = eData[3]
    employee.timeInEvents = []
    employee.timeOutEvents = []
    return employee;
};