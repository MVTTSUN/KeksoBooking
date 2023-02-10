import { renderMarkers } from './dom-form.js';
import { debounce } from './util.js';

const filterForm = document.querySelector('.map__filters');

const clearMarkers = () => {
  const imgMarkers = document.querySelectorAll('.leaflet-marker-icon');
  const popupMarkerContainer = document.querySelector('.leaflet-popup-pane');

  popupMarkerContainer.innerHTML = '';
  imgMarkers.forEach((el) => {
    if(el.src.split('/')[el.src.split('/').length - 1] === 'pin.svg') {
      el.remove();
    }
  });
};

const getSortAds = (markers) => () => {
  const type = document.querySelector('#housing-type');
  const price = document.querySelector('#housing-price');
  const rooms = document.querySelector('#housing-rooms');
  const guests = document.querySelector('#housing-guests');
  const features = document.querySelectorAll('.map__checkbox');
  let filter = markers;

  if(type.value !== 'any') {
    filter = filter.filter((el) => el.offer.type === type.value);
  }
  if(price.value !== 'any') {
    if(price.value === 'low') {
      filter = filter.filter((el) => el.offer.price < 10000);
    } else if(price.value === 'middle') {
      filter = filter.filter((el) => el.offer.price >= 10000 && el.offer.price <= 50000);
    } else if(price.value === 'high') {
      filter = filter.filter((el) => el.offer.price > 50000);
    }
  }
  if(rooms.value !== 'any') {
    filter = filter.filter((el) => el.offer.rooms === Number(rooms.value));
  }
  if(guests.value !== 'any') {
    filter = filter.filter((el) => el.offer.guests === Number(guests.value));
  }
  features.forEach((input) => {
    if(input.checked) {
      filter = filter.filter((el) => el.offer.features);
      filter = filter.filter((el) => el.offer.features.includes(input.value));
    }
  });

  clearMarkers();
  renderMarkers(filter);
};

const addEventFilter = (markers) => {
  filterForm.addEventListener('change', debounce(getSortAds(markers)));
};

export { addEventFilter };
