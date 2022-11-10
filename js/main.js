const COUNT = 10;

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const TIMES = ['12:00', '13:00', '14:00'];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

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

const getRandomAvatar = (from, to) => {
  const arr = [];
  while(arr.length < to) {
    const randomNumber = getRandomIntNumber(from, to);
    if(arr.every((el) => el !== `img/avatars/user0${randomNumber}.png` && el !== `img/avatars/user${randomNumber}.png`)) {
      parseInt(randomNumber / 10) > 0 ? arr.push(`img/avatars/user${randomNumber}.png`) : arr.push(`img/avatars/user0${randomNumber}.png`);
    }
  }
  return arr;
};

const RANDOM_AVATARS = getRandomAvatar(1, COUNT);

const LOCATIONS = Array.from({length: COUNT}, () => ({
  lat: getRandomFloatNumber(35.65000, 35.70000, 5),
  lng: getRandomFloatNumber(139.70000, 139.80000, 5)
}));

const getRandomNoRepeatElements = (data) => {
  const arr = [];
  const randomNumber = getRandomIntNumber(1, data.length);
  const noRepeatArray = getNoRepeatNumbers(0, data.length - 1);
  for(let i = 0; i < randomNumber; i++) {
    arr.push(data[noRepeatArray[i]]);
  }
  return arr;
};

// eslint-disable-next-line arrow-body-style
const generateAd = (i) => {
  return {
    author: {
      avatar: RANDOM_AVATARS[i]
    },
    offer: {
      title: 'Заголовок',
      address: `${LOCATIONS[i].lat}, ${LOCATIONS[i].lng}`,
      price: getRandomIntNumber(1000, 10000),
      type: TYPES[getRandomIntNumber(0, TYPES.length - 1)],
      rooms: getRandomIntNumber(1, 5),
      guests: getRandomIntNumber(1, 9),
      checkin: TIMES[getRandomIntNumber(0, TIMES.length - 1)],
      checkout: TIMES[getRandomIntNumber(0, TIMES.length - 1)],
      features: getRandomNoRepeatElements(FEATURES),
      description: 'Описание',
      photos: getRandomNoRepeatElements(PHOTOS)
    },
    location: LOCATIONS[i]
  };
};

// eslint-disable-next-line no-return-assign
const ads = Array.from({length: COUNT}, (el, i) => el = generateAd(i));
