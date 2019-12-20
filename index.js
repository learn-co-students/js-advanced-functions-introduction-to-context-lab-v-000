// Your code here
let createEmployeeRecord = function(fourElementArray){
    return {
        firstName: fourElementArray[0],
        familyName: fourElementArray[1],
        title: fourElementArray[2],
        payPerHour: fourElementArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeDataArray) {
    return employeeDataArray.map(data => {
        return createEmployeeRecord(data)
    }) 
}

let createTimeInEvent = function(employeeObject, dateStamp) {
    console.log(dateStamp)
    let [date, hour] = dateStamp.split(' ')
    console.log(date)
    console.log(hour)
    employeeObject.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employeeObject
}

let createTimeOutEvent = function(employeeObject, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employeeObject.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employeeObject
}

let hoursWorkedOnDate = function(employeeObject, dateToSearch) {
    console.log(employeeObject)
    let clockIn = employeeObject.timeInEvents.find(event => event.date === dateToSearch)
    
    let clockOut = employeeObject.timeOutEvents.find(event => event.date === dateToSearch)
    
    console.log("clockInHour", clockIn.hour)
    console.log("clockOutHour", clockOut.hour)
    return (clockOut.hour - clockIn.hour) / 100
}

let wagesEarnedOnDate = function(employeeObject, dateToSearch) {
    let wages = hoursWorkedOnDate(employeeObject, dateToSearch) * employeeObject.payPerHour
    console.log("wages", wages)
    return wages
}

let allWagesFor = function(employeeObject) {

    let dates = employeeObject.timeInEvents.map(event => event.date)

    let payable = dates.reduce(function(memo, date){
        console.log("date", date)
    return memo + wagesEarnedOnDate(employeeObject, date)
    }, 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    let firstNameReturn =  srcArray.find(record => record.firstName === firstName)
    return firstNameReturn
}
  let calculatePayroll = function(arrayOfEmployeeRecords){
      return arrayOfEmployeeRecords.reduce(function(memo, record){
          console.log("memo", memo)
          console.log("record", record)
          return memo + allWagesFor(record)
      }, 0)
  }