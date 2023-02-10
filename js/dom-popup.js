const template = document.querySelector('#card').content;

const renderPopup = (value, markers) => {
  const { offer, author } = markers[value];
  const clone = template.querySelector('.popup').cloneNode(true);
  const titleHTML = clone.querySelector('.popup__title');
  const addressHTML = clone.querySelector('.popup__text--address');
  const priceHTML = clone.querySelector('.popup__text--price');
  const typeHTML = clone.querySelector('.popup__type');
  const capacityHTML = clone.querySelector('.popup__text--capacity');
  const timeHTML = clone.querySelector('.popup__text--time');
  const featuresHTML = clone.querySelectorAll('.popup__feature');
  const descriptionHTML = clone.querySelector('.popup__description');
  const photosHTML = clone.querySelector('.popup__photos');
  const photoHTML = clone.querySelector('.popup__photo');
  const avatarHTML = clone.querySelector('.popup__avatar');
  let typeTranslateText;

  switch (offer.type) {
    case 'flat':
      typeTranslateText = 'Квартира';
      break;
    case 'bungalow':
      typeTranslateText = 'Бунгало';
      break;
    case 'house':
      typeTranslateText = 'Дом';
      break;
    case 'palace':
      typeTranslateText = 'Дворец';
      break;
    case 'hotel':
      typeTranslateText = 'Отель';
      break;
  }

  titleHTML.textContent = offer.title;
  addressHTML.textContent = offer.address;
  priceHTML.textContent = `${offer.price} ₽/ночь`;
  typeHTML.textContent = typeTranslateText;
  capacityHTML.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  timeHTML.textContent = `${offer.checkin}, выезд до ${offer.checkout}`;
  if(offer.features) {
    featuresHTML.forEach((el) => {
      const checkBool = offer.features.some((feature) => el.classList.contains(`popup__feature--${feature}`));
      if(!checkBool) {
        el.remove();
      }
    });
  } else {
    featuresHTML.forEach((el) => el.remove());
  }
  descriptionHTML.textContent = offer.description;
  if(offer.photos) {
    offer.photos.forEach((src) => {
      const cloneImg = photoHTML.cloneNode(true);
      cloneImg.src = src;
      photosHTML.append(cloneImg);
    });
  }
  photosHTML.removeChild(photosHTML.children[0]);
  avatarHTML.src = author.avatar;

  if(!descriptionHTML.textContent) {
    descriptionHTML.remove();
  }

  return clone;
};

export { renderPopup };
