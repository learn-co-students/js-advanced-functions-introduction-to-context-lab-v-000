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

}

function hoursWorkedOnDate(record,date){
//on that date. time out - time in X payrate

}

function wagesEarnedOnDate(record, date){

}

function allWagesFor(){

}


function findEmployeeByFirstName(srcArray,firstName){

}

function calculatePayroll(){

}
