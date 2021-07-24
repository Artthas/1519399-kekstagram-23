import {onSuccessClick, onSuccessKeyDown, onErrorClick, onErrorKeyDown, onUserModalEscKeydown, closeImgUpload, imgUploadCancel} from './form.js';
import {onBigPictureCancelClick, onBigPictureEscKeyDown, bigPictureCancel, commentsLoader, onCommentsLoaderClick} from './photo-full-size.js';

const getRandomInRange = (min, max) => {
  if (typeof(min) === 'number' && typeof(max) === 'number') {
    if (min >= 0 && max > 0) {
      return (min < max) ? Math.floor(Math.random() * (max - min + 1)) + min : 'min больше или равен max';
    }
    return 'min или max не является положительным числом';
  }
  return 'min или max не является целым числом';
};

const checkMaxLengthString = (string, length) => string.length < length;

const getRandomArrayElement = (elements) => {
  const indexArray = elements[getRandomInRange(0, elements.length - 1)];
  return indexArray;
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const removeSuccessListener = () => {
  document.removeEventListener('click', onSuccessClick);
  document.removeEventListener('keydown', onSuccessKeyDown);
};
const removeErrorListener = () => {
  document.removeEventListener('click', onErrorClick);
  document.removeEventListener('keydown', onErrorKeyDown);
};

const removeBigPictureListener = () => {
  bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
  bigPictureCancel.removeEventListener('keydown', onBigPictureEscKeyDown);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
};

const removeClosingUserModalListeners = () => {
  document.removeEventListener('keydown', onUserModalEscKeydown);
  imgUploadCancel.removeEventListener('click', closeImgUpload);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomInRange, checkMaxLengthString, getRandomArrayElement, isEscEvent, removeErrorListener, removeSuccessListener, removeBigPictureListener, removeClosingUserModalListeners, debounce};
