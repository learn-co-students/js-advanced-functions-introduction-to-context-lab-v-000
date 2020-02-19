const createEmployeeRecord = function(array){
  let employee = {
    firstName : array[0],
    familyName : array[1],
    title : array[2],
    payPerHour : array[3],
    timeInEvents : [],
    timeOutEvents : []
    };
  return employee;
}

const createEmployeeRecords = function(recordsArray){
  let newRecord = [];
  newRecord = recordsArray.map(record => createEmployeeRecord(record));
  return newRecord;
}

const createTimeInEvent = function(obj, datestamp){
  let timeInEvent = {
      type: "TimeIn",
      hour: parseInt((datestamp.split(' ')[1]), 10),
      date: datestamp.split(' ')[0]
    }

    obj.timeInEvents.push(timeInEvent);
    return obj;
}

const createTimeOutEvent = function(employee, datestamp){
  let timeOutEvent = {
      type: "TimeOut",
      hour: parseInt((datestamp.split(' ')[1]), 10),
      date: datestamp.split(' ')[0]
    }
    employee.timeOutEvents.push(timeOutEvent);
    return employee;
}

const hoursWorkedOnDate = function(employee, dateQ){
  let timeIn = employee.timeInEvents.find(function(e){
    return e.date === dateQ;
  })

  let timeOut = employee.timeOutEvents.find(function(e){
    return e.date === dateQ;
  })
  return (timeOut.hour - timeIn.hour) / 100
}

const wagesEarnedOnDate = function(employee, dateQ){
  let wages = (hoursWorkedOnDate(employee, dateQ) * employee.payPerHour);
  return wages;
}

const allWagesFor = function(employee){
    let dates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let wages = dates.reduce(function(total, dateQ){
        return  total += wagesEarnedOnDate(employee, dateQ)
    }, 0)

    return wages
}

const findEmployeeByFirstName = function(srcArray, firstName){
  return srcArray.find(el => el.firstName === firstName);
}

const calculatePayroll = function(employeesArray){
  let total;
  return employeesArray.reduce(function(total, emp){
    return total += allWagesFor(emp)
  }, 0)
}
