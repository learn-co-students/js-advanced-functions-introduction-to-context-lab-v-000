// Your code here

function createEmployeeRecord(array){
 let card = {
  firstName: array[0],
  familyName: array[1],
  title: array[2],
  payPerHour: array[3],
  timeInEvents: [],
  timeOutEvents: []
}
return card
}

function createEmployeeRecords(array){
return array.map(element => createEmployeeRecord(element))
}

function createTimeInEvent(record,date){
let splitDate = date.split(' ')
let day = splitDate[0]
let hour = Number(splitDate[1])

// in array - timeEvents. add type, hour, date
let checkIn = {
  type: 'TimeIn',
  hour: hour,
  date: day
}
record.timeInEvents.push(checkIn)
return record
}

function createTimeOutEvent(record,date){
  let splitDate = date.split(' ')
  let day = splitDate[0]
  let hour = Number(splitDate[1])

  // in array - timeEvents. add type, hour, date
  let checkIn = {
    type: 'TimeOut',
    hour: hour,
    date: day
  }
  record.timeOutEvents.push(checkIn)
  return record
}

function hoursWorkedOnDate(record,date){
//on that date. time out - time in X payrate

let hours = record.timeInEvents[0].hour - record.timeOutEvents[0].hour
let positiveHours = Math.abs(hours) / 100
return positiveHours

}

function wagesEarnedOnDate(record, date){
return hoursWorkedOnDate(record,date) * record.payPerHour
}



function allWagesFor(record){
console.log(hoursWorkedOnDate(record,date))
//map then reduce the value
//foreach card.... find the wages
}


function findEmployeeByFirstName(srcArray,firstName){
if (srcArray.filter(name => name === firstName)){
return name
}
else {
  return undefined
}
}

function calculatePayroll(array){

}
