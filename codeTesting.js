const day =1;
const baseVacation = 15;
const increase = 3;
const increaseDate = '2024-10-01';  
// const hireDate = '2024-08-03'; // Example hire date
 // Calculate and print total working days and available working days in the hired month if the hire date is this year
// const hireYear = new Date(hireDate).getUTCFullYear();
// console.log("hireYear: " + hireYear);
// const hireMonth = new Date(hireDate).getUTCMonth(); //method returns the month of the specified date according to universal time, as a zero-based value (where January is 0 and December is 11).
// console.log("hireMonth: " + hireMonth);
// const currentYear = new Date().getUTCFullYear();
// console.log("currentYear: " + currentYear);
// const currentDate = new Date(currentYear, hireMonth, day);
// console.log("currentDate: " + currentDate);
// console.log("currentYear+hiremonth+0: " + new Date(2024, 8, 0));

// console.log("new Date hire date " + new Date(hireDate));

// console.log("DaysInMonth " + new Date(2024, 7 + 1, 0).getDate());

// console.log("dayOfWeek " + currentDate.getDay());

// const hireDateObj = new Date(hireDate);
// const hireDateObj = new Date(Date.UTC(hireYear, hireMonth, 1)); // Month is 0-indexed
// const currentDate = new Date(hireDateObj);
// console.log("const hireDateObj = new Date(hireDate);" + hireDateObj.toUTCString());
// console.log("const currentDate = new Date(startDate);" + currentDate);

const hireDate = '2024-07-02';
const hireDateObj = new Date(hireDate); // Create a Date object
const hireDay = hireDateObj.getUTCDate(); // Extract the day of the month

console.log("hireDay: " + hireDay); // Output: 17

const year = hireDateObj.getFullYear();
const month = hireDateObj.getMonth();

  // Calculate the last day of the month
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  console.log("lastDayOfMonth " + lastDayOfMonth);
const workingDays = (lastDayOfMonth - hireDay+1) - Math.floor((lastDayOfMonth - hireDay+1) / 7) * 2;
// const calc = (31-22+1)-Math.floor((31-21)/7) * 2;
console.log("workingDays: " + workingDays);


const current = 15.000000000;
console.log("Current with 2 decimal: " + current.toFixed(2));