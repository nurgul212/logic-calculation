// Define the months array once
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Function to calculate the total number of working days in the selected month
  const calculateTotalWorkingDaysInMonth = (year, month) => {
    let totalWorkingDays = 0;
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get the number of days in the month
  
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
  function calculateAvailableWorkingDaysInRange(startDate, endDate) {
  let availableWorkingDays = 0;
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    // Increment workedDays if the day is not Saturday (6) or Sunday (0)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      availableWorkingDays++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  console.log("availabeWorkingDays ===" + availableWorkingDays);
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
      // Hire date is in the previous year
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
          const availableWorkingDays = calculateAvailableWorkingDaysInRange(hireDateObj, new Date(currentYear, index, new Date(currentYear, index+1 , 0).getDate()));
          console.log(`Available Working Days in ${months[index]}: ${availableWorkingDays}`);
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
  const increaseDate = '2024-10-01';  
  const hireDate = '2023-08-12'; // Example hire date
  const monthlyAccruals = calculateMonthlyAccruals(baseVacation, increase, increaseDate, hireDate);
  console.log("Monthly Accruals:", monthlyAccruals);
  
  // Calculate and print total working days and available working days in June if the hire date is this year
  const hireYear = new Date(hireDate).getUTCFullYear();
  const hireMonth = new Date(hireDate).getUTCMonth(); //method returns the month of the specified date according to universal time, as a zero-based value (where January is 0 and December is 11).
  const currentYear = new Date().getUTCFullYear();
  if (hireYear === currentYear) {
    const totalWorkingDays = calculateTotalWorkingDaysInMonth(currentYear, hireMonth);
    const availableWorkingDays= calculateAvailableWorkingDaysInRange(new Date(hireDate), new Date(currentYear, hireMonth, new Date(currentYear, hireMonth + 1, 0).getDate()));
    console.log(`Working Days in ${months[hireMonth]}: ${totalWorkingDays}`);
    console.log(`Available Working Days in ${months[hireMonth]}: ${availableWorkingDays}`);
  }
  