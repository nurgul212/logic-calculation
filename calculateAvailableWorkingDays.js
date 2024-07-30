function calculateWorkingDays(startDate, endDate) {
    let currentDate = new Date(startDate);
    // console.log("Current Date: " + currentDate.toDateString());
    let availableWorkingDays = 0;
  
    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      console.log("Current Date: " + currentDate.toDateString());
      // Increment workedDays if the day is not Saturday (6) or Sunday (0)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        availableWorkingDays++;
        console.log("availableWorkingDays++ : " + availableWorkingDays);
      }
  
      currentDate.setDate(currentDate.getDate() + 1);
    }
   
    return availableWorkingDays;
  }
  
  // Test the function
  const startDate = new Date('2024-07-01');
  const yearStart = startDate.getFullYear(); // Get the year
  const monthStart = startDate.getMonth();  // Get the month
  const dayStart = startDate.getDate()+1;  // Get the date
  const startDateOfMonth = new Date(yearStart, monthStart, dayStart);


  const endDate = new Date('2024-07-31');
  const yearEnd = endDate.getFullYear();
  const monthEnd = endDate.getMonth(); 
  const dateEnd = endDate.getDate()+1;

  const lastDayOfMonth = new Date(yearEnd, monthEnd, dateEnd);
  console.log("lastDayOfMonth: " + lastDayOfMonth);
  console.log("Total Working Days: " + (calculateWorkingDays(startDateOfMonth, lastDayOfMonth)));