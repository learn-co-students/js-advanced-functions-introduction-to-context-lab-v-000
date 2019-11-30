const createEmployeeRecord = function(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

const createEmployeeRecords = function(arrayOfArrays) {
    let arrayOfObj = [];
    for (const array of arrayOfArrays) {
        arrayOfObj.push(createEmployeeRecord(array));
    }
    return arrayOfObj
}

const createTimeInEvent = function(employee, dTStr)  {
    let [date, hour] = dTStr.split(' ')
   
    employee.timeInEvents.push({
        type: 'TimeIn',
        date: date,
        hour: parseInt(hour, 10)
    })
    return employee
}

const createTimeOutEvent = (employeeRec, dTStr) => {
    let [date, hour] = dTStr.split(' ')

    employeeRec.timeOutEvents.push({
        type: 'TimeOut',
        date: date,
        hour: parseInt(hour, 10)
    })
    return employeeRec
}

const hoursWorkedOnDate = (employeeRec, date) => {
    const timeIn = employeeRec.timeInEvents.find(timeRecord => timeRecord.date === date)
    const timeOut = employeeRec.timeOutEvents.find(timeRecord => timeRecord.date === date)

    return (timeOut.hour - timeIn.hour) / 100
}

const wagesEarnedOnDate = (employeeRec, date) => {
    const hours = hoursWorkedOnDate(employeeRec, date)
    const ratePerHour = employeeRec.payPerHour

    return hours * ratePerHour
}

const allWagesFor = (employeeRec) => {
    const eligibleDates = employeeRec.timeInEvents.map((timeRecord) => timeRecord.date)

    return eligibleDates.reduce((total, date) => wagesEarnedOnDate(employeeRec, date) + total, 0)
}

const calculatePayroll = (arrOfEmployees) => {
    return arrOfEmployees.reduce((total, employeeObj) => {
        return allWagesFor(employeeObj) + total
    }, 0)
}

const findEmployeeByFirstName = (arrOfEmployees, name) => {
    return arrOfEmployees.find(employee => employee.firstName === name)
}