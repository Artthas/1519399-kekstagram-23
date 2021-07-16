import './util.js';
import './photos-generation.js';
import './form.js';
import './nouislider.js';
import './photo-edit.js';
import './photo-full-size.js';
import {renderSimilarPhotos} from './photos-generation.js';
import {closeImgUpload} from './form.js';
import {setFormSubmit} from './form.js';
import {showPhotoFullSize, picturesContainer} from './photo-full-size.js';

fetch('https://23.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((photos) => {
    renderSimilarPhotos(photos);
    picturesContainer.addEventListener('click', showPhotoFullSize(photos));
  })
  .catch();

setFormSubmit(closeImgUpload);

