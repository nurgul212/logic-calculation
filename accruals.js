const calculateMonthlyAccruals = (baseVacation, increase, increaseDate) => {
    const monthlyAccruals = [];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const baseAccrual = baseVacation / 12;
    const increaseDateObj = increaseDate ? new Date(increaseDate) : null;
    const increaseMonth = increaseDateObj ? increaseDateObj.getUTCMonth() : null; // Use getUTCMonth()
    console.log("increase month : " + increaseMonth + 1);
  
    for (let month = 0; month < 12; month++) {
      let accrual = baseAccrual;
      if (increaseMonth !== null && month >= increaseMonth) {
        accrual = (baseVacation + increase) / 12;
      }
      monthlyAccruals.push({
        month: months[month],
        accrual: accrual.toFixed(2)
      });
    }
  
    return monthlyAccruals;
  };
  
  // Example input values
  const baseVacation = 15;
  const increase = 3;
  const increaseDate = '2024-05-01';
  
  const accruals = calculateMonthlyAccruals(baseVacation, increase, increaseDate);
  console.log(accruals);
  