function getWorkingDaysInMonth(year, month) {
    let totalDays = new Date(year, month + 1, 0).getDate();
    let workingDays = 0;

    for (let day = 1; day <= totalDays; day++) {
        let currentDay = new Date(year, month, day).getDay();
        if (currentDay !== 0 && currentDay !== 6) { // 0 is Sunday, 6 is Saturday
            workingDays++;
        }
    }
    return workingDays;
}

function getPastWorkingDays(year, month, currentDate) {
    let pastWorkingDays = 0;

    for (let day = 1; day < currentDate; day++) {
        let currentDay = new Date(year, month, day).getDay();
        if (currentDay !== 0 && currentDay !== 6) { // 0 is Sunday, 6 is Saturday
            pastWorkingDays++;
        }
    }
    return pastWorkingDays;
}

function getAvailableWorkingDays(year, month, hireDay) {
    let totalWorkingDays = getWorkingDaysInMonth(year, month);
    let pastWorkingDays = getPastWorkingDays(year, month, hireDay);
    console.log("PastWorkingDays 1: " + pastWorkingDays);
    let availableWorkingDays = totalWorkingDays - pastWorkingDays;

    return availableWorkingDays;
}

// Example usage:
let hireDateStr = "2024-08-20"; // Hire date in string format

// Extract year, month, and date from the string
let hireDateObj = new Date(hireDateStr);
let year = hireDateObj.getFullYear();
let month = hireDateObj.getMonth() + 1; // 0-based index, so 7 = August
// console.log("Month: " + month);
let hireDay = hireDateObj.getDate(); // Day of the month
// console.log("hireDay: " + hireDay);


console.log("Year: " + year);       // Expected: 2024
console.log("Month: " + month);     // Expected: 8 (since we add 1)
console.log("hireDay: " + hireDay); // Expected: 1


let availableWorkingDays = getAvailableWorkingDays(year, month, hireDay);

console.log("Total working days in August: " + getWorkingDaysInMonth(year, month));
console.log("Available working days for hire date August 20: " + availableWorkingDays);
