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
let hour = splitDate[1]
// in array - timeEvents. add type, hour, date
var checkIn = {}
checkIn["TimeIn"] = record.timeInEvents.type
// console.log(record.timeInEvents.push(checkIn))
}

function createTimeOutEvent(record,date){

}

function hoursWorkedOnDate(record,date){
//on that date. time out - time in X payrate
console.log(record)
}

function wagesEarnedOnDate(record, date){

}

function allWagesFor(){

}


function findEmployeeByFirstName(srcArray,firstName){
// srcArray.filter({
//   if (firstName){
//     return firstName
//     else {
//       return undefined
//     }
//   }
// })
}

function calculatePayroll(){

}
