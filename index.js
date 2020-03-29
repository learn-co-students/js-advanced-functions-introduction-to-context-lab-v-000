const createEmployeeRecord = (array) => {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (arrayOfArrays) => {
    return arrayOfArrays.map(array => {
        return createEmployeeRecord(array)
    }) 
}

const createTimeInEvent = (employee, dateTimeStamp) => {
    const dateArray = dateTimeStamp.split(" ")
    employee.timeInEvents.push( 
        {
            type: "TimeIn", 
            hour: parseInt(dateArray[1], 10),
            date: dateArray[0]
        }
    )
    return employee
}

const createTimeOutEvent = (employee, dateTimeStamp) => {
    const dateArray = dateTimeStamp.split(" ")
    employee.timeOutEvents.push( 
        {
            type: "TimeOut", 
            hour: parseInt(dateArray[1], 10),
            date: dateArray[0]
        }
        )
        return employee
    }
    
const hoursWorkedOnDate = (employee, dateTimeStamp) => {
    const timeIns = employee.timeInEvents.find(punch => punch.date === dateTimeStamp)
    const timeOuts = employee.timeOutEvents.find(punch => punch.date === dateTimeStamp)
    
    return (timeOuts.hour - timeIns.hour) / 100
}

const wagesEarnedOnDate = (employee, dateTimeStamp) => {
    const hours = hoursWorkedOnDate(employee, dateTimeStamp)
    const payRate = employee.payPerHour
    
    return (hours * payRate) 
}

const allWagesFor = (employee) => {
    const datesWorked = employee.timeInEvents.map(event => event.date)

    return datesWorked.reduce((accumulator, date) => accumulator + wagesEarnedOnDate(employee, date), 0)
}

const calculatePayroll = (employees) => {
    return employees.reduce((accumulator, employee) => accumulator + allWagesFor(employee), 0)
}

const findEmployeeByFirstName = (employees, firstName) => {
    return employees.find(employee => employee.firstName === firstName)
}
