// Your code here
function createEmployeeRecord(employeeArray) {
  return {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(arrayOfEmployeeArrays) {
  return arrayOfEmployeeArrays.map(createEmployeeRecord)
}

// it adds a timeIn event Object to an employee's record of timeInEvents when provided an employee record and Date/Time String 
// and returns the updated record
function createTimeInEvent(employeeRecord, dateTime) {
  const type = "TimeIn"
  const dateTimeArray = dateTime.split(' ')
  const date = dateTimeArray[0]
  const hour = parseInt(dateTimeArray[1])
  
  employeeRecord.timeInEvents.push({type: type, date: date, hour: hour})
  return employeeRecord
}

// it adds a timeOut event Object to an employee's record of timeOutEvents when provided an employee record and Date/Time String 
// and returns the updated record
function createTimeOutEvent(employeeRecord, dateTime) {
  const type = "TimeOut"
  const dateTimeArray = dateTime.split(' ')
  const date = dateTimeArray[0]
  const hour = parseInt(dateTimeArray[1])

  employeeRecord.timeOutEvents.push({type: type, date: date, hour: hour})
  return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, dateWorked) {
  const timeInRecord = employeeRecord.timeInEvents.find(function(timeInEvent){
      return timeInEvent.date === dateWorked
  })
  const hourInOnDate = timeInRecord.hour

  const timeOutRecord = employeeRecord.timeOutEvents.find(function(timeOutEvent){
      return timeOutEvent.date === dateWorked
  })
  const hourOutOnDate = timeOutRecord.hour
  //const hoursWorked = parseInt((hourOutOnDate - hourInOnDate).toString().slice(0, -2))
  const hoursWorked = (hourOutOnDate - hourInOnDate) / 100
  return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, dateWorked) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, dateWorked)
  const wage = employeeRecord.payPerHour
  return hoursWorked * wage
}

function allWagesFor(employeeRecord) {  
  const dates = employeeRecord.timeInEvents.map(function(timeInEvent){
    return timeInEvent.date
  })
  
  const wages = dates.map(function(date){
    return wagesEarnedOnDate(employeeRecord, date)
  })
  
  const totalWages = wages.reduce((total, element) => element + total, 0)
  
  return totalWages
}

function calculatePayroll(employees) {
  const wages = employees.map(function(employee) {
    return allWagesFor(employee)
  })

  const totalWages = wages.reduce((total, element) => element + total, 0)
  
  return totalWages
}

function findEmployeeByFirstName(employeeRecords, firstName) {
  return employeeRecords.find(function(employee) {
    return employee.firstName === firstName
  })
}