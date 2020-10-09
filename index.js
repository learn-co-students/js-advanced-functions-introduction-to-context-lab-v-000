// Your code here
//1) has a function called createEmployeeRecord
function createEmployeeRecord(array) {
    return {
        firstName: array[0], familyName: array[1], title: array[2], payPerHour: array[3], timeInEvents: [], timeOutEvents: []
    };    
}

function createEmployeeRecords(array) {
    return array.map(createEmployeeRecord);
}

function createTimeInEvent(obj, dateStamp) {
    obj.timeInEvents.push(createDSObj("TimeIn", dateStamp))
    return obj
}

function createDSObj(getType, dateStamp) {
    return {
        type: getType,
        date: dateStamp.slice(0, 10),
        hour: parseInt(dateStamp.slice(-4))
    }
}

function createTimeOutEvent(obj, dateStamp) {
    obj.timeOutEvents.push(createDSObj("TimeOut", dateStamp))
    return obj
}

function hoursWorkedOnDate(obj, dateYMD) {
    const timeIn = obj.timeInEvents.find((e) => e.date === dateYMD).hour
    const timeOut = obj.timeOutEvents.find((e) => e.date === dateYMD).hour
    return(timeOut - timeIn) / 100
}

function wagesEarnedOnDate(obj, dateYMD) {
    const wage = obj.payPerHour
    const hoursWorked = hoursWorkedOnDate(obj, dateYMD)
    return wage * hoursWorked
}

function allWagesFor(obj) {
    const allWages = obj.timeInEvents.map((day) => {
        return wagesEarnedOnDate(obj, day.date)
    })
    return allWages.reduce((acc, cv) => acc + cv)
}

function calculatePayroll(records) {
    const allPay = (records.map((empl) => {
        return allWagesFor(empl)
    }))
    return allPay.reduce((acc, cv) => acc + cv)
}

function findEmployeeByFirstName(srcArray, first_Name) {
    return srcArray.find((record) => record.firstName === first_Name)
}



//createEmployeeRecord
//1) populates a firstName field from the 0th element
//2) populates a familyName field from the 1th element
//3) populates a title field from the 2th element
//4) populates a payPerHour field from the 3th element
//5) initializes a field, timeInEvents, to hold an empty Array
//6) initializes a field, timeOutEvents, to hold an empty Array
