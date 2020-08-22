// Your code here

function createEmployeeRecord(employees){
  return {
    firstName: employees[0],
    familyName: employees[1],
    title: employees[2],
    payPerHour: employees[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(arrayofEmployees){
  return arrayofEmployees.map(createEmployeeRecord);
}

function createTimeInEvent(record, timeIn){
  let [date, hour] = timeIn.split(' ');
  
  record.timeInEvents.push({
    type: "TimeIn", 
    hour: parseInt(hour, 10),
    date: date, 
  });
    return record;
}

function createTimeOutEvent(record, timeOut){
  let [date, hour] = timeOut.split(' ');
  
  record.timeOutEvents.push({
    type: "TimeOut", 
    hour: parseInt(hour, 10),
    date: date, 
  });
    return record;
}

function hoursWorkedOnDate(record, dateWorked){
  let clockIn = record.timeInEvents.find(event => event.date === dateWorked);
  let clockOut = record.timeOutEvents.find(event => event.date === dateWorked);
  
  return (clockOut.hour - clockIn.hour) / 100;
}

function wagesEarnedOnDate(record, dateWorked){
  return record.payPerHour * hoursWorkedOnDate(record, dateWorked);
}

function allWagesFor(record){
  return record.timeInEvents.map(event => wagesEarnedOnDate(record, event.date)).reduce((total, hours) => total + hours);
}

function findEmployeeByFirstName(records, firstName){
  return records.find(record => {
    return record.firstName === firstName;
  });
}

function calculatePayroll(arrayofEmployees){
  return arrayofEmployees.map(allWagesFor).reduce((total, hours) => total + hours);
}