// Your code here

function createEmployeeRecord(array){
  const employee = {
     firstName: array[0],
     familyName: array[1],
     title: array[2],
     payPerHour: array[3],
     timeInEvents: [],
     timeOutEvents: []
  }
  return employee
}

//createEmployeeRecords
function createEmployeeRecords(arrays){
  return arrays.map(createEmployeeRecord)
  }


//createTimeInEvent
function createTimeInEvent(employeeObj, timeDateStamp){
  let timeInArr = timeDateStamp.split(' ')
  //you cannot use Object.assign because you have to shove the new properties into the array that's already been created for the timeInEvents property
  //find out why you cannot add return to front of next line? as in return employeeObj.timeInEvents.push
  employeeObj.timeInEvents.push(
    {type: "TimeIn",
    date: timeInArr[0],
    //the parseInt with a base of 10(radix) will convert it from 1300 to 13 for easy subtraction/addition
    hour: parseInt(timeInArr[1])}
  )
  return employeeObj
}


//createTimeOutEvent
function createTimeOutEvent(employeeObj, timeDateStamp){
  let timeOutArr = timeDateStamp.split(' ')
  employeeObj.timeOutEvents.push(
    {type: "TimeOut",
    date: timeOutArr[0],
    hour: parseInt(timeOutArr[1])}
  )
  return employeeObj
}

//this solution is short-sighted, what if someone punches in and out on same day?
//find will only return the first result. filter might be better but adds complexity
function hoursWorkedOnDate(employeeObj, date){
  const timeInHour = employeeObj.timeInEvents.find(x =>
    {return x.date === date})
  const timeOutHour = employeeObj.timeOutEvents.find(x =>
    {return x.date === date})
   return (timeOutHour.hour - timeInHour.hour)/100
}

//wagesEarnedOnDate
function wagesEarnedOnDate(employeeObj, date){
  let hoursWorked = hoursWorkedOnDate(employeeObj, date)
  return (employeeObj.payPerHour * hoursWorked)
}

//allWagesFor
function allWagesFor(employeeObj){
  //find the available dates by iterating through timeInEvents and isolate .date
  //use wagesEarnedOnDate,call on all timeInDates
  //push into array containing total wages per day, Each new wageday-> new index
  //use reduce on this array to get aggregate pay
  let wagesArray = []
  employeeObj.timeInEvents.forEach(e => {
  wagesArray.push(wagesEarnedOnDate(employeeObj, e.date))
  })
  return wagesArray.reduce((memo, element) => memo + element, 0)
}

//findEmployeeByFirstName
function findEmployeeByFirstName(employeeObjs, firstName){
  return employeeObjs.find(x =>{
   return x.firstName === firstName ? x : undefined //-> note, you need return
    //let found = x.firstName === firstName
    //return !!found || undefined -> this also works
    //-> the condition must be present or else it will return the first value, in this case "loki" which inadertendtly passes the Learn test.
  })
}


function calculatePayroll(employeeObjs){
  return employeeObjs.reduce((m, e) => m + allWagesFor(e), 0)
}
