const isValidDate = d => {
  return d instanceof Date && !isNaN(d);
};

exports.numberIsValid = (game, number) => {
  let regEx;
  const nbr = Number(number);

  if (game === 'P') {
    regEx = /\b(0?[1-9]|[1-6][0-9])\b/; // 1 - 69
    return regEx.test(nbr);
  }

  if (game === 'M') {
    regEx = /\b(0?[1-9]|[1-6][0-9]|70)\b/; // 1 - 70
    return regEx.test(nbr);
  }
  return false;
};

exports.ballIsValid = (game, number) => {
  let regEx;
  const nbr = Number(number);

  if (game === 'P') {
    regEx = /\b(0?[1-9]|1[0-9]|2[0-6])\b/; // 1 - 26
    return regEx.test(nbr);
  }

  if (game === 'M') {
    regEx = /\b(0?[1-9]|1[0-9]|2[0-5])\b/; // 1 - 25
    return regEx.test(nbr);
  }
  return false;
};

exports.allNumbersValid = nbrs => {
  // all numbers greater than zero
  const allGreaterThanZero = nbrs.every(e => e > 0);
  if (!allGreaterThanZero) return false;

  // check for duplicates and if each number is greater than the last
  let value = 0;
  for (let i = 0; i < nbrs.length; i++) {
    if (!(nbrs[i] > value)) return false;
    value = nbrs[i];
  }
  // Made it here so valid.
  return true;
};

exports.datesValidForGame = (game, startDate, endDate) => {
  if (!isValidDate(startDate) || !isValidDate(endDate)) return false;
  if (startDate.valueOf() > endDate.valueOf()) return false;

  if (game === 'P') {
    const startDay = startDate.getDay();
    const endDay = endDate.getDay();
    // Sunday - Saturday : 0 - 6
    if (startDay !== 3 && startDay !== 6) return false;
    if (endDay !== 3 && endDay !== 6) return false;
  }

  if (game === 'M') {
    const startDay = startDate.getDay();
    const endDay = endDate.getDay();
    // Sunday - Saturday : 0 - 6
    if (startDay !== 2 && startDay !== 5) return false;
    if (endDay !== 2 && endDay !== 5) return false;
  }

  return true;
};
