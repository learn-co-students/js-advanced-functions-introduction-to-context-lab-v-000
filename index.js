// Your code here
const createEmployeeRecord = (arr) => {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

const createEmployeeRecords = (arr) => {
  return arr.map(nested => createEmployeeRecord(nested))
}

const createTimeInEvent = (obj, str) => {
  str = str.split(" ")
  obj.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(str[1], 10),
      date: str[0]
    })
  return obj
}

const createTimeOutEvent = (obj, str) => {
  str = str.split(" ")
  obj.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(str[1], 10),
    date: str[0]
  })
  return obj
}

const hoursWorkedOnDate = (obj, date) => {
  let result = obj.timeInEvents.find(el => el.date === date)
  let result1 = obj.timeOutEvents.find(el => el.date === date)

  return (result1.hour - result.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateSought) {
  let rawWage = hoursWorkedOnDate(employee, dateSought) * employee.payPerHour
  return parseFloat(rawWage.toString())
}

const allWagesFor = (obj) => {
  let dates = obj.timeInEvents.map(record => {
    return record.date
  })

    let results = dates.reduce((accum, el) => {
    return accum + wagesEarnedOnDate(obj, el)
  }, 0)

  return results
}

const calculatePayroll = (arr) => {
    // let totals = arr.map(emp => allWagesFor(emp))
    let sum = arr.reduce((accum, el) => {return accum + allWagesFor(el)}, 0)
    return sum
}

const findEmployeeByFirstName = (arr,str) => {
   let result = arr.find(emp => emp.firstName === str)
   return result
}
