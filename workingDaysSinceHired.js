function calculateAvailableWorkingDaysSinceHired(hireDate) {
    // Parse the date without time zone conversion by splitting the date manually
    const [year, month, day] = hireDate.split('-').map(Number);
    const startDate = new Date(year, month - 1, day); // Months are 0-indexed in JS Date object
    
    console.log("Start date: " + startDate);

    // Get the last day of the month
    const lastDayOfMonth = new Date(year, month, 0); // Month + 1 gets the last day of that month
    
    console.log("Last day of month: " + lastDayOfMonth);

    let totalWorkingDays = 0;

    // Loop through the days from hire date to the end of the month
    for (let currentDay = startDate.getDate(); currentDay <= lastDayOfMonth.getDate(); currentDay++) {
        let currentDate = new Date(year, month - 1, currentDay);
        let dayOfWeek = currentDate.getDay();

        // Exclude weekends (Saturday: 6, Sunday: 0)
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            totalWorkingDays++;
        }
    }

    return totalWorkingDays;
}

// Example usage:
const hireDate = '2024-09-25';
console.log("Availabe working days since hired: " + calculateAvailableWorkingDaysSinceHired(hireDate)); // Output: 4
