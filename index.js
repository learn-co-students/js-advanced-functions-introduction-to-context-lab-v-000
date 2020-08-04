

function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    
}


function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map((subArray) => createEmployeeRecord(subArray) )
}
         
function createTimeInEvent(obj, dateStamp) {
    const arr = dateStamp.split(' ');
    obj.timeInEvents.push(
        {
            type: "TimeIn",
            hour: parseInt(arr[1],10),
            date: arr[0]
        }
    )
    return obj
}

function createTimeOutEvent(obj, dateStamp) {
    const arr = dateStamp.split(' ');
    obj.timeOutEvents.push(
        {
            type: "TimeOut",
            hour: parseInt(arr[1], 10),
            date: arr[0]
        }
    )
    return obj
}

function hoursWorkedOnDate(obj, dateStamp) {
    const startTime = obj.timeInEvents.find((e)=>e.date == dateStamp).hour;
    const endTime = obj.timeOutEvents.find((e) => e.date == dateStamp).hour;
    return (endTime - startTime) / 100
}

function wagesEarnedOnDate(obj, dateStamp) {
    const rate = obj.payPerHour ;
    const hoursWorked = hoursWorkedOnDate(obj, dateStamp);
    return (rate * hoursWorked)
}

function allWagesFor(obj) {
    return obj.timeInEvents.reduce((memo, current,) => (memo + wagesEarnedOnDate(obj, current.date)),0);
}

function calculatePayroll(obj) {
    return obj.reduce((memo, current) => (memo + allWagesFor(current)),0)
}

function findEmployeeByFirstName(srcArray, firstName ) {
    return srcArray.find((e) => e.firstName === firstName);
}



