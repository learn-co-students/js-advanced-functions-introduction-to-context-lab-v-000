// Your code here

function createEmployeeRecord(emp) {
  const employee = {};
  employee.firstName = emp[0];
  employee.familyName = emp[1];
  employee.title = emp[2];
  employee.payPerHour = emp[3];
  employee.timeInEvents = [];
  employee.timeOutEvents = [];
  return employee;
}

function createEmployeeRecords(emps) {
  const employeeRecords = [];
  emps.map(employee => employeeRecords.push(createEmployeeRecord(employee)))
  return employeeRecords
}

function createTimeInEvent(emp, time) {
  // let employee = createEmployeeRecord(emp);
  let timeObj = {
    type: "TimeIn",
    hour: parseInt(time.split(' ')[1]),
    date: time.split(' ')[0]
  }
  emp.timeInEvents.push(timeObj)
  return emp
}

function createTimeOutEvent(emp, time) {
  // let employee = createEmployeeRecord(emp);
  let timeObj = {
    type: "TimeOut",
    hour: parseInt(time.split(' ')[1]),
    date: time.split(' ')[0]
  }
  emp.timeOutEvents.push(timeObj)
  return emp
}

function hoursWorkedOnDate(emp, date) {
   let hoursOut = emp.timeOutEvents.map(obj => obj.hour/100)
   let hoursIn = emp.timeInEvents.map(obj => obj.hour/100)
   let hoursWorked = 0
   for (let i = 0; i < hoursOut.length; i++) {
     hoursWorked = hoursWorked + (hoursOut[i] - hoursIn[i]) 
   }
    return hoursWorked
}

function wagesEarnedOnDate(emp, date) {
  let hours = hoursWorkedOnDate(emp, date);
  let pay = hours * emp.payPerHour;
  return pay;
}

function allWagesFor(emp) {
  let datesWorked = emp.timeInEvents.map(obj => obj.date);
  let wages = 0;
  for (let i = 0; i < datesWorked.length; i++) {
    wages = wagesEarnedOnDate(emp, datesWorked[i]);
  }
  return wages;
}

function calculatePayroll(emps) {
  let allWages = (emps.map(emp => allWagesFor(emp)))
  let sum = allWages.reduce((total, amount) => total + amount); 

  return sum;
}

function findEmployeeByFirstName(emps, name) {
  let record = emps.find(emp => emp.firstName === name)
  return record
}














