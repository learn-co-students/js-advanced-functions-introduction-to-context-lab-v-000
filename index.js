function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees) {
    return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employee, timestamp) {
    employee.timeInEvents.push({    
      type: "TimeIn",
      hour: +timestamp.split(" ")[1],
      date: timestamp.split(" ")[0]
    })
    return employee
}

function createTimeOutEvent(employee, timestamp) {
    employee.timeOutEvents.push({    
      type: "TimeOut",
      hour: +timestamp.split(" ")[1],
      date: timestamp.split(" ")[0]
    })
    return employee
}

function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(e => e.date === date).hour
    const timeOut = employee.timeOutEvents.find(e => e.date === date).hour
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee) {
    const dates = employee.timeInEvents.map(e => e.date)
    const wages = dates.map(d => wagesEarnedOnDate(employee, d))
    return wages.reduce((total, wage) => total + wage)
}

function calculatePayroll(employees) {
    return employees.map(employee => allWagesFor(employee)).reduce((total, wages) => total + wages)
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.find((employee) => employee.firstName === firstName)
}