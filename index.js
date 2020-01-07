// Your code here
let createEmployeeRecord = function(sourceArray) {
  let employeeRecord = {
    firstName: sourceArray[0],
    familyName: sourceArray[1],
    title: sourceArray[2],
    payPerHour: sourceArray[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return employeeRecord
}

let createEmployeeRecords = function(sourceArrays) {
  return sourceArrays.map(array => createEmployeeRecord(array))
}

let createTimeInEvent = function(empRec, stamp) {
  let stampArr = stamp.split(" ")
  let timeEvent = {
    type: "TimeIn",
    hour: parseInt(stampArr[1]),
    date: stampArr[0]
  }
  empRec.timeInEvents.push(timeEvent)
  return empRec
}

let createTimeOutEvent = function(empRec, stamp) {
  let stampArr = stamp.split(" ")
  let timeEvent = {
    type: "TimeOut",
    hour: parseInt(stampArr[1]),
    date: stampArr[0]
  }
  empRec.timeOutEvents.push(timeEvent)
  return empRec
}

let hoursWorkedOnDate = function(empRec, dateStr) {
  let outEvent = empRec.timeOutEvents.find(item => item.date === dateStr)
  let inEvent = empRec.timeInEvents.find(item => item.date === dateStr)
  let hoursWorked = (outEvent.hour - inEvent.hour)/100
  return hoursWorked
}

let wagesEarnedOnDate = function(empRec, dateStr) {
  return hoursWorkedOnDate(empRec, dateStr) * empRec.payPerHour
}

let allWagesFor = function(empRec) {
  let datesWorked = empRec.timeOutEvents.map(item => item.date)
  let wages = datesWorked.map(date => wagesEarnedOnDate(empRec, date))
  let total = wages.reduce((total, element) => element + total, 0)
  return total
}

let findEmployeeByFirstName = function(sourceArray, firstName) {
  let empRec = sourceArray.find(record => record.firstName = firstName)
  return empRec
}

let calculatePayroll = function(sourceArray) {
  let payroll = sourceArray.map(record => allWagesFor(record))
  let allPayroll = payroll.reduce((total, element) => element + total, 0)
  return allPayroll
}
