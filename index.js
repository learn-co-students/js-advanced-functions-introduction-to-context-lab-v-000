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

function hoursWorkedOnDate(employee,soughtDate){
//on that date. time out - time in X payrate

// let hours = record.timeInEvents[0].hour - record.timeOutEvents[0].hour
// let positiveHours = Math.abs(hours) / 100
// return positiveHours
let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100


}

function wagesEarnedOnDate(employee, dateSought){
// return hoursWorkedOnDate(record,date) * record.payPerHour
let rawWage = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}



function allWagesFor(employee){
//  let timeFor = record.timeInEvents.map(element => element.date)
// // timeFor.reduce(element => element)
// // console.log(timeFor)
// // return wagesEarnedOnDate(record,timeFor)
// return timeFor.reduce(function(memo, d){
//         return memo + wagesEarnedOnDate(record, d)
//     }, 0)
let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
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
