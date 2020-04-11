// Your code here
function createEmployeeRecord(array){
  let newRecord = {}
  newRecord.firstName = array[0];
  newRecord.familyName = array[1];
  newRecord.title = array[2];
  newRecord.payPerHour = array[3];
  newRecord.timeInEvents = [];
  newRecord.timeOutEvents = [];
  return newRecord;
}

function createEmployeeRecords(array){
  let newRecord = array.map(function(e){
    return createEmployeeRecord(e);
  });
return newRecord
}

function createTimeInEvent(employeeObj, datestamp){
    let newObj = {}
    newObj.type = "TimeIn";
    newObj.hour = parseInt(datestamp.slice(11), 10)
    newObj.date = datestamp.slice(0, 10)
    employeeObj.timeInEvents.push(newObj);
    return employeeObj
}

function createTimeOutEvent(employeeObj, datestamp){
  let newObj = {};
  newObj.type = "TimeOut";
  newObj.hour = parseInt(datestamp.slice(11), 10);
  newObj.date = datestamp.slice(0, 10);
  employeeObj.timeOutEvents.push(newObj);
  return employeeObj;
}

function hoursWorkedOnDate(empOb, date){
  let timeOut = empOb.timeOutEvents[0].hour
  let timeIn = empOb.timeInEvents[0].hour
  return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(obj, date){
    let hourlyPay = obj.payPerHour;
    let totalHours = hoursWorkedOnDate(obj, date);
    return hourlyPay * totalHours;
  // console.log(obj, date)
}
//
// let allWagesFor = function(employee){
//     let eligibleDates = employee.timeInEvents.map(function(e){
//         return e.date
//     })
//
//     let payable = eligibleDates.reduce(function(memo, d){
//         return memo + wagesEarnedOnDate(employee, d)
//     }, 0)
//
//     return payable
// }

const allWagesFor = function(employeeRecord) {
  const availableDates = employeeRecord.timeInEvents.map(e => e.date);
  const allWages = availableDates.reduce((total, date) => wagesEarnedOnDate(employeeRecord, date) + total, 0);
  return allWages;
}



const calculatePayroll = function(employeeRecords) {
  const payroll = employeeRecords.reduce((total, employee) => allWagesFor(employee) + total, 0);
  return payroll;
}
  // console.log(wagesEarned)






let findEmployeeByFirstName = function(array, firstName){
  return array.find(function(r){
    return r.firstName === firstName
  })
}
