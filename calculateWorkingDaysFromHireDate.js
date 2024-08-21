const calculateWorkingDaysFromHireDate = (hireDate, endDate) => {
    let workingDaysCount = 0;
    let currentDate = new Date(hireDate);
  
    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      console.log("Current Date: " + currentDate.toDateString() + " | Day of Week: " + dayOfWeek);
  
      // Increment workingDaysCount if the day is not Saturday (6) or Sunday (0)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        workingDaysCount++;
        console.log("Incremented Working Days Count: " + workingDaysCount);
      }
  
      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return workingDaysCount;
  };
  
  // Example usage
  // const hireDate = new Date(Date.UTC(2024, 6, 22)); // July is month 6 (0-based)
  // const endDate = new Date(Date.UTC(2024, 6, 31)); // July is month 6 (0-based)

  const hireDate = '2024-09-18';
  const hireDateObj = new Date(hireDate);
  const year = hireDateObj.getUTCFullYear();
  const hireMonth = hireDateObj.getUTCMonth();
  const hireDay = hireDateObj.getDate();
  
  console.log("hireDate: " + hireDate);
  // console.log("endDate: " + endDate);
  
  const workingDays = calculateWorkingDaysFromHireDate(hireDate, endDate);
  console.log(`Total working days from ${hireDate} to ${endDate}: ${workingDays}`);
  