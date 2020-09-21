// Your code here


function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

function createEmployeeRecords(arrayOfEmployees) {
  return arrayOfEmployees.map(createEmployeeRecord);
}

// let createEmployeeRecords = function(arr) {
//   return arr.map(function(row){
//     return createEmployeeRecord(row)
//   });
// }

function createTimeInEvent(record, timeIn) {
  let [date, hour] = timeIn.split(' ');

  record.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date,
  })
  return record;
}

function createTimeOutEvent(record, timeOut) {
  let [date, hour] = timeOut.split(' ');

  record.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date,
  })
  return record;
}

function hoursWorkedOnDate(record, dateWorked) {
  let clockIn = record.timeInEvents.find(event => event.date === dateWorked);
  let clockOut = record.timeOutEvents.find(event => event.date === dateWorked);

  return (clockOut.hour - clockIn.hour) / 100;
}

function wagesEarnedOnDate(record, dateWorked) {
  return record.payPerHour * hoursWorkedOnDate(record, dateWorked);
}

function allWagesFor(record) {
  return record.timeInEvents.map(event => wagesEarnedOnDate(record, event.date)).reduce((total, hours) => total + hours);
}

function findEmployeeByFirstName(records, firstName) {
  return records.find(record => {
    return record.firstName === firstName;
  });
}

function calculatePayroll(arrayOfEmployees) {
  return arrayOfEmployees.map(allWagesFor).reduce((total, hours) => total + hours);
}





// let createEmployeeRecord = function(row){
//     return {
//         firstName: row[0],
//         familyName: row[1],
//         title: row[2],
//         payPerHour: row[3],
//         timeInEvents: [],
//         timeOutEvents: []
//     }
// }

// let createEmployeeRecords = function(employeeRowData) {
//     return employeeRowData.map(function(row){
//         return createEmployeeRecord(row)
//     })
// }
//
// let createTimeInEvent = function(employee, dateStamp){
//     let [date, hour] = dateStamp.split(' ')
//
//     employee.timeInEvents.push({
//         type: "TimeIn",
//         hour: parseInt(hour, 10),
//         date,
//     })
//
//     return employee
// }
//
// let createTimeOutEvent = function(employee, dateStamp){
//     let [date, hour] = dateStamp.split(' ')
//
//     employee.timeOutEvents.push({
//         type: "TimeOut",
//         hour: parseInt(hour, 10),
//         date,
//     })
//
//     return employee
// }
//
// let hoursWorkedOnDate = function(employee, soughtDate){
//     let inEvent = employee.timeInEvents.find(function(e){
//         return e.date === soughtDate
//     })
//
//     let outEvent = employee.timeOutEvents.find(function(e){
//         return e.date === soughtDate
//     })
//
//     return (outEvent.hour - inEvent.hour) / 100
// }
//
// let wagesEarnedOnDate = function(employee, dateSought){
//     let rawWage = hoursWorkedOnDate(employee, dateSought)
//         * employee.payPerHour
//     return parseFloat(rawWage.toString())
// }
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
//
// let findEmployeeByFirstName = function(srcArray, firstName) {
//   return srcArray.find(function(rec){
//     return rec.firstName === firstName
//   })
// }
//
// let calculatePayroll = function(arrayOfEmployeeRecords){
//     return arrayOfEmployeeRecords.reduce(function(memo, rec){
//         return memo + allWagesFor(rec)
//     }, 0)
// }
