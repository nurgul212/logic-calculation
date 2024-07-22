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
  const increaseDate = '2024-05-01';  
  const monthlyAccruals = calculateMonthlyAccruals(baseVacation, increase, increaseDate);
  console.log("Monthly Accruals:", monthlyAccruals);
  
  // Function to calculate projected monthly balances
  const calculateProjectedMonthlydBalances = (monthlyAccruals, yearEndBalance, daysTaken, currentBalanceLimit) => {
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
  
  // Example input values for calculateProjectedMonthlydBalances
  const yearEndBalance = 10;
  const daysTaken = [1, 0, 0, 0, 0, 2, 1, 0, 2, 0, 1, 0]; // Example days taken each month 
  const currentBalanceLimit = baseVacation + increase;
  const projectedBalances = calculateProjectedMonthlydBalances(monthlyAccruals, yearEndBalance, daysTaken, currentBalanceLimit);
  
  // Print the projected balances for each month
  projectedBalances.forEach(acc => {
    console.log(`${acc.month} Projected Monthly Balance: ${acc.balance}`);
  });
  