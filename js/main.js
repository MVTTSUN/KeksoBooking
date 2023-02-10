import {unactiveForm, validateForm, addMap, renderMarkers} from './dom-form.js';
import './preview-photos.js';
import { addEventFilter } from './filter.js';
import { getData } from './fetch.js';

unactiveForm();
validateForm();
addMap();
getData((markers) => {
  renderMarkers(markers);
  addEventFilter(markers);
});
