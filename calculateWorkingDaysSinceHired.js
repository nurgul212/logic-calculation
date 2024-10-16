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

function getAvailableWorkingDays(year, month, hireDate) {
    let totalWorkingDays = getWorkingDaysInMonth(year, month);
    let pastWorkingDays = getPastWorkingDays(year, month, hireDate);
    console.log("PastWorkingDays : " + pastWorkingDays);
    let availableWorkingDays = totalWorkingDays - pastWorkingDays;

    return availableWorkingDays;
}

// Example usage:
let year = 2024;
let month = 9; // August (0-based index, so 8 = September)
let date = 16; // September 24
let hireDate = "2024-10-16";

let availableWorkingDays = getAvailableWorkingDays(year, month, date);

console.log("Total working days in October: " + getWorkingDaysInMonth(year, month));
console.log("Available working days for hire date October 16: " + availableWorkingDays);
