// Your code here
function createEmployeeRecord(employeeArray) {
  //console.log(employeeArray);
  //console.log(employeeRecords);
  var testEmployee = {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return testEmployee;
}

function createEmployeeRecords(arrayOfArrays) {
  //process an Array of Arrays into an Array of employee records
  //console.log(arrayOfArrays)
  var arrayOfRecords = [];
  arrayOfArrays.forEach((employeeArray) => {
    //console.log(employeeArray);
    var newRecord = createEmployeeRecord(employeeArray);
    arrayOfRecords.push(newRecord);
  });
  return arrayOfRecords;
}

function createTimeInEvent(employeeRecord, dateStamp) {
  //console.log(employeeRecord);
  //console.log(dateStamp);
  //employeeRecord.type = "TimeIn";

  var timeNDate = dateStamp.split(" ");
  //employeeRecord.date = timeNDate[0];
  //employeeRecord.time = timeNDate[1];
  //console.log(employeeRecord)
  //console.log(timeNDate[1])
  //it adds a timeIn event Object to an employee's record of timeInEvents when provided an employee record and Date/Time String and returns the updated record
  var hourInt = parseInt(timeNDate[1]);
  var timeIn = { 
    type: "TimeIn",
    date: timeNDate[0],
    hour: hourInt //test expected an int
  };
  employeeRecord.timeInEvents.push(timeIn);
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
  //console.log(employeeRecord);
  //console.log(dateStamp);
  //employeeRecord.type = "TimeOut";

  var timeNDate = dateStamp.split(" ");
  //employeeRecord.date = timeNDate[0];
  //employeeRecord.time = timeNDate[1];
  //console.log(timeNDate[1])
  var hourInt = parseInt(timeNDate[1]);
  var timeOut = { 
    type: "TimeOut",
    date: timeNDate[0],
    hour: hourInt 
  };
  employeeRecord.timeOutEvents.push(timeOut);
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord,date){
    //console.log(employeeRecord)
    //console.log(date)
    //console.log(employeeRecord.timeInEvents[0]["hour"])
    //console.log(employeeRecord.timeOutEvents[0]["hour"])
    var matchingTimeInDate = employeeRecord.timeInEvents.find(element => element.date === date)
    var matchingTimeOutDate = employeeRecord.timeOutEvents.find(element => element.date === date)

    var hourStarted = matchingTimeInDate.hour
    //console.log(hourStarted)
    var hourEnded = matchingTimeOutDate.hour
    //console.log(hourEnded)
    var hoursTotal = ((hourEnded - hourStarted)/100)
    return hoursTotal
}

function wagesEarnedOnDate(employeeRecord,date) {
    var hours = hoursWorkedOnDate(employeeRecord,date)
    //console.log(employeeRecord)
    var pay = employeeRecord.payPerHour
    var paycheck = pay * hours
    return paycheck
}

function allWagesFor(employeeRecord) {
    //console.log(employeeRecord)
    var wages = []
    employeeRecord.timeOutEvents.forEach(event => {
        var wage = wagesEarnedOnDate(employeeRecord,event.date)
        wages.push(wage)}
    )   
    var totalWages = wages.reduce((total,element) => total + element) //normal reduction. https://learn.co/tracks/full-stack-web-development-v8/module-14-front-end-web-programming-in-javascript/section-9-advanced-function-usage/iterators-drill-reduce-lab
    return totalWages
}

function calculatePayroll(employeeRecordArray){
    //console.log(employeeRecordArray)
    var Payroll = []
    employeeRecordArray.forEach(employeeRecord => {
        var employeeFullWages = allWagesFor(employeeRecord)
        Payroll.push(employeeFullWages)
    })
    var totalPay = Payroll.reduce((total,element) => total + element)
    return totalPay
}

function findEmployeeByFirstName(srcArray,firstName) {
    srcArray.forEach(employeeRecord => {
        if (employeeRecord.firstName === firstName){
            console.log(employeeRecord)
            return employeeRecord
        }
    })
}