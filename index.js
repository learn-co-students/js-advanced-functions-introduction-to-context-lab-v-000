// ASSUMPTIONS
// 1. Employees always check in and check out
// 2. Employees always check in and check out on the hour
// 3. The time is represented on a 24-hour clock
// 4. Timestamps are strings in the form: "YYYY-MM-DD HMM" or "YYYY-MM-DD HHMM"
// 5. Employees will never work through the night

function createEmployeeRecord(employeeData) {
  let employeeRecord = {};
  employeeRecord.firstName = employeeData[0];
  employeeRecord.familyName = employeeData[1];
  employeeRecord.title = employeeData[2];
  employeeRecord.payPerHour = employeeData[3];
  employeeRecord.timeInEvents = [];
  employeeRecord.timeOutEvents = [];
  return employeeRecord;
};

function createEmployeeRecords(employeeDatum) {
  let employeeRecords = [];
  employeeDatum.map(function(employeeData) {
    employeeRecords.push(createEmployeeRecord(employeeData));
  });
  return employeeRecords;
};

function createTimeInEvent(employeeRecord, timeInEvent) {
  let regex = /(?<date>\d{4}-\d{2}-\d{2}) (?<hour>\d{3,4})/;
  let checkIn = {};
  checkIn.type = "TimeIn";
  checkIn.hour = parseInt(timeInEvent.match(regex).groups.hour);
  checkIn.date = timeInEvent.match(regex).groups.date;
  employeeRecord.timeInEvents.push(checkIn);
  return employeeRecord;
};

function createTimeOutEvent(employeeRecord, timeOutEvent) {
  let regex = /(?<date>\d{4}-\d{2}-\d{2}) (?<hour>\d{3,4})/;
  let checkOut = {};
  checkOut.type = "TimeOut";
  checkOut.hour = parseInt(timeOutEvent.match(regex).groups.hour, 10);
  checkOut.date = timeOutEvent.match(regex).groups.date;
  employeeRecord.timeOutEvents.push(checkOut);
  return employeeRecord;
};

function hoursWorkedOnDate(employeeRecord, date) {
  let checkInDate = {};
  let checkOutDate = {};
  checkInDate = employeeRecord.timeInEvents.find( checkIn => checkIn.date == date );
  checkOutDate = employeeRecord.timeOutEvents.find( checkOut => checkOut.date == date );
  let hoursWorked = parseInt((checkOutDate.hour - checkInDate.hour).toString().slice(0, -2), 10);
  return hoursWorked;
};

function wagesEarnedOnDate(employeeRecord, date) {
  return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
};

function allWagesFor(employeeRecord) {
  let dailyWages = [];
  employeeRecord.timeInEvents.map(checkIn => dailyWages.push(wagesEarnedOnDate(employeeRecord, checkIn.date)));
  let totalWages = dailyWages.reduce((memo, wages) => memo + wages);
  return totalWages;
};

function calculatePayroll(employeeRecords) {
  let employeeWages = [];
  employeeRecords.forEach(employeeRecord => {
    employeeWages.push(allWagesFor(employeeRecord));
  });
  return employeeWages.reduce((memo, wages) => memo + wages);
};

function findEmployeeByFirstName(employeeRecords, firstName) {
  return employeeRecords.find(employeeRecord => employeeRecord.firstName === firstName);
};

