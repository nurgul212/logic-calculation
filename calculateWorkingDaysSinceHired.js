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
    console.log("PastWorkingDays 2: " + pastWorkingDays);
    let availableWorkingDays = totalWorkingDays - pastWorkingDays;

    return availableWorkingDays;
}

// Example usage:
let year = 2024;
let month = 7; // August (0-based index, so 7 = August)
let hireDate = 1; // August 20

let availableWorkingDays = getAvailableWorkingDays(year, month, hireDate);

console.log("Total working days in August: " + getWorkingDaysInMonth(year, month));
console.log("Available working days for hire date August 20: " + availableWorkingDays);
