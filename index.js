// Your code here

// Argument(s) A 4-element Array of a String, String, String, and Number corresponding to a first name, family name, title, and pay rate per hour
function createEmployeeRecord(array){
  // Behavior
  // Loads Array elements into corresponding Object properties. Additionally, initialize empty Arrays on the properties timeInEvents and timeOutEvents.

  let employeeRecord = {firstName: "", familyName: "", title: "", payPerHour: 0, timeInEvents: [], timeOutEvents: []}
  employeeRecord.firstName = array[0];
  employeeRecord.familyName = array[1];
  employeeRecord.title = array[2];
  employeeRecord.payPerHour = array[3];
  // Returns JavaScript Object with keys:
  // firstName
  // familyName
  // title
  // payPerHour
  // timeInEvents
  // timeOutEvents
  return employeeRecord;
}

// Argument(s) Array of Arrays
function createEmployeeRecords(array){
  // Behavior
  // Converts each nested Array into an employee record using createEmployeeRecord and accumulates it to a new Array

  // Returns
  // Array of Objects
  return array.map(function (e){
    return createEmployeeRecord(e)
  })
}

// Argument(s)
// An employee record Object
// A date stamp ("YYYY-MM-DD HHMM")
function createTimeInEvent(employee, date){
  // Behavior
  // Add an Object with keys to the timeInEvents Array on the record Object:
  // type: Set to "TimeIn"
  // hour: Derived from the argument
  // date: Derived from the argument
  let newDate = date.split(" ");

  let dateStamp = {type: "TimeIn", hour: parseInt(newDate[1]), date: newDate[0]}
  employee.timeInEvents.push(dateStamp)
  // Returns
  // The employee record
  return employee;
}

// Argument(s)
// An employee record Object
// A date stamp ("YYYY-MM-DD HHMM")
function createTimeOutEvent(employee, date){
  // Behavior
  // Add an Object with keys to the timeOutEvents Array on the record Object:
  // type: Set to "TimeOut"
  // hour: Derived from the argument
  // date: Derived from the argument
  let newDate = date.split(" ");

  let dateStamp = {type: "TimeOut", hour: parseInt(newDate[1]), date: newDate[0]}
  employee.timeOutEvents.push(dateStamp)
  // Returns
  // The employee record
  return employee;
}

// Argument(s)
// An employee record Object
// A date of the form "YYYY-MM-DD"
function hoursWorkedOnDate(employee, d){
  // Behavior
  // Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent
  let timeIn = employee.timeInEvents.find(s => s.date === d).hour;
  let timeOut = employee.timeOunEvents.find(s => s.date === d).hour;

  // Returns
  // Hours worked, an Integer
  return timeIn - timeOut;
  // return employee.timeInEvents[0].hour
}

// Argument(s)
// An employee record Object
// A date of the form "YYYY-MM-DD"
function wagesEarnedOnDate(employee, date){
  // Behavior
  // Using hoursWorkedOnDate, multiply the hours by the record's payRate to determine amount owed. Amount should be returned as a number.

  // Returns
  // Pay owed
  return null;
}

// Argument(s)
// An employee record Object
function allWagesFor(employee){
  // Behavior
  // Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context.
  // Amount should be returned as a number. HINT: You will need to find the available dates somehow...

  // Returns
  // Pay owed for all dates
  return null;
}

// Argument(s)
// srcArray: Array of employee records
// firstName: String representing a first name held in an employee record
function findEmployeeByFirstName(srcArray, firstName){
  // Behavior
  // Test the firstName field for a match with the firstName argument

  // Returns
  // Matching record or undefined
  return null;
}

// Argument(s)
// Array of employee records
function calculatePayroll(array){
  // Behavior
  // Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number.

  // Returns
  // Sum of pay owed to all employees for all dates, as a number
  return null;
}
