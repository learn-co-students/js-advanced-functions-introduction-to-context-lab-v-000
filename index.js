function createEmployeeRecord(employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}


function createEmployeeRecords(employeeArray) {
    return employeeArray.map(function(employee) {
        return createEmployeeRecord(employee)
    })
}


function createTimeInEvent(employee,timeStamp) {
    let [date, hour] = timeStamp.split(' ')
    
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    })
    return employee
}


function createTimeOutEvent(employee,timedStamped) {
    let [date, hour] = timedStamped.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    })
    return employee
}


function hoursWorkedOnDate(employee,date){
    let timedInFound = employee.timeInEvents.find(e => e.date === date)
    let timedOutFound = employee.timeOutEvents.find(e => e.date === date)
    return (timedOutFound.hour - timedInFound.hour)/100
}


function wagesEarnedOnDate(employee,date) {
    return (hoursWorkedOnDate(employee,date) * employee.payPerHour)
}


function allWagesFor(employee) {
    let allDates = employee.timeInEvents.map(e => e.date)

    let allWages = allDates.map(date => wagesEarnedOnDate(employee,date))

    return allWages.reduce((total, element) => element + total)
}


function calculatePayroll(employees) {
    return employees.map(employee => allWagesFor(employee)).reduce((total,element) => element + total)
}


function findEmployeeByFirstName(employees,name) {
    return employees.find(e => e.firstName === name)
}