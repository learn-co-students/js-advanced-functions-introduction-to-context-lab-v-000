Code still needs to pass three tests 

const createEmployeeRecord = (data) => {
	return {
	 firstName: data[0],
	 familyName: data[1],
	 title: data[2],
	 payPerHour: data[3],
	 timeInEvents: [],
	 timeOutEvents: []
	}
}

const createEmployeeRecords = (dataArrays) => {
	return dataArrays.map(function(row){
		return createEmployeeRecord(row)
	})
}

const createTimeInEvent = (employeeData, dateStamp) => {
	
	let [hour, date1] = dateDivider(dateStamp)
	employeeData.timeInEvents.push({
		type: "TimeIn",
		hour: parseInt(hour),
		date: date1
	})

	return employeeData
}

const dateDivider = (dateStamp) => {
	let splitDate = dateStamp.split(' ')
	let date1 = splitDate[0]
	let hour = splitDate[1]
	return [hour, date1]
}

const createTimeOutEvent = (employeeData, dateStamp) => {
	let [hour,date] = dateDivider(dateStamp)
	
	employeeData.timeOutEvents.push({
		type: "TimeOut",
		hour: parseInt(hour),
		date: date
	})
	return employeeData
}

const hoursWorkedOnDate = (employee, soughtDate) => {
	 let inEvent = employee.timeInEvents.find(function(e){
	        
	        console.log("what is this return? ", e.date === soughtDate)
	        return e.date === soughtDate
	    })
		console.log("inEvent:", inEvent)
	  let outEvent = employee.timeOutEvents.find(function(e){
	        return e.date === soughtDate
	    })
		console.log("outEvent: ", outEvent)
	   return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate  = function(employeeData, specificDate) {
	let wage = hoursWorkedOnDate(employeeData, specificDate) * employeeData.payPerHour
	return wage.toString()
}

let allWagesFor = (employee) => {
	let eligibleDates = employee.timeInEvents.map( emp => {		
		return emp.date
	})
	let payable = eligibleDates.reduce(function(memo, d) {
		return memo + wagesEarnedOnDate(employee, d)
	})
	return payable
}


let findEmployeeByFirstName = function(sourceArray, firstName) {
  return sourceArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}

















// 	debugger
// 	//first, destructure so I can compare the dates and get that right 
// 	let { timeInEvents: { hour: timeInHour, date: timeInDate} } = employeeData
// 	let { timeOutEvents: { hour: timeOutHour, date: timeOutDate } } = employeeData
	
// 	console.log("timeInDate ",timeinDate )
// 	console.log("timeOutDate ", timeOutDate )
// 	//second, make sure the dates match, then extract the time in/hour 
// 	if (timeInDate === specificDate && timeOutDate === specificDate) {

// 		return hoursWorked = timeOutHour - timeInHour 
// 		} else {

// 	 console.log("no date matches ")
// 	}	
// }

// hoursWorkedOnDate(employeeData, specificDate)

	// timeOutDate === specificDate ? let timeOut = timeOutHour : console.log("no date matches for timeout")


	

	//not working: should it be specificDate[0] matches date[], then use specificDate[1] to get the hour? 

	
	
// let wagesEarnedOnDate  = function(employeeData, specificDate) => {
// 	let wage = hoursWorkedOnDate(employeeData, specificDate) * employeeData.payPerHour
// 	return wage
// }



	// let timeOut = employee.timeOutEvents.find(d => specificDate === d)
	// console.log('timeOut ' , timeOut)
	// let timeIn = date.find(d => specificDate === d)
	// console.log('timeIn ' , timeIn)
