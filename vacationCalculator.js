// Define the months array once
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Function to calculate monthly accruals
  const calculateMonthlyAccruals = (baseVacation, increase, increaseDate) => {
    const baseAccrual = baseVacation / 12;
    const increaseMonth = increaseDate ? new Date(increaseDate).getUTCMonth() : null;  
    return months.map((month, index) => {
      const accrual = (increaseMonth !== null && index >= increaseMonth)
        ? (baseVacation + increase) / 12 
        : baseAccrual;
      return { month, accrual: parseFloat(accrual.toFixed(2)) };
    });
  };
  
  // Example input values for calculateMonthlyAccruals 
  const baseVacation = 15;
  const increase = 3;
  const increaseDate = '2024-09-01';  
  const monthlyAccruals = calculateMonthlyAccruals(baseVacation, increase, increaseDate);
  console.log("Monthly Accruals:", monthlyAccruals);

  console.log("========================================");
  console.log(" ");
  // Function to calculate projected monthly balances
  const calculateProjectedMonthlyBalances = (monthlyAccruals, yearEndBalance, daysTaken, currentBalanceLimit) => {
    let currentBalance = yearEndBalance;  
    return monthlyAccruals.map((accrual, index) => {
      currentBalance += accrual.accrual - daysTaken[index];
      const isCapped = currentBalance > currentBalanceLimit;
      const cappedValue = isCapped ? currentBalance - currentBalanceLimit : 0;
      if (isCapped) {
        console.log(`%cYour vacation balance of ${months[index]} is capped. Excess Value: ${cappedValue.toFixed(2)}`, 'color: red;');
      }
      return {
        month: months[index],
        balance: currentBalance.toFixed(2),
        capped: isCapped,
        cappedValue: cappedValue.toFixed(2)
      };
    });
  };
  
  // Example input values for calculateProjectedMonthlyBalances
  const yearEndBalance = 0;
  const daysTaken = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Example days taken each month 
  const currentBalanceLimit = baseVacation + increase;
  const projectedBalances = calculateProjectedMonthlyBalances(monthlyAccruals, yearEndBalance, daysTaken, currentBalanceLimit);
  
  console.log(" ");
  // Print the projected balances for each month
  projectedBalances.forEach(acc => {
    console.log(`${acc.month} Projected Monthly Balance: ${acc.balance}`);
  });
  
  // Function to calculate the total number of working days in the selected month
  const calculateWorkingDaysInMonth = (year, month) => {
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
  
  // Function to calculate the selected date balance
  const calculateSelectedDateBalance = (selectedDate, projectedBalances, monthlyAccruals) => {
    const selectedDateObj = new Date(selectedDate);
    const selectedMonth = selectedDateObj.getUTCMonth(); // 0-indexed
    const selectedDay = selectedDateObj.getUTCDate(); // 1-indexed
    const year = selectedDateObj.getFullYear();
  
    // Get the previous month's projected balance
    const previousMonthBalance = projectedBalances[selectedMonth - 1]?.balance || 0;
    const currentMonthAccrual = monthlyAccruals[selectedMonth]?.accrual || 0;
  
    const totalWorkingDays = calculateWorkingDaysInMonth(year, selectedMonth);
    const workedDaysSoFar = selectedDay - Math.floor(selectedDay / 7) * 2; // Rough estimate of worked days
    console.log(`Total worked days so far in ${months[selectedMonth]} ${year}:`, workedDaysSoFar);

    // console.log("previousMonthBalance ==== " + previousMonthBalance);
    // console.log("currentMonthAccrual ==== " + currentMonthAccrual);
    // console.log("totalWorkingDays ==== " + totalWorkingDays);
    // console.log("workedDaysSoFar ==== " + workedDaysSoFar);
   
    // Calculate the balance for the selected date
    const selectedDateBalance = parseFloat(previousMonthBalance) + (currentMonthAccrual / totalWorkingDays) * workedDaysSoFar;
  
    return selectedDateBalance.toFixed(2);
  };
  
  // Example usage of calculateSelectedDateBalance
  const selectedDate = '2024-07-31';
  const selectedDateObj = new Date(selectedDate);
  const year = selectedDateObj.getFullYear();
  const selectedMonth = selectedDateObj.getUTCMonth();
  
  const totalWorkingDays = calculateWorkingDaysInMonth(year, selectedMonth);
  console.log("========================================");
  console.log(" ");
  console.log(`Total working days in ${months[selectedMonth]} ${year}:`, totalWorkingDays);
  
  const selectedDateBalance = calculateSelectedDateBalance(selectedDate, projectedBalances, monthlyAccruals);
  console.log(`Selected Date Balance (${selectedDate}):`, selectedDateBalance);
  