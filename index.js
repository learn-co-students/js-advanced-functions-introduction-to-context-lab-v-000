// Your code here
function createEmployeeRecord(empInfo) {
    const [firstName, familyName, title, payPerHour] = empInfo;
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
};

function createEmployeeRecords(empRecords) {
    return empRecords.map(emp => createEmployeeRecord(emp));
};

function createTimeInEvent(emp, dateStamp) {
    const dateParts = dateStamp.split(" ");
    
    emp.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateParts[1],10),
        date: dateParts[0]
    });

    return emp;
};

function createTimeOutEvent(emp, dateStamp) {
    const dateParts = dateStamp.split(" ");
    
    emp.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateParts[1],10),
        date: dateParts[0]
    });

    return emp;
};

function hoursWorkedOnDate(emp, dateStamp) {

    let timeIn = emp.timeInEvents.filter(timeIn => timeIn.date === dateStamp)[0].hour;
    let timeOut = emp.timeOutEvents.filter(timeOut => timeOut.date === dateStamp)[0].hour;
 
    return ((timeOut - timeIn) * .01);
};

function wagesEarnedOnDate(emp, dateStamp) {
    return emp.payPerHour * hoursWorkedOnDate(emp, dateStamp);
};

function allWagesFor(emp) {
    // get dates, I'm using timeIn
    const workDates = emp.timeInEvents.map(timeIn => timeIn.date);
    // get pays by date
    const workPays = workDates.map(workDate => wagesEarnedOnDate(emp, workDate));
    // reduce pays
    return workPays.reduce((total, pay) => total += pay, 0);
};

function findEmployeeByFirstName(sourceArray, firstName) {
    let empRecord = sourceArray.filter(emp => emp.firstName === firstName);

    return !!empRecord[0] ? empRecord[0] : undefined;
};

function calculatePayroll(empArray) {
    const allEmpWages = empArray.map(emp => {
        const workDates = emp.timeInEvents.map(timeIn => timeIn.date);
        const workWages = workDates.map(timeIn => wagesEarnedOnDate(emp, timeIn));
        return workWages.reduce((total, wages) => total += wages, 0);
    });
    return allEmpWages.reduce((total, wages) => total += wages, 0);
};