const calculateMonthlyAccruals = (baseVacation, increase, increaseDate) => {
    const monthlyAccruals = [];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const baseAccrual = baseVacation / 12;
    const increaseDateObj = increaseDate ? new Date(increaseDate) : null;
    const increaseMonth = increaseDateObj ? increaseDateObj.getUTCMonth() : null;
  
    for (let month = 0; month < 12; month++) {
      let accrual = baseAccrual;
      if (increaseMonth !== null && month >= increaseMonth) {
        accrual = (baseVacation + increase) / 12;
      }
      monthlyAccruals.push({
        month: months[month],
        accrual: parseFloat(accrual.toFixed(2))
      });
    }
  
    return monthlyAccruals;
  };
  
  // Example input values for accrual.js
  const baseVacation = 15;
  const increase = 3;
  const increaseDate = '2024-05-01';
  
  const monthlyAccruals = calculateMonthlyAccruals(baseVacation, increase, increaseDate);
  console.log("Monthly Accruals:", monthlyAccruals);

  // Function from projectedMonthlyBalance.js
function calculateYearlyProjectedBalances(monthlyAccruals, yearEndBalance, daysTaken) {
    const monthlyBalances = [];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    let currentBalance = yearEndBalance;
  
    for (let month = 0; month < 12; month++) {
      currentBalance = currentBalance + monthlyAccruals[month].accrual - daysTaken[month];
      monthlyBalances.push({
        month: months[month],
        balance: currentBalance.toFixed(2)
      });
    }
  
    return monthlyBalances;
  }
  
  // Example input values for projectedMonthlyBalance.js
  const yearEndBalance = 2.33;
  const daysTaken = [1, 2, 1.5, 0, 3, 2, 1, 0, 2, 0, 1, 0]; // Example days taken each month
  
  const projectedBalances = calculateYearlyProjectedBalances(monthlyAccruals, yearEndBalance, daysTaken);
  
  // Print the projected balances for each month
  projectedBalances.forEach(acc => {
    console.log(`${acc.month} Projected Monthly Balance: ${acc.balance}`);
  });
  