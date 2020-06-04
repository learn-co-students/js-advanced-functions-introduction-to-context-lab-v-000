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
function createEmployeeRecords() {
    console.log(createEmployeeRecords(), "EmployeeRecords")

}