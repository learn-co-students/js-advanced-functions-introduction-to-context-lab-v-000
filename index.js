function createEmployeeRecord(employeeInfo) {
  // Another solution, with destructuring assignment (which works, but isn't as readable):
  // let [eRecord, additionalEmpInfo] = [ 
  //   {}, [ ...employeeInfo, [], [] ] 
  // ];

  // [ eRecord.firstName, eRecord.familyName, eRecord.title, 
  //   eRecord.payPerHour, eRecord.timeInEvents, eRecord.timeOutEvents ] = additionalEmpInfo;
  
  // return eRecord;

  // Solution 2:
  // return {
  //   firstName: employeeInfo[0], familyName: employeeInfo[1],
  //   title: employeeInfo[2], payPerHour: employeeInfo[3],
  //   timeInEvents: [], timeOutEvents: []
  // };

  // Solution 3 (might be a nice balance between solutions 1 and 2):
  let empRecord = {};

  [empRecord.firstName, empRecord.familyName, empRecord.title, empRecord.payPerHour] = employeeInfo;
  [empRecord.timeInEvents, empRecord.timeOutEvents] = [ [], [] ];

  return empRecord;
}

function createEmployeeRecords(employeeArray) {
  return employeeArray.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, timeIn) {
  // const splitTime = timeIn.split(" ");

  // Destructively update the employeeRecord:
  // employeeRecord.timeInEvents.push(
    // { type: "TimeIn", date: splitTime[0], hour: Number(splitTime[1]) }
  // ); // Note: parseInt can be used on the hour as well.

  // return employeeRecord;

  /* Non-destructively update the employeeRecord (This will fail tests, though):
    return Object.assign(
      {}, employeeRecord,
      { timeInEvents: [
        ...employeeRecord.timeInEvents, 
        { type: "TimeIn", date: splitTime[0], hour: Number(splitTime[1]) } 
      ]}
    ); // End of Object.assign */

  // Their solution. Does it work with that date? Yes, but why?
  // Evidently, destructuring assignment not only set the date, but made it available as a key/value pair.
  // Effectively, 'date' is the same as 'date: timeIn.split(" ")[0]'
  let [date, hour] = timeIn.split(" ");
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });
  return employeeRecord;
} // End of createTimeInEvent

function createTimeOutEvent(employeeRecord, timeOut) {
  const splitTime = timeOut.split(" ");

  employeeRecord.timeOutEvents.push(
    { type: "TimeOut", date: splitTime[0], hour: Number(splitTime[1]) }
  );

  return employeeRecord;
}

// For the fun of it, I refactored hoursWorkedOnDate with this:
function getHourFrom(timeEvents, date) {
  return timeEvents.find( e => e.date === date ).hour;
}

function hoursWorkedOnDate(eRecord, date) {
  // const timeIn = eRecord.timeInEvents.find( event => event.date === date ).hour;
  // const timeOut = eRecord.timeOutEvents.find( event => event.date === date ).hour;
  const timeIn = getHourFrom(eRecord.timeInEvents, date);
  const timeOut = getHourFrom(eRecord.timeOutEvents, date);

  return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(eRecord, date) {
  return eRecord.payPerHour * hoursWorkedOnDate(eRecord, date);
}

function allWagesFor(employee) {
  // First, get the dates that the employee worked.
  // Then get the wages earned on each date.
  // Then, sum those wages together.

  const datesWorked = employee.timeInEvents.map(event => event.date);
  
  // Solution 1 (good, but adds an extra variable): 
  // const dailyWages = datesWorked.map( date => wagesEarnedOnDate(employee, date) );
  // return dailyWages.reduce( (wageTotal, wage) => wageTotal + wage, 0);

  // Solution 2 (technically works, but not as readable):
  // return datesWorked.reduce( (wageTotal, date) => wageTotal + employee.payPerHour * hoursWorkedOnDate(employee, date), 0)

  // Solution 3 (might be the best one):
  return datesWorked.reduce( (wageTotal, date) => wageTotal + wagesEarnedOnDate(employee, date), 0);
}

function findEmployeeByFirstName(empRecords, firstName) {
  return empRecords.find(record => record.firstName === firstName);
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce( (totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
}