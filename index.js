// Your code here
function createEmployeeRecord(dataArray) {
  return {
    firstName:  dataArray[0],
    familyName: dataArray[1],
    title:      dataArray[2],
    payPerHour: Number(dataArray[3]),
    timeInEvents:  [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(dataArrays) {
  return dataArrays.map((dataArray)=>createEmployeeRecord(dataArray))
}

function createTimeInEvent(employee, timestamp) {
  const timeInEvent = {
    type: "TimeIn",
    hour: +timestamp.split(" ")[1],
    date: timestamp.split(" ")[0],
    timestamp: timestamp
  }
  employee.timeInEvents.push(timeInEvent)
  return employee
}

function createTimeOutEvent(employee, timestamp) {
  const timeOutEvent = {
    type: "TimeOut",
    hour: +timestamp.split(" ")[1],
    date: timestamp.split(" ")[0],
    timestamp: timestamp
  }
  employee.timeOutEvents.push(timeOutEvent)
  return employee
}

function hoursWorkedOnDate(employee, timestamp) {
  
  const findByTimeEvent = (timeEvent) => { return timeEvent.date === timestamp.split(" ")[0] }

  const [hourIn, hourOut] = [
    convertTimestampToDate(employee.timeInEvents.find(findByTimeEvent).timestamp).getHours(),
    convertTimestampToDate(employee.timeOutEvents.find(findByTimeEvent).timestamp).getHours()
  ]
  return Number(hourOut - hourIn)
}

function wagesEarnedOnDate(employee, timestamp) {
  return hoursWorkedOnDate(employee, timestamp) * employee.payPerHour
}

function allWagesFor(employee) {
  const allWages = employee.timeOutEvents.map((timeEvent)=>wagesEarnedOnDate(employee, timeEvent.date))
  return allWages.reduce((total, currentValue)=> total + currentValue)
}

function findEmployeeByFirstName(employees, firstName) {
  return employees.find((employee)=> employee.firstName === firstName)
}

function calculatePayroll(employees) {
  const employeeWages = employees.map((employee) => allWagesFor(employee))

  return employees.map((employee)=> allWagesFor(employee)).reduce((total, currentValue)=> currentValue += total)
}

function convertTimestampToDate(timestamp) {
  const time = timestamp.replace(" ", "T").split("")
  time.splice(-2, 0, ":")
  return new Date(time.join(""))
}

// let dataEmployees = [
//   ["Thor", "Odinsson", "Electrical Engineer", 45],
//   ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
//   ["Natalia", "Romanov", "CEO", 150],
//   ["Darcey", "Lewis", "Intern", 15],
//   ["Jarvis", "Stark", "CIO", 125],
//   ["Anthony", "Stark", "Angel Investor", 300],
//   ["Byron", "Poodle", "Mascot", 3],
//   ["Julius", "Caesar", "General", 27],
//   ["Rafiki", "", "Aide", 10],
//   ["Simba", "", "King", 100]
// ]
// let employeeRecords = createEmployeeRecords(dataEmployees)

// createTimeInEvent(employeeRecords[0], "0044-03-15 0900")
// createTimeOutEvent(employeeRecords[0], "0044-03-15 1100")
// createTimeInEvent(employeeRecords[0], "0044-03-16 0900")
// createTimeOutEvent(employeeRecords[0], "0044-03-16 1100")

// // allWagesFor(employeeRecords[0])
// cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
// // Earns 324
// updatedBpRecord = createTimeInEvent(cRecord, "0044-03-14 0900")
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-14 2100")
// // Earns 54
// updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")
// // 324 + 54
// allWagesFor(cRecord)

