// Your code here
function createEmployeeRecord(employeeInfo){
  const [
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents = [],
    timeOutEvents = [],
  ] = employeeInfo;

  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents,
    timeOutEvents
  };
}

function createEmployeeRecords(employeesInfo){
  return employeesInfo.map(information => {
    return createEmployeeRecord(information)
  });
}

function createTimeEventObject(setType, time){
  const dateTime = time.split(" ");

  const obj = {
    type: setType,
    hour: parseInt(dateTime[1]),
    date: dateTime[0]
  }
  return obj
}


function createTimeInEvent(record, time){
  record.timeInEvents.push(createTimeEventObject("TimeIn", time));
  return record;
}

function createTimeOutEvent(record, time){
  record.timeOutEvents.push(createTimeEventObject("TimeOut", time));
  return record;
}

function hoursWorkedOnDate(record, date){
  const timeIn = record.timeInEvents.find(element => element.date === date);
  const timeOut = record.timeOutEvents.find(element => element.date === date);
  return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(record, date){
  const hours = hoursWorkedOnDate(record, date);
  return record.payPerHour * hours;
}
