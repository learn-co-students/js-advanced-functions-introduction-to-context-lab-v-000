// Your code here

let createEmployeeRecord = function EmployeeRecord(row) {
    return {            //create employee record
        firstName:row[0],       //populates employee fields
        familyName:row[1],
        title:row[2],
        payPerHour:row[3],
        timeInEvents:[ ],
        timeOutEvents:[ ]
    }
}

let createEmployeeRecords = function(employeeRecords) {
    return employeeRecords.map(function(rows) {
       return createEmployeeRecord(rows)   // return the first function
    })
}

  let createTimeInEvent = function(employeeRecord, datestamp) {
      let[date, hour] = datestamp.split(" ")

         employeeRecord.timeInEvents.push({
         type : "TimeIn",
         hour : parseInt(hour, 10),
         date,
         })

         return employeeRecord
        }

        let createTimeOutEvent = function(employeeRecord, dateStamp) {
            let[date, hour] = dateStamp.split(" ")

          employeeRecord.timeOutEvents.push({
            type : "TimeOut",
            hour : parseInt(hour, 10),
            date,
        })
        return employeeRecord
    }

    let hoursWorkedOnDate = function(employeeRecord, dateWorked) {

        let outEvent = employeeRecord.timeOutEvents.find(function(e) {
            return e.date === dateWorked
        })

        let inEvent = employeeRecord.timeInEvents.find(function(e) {
            return e.date === dateWorked
        })
        return(outEvent.hour - inEvent.hour)/100
    }

    let wagesEarnedOnDate = function(employeeRecord, dateWorked) {
        let earnedWages = hoursWorkedOnDate(employeeRecord, dateWorked) * (employeeRecord.payPerHour)
            return parseFloat(earnedWages.toString())
    }

    let allWagesFor = function(employeeRecord){

        let workdays = employeeRecord.timeInEvents.map(function(i){
            return i.date
        })

     let payable = workdays.reduce(function(memo, days){
         return memo + wagesEarnedOnDate(employeeRecord, days)
    }, 0)
    return payable
}


let calculatePayroll = function(arrayEmployeeRecords){
    return arrayEmployeeRecords.reduce(function(record, firstName) {
        return record + allWagesFor(firstName)
    },0)
}


let findEmployeeByFirstName = function(arrayEmployeeRecords, firstName){
    return arrayEmployeeRecords.find(function(firstName=undefined){
    return firstName === firstName
})
}