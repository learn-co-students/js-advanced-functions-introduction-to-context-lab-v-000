// Your code here
let createEmployeeRecord = function(fourElementArray){
    return {
        firstName: fourElementArray[0],
        familyName: fourElementArray[1],
        title: fourElementArray[2],
        payPerHour: fourElementArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeDataArray) {
    return employeeDataArray.map(data => {
        return createEmployeeRecord(data)
    }) 
}

let createTimeInEvent = function(employeeObject, dateStamp) {
    console.log(dateStamp)
    let [date, hour] = dateStamp.split(' ')
    console.log(date)
    console.log(hour)
    employeeObject.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employeeObject
}