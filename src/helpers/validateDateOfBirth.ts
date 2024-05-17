const validateDateOfBirth = (date: string): boolean => {
  const yearOld14 = new Date();
  yearOld14.setHours(0, 0, 0, 0);
  yearOld14.setFullYear(yearOld14.getFullYear() - 14);

  const currentDate = new Date(date);
  currentDate.setHours(0, 0, 0, 0);

  return yearOld14 >= currentDate;
};

export default validateDateOfBirth;
