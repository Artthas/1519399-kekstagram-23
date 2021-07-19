import {getRandomInRange} from './util.js';
import {renderSimilarPhotos, pictureList} from './photos-generation.js';

const imgFilters = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

const getDefaultPhotos = (photos) => (evt) => {
  const pictureArray = pictureList.querySelectorAll('.picture');
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
  for (let i = 0; i < pictureArray.length; i++) {
    pictureList.removeChild(pictureArray[i]);
  }
  renderSimilarPhotos(photos);
};

const getRandomPhotos = (photos) => (evt) => {
  const pictureArray = pictureList.querySelectorAll('.picture');
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
  for (let i = 0; i < pictureArray.length; i++) {
    pictureList.removeChild(pictureArray[i]);
  }
  const randomPhotos = photos.slice();
  randomPhotos.sort(() => {
    if (getRandomInRange(0, 2) === 0) {
      return 1;
    } else if (getRandomInRange(0, 2) === 1) {
      return -1;
    } else if (getRandomInRange(0, 2) === 2) {
      return 0;
    }
  });
  randomPhotos.splice(10, randomPhotos.length - 10);
  renderSimilarPhotos(randomPhotos);
};

const getDiscussedPhotos = (photos) => (evt) => {
  const pictureArray = pictureList.querySelectorAll('.picture');
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
  for (let i = 0; i < pictureArray.length; i++) {
    pictureList.removeChild(pictureArray[i]);
  }
  const discussedPhotos = photos.slice().sort((firstValue, secondValue) => {
    if (firstValue.comments.length > secondValue.comments.length) {
      return -1;
    } else if (firstValue.comments.length < secondValue.comments.length) {
      return 1;
    } else if (firstValue.comments.length === secondValue.comments.length) {
      return 0;
    }
  });
  renderSimilarPhotos(discussedPhotos);
};

export {getDiscussedPhotos, getDefaultPhotos, getRandomPhotos, filterRandom, filterDiscussed, filterDefault, imgFilters};
