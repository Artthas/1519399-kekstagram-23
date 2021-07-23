import './util.js';
import './photos-generation.js';
import './form.js';
import './nouislider.js';
import './photo-edit.js';
import './photo-full-size.js';
import './filters.js';
import {renderSimilarPhotos} from './photos-generation.js';
import {closeImgUpload, setFormSubmit} from './form.js';
import {onImgClick, onImgKeyDown, picturesContainer} from './photo-full-size.js';
import {getFilteredPhotos, imgFiltersForm, imgFilters} from './filters.js';
import {debounce} from './util.js';

fetch('https://23.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((photos) => {
    renderSimilarPhotos(photos);
    imgFilters.classList.remove('img-filters--inactive');
    imgFiltersForm.addEventListener('click', debounce(getFilteredPhotos(photos)));
    picturesContainer.addEventListener('click', onImgClick(photos));
    picturesContainer.addEventListener('keydown', onImgKeyDown(photos));
  })
  .catch();

setFormSubmit(closeImgUpload);

