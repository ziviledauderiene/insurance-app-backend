const addOneYear = (date: Date) => {
  const newDate = new Date(date);
  return newDate.setFullYear(newDate.getFullYear() + 1);
};

export default addOneYear;
