function createEmployeeRecord(array){
    let employeeRecord = {};
    employeeRecord["firstName"] = array[0];
    employeeRecord["familyName"] = array[1];
    employeeRecord["title"] = array[2];
    employeeRecord["payPerHour"] = array[3];
    employeeRecord["timeInEvents"] = [];
    employeeRecord["timeOutEvents"] = [];
    return employeeRecord;   
}

function createEmployeeRecords(array){
    let employeeRecords = array.map(x => createEmployeeRecord(x))
    return employeeRecords;
}

function createTimeInEvent(object, dateStamp){
    const timeInObject = {};
    let date = dateStamp.substring(0,10);
    let time = dateStamp.substring(11,15);
    let parsedTime = parseInt(time);

    timeInObject["type"] = "TimeIn";
    timeInObject["hour"] = parsedTime; 
    timeInObject["date"] = date;

    object.timeInEvents.push(timeInObject);
    return object;

}

function createTimeOutEvent(object, dateStamp){
    const timeOutObject = {};
    let date = dateStamp.substring(0,10);
    let time = dateStamp.substring(11,15);
    let parsedTime = parseInt(time);

    timeOutObject["type"] = "TimeOut";
    timeOutObject["hour"] = parsedTime; 
    timeOutObject["date"] = date;

    object.timeOutEvents.push(timeOutObject);
    return object;
}    

function hoursWorkedOnDate(object, workDate){
    let inDateObject = object.timeInEvents.find(obj => obj.date == workDate)
    let outDateObject = object.timeOutEvents.find(obj => obj.date == workDate)
    let timeIn = inDateObject.hour;
    let timeOut = outDateObject.hour;
    let hoursWorked = (timeOut - timeIn) / 100;
    return hoursWorked;
}

function wagesEarnedOnDate(object, workDate){
    let payRate = object.payPerHour;
    let hoursWorked = hoursWorkedOnDate(object, workDate);
    let wagesEarned = payRate * hoursWorked;
    return wagesEarned;
}

function allWagesFor(object){
    let filteredObject = object.timeInEvents.filter(obj => obj.date)
    let allDates = filteredObject.map(obj => obj.date)
    let hoursWorkedOnEachDay = allDates.map(element => hoursWorkedOnDate(object,element));
    let wagesEarnedOnEachDay = allDates.map(element => wagesEarnedOnDate(object, element));
    let totalWages = wagesEarnedOnEachDay.reduce((total, element) => element + total, 0);
    return totalWages;
}

function calculatePayroll(array){
    let totalWagesPerEmployee = array.map(element => allWagesFor(element));
    let totalPayroll = totalWagesPerEmployee.reduce((total, element) => element + total, 0)
    return totalPayroll;
}

function findEmployeeByFirstName(array, string){
    let foundFirstName = array.find(obj => obj.firstName == string);
    return foundFirstName;
}
