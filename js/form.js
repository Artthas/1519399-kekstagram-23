import {isEscEvent} from './util.js';

const imgUploadInput = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('#upload-cancel');

const onUserModalEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    if (document.hasFocus()) {
      return;
    }
    evt.preventDefault();
    closeImgUpload();
  }
};

function openImgUpload () {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onUserModalEscKeydown);
}

function closeImgUpload () {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadInput.value = '';

  document.removeEventListener('keydown', onUserModalEscKeydown);
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
const re = /^#[a-zа-я0-9]{1,19}$/;

textHashtags.addEventListener('blur', () => {
  const hashtags = textHashtags.value.split(' ').map((t) => t.toLowerCase());
  let message = '';
  const unique = [ ...new Set(hashtags) ];

  if (hashtags.length > 5) {
    message = 'нельзя указать больше пяти хэш-тегов';
  } else if (unique.length !== hashtags.length) {
    message = 'один и тот же хэш-тег не может быть использован дважды';
  } else {
    for (const tag of hashtags) {
      if (!re.test(tag)) {
        message = 'хэш-тег начинается с символа # (решётка)\nстрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.';
      }
    }
  }

  textHashtags.setCustomValidity(message);
  textHashtags.reportValidity();
});

textDescription.addEventListener('blur', () => {
  let message = '';

  if (textDescription.value.length > 140) {
    message = 'длина комментария не может составлять больше 140 символов';
  }

  textDescription.setCustomValidity(message);
  textDescription.reportValidity();
});
