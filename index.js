// Your code here
function createEmployeeRecord(recordArr) {
  const [firstName, familyName, title, payPerHour] = recordArr

  const employeeRecord = {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  }

  return employeeRecord
}

function createEmployeeRecords(recordsArr) {
  return recordsArr.map(employeeRecord => createEmployeeRecord(employeeRecord))
}

function createTimeInEvent(record, dateTime) {
  const [date, hour] = dateTime.split(' ')

  record['timeInEvents'].push({
    type: 'TimeIn',
    hour: parseInt(hour, 10),
    date: date
  })

  return record
}

function createTimeOutEvent(record, dateTime) {
  const [date, hour] = dateTime.split(' ')

  record['timeOutEvents'].push({
    type: 'TimeOut',
    hour: parseInt(hour, 10),
    date: date
  })

  return record
}

function hoursWorkedOnDate(record, date) {
  const timeIn = record.timeInEvents.find(e => e.date == date)
  const timeOut = record.timeOutEvents.find(e => e.date == date)

  return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(record, date) {
  return hoursWorkedOnDate(record, date) * record.payPerHour
}

function allWagesFor(record) {
  const availableDates = record.timeInEvents.map(timeIn => timeIn.date)
  
  return availableDates.reduce((total, date) => {
    return total + wagesEarnedOnDate(record, date)
  }, 0)
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(employee => employee.firstName == firstName)
}

function calculatePayroll(recordsArr) {
  return recordsArr.reduce((total, record) => total + allWagesFor(record), 0)
}