import { renderPopup } from './dom-popup.js';
import { sendData } from './fetch.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const adFormCollection = adForm.children;
const mapFiltersCollection = mapFilters.children;
const slider = document.querySelector('.ad-form__slider');
const form = document.querySelector('#add-ad-form');
const price = form.querySelector('#price');
const submitButton = form.querySelector('.ad-form__submit');
const inputText = form.querySelectorAll('input');
let map;

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 80,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

const unactiveForm = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('ad-form--disabled');

  for(const inputs of adFormCollection) {
    inputs.setAttribute('disabled', '');
  }
  for(const inputs of mapFiltersCollection) {
    inputs.setAttribute('disabled', '');
  }
};

const activeForm = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('ad-form--disabled');

  for(const inputs of adFormCollection) {
    inputs.removeAttribute('disabled');
  }
  for(const inputs of mapFiltersCollection) {
    inputs.removeAttribute('disabled');
  }
};

const blockButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Опубликовываю...';
};

const unblockButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовывать';
};

const closeMessage = (evt) => {
  if(!evt.target.classList.contains('error__button')) {
    evt.target.remove();
  }
};

const isEscape = (evt) => {
  if(evt.code === 'Escape') {
    if(document.querySelector('.success')) {
      document.querySelector('.success').remove();
    }
    if(document.querySelector('.error')) {
      document.querySelector('.error').remove();
    }
    document.removeEventListener('keydown', isEscape);
  }
};

const successSendData = () => {
  const template = document.querySelector('#success').content;
  const clone = template.querySelector('.success').cloneNode(true);
  const textarea = document.querySelector('#description');
  document.body.append(clone);
  inputText.forEach((el) => {
    if(el.name !== 'address') {
      el.value = '';
    }
  });
  textarea.value = '';
  clone.addEventListener('click', closeMessage);
  document.addEventListener('keydown', isEscape);
};

const errorSendData = () => {
  const template = document.querySelector('#error').content;
  const clone = template.querySelector('.error').cloneNode(true);
  document.body.append(clone);
  clone.addEventListener('click', closeMessage);
  clone.querySelector('.error__button').addEventListener('click', () => {
    clone.remove();
  });
  clone.addEventListener('click', closeMessage);
  document.addEventListener('keydown', isEscape);
};

const validateForm = () => {
  const title = form.querySelector('#title');
  const roomNumber = form.querySelector('#room_number');
  const capacity = form.querySelector('#capacity');
  const type = form.querySelector('#type');
  const timeIn = form.querySelector('#timein');
  const timeOut = form.querySelector('#timeout');

  // Синхронизация полей въезда и выезда

  timeIn.addEventListener('change', () => {timeOut.value = timeIn.value;});
  timeOut.addEventListener('change', () => {timeIn.value = timeOut.value;});

  // Проверка типа жилья с минимальной ценой

  const checkTypeAndPrice = () => {
    switch(type.value) {
      case 'bungalow':
        price.placeholder = '0';
        slider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 100000,
          }
        });
        return 'Минимальное значение — 0';
      case 'flat':
        price.placeholder = '1000';
        slider.noUiSlider.updateOptions({
          range: {
            min: 1000,
            max: 100000,
          }
        });
        return 'Минимальное значение — 1000';
      case 'hotel':
        price.placeholder = '3000';
        slider.noUiSlider.updateOptions({
          range: {
            min: 3000,
            max: 100000,
          }
        });
        return 'Минимальное значение — 3000';
      case 'house':
        price.placeholder = '5000';
        slider.noUiSlider.updateOptions({
          range: {
            min: 5000,
            max: 100000,
          }
        });
        return 'Минимальное значение — 5000';
      case 'palace':
        price.placeholder = '10000';
        slider.noUiSlider.updateOptions({
          range: {
            min: 10000,
            max: 100000,
          }
        });
        return 'Минимальное значение — 10000';
    }
  };
  checkTypeAndPrice();

  type.addEventListener('change', checkTypeAndPrice);

  // Валидация

  const pristine = new Pristine(form, {
    classTo: 'ad-form__validate',
    errorClass: 'ad-form__validate--invalid',
    successClass: 'ad-form__validate--valid',
    errorTextParent: 'ad-form__validate',
    errorTextTag: 'p',
    errorTextClass: 'ad-form__error'
  }, false);

  pristine.addValidator(title,
    () => title.value.length >= 30,
    'Минимальная длина — 30 символов');

  pristine.addValidator(title,
    () => title.value.length <= 100,
    'Максимальная длина — 100 символов');

  pristine.addValidator(price, () => Number(price.value) >= Number(price.placeholder), checkTypeAndPrice);

  pristine.addValidator(price,
    () => price.value <= 100000,
    'Максимальное значение — 100 000');

  const roomOption = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  pristine.addValidator(roomNumber,
    () => roomOption[roomNumber.value].includes(capacity.value),
    () => {
      switch(roomNumber.value) {
        case '1':
          return '1 комната — «для 1 гостя»';
        case '2':
          return '2 комнаты — «для 2 гостей» или «для 1 гостя»';
        case '3':
          return '3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»';
        case '100':
          return '100 комнат — «не для гостей»';
      }
    });

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if(pristine.validate()) {
      blockButton();
      sendData(() => {
        successSendData();
        unblockButton();
      },
      () => {
        errorSendData();
        unblockButton();
      },
      new FormData(evt.target));
    }
  });
};

slider.noUiSlider.on('update', () => {
  price.value = slider.noUiSlider.get();
});

const addMap = () => {
  const address = document.querySelector('#address');
  map = L.map('map-canvas')
    .on('load', () => {
      activeForm();
    })
    .setView({
      lat: 35.6895,
      lng: 139.69171,
    }, 13);

  const mainIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainIconMarker = L.marker(
    {
      lat: 35.6895,
      lng: 139.69171,
    },
    {
      draggable: true,
      icon: mainIcon,
    }
  );

  mainIconMarker.addTo(map);

  address.value = `${mainIconMarker.getLatLng().lat}, ${mainIconMarker.getLatLng().lng}`;

  mainIconMarker.on('moveend', (evt) => {
    address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  });

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
    },
  ).addTo(map);
};

const renderMarkers = (markers) => {
  const markerGroup = L.layerGroup().addTo(map);
  const icon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });
  const tenMarkers = markers.slice(0, 10);
  tenMarkers.forEach(({location}, i) => {
    const {lat, lng} = location;
    const marker = L.marker(
      {
        lat,
        lng
      },
      {
        icon
      }
    );
    marker.addTo(markerGroup).bindPopup(renderPopup(i, markers));
  });
};

export {unactiveForm, validateForm, addMap, renderMarkers};
