// Your code here

//loads Array elements into corresponding Object properties.

function createEmployeeRecord(workerInfo){
    let record = {}
        record.firstName = workerInfo["0"]
        record.familyName = workerInfo["1"]
        record.title = workerInfo["2"]
        record.payPerHour = workerInfo["3"]
        record.timeInEvents = []
        record.timeOutEvents = []
    return record
}

function createEmployeeRecords(worker_arrays){ //array of mulitple worker arrays
    //take each array and turn them into individual records
    return worker_arrays.map(worker => {return createEmployeeRecord(worker)})
}

function createTimeInEvent(employeeRecord, dateStamp){
  let timeInObj = {}
    timeInObj.type = "TimeIn"
    timeInObj.hour = parseInt(dateStamp.split(" ")[1])
    timeInObj.date = dateStamp.split(" ")[0]
    
    employeeRecord.timeInEvents.push(timeInObj)
    
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
    let timeOutObj = {}
    timeOutObj.type = "TimeOut"
    timeOutObj.hour = parseInt(dateStamp.split(" ")[1])
    timeOutObj.date = dateStamp.split(" ")[0]
    
    employeeRecord.timeOutEvents.push(timeOutObj)
    
    return employeeRecord

}

function hoursWorkedOnDate(employeeRecord, dateStamp){
    const selectedHourStart = employeeRecord.timeInEvents.find( function(event) {
        if (event.date === dateStamp){
          return true;
        }
      });
    
      const selectedHourEnd = employeeRecord.timeOutEvents.find( function(event) {
        if (event.date === dateStamp){
          return true;
        }
      });
    
      const hoursWorked = (selectedHourEnd.hour - selectedHourStart.hour)/100
      return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, dateStamp){
    let wage = hoursWorkedOnDate(employeeRecord, dateStamp) * employeeRecord.payPerHour
    return wage
}

function allWagesFor(employeeRecord){
    let all_dates = employeeRecord.timeInEvents.map(timeEvent => timeEvent.date)

    //get the wagesEarnedOnDate for each date and add them up (reduce)
    //for each date, get the hou...day 2 wages are wrong = 324 also...
   let total_pay = all_dates.reduce((total, date) => (total + wagesEarnedOnDate(employeeRecord, date)), 0)
   return total_pay

}

function findEmployeeByFirstName(scrArray, firstName){
    return scrArray.find(employee => employee.firstName == firstName)
}

// function calculatePayroll(allEmployees){
//    let allPay = allEmployees.reduce((payroll, employee) => (payroll + allWagesFor(employee), 0))
//     return allPay
// 
// }

function calculatePayroll(employees) {
    return employees.reduce(function(initialPayroll, employee) {
      return initialPayroll + allWagesFor(employee);
    }, 0);
  }