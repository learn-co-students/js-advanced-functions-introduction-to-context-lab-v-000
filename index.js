// Your code here
// has a function called createEmployeeRecord
function createEmployeeRecord(employee) {
    // console.log(employee, "employee") // [ 'Gray', 'Worm', 'Security', 1 ] employee
    // console.log(employee[0], "employee0") //Gray employee0 
    // console.log(employee[1], "employee1") // Worm employee1
    // console.log(employee[2], "employee2") // Security employee2
    return {
        // populates a firstName field from the 0th element
        firstName: employee[0],
        // populates a familyName field from the 1th element
        familyName: employee[1],
        // populates a title field from the 2th element
        title: employee[2],
        // populates a payPerHour field from the 3th element
        payPerHour: employee[3],
        // initializes a field, timeInEvents, to hold an empty Array
        timeInEvents: [],
        //  initializes a field, timeOutEvents, to hold an empty Array
        timeOutEvents: []
    }
}

// has a function called createEmployeeRecords
    function createEmployeeRecords(e) {
    // console.log(e, "e") 
    // [
    //     [ 'moe', 'sizlak', 'barkeep', 2 ],
    //     [ 'bartholomew', 'simpson', 'scamp', 3 ]
    //   ] e
    // console.log(e.length, "e length")
    // 2 e length

        // Iterate over e
        return e.map((record) => {
            // creates two records
            // correctly assigns the first names
            return createEmployeeRecord(record)
        })
    }

    // has a function called createTimeInEvent
    function createTimeInEvent(employeeRecord, dateStamp) {
        // console.log(employeeRecord, "employeeRecord") 
        // {
        //     firstName: 'Byron',
        //     familyName: 'Poodle',
        //     title: 'Mascot',
        //     payPerHour: 3,
        //     timeInEvents: [],
        //     timeOutEvents: []
        //   } employeeRecord

        // console.log(dateStamp, "dateStamp") // 2014-02-28 1400 dateStamp

        // extracts the correct date extracts the correct hour
        let [date, hour] = dateStamp.split(" ");        
        employeeRecord.timeInEvents.push({
            // creates the correct type
            type: "TimeIn", 
            // extracts the correct hour
            hour: parseInt(hour, 10),
            // extracts the correct date
            date
        })      
        return employeeRecord
    }

    // has a function called createTimeOutEvent
    function createTimeOutEvent(employeeRecord, dateStamp) {
        // extracts the correct date extracts the correct hour
        let [date, hour] = dateStamp.split(" ");
        employeeRecord.timeOutEvents.push({
            // creates the correct type
            type: "TimeOut",
            // extracts the correct hour
            hour: parseInt(hour, 10),
            // extracts the correct date
            date
        })
        return employeeRecord        
    }

    // hoursWorkedOnDate calculates the hours worked when given an employee record and a date
    function hoursWorkedOnDate(employeeRecord, dateStamp) {
        // console.log(employeeRecord, "employeeRecord")
        // {
        //     firstName: 'Julius',
        //     familyName: 'Caesar',
        //     title: 'General',
        //     payPerHour: 1000,
        //     timeInEvents: [ { type: 'TimeIn', hour: 900, date: '0044-03-15' } ],
        //     timeOutEvents: [ { type: 'TimeOut', hour: 1100, date: '0044-03-15' } ]
        //   } employeeRecord
        //console.log(dateStamp, "dateStamp") // 0044-03-15 dateStamp
        // console.log(employeeRecord.timeInEvents, "employeeRecord.timeInEvents")
        // [ { type: 'TimeIn', hour: 900, date: '0044-03-15' } ] employeeRecord[timeInEvents]
        // console.log(employeeRecord.timeOutEvents, "employeeRecord.timeOutEvents")
        // [ { type: 'TimeOut', hour: 1100, date: '0044-03-15' } ] employeeRecord.timeOutEvents

        // Find comparison of date in employeeRecord to dateStamp for timeInEvents
        let employeeRecordDateIn = employeeRecord.timeInEvents.find( ({date}) =>
                date === dateStamp)
                // console.log(employeeRecordDateIn, "employeeRecordDateIn")
                // { type: 'TimeIn', hour: 900, date: '0044-03-15' } employeeRecordDateIn
                // console.log(employeeRecordDateIn.date, "employeeRecordDateIn.date")
                // 0044-03-15 employeeRecordDateIn.date
                
                // Get hour property from timeInEvents Set to variable timeIn
                // let timeIn = employeeRecordDateIn.hour
                // console.log(employeeRecordDateIn.hour, "employeeRecrdDateIn.hour")
                // 900 employeeRecrdDateIn.hour
                let timeIn = employeeRecordDateIn.hour/100
                // console.log(timeIn, "timeIn")
                // 9 timeIn
                
        // Find comparison of date in employeeRecord to dateStamp for timeOutEvents
        let employeeRecordDateOut = employeeRecord.timeOutEvents.find( ({date}) =>
                date === dateStamp)
                // console.log(employeeRecordDateOut, "employeeRecordDateOut")
                // { type: 'TimeOut', hour: 1100, date: '0044-03-15' } employeeRecordDateOut
                // console.log(employeeRecordDateOut.date, "employeeRecordDateOut.date")
                // 0044-03-15 employeeRecordDateOut.date

                // Get hour property from timeOutEvents Set to variable timeOut
                // let timeOut = employeeRecordDateOut.hour
                // console.log(employeeRecordDateOut.hour, "employeeRecrdDateOut.hour")
                // 1100 employeeRecrdDateOut.hour
                let timeOut = employeeRecordDateOut.hour/100
                // console.log(timeOut, "timeOut")
                //  11 timeOut
                // calculates that the employee worked 2 hours
                return timeOut - timeIn 
    }

    // wagesEarnedOnDate multiplies the hours worked by the employee's rate per hour
    function wagesEarnedOnDate(employeeRecord, dateStamp) {
        // console.log(employeeRecord, "employeeRecord")
        // {
        //     firstName: 'Julius',
        //     familyName: 'Caesar',
        //     title: 'General',
        //     payPerHour: 27,
        //     timeInEvents: [ { type: 'TimeIn', hour: 900, date: '0044-03-15' } ],
        //     timeOutEvents: [ { type: 'TimeOut', hour: 1100, date: '0044-03-15' } ]
        //   } employeeRecord
        let payRate = employeeRecord.payPerHour
        // console.log(employeeRecord.payPerHour, "employeeRecord.payPerHour")
        // 27 employeeRecord.payPerHour
        // console.log(payRate, "payRate")
        // 27 payRate
        // calculates that the employee earned 54 dollars
        return payRate * hoursWorkedOnDate(employeeRecord,dateStamp)
    }

    // allWagesFor aggregates all the dates' wages and adds them together
    function allWagesFor(employeeRecord) {
        // console.log(employeeRecord, "employeeRecord")
        // {
        //     firstName: 'Julius',
        //     familyName: 'Caesar',
        //     title: 'General',
        //     payPerHour: 27,
        //     timeInEvents: [
        //       { type: 'TimeIn', hour: 900, date: '0044-03-14' },
        //       { type: 'TimeIn', hour: 900, date: '0044-03-15' }
        //     ],
        //     timeOutEvents: [
        //       { type: 'TimeOut', hour: 2100, date: '0044-03-14' },
        //       { type: 'TimeOut', hour: 1100, date: '0044-03-15' }
        //     ]
        // } employeeRecord
        
        // console.log(employeeRecord.payPerHour, "employeeRecord.payPerHour")  
        // 27 employeeRecord.payPerHour
        // let payRate = employeeRecord.payPerHour

        // hoursWorkedOnDate(employeeRecord, dateStamp)
        // .map
        let datesWorked = employeeRecord.map(hoursWorkedOnDate(employeeRecord, dateStamp) {
            return dateStamp
        })
        console.log(datesWorked, "datesWorked")


        // wagesEarnedOnDate(employeeRecord, dateStamp)
        // .reduce

        // console.log(wagesEarnedOnDate(payRate), "wagesEarnedOnDate(payRate") // NOTHING
        // console.log(wagesEarnedOnDate(employeeRecord), "wagesEarnedOnDate(employeeRecord") // NOTHING

        //return (hoursWorkedOnDate(employeeRecord) * wagesEarnedOnDate(employeeRecord))

        //let workHours = (employeeRecord.payPerHour).map(hours => hours * wagesEarnedOnDate(employeeRecord)

        // ) 
        //  ReferenceError: calculatePayroll is not defined
        // let workHours = employeeRecord.reduce(wagesEarnedOnDate(workedHours, hour[,]))
        // console.log(hoursWorkedOnDate(employeeRecord, dateStamp), "hoursWorkedOnDate(employeeRecord, dateStamp)")
        
        // get date first => wagesEarnedOnDate
        // get timeIn hours from those dates => wagesEarnedOnDate
        // get timeOut hours from those dates -> wagesEarnedOnDate
        // let totalHours = (hours, hour) => hours + hour;
        //     console.log(employeeRecord.reduce(totalHours), "employeeRecord.reduce(totalHours") // NOTHING
       
        // let totalHours = employeeRecord.reduce(function wagesEarnedOnDate (accumalator, currentValue) {
        //     return accumulator + currentValue
        // }, 0)
        // console.log(totalHours, "totalHours") // NOTHING

    //   let totalHours = employeeRecord.reduce(function wagesEarnedOnDate (remployeeRecrd, dateStamp) {
    //          return employeeRecord + dateStamp
    //      }, 0)
    //      console.log(totalHours, "totalHours") // NOTHING

        // add those hours to totalHours
            // Need to iterate over Multiple dates now 
                // using map or reduce? Reduce
        //employeeRecord.reduce()
        // totalHours * payRate
        // wagesEarnedOnDate(employeeRecord.payPerHour)
    }