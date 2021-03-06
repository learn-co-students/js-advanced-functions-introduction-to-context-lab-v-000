// Your code here
const createEmployeeRecord = employeeData => {
  const [
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents = [],
    timeOutEvents = [],
  ] = employeeData;

  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents,
    timeOutEvents
  };
}

const createEmployeeRecords = employeeData => {
  return employeeData.map(data => {
    return createEmployeeRecord(data)
  });
}

const createTimeEventObject = (setType, time) => {
  const dateTime = time.split(" ");

  const obj = {
    type: setType,
    hour: parseInt(dateTime[1]),
    date: dateTime[0]
  }
  return obj
}

const createTimeInEvent = (record, time) => {
  record.timeInEvents.push(createTimeEventObject("TimeIn", time));
  return record;
}

const createTimeOutEvent = (record, time) => {
  record.timeOutEvents.push(createTimeEventObject("TimeOut", time));
  return record;
}

const hoursWorkedOnDate = (record, date) => {
  const timeIn = record.timeInEvents.find(element => element.date === date);
  const timeOut = record.timeOutEvents.find(element => element.date === date);
  return (timeOut.hour - timeIn.hour)/100;
}

const wagesEarnedOnDate = (record, date) => {
  const hours = hoursWorkedOnDate(record, date);
  return record.payPerHour * hours;
}

const allWagesFor = record => {
  return record.timeInEvents.reduce((total, timeEvent) => {
    return wagesEarnedOnDate(record, timeEvent.date) + total;
  }, 0);
}

const calculatePayroll = records => {
  return records.reduce((total, record) => {
    return allWagesFor(record) + total;
  }, 0);
}

const findEmployeeByFirstName = (records, firstName) => {
  return records.find(record => record.firstName === firstName);
}
