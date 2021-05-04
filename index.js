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

function createEmployeeRecords(employeesArray){
  return employeesArray.map(createEmployeeRecord)
}


// employee is an object
function createTimeInEvent(employeeRecord, dateStamp){
  let [date, hour] = dateStamp.split(' ')

  employeeRecord.timeInEvents.push({
       type: "TimeIn",
       hour: parseInt(hour, 10), //bcos is a string, should be int
       date,
   })
   return employeeRecord
}


function createTimeOutEvent(employeeRecord, dateStamp){
  let [date, hour] = dateStamp.split(' ')

  employeeRecord.timeOutEvents.push({
       type: "TimeOut",
       hour: parseInt(hour, 10), //bcos is a string, should be int
       date,
   })
  return employeeRecord

}

function  hoursWorkedOnDate(employeeRecord, date){
    let inEvent =  employeeRecord.timeInEvents.find(
                   x =>  x.date === date
                   )
    let outEvent =  employeeRecord.timeInEvents.find(
                   x =>  x.date === date
                   )

    return (outEvent - inEvent)/100



}
