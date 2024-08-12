function getWorkingDaysFromHireDate(hireDate) {
    // Convert the input date to a Date object
    let startDate = new Date(hireDate);
    
    // Get the year and month from the hire date
    let year = startDate.getFullYear();
    let month = startDate.getMonth();
    
    // Get the last day of the month
    let endDate = new Date(year, month + 1, 0);
    console.log("endDate: " + endDate);
    
    let workingDaysCount = 0;

    // Loop through each day from the hire date to the end of the month
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        let dayOfWeek = date.getDay();
        
        // Count the day if it's a weekday (Monday to Friday)
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            workingDaysCount++;
            console.log("workingDaysCount++ :" + workingDaysCount);
        }
    }

    return workingDaysCount;
}

// Example usage:
let hireDate = '2024-08-26';
let workingDays = getWorkingDaysFromHireDate(hireDate);
console.log(`Number of working days since hire date: ${workingDays}`);
