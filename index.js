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
	return dateDivider(dateStamp)
	// let splitDate = dateStamp.split(' ')
	// let hour = splitDate[1]
	// let date = splitDate[0]

	employeeData.timeInEvents.push({
		type: "TimeIn",
		hour: hour,
		date: date,
	})

	return employeeData
}

const dateDivider = (dateStamp) => {
	let splitDate = dateStamp.split(' ')
	let hour = splitDate[1]
	let date = splitDate[0]
	return hour, date
}
