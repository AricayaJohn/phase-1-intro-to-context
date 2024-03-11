// Your code here
let employeeArray = ["john", "doe", "developer", "60"]

function createEmployeeRecord (employeeArray) {
 return {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: [],
 }
};
function createEmployeeRecords(employeeArray){
    return employeeArray.map(createEmployeeRecord);
}
function createTimeInEvent(employeeRecord, dateTimeString) {
    // Create a new timeIn event object
    const timeInEvent = {
      type: "TimeIn",
      date: dateTimeString.split(' ')[0], 
      // Extract the date from the dateTimeString
      hour: parseInt(dateTimeString.split(' ')[1]) 
      // Extract the hour from the dateTimeString
    };
    // Add the timeIn event to the employee's record of timeInEvents
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
  }
  function createTimeOutEvent(employeeRecord, dateTimeString) {
    const timeOutEvent = {
      type: "TimeOut",
      date: dateTimeString.split(" ")[0],
      hour: parseInt(dateTimeString.split(" ")[1])
    };
  
    employeeRecord.timeOutEvents.push(timeOutEvent);
  
    return employeeRecord;
  }

  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(
      (event) => event.date === date
    );
    const timeOutEvent = employeeRecord.timeOutEvents.find(
      (event) => event.date === date
    );
  
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const wagesEarned = hoursWorked * employeeRecord.payPerHour;
    return wagesEarned;
  }
  
  function allWagesFor(employeeRecord) {
    const allWages = employeeRecord.timeInEvents.reduce((totalWages, timeInEvent) => {
      const date = timeInEvent.date;
      const wagesEarned = wagesEarnedOnDate(employeeRecord, date);
      return totalWages + wagesEarned;
    }, 0);
  
    return allWages;
  }
  
  function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((total, employeeRecord) => {
      const wages = allWagesFor(employeeRecord);
      return total + wages;
    }, 0);
  
    return totalPayroll;
  }
  