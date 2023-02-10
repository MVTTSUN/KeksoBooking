const getRandomIntNumber = (from, to) =>
  from < 0 || from > to ? false : Math.floor(Math.random() * (to + 1 - from) + from);

const getRandomFloatNumber = (from, to, countAfterFloat) =>
  from < 0 || from > to ? false : (Math.random() * (to - from) + from).toFixed(countAfterFloat);

const getNoRepeatNumbers = (from, to) => {
  const arr = [];
  while(arr.length <= to) {
    const randomNumber = getRandomIntNumber(from, to);
    if(arr.every((el) => el !== randomNumber)) {
      arr.push(randomNumber);
    }
  }
  return arr;
};

const debounce = (cb) => {
  let timeout;
  return (...rest) => {
    clearTimeout(timeout);
    setTimeout(() => {
      cb.apply(this, rest);
    }, 500);
  };
};

export { getRandomIntNumber, getRandomFloatNumber, getNoRepeatNumbers, debounce };
