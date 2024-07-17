function calculateYearlyProjectedBalances(monthlyAccrual, yearEndBalance, daysTaken) {
    const monthlyAccruals = [];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    let currentBalance = yearEndBalance;
  
    for (let month = 0; month < 12; month++) {
      currentBalance = currentBalance + monthlyAccrual - daysTaken[month];
      monthlyAccruals.push({
        month: months[month],
        accrual: currentBalance.toFixed(2)
      });
    }
  
    return monthlyAccruals;
  }
  
  // Example input values
  const monthlyAccrual = 1.25;
  const yearEndBalance = 2.33;
  const daysTaken = [1, 2, 1.5, 0, 3, 2, 1, 0, 2, 0, 1, 0]; // Example days taken each month
  
  const accruals = calculateYearlyProjectedBalances(monthlyAccrual, yearEndBalance, daysTaken);
  console.log(accruals);
  
  // Print the projected balances for each month
  accruals.forEach(acc => {
    console.log(`${acc.month} Projected Monthly Allowance: ${acc.accrual}`);
  });
  