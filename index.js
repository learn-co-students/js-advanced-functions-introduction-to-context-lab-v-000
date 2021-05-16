//let testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1])

function createEmployeeRecord(employeeDetails){
  let employee = {};
  employee.firstName = employeeDetails[0];
  employee.familyName = employeeDetails[1];
  employee.title = employeeDetails[2];
  employee.payPerHour = employeeDetails[3];
  employee.timeInEvents = [];
  employee.timeOutEvents = []
  return employee
};


// twoRows = [
//     ["moe", "sizlak", "barkeep", 2],
//     ["bartholomew", "simpson", "scamp", 3]
//   ]

function createEmployeeRecords(employees) {
    const employeeArray = employees.map(function(personArray){
      return createEmployeeRecord(personArray)
    })
    return employeeArray
};

// it("extracts the correct date", function () {
    let employeeRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
    let dateTime = "2014-02-28 1400"
//     let updatedBpRecord = createTimeInEvent(bpRecord, "2014-02-28 1400")
//     let newEvent = updatedBpRecord.timeInEvents[0]
//     expect(newEvent.date).to.eq("2014-02-28");
//   })

//   it("extracts the correct hour", function () {
//     let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
//     let updatedBpRecord = createTimeInEvent(bpRecord, "2014-02-28 1400")
//     let newEvent = updatedBpRecord.timeInEvents[0]
//     expect(newEvent.hour).to.eq(1400);

function createTimeInEvent(employeeRecord, dateTime){
  let date = dateTime.split(" ")[0]
  let time = dateTime.split(" ")[1]
  employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(time, 10),
      date,
  })
  return employeeRecord
};

// createTimeInEvent(employeeRecord, dateTime);

function createTimeOutEvent(employeeRecord, dateTime){
    let [date, hour] = dateTime.split(' ')
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employeeRecord
};



        //  cRecord = ["Julius", "Caesar", "General", 27]
        //  updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
        //  updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")

        let hoursWorkedOnDate = function(employee, soughtDate){
            let inEvent = employee.timeInEvents.find(function(e){
                return e.date === soughtDate
            })
        
            let outEvent = employee.timeOutEvents.find(function(e){
                return e.date === soughtDate
            })
        
            return (outEvent.hour - inEvent.hour) / 100
        }

function wagesEarnedOnDate(employee, soughtDate){
  let wage = hoursWorkedOnDate(employee, soughtDate) * employee.payPerHour
  return parseFloat(wage.toString())
};

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}