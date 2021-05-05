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
    let outEvent =  employeeRecord.timeOutEvents.find(
                   x =>  x.date === date
                   )

  //  console.log(inEvent.hour)
  //  console.log(outEvent.hour)
    return (outEvent.hour - inEvent.hour)/100

}

function wagesEarnedOnDate(employeeRecord, date){
   let rawEarned = hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
   return rawEarned

}


function allWagesFor(employeeRecord){
   let workedDays= employeeRecord.timeInEvents.map(
          x => x.date
     )


   let payMoney =   workedDays.reduce(
           function (acu, cur){
             return acu + wagesEarnedOnDate(employeeRecord, cur)
           }, 0)
   return  payMoney
}

function findEmployeeByFirstName(srcArray, firstName){
    let emp = srcArray.map((a) => a.firstName).indexOf(firstName)


    //



    // if  (srcArray.indexOf(firstName) == -1)
    //    return undefined
    // else{
    //   return srcArray[srcArray.indexOf(firstName)]
    // }

}
