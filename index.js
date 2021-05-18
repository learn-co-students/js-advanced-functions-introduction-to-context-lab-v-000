function createEmployeeRecord(employee){
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(rows){
  return rows.map(row => createEmployeeRecord(row))
}

function punchClock(employee, eventType, time){
  const event = eventType.indexOf("I") == 4 ? "TimeIn" : "TimeOut"
  employee[eventType].push({
    type: event,
    date: time.substring(0, 10),
    hour: parseInt(time.substring(11, 15))
  })
  return employee
}

function createTimeInEvent(employee, timeIn){
  punchClock(employee, "timeInEvents", timeIn)
  return employee
}

function createTimeOutEvent(employee, timeOut){
  punchClock(employee, "timeOutEvents", timeOut)
  return employee
}

function hoursWorkedOnDate(employee, date){
  let timeIn = lookUpTime(employee, "timeInEvents", date)
  let timeOut = lookUpTime(employee, "timeOutEvents", date)
  return (timeOut - timeIn)/100
}

function lookUpTime(employee, eventType, date){
  return employee[eventType].find( event => event.date == date).hour
}

function wagesEarnedOnDate(employee, date){
  return employee.payPerHour * hoursWorkedOnDate(employee, date)
}

function allWagesFor(employee){
  let datesWorked = employee.timeInEvents.map(event => event.date)
  return datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0)
}

function calculatePayroll(employees){
  return employees.reduce((total, employee) => total + allWagesFor(employee), 0)
}

function findEmployeeByFirstName(employees, name){
  return employees.find(employee => employee.firstName === name)
}