export const formatDate = date => {
  if (!date) return;

  let returnDate;
  // If not a date variable (could be a string) make it one
  if (Object.prototype.toString.call(date) !== '[object Date]') {
    returnDate = new Date(date);
  } else {
    returnDate = date;
  }
  let month = returnDate.getMonth() + 1;
  let day = returnDate.getDate();

  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }

  return month + '/' + day + '/' + returnDate.getFullYear();
};

export const isValidDate = d => {
  return d instanceof Date && !isNaN(d);
};

export const getYear = () => {
  const date = new Date();
  return date.getFullYear();
};
