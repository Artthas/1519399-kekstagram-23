import './util.js';
import './photos-generation.js';
import './form.js';
import './nouislider.js';
import './photo-edit.js';
import './photo-full-size.js';
import './filters.js';
import {renderSimilarPhotos} from './photos-generation.js';
import {closeImgUpload, setFormSubmit} from './form.js';
import {showPhotoFullSize, picturesContainer} from './photo-full-size.js';
import {getDiscussedPhotos, getDefaultPhotos, getRandomPhotos, filterRandom, filterDiscussed, filterDefault, imgFilters} from './filters.js';
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
    filterDefault.addEventListener('click', debounce(getDefaultPhotos(photos), 500));
    filterRandom.addEventListener('click', debounce(getRandomPhotos(photos), 500));
    filterDiscussed.addEventListener('click', debounce(getDiscussedPhotos(photos), 500));
    picturesContainer.addEventListener('click', showPhotoFullSize(photos));
  })
  .catch();

setFormSubmit(closeImgUpload);

