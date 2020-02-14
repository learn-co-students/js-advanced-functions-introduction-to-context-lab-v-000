// Your code here

let createEmployeeRecord = function(row) {
  return {
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

let createEmployeeRecords = function(employeeRowData) {
  return employeeRowData.map(function(row){
    return createEmployeeRecord(row)
  })
}

let createTimeInEvent = function(employee, dateStamp) {
  let [date, hour] = dateStamp.split(' ')
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date
  })
  return employee
}

let createTimeOutEvent = function(employee, dateStamp) {
  let [date, hour] = dateStamp.split(' ')
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date
  })
  return employee
}

let hoursWorkedOnDate = function(employee, dateWorked) {
  let timeInEvent = employee.timeInEvents.find(function(event){
    return event.date === dateWorked
  })
  
  let timeOutEvent = employee.timeOutEvents.find(function(event){
    return event.date === dateWorked
  })
  
  return (timeOutEvent.hour - timeInEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateWorked) {
  let rawWage = hoursWorkedOnDate(employee, dateWorked)
      * employee.payPerHour
  return parseFloat(rawWage.toString())
}

let allWagesFor = function(employee) {
  
  let datesWorked = employee.timeInEvents.map(function(event){
    return event.date
  })
  
  let totalWages = datesWorked.reduce(function(memo, date){
    return memo + wagesEarnedOnDate(employee, date)
  }, 0)
  
  return totalWages
}

let calculatePayroll = function(arrayOfEmployeeRecords) {
  return arrayOfEmployeeRecords.reduce(function(memo, record) {
    return memo + allWagesFor(record)
  }, 0)
}

let findEmployeeByFirstName = function(sourceArray, firstName) {
  return sourceArray.find(function(record){
    return record.firstName === firstName
  })
}
