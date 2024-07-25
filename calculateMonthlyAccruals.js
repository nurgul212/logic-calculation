// Define the months array once
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Function to calculate the total number of working days in month
  const calculateTotalWorkingDaysInMonth = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get the number of days in the month
    // Note: Example, new Date(2024, 8, 0) ; months are zero based in JavaScript's "Date" constructor, 0 is January, 8 is September, setting the day to 0 means the day before the first day of the specified month, which is the last day of the previous month.
    let totalWorkingDays = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const dayOfWeek = currentDate.getDay(); // Get the day of the week (0 = Sunday, 6 = Saturday)
  
      // Increment totalWorkingDays if the day is not Saturday (6) or Sunday (0)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        totalWorkingDays++;
      }
    }
  
    return totalWorkingDays;
  };
  
  // Function to calculate the number of availabe working days from a specific start date to a specific end date
  const calculateAvailableWorkingDaysInRange = (startDate, endDate) => {
  let availableWorkingDays = 0;
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    // Increment workedDays if the day is not Saturday (6) or Sunday (0)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      availableWorkingDays++;
    }
    currentDate.setDate(currentDate.getDate()+1);
  }

  return availableWorkingDays;
}
  
  // Function to calculate monthly accruals considering the hire date and increase date
  const calculateMonthlyAccruals = (baseVacation, increase, increaseDate, hireDate) => {
      const baseAccrual = baseVacation / 12;
      const increaseMonth = increaseDate ? new Date(increaseDate).getUTCMonth() : null;
      const hireDateObj = new Date(hireDate);
      const hireYear = hireDateObj.getUTCFullYear();
      const currentYear = new Date().getUTCFullYear();
    
      if (hireYear < currentYear) {
        // If Hire date is in the previous year
        return months.map((month, index) => {
          const accrual = (increase !== 0 && increaseMonth !== null && index >= increaseMonth)
            ? (baseVacation + increase) / 12
            : baseAccrual;
          return { month, accrual: parseFloat(accrual.toFixed(2)) };
        });

      } else if (hireYear === currentYear) {
        // Hire date is in the current year
        return months.map((month, index) => {
          if (index < hireDateObj.getUTCMonth()) {
            return { month, accrual: '-' }; // Display "-" for months before hire date in the current year
          } else if (index === hireDateObj.getUTCMonth()) {
            const totalWorkingDays = calculateTotalWorkingDaysInMonth(currentYear, index);
            // Calculate the last day of the month
            const lastDayOfMonth = new Date(currentYear, index + 1, 0).getDate();
            // Create a Date object for the end of the month
            const endOfMonthDate = new Date(currentYear, index, lastDayOfMonth);
            const availableWorkingDays = calculateAvailableWorkingDaysInRange(hireDateObj, endOfMonthDate);
            // console.log(`Available Working Days in ${months[index]}: ${availableWorkingDays}`);
            const accrual = (baseAccrual / totalWorkingDays) * availableWorkingDays;
            return { month, accrual: parseFloat(accrual.toFixed(2)) };
          } else {
            const accrual = (increase !== 0 && increaseMonth !== null && index >= increaseMonth)
              ? (baseVacation + increase) / 12
              : baseAccrual;
            return { month, accrual: parseFloat(accrual.toFixed(2)) };
          }
        });
      }
  };
  
  // Example input values for calculateMonthlyAccruals 
  const baseVacation = 15;
  const increase = 3;
  const increaseDate = '2024-05-01';  
  const hireDate = '2024-08-22'; // Example hire date
  const monthlyAccruals = calculateMonthlyAccruals(baseVacation, increase, increaseDate, hireDate);
  console.log("Monthly Accruals:", monthlyAccruals);
  
  // Calculate and print total working days and available working days in the hired month if the hire date is this year
  const hireDateObj = new Date(hireDate);
  const hireYear = hireDateObj.getUTCFullYear();
  const currentYear = new Date().getUTCFullYear();

  if (hireYear === currentYear) {
    const hireMonth = hireDateObj.getUTCMonth(); //method returns the month of the specified date according to universal time, as a zero-based value (where January is 0 and December is 11).
    const lastDayOfHiredMonth = new Date(currentYear, hireMonth + 1, 0).getDate();
    const endDate = new Date(currentYear, hireMonth, lastDayOfHiredMonth);

    console.log("hireMonth " + hireMonth);

    const totalWorkingDays = calculateTotalWorkingDaysInMonth(currentYear, hireMonth);
    const availableWorkingDays= calculateAvailableWorkingDaysInRange(hireDateObj, endDate);
    console.log("available working days in July: " + availableWorkingDays);

    console.log(`Working Days in ${months[hireMonth]}: ${totalWorkingDays}`);
    console.log(`Available Working Days in ${months[hireMonth]}: ${availableWorkingDays}`);
  }
  