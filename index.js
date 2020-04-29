function createEmployeeRecord(record) {
  return {
    firstName: record[0],
    familyName: record[1],
    title: record[2],
    payPerHour: record[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(records) {
  return records.map(record => createEmployeeRecord(record) )
}

function createTimeInEvent(record, dateStamp) {
  let dateAndHour = dateStamp.split(" ")
  record.timeInEvents.push({
    type: "TimeIn",
    date: dateAndHour[0],
    hour: parseInt(dateAndHour[1])
  })
  return record
}

function createTimeOutEvent(record, dateStamp) {
  let dateAndHour = dateStamp.split(" ")
  record.timeOutEvents.push({
    type: "TimeOut",
    date: dateAndHour[0],
    hour: parseInt(dateAndHour[1])
  })
  return record
}

function hoursWorkedOnDate(record, date) {
  let outHour = record.timeOutEvents.find(element => element.date === date).hour
  let inHour = record.timeInEvents.find(element => element.date === date).hour
  return (outHour - inHour) /100
}

function wagesEarnedOnDate(record, date) {
  let hours = hoursWorkedOnDate(record, date)
  return hours * record.payPerHour
}

function allWagesFor(record) {
  let hours = record.timeOutEvents.map(e => hoursWorkedOnDate(record, e.date))
  let totalHours = hours.reduce((total, currentValue) => total + currentValue)
  return totalHours * record.payPerHour
}

function calculatePayroll(records) {
  return records.reduce((total, employee) => total + allWagesFor(employee), 0)
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName == firstName)
}
