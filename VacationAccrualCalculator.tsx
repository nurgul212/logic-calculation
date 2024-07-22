import React, { useState } from 'react';

interface Accrual {
  month: string;
  accrual: number;
}

interface Balance {
  month: string;
  balance: string;
}

const VacationAccrualCalculator: React.FC = () => {
  const [baseVacation, setBaseVacation] = useState<number>(15);
  const [increase, setIncrease] = useState<number>(3);
  const [increaseDate, setIncreaseDate] = useState<string>('2024-05-01');
  const [yearEndBalance, setYearEndBalance] = useState<number>(2.33);
  const [daysTaken, setDaysTaken] = useState<number[]>([1, 2, 1.5, 0, 3, 2, 1, 0, 2, 0, 1, 0]);

  const months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const calculateMonthlyAccruals = (baseVacation: number, increase: number, increaseDate: string): Accrual[] => {
    const baseAccrual = baseVacation / 12;
    const increaseMonth = increaseDate ? new Date(increaseDate).getUTCMonth() : null;
    return months.map((month, index) => {
      const accrual = (increaseMonth !== null && index >= increaseMonth)
        ? (baseVacation + increase) / 12
        : baseAccrual;
      return { month, accrual: parseFloat(accrual.toFixed(2)) };
    });
  };

  const calculateYearlyProjectedBalances = (monthlyAccruals: Accrual[], yearEndBalance: number, daysTaken: number[]): Balance[] => {
    let currentBalance = yearEndBalance;
    return monthlyAccruals.map((accrual, index) => {
      currentBalance += accrual.accrual - daysTaken[index];
      return { month: months[index], balance: currentBalance.toFixed(2) };
    });
  };

  const monthlyAccruals = calculateMonthlyAccruals(baseVacation, increase, increaseDate);
  const projectedBalances = calculateYearlyProjectedBalances(monthlyAccruals, yearEndBalance, daysTaken);

  return (
    <div>
      <h1>Vacation Accrual Calculator</h1>

      <h2>Monthly Accruals</h2>
      <ul>
        {monthlyAccruals.map((acc, index) => (
          <li key={index}>{acc.month}: {acc.accrual} days</li>
        ))}
      </ul>

      <h2>Projected Monthly Balances</h2>
      <ul>
        {projectedBalances.map((acc, index) => (
          <li key={index}>{acc.month}: {acc.balance} days</li>
        ))}
      </ul>
    </div>
  );
};

export default VacationAccrualCalculator;
