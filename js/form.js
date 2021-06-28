import {isEscEvent} from './util.js';

const imgUploadInput = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('#upload-cancel');
const classHidden = 'hidden';
const classModalOpen = 'modal-open';

const onUserModalEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    if (document.hasFocus()) {
      return;
    }
    evt.preventDefault();
    imgUploadOverlay.classList.add(classHidden);
    document.body.classList.remove(classModalOpen);
    imgUploadInput.value = '';
    document.removeEventListener('keydown', onUserModalEscKeydown);
  }
};

function closeImgUpload () {
  imgUploadOverlay.classList.add(classHidden);
  document.body.classList.remove(classModalOpen);
  imgUploadInput.value = '';

  document.removeEventListener('keydown', onUserModalEscKeydown);
}

function openImgUpload () {
  imgUploadOverlay.classList.remove(classHidden);
  document.body.classList.add(classModalOpen);

  document.addEventListener('keydown', onUserModalEscKeydown);
}

imgUploadInput.addEventListener('change', () => {
  openImgUpload();
});

imgUploadCancel.addEventListener('click', () => {
  closeImgUpload();
});

/* Validation */

const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const ERROR_MESSAGES = [
  'нельзя указать больше пяти хэш-тегов',
  'один и тот же хэш-тег не может быть использован дважды',
  'хэш-тег начинается с символа # (решётка)\nстрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.',
  'длина комментария не может составлять больше 140 символов',
];
const reportAndSetCustomValidity = (message) => {
  textHashtags.setCustomValidity(message);
  textHashtags.reportValidity();
};

textHashtags.addEventListener('blur', () => {
  const re = /^#[a-zа-я0-9]{1,19}$/;
  const hashtags = textHashtags.value.split(' ').map((t) => t.toLowerCase());
  const unique = [ ...new Set(hashtags) ];
  let message = '';
  const hashtagsMaxLength = 5;

  if (hashtags.length > hashtagsMaxLength) {
    message = ERROR_MESSAGES[0];
  } else if (unique.length !== hashtags.length) {
    message = ERROR_MESSAGES[1];
  } else {
    for (const tag of hashtags) {
      message = re.test(tag) ? message : ERROR_MESSAGES[2];
    }
  }

  reportAndSetCustomValidity(message);
});

textDescription.addEventListener('blur', () => {
  let message = '';
  const textDescriptionMaxSymbols = 140;

  message = textDescription.value.length > textDescriptionMaxSymbols ? ERROR_MESSAGES[3] : '';

  reportAndSetCustomValidity(message);
});
