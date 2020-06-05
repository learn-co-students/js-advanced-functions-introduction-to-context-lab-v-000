// Your code here


function createEmployeeRecord(array){
  // let { firstName, familyName, title, payPerHour } = array
  let obj1 = {}
  obj1.firstName = array[0]
  obj1.familyName = array[1]
  obj1.title = array[2]
  obj1.payPerHour = array[3]
  obj1.timeInEvents = []
  obj1.timeOutEvents = []

  return obj1
}


function createEmployeeRecords(arrayOfArrays){
  return arrayOfArrays.map( arr => createEmployeeRecord(arr) )
}

// recordObj > timeInEvents array > add object with those 3 keys
function createTimeInEvent(recordObj, dateStampString){
  let newObject = { type: "TimeIn", hour: parseInt(dateStampString.slice(dateStampString.length - 4)), date: dateStampString.slice(0, 10) }
  // let newObject = { type: "TimeIn" }
  recordObj.timeInEvents.push(newObject)
  return recordObj
}


function createTimeOutEvent(recordObj, dateStampString){
  let newObject = { type: "TimeOut", hour: parseInt(dateStampString.slice(dateStampString.length - 4)), date: dateStampString.slice(0, 10) }

  recordObj.timeOutEvents.push(newObject)
  return recordObj
}


// maybe I can go in the recordObj and find the time in
// subtract the timeIn from timeOut, and then divide the result by 100.
// How to use debugger here? isn't it only for console? might help to see the data
//  structure.
// How to open multiple projects in the same sidebar?
// so it will be 3 steps, finding the timeIn event and the timeOut
// find might be a better fit than filter because filter would return an
// array instead of an individual result
function hoursWorkedOnDate(recordObj, formDate){
  let rightTimeIn = recordObj.timeInEvents.find( record => {
  //  the callback function itself needs a return value so find can work
    return record.date == formDate
  } )
  let rightTimeOut = recordObj.timeOutEvents.find( record => {
  //  the callback function itself needs a return value so find can work
    return record.date == formDate
  } )
  return ((rightTimeOut.hour - rightTimeIn.hour)/100)
}



function wagesEarnedOnDate(recordObj, dateOfForm){
  return (recordObj.payPerHour * hoursWorkedOnDate(recordObj, dateOfForm))
}

//
// function findEmployeeByFirstName(srcArray, firstName){
//     return srcArray.find( record => {
//      return record.firstName == firstName
// }
// }


// need to add up all the wages they've earned across multiple days. so
//  call wagesEarnedOnDate for each date. and then add those.
// so where are the dates?

// on the recordObj, there's an array called timeInEvents, and also one called
// timeOutEvents. Each has several events. You can call timeInEvents.'record'.date like on line 50.
// -maybe iterate over timeinEvents date? they should all be the same date anyway
//
// for debugging you can comment out everything else in the method, or just different
// parts, to see what happens and narrow down to the error. we commented out everthing
// after the console.log.
// you can make a whole separate note file also, a .md file.
// then rerun each part one at a time,like we just started with the function itself
// can comment part of a line

// function allWagesFor(recordObj){
//    let wageArray = recordObj.timeInEvents.map(function(num) {
//      // console.log("Test 2", num.date)
//      return num.date
// })//.map{ record => {
//      // console.log("I am here", wageArray)
//      // return wagesEarnedOnDate(recordObj, record.date)
//    // }}
//    // let finalWages = wageArray.reduce(function(a, b){
//    //   return a + b
//    // }, 0)
//    // return finalWages
// }

function allWagesFor(recordObj){
   let wageDatesArray = recordObj.timeInEvents.map(function(num) {
     return wagesEarnedOnDate(recordObj, num.date)
     })//.map{ record => {
     // console.log("I am here 1", wageDatesArray)
     // console.log("I am here 2", wageDatesArray[0])
     // console.log("I am here 3", wagesEarnedOnDate(recordObj, wageDatesArray[0]))
     const reducer = (accumulator, currentValue) => accumulator + currentValue;
     let totalWagesDue = wageDatesArray.reduce(reducer)
     return totalWagesDue

}


function findEmployeeByFirstName(srcArray, firstNameString) {
  // console.log("source array", srcArray)
  // console.log("firstNameString", firstNameString)

  // console.log("test", srcArray.find( employee => employee.name === firstNameString))
  return srcArray.find( employeeObject => {
    return employeeObject.firstName === firstNameString
  })
}


function calculatePayroll(employeesArray) {
  console.log("test1", employeesArray)
  let wagesForEmployees = employeesArray.map( employee => allWagesFor(employee))
  console.log("test1", wagesForEmployees)

  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  let totalWagesDueForAll = wagesForEmployees.reduce(reducer)
  return totalWagesDueForAll
}
