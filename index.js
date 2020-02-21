// Your code here
const arrayToObject = (valArray, keys, object = {}) => {
  valArray.map( (value, i) => {
    object[keys[i]] = value;
  });
  return object;
};

const createEmployeeRecord = (employee) => {
  const employeeObject = {"timeInEvents": [], "timeOutEvents":[]};
  const keys = ["firstName", "familyName", "title", "payPerHour"];

  return arrayToObject(employee, keys, employeeObject);
};

const createEmployeeRecords = (employees) => {
  const employeeObjects = [];
  
  employees.map(employee => {
    employeeObjects.push( createEmployeeRecord(employee) );
  });
  return employeeObjects;
};

/* FIXME: create callback function with the body of createTimeInEvent
const createTimeEvent = (employeeObject, timestamp, type) => {
  const [date, hour] = timestamp.split(" ")
  const valArray = ["TimeIn", date, parseInt(hour)];
  const keys = ["type", "date", "hour"];
 
  const timeInEvent = arrayToObject(valArray, keys);
  
  employeeObject.timeInEvents.push(timeInEvent);
  return employeeObject;
};
*/

const createTimeInEvent = (employeeObject, timestamp) => {
  const [date, hour] = timestamp.split(" ")
  const valArray = ["TimeIn", date, parseInt(hour)];
  const keys = ["type", "date", "hour"];
 
  const timeInEvent = arrayToObject(valArray, keys);
  
  employeeObject.timeInEvents.push(timeInEvent);
  return employeeObject;
};

