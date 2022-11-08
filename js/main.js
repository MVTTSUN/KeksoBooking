const getRandomIntNumber = (from, to) =>
  from < 0 || from > to ? false : Math.floor(Math.random() * (to + 1 - from) + from);

getRandomIntNumber(1, 1);

const getRandomFloatNumber = (from, to, countAfterFloat) =>
  from < 0 || from > to ? false : (Math.random() * (to - from) + from).toFixed(countAfterFloat);

getRandomFloatNumber(1, 6, 4);
