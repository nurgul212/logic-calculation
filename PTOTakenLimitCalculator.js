// Get the current year dynamically
const year = new Date().getFullYear();
console.log("This year is : " + year)

// Define the list of statutory holidays (month is 0-based in JavaScript Date)
const holidays = [
    new Date(year, 0, 1),    // New Year's Day: January 1
    new Date(year, 1, 19),   // Family Day: February 19
    new Date(year, 3, 29),   // Good Friday: April 29
    new Date(year, 6, 1),    // Canada Day: July 1
    new Date(year, 8, 2),    // Labour Day: September 2
    new Date(year, 9, 14),   // Thanksgiving Day: October 14
    new Date(year, 11, 25),  // Christmas Day: December 25
    // Add other holidays as needed
];

// Function to check if a date is a weekend
function isWeekend(date) {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday = 0, Saturday = 6
}

// Function to check if a date is a statutory holiday
function isHoliday(date) {
    return holidays.some(holiday => 
        holiday.getTime() === date.getTime()
    );
}

// Function to calculate working days in a given month
function calculateWorkingDays(month) {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    let workingDays = 0;

    for (let day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
        if (!isWeekend(day) && !isHoliday(day)) {
            workingDays++;
        }
    }

    return workingDays;
}

// Iterate over each month and calculate working days
const workingDaysByMonth = [];
for (let month = 0; month < 12; month++) {
    const workingDays = calculateWorkingDays(month);
    workingDaysByMonth.push({
        month: new Date(year, month).toLocaleString('default', { month: 'long' }),
        workingDays: workingDays
    });
}

// Display the working days for each month
workingDaysByMonth.forEach(entry => {
    console.log(`${entry.month}: ${entry.workingDays} working days`);
});
