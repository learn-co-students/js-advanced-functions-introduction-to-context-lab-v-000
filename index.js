// Your code here
function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(array) {
  return array.map(record => createEmployeeRecord(record))
}

function createTimeInEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ")
  employee.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(hour, 10),
    date
  })
  return employee
}

function createTimeOutEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ")
  employee.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(hour, 10),
    date
  })
  return employee
}

const hoursWorkedOnDate = (employee, dateStamp) => {
  //given a date, find # of hours elapsed b/t that date's timeInEvent and timeOut
  let timeInDate = employee.timeInEvents.find(e => e.date == dateStamp)
  let timeOutDate = employee.timeOutEvents.find(e => e.date == dateStamp)
  let hoursWorked = (timeOutDate.hour - timeInDate.hour) / 100
  return hoursWorked
}

const wagesEarnedOnDate = (employee, dateStamp) => {
  let wagesEarned = hoursWorkedOnDate(employee, dateStamp) * employee.payPerHour
  return wagesEarned
}

const allWagesFor = (employee) => {
  // get all Dates
  let datesWorked = employee.timeInEvents.map(event => event.date)
  // iterate through datesWorked and run wagesEarnedonDate to reduce to sum
  let allWages = datesWorked.reduce((total, date) => {
    return total += wagesEarnedOnDate(employee, date)
  }, 0) 

return allWages
}

const findEmployeeByFirstName = (employees, firstName) => {
  return employees.find(employee => employee.firstName == firstName)
}

const calculatePayroll = (employees) => {
  return employees.reduce((total, employee) => total += allWagesFor(employee), 0)
}
