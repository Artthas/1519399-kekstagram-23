import {isEscEvent} from './util.js';
import {letNumberOfScale} from './photo-edit.js';

const CLASS_HIDDEN = 'hidden';
const CLASS_MODAL_OPEN = 'modal-open';
const ERROR_MESSAGES = [
  'нельзя указать больше пяти хэш-тегов',
  'один и тот же хэш-тег не может быть использован дважды',
  'хэш-тег начинается с символа # (решётка)\nстрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.',
  'длина комментария не может составлять больше 140 символов',
];
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('#upload-cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const cancelEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
};

textHashtags.addEventListener('keydown', cancelEscKeydown);

textDescription.addEventListener('keydown', cancelEscKeydown);

const closeImgUpload = () => {
  imgUploadOverlay.classList.add(CLASS_HIDDEN);
  document.body.classList.remove(CLASS_MODAL_OPEN);
  imgUploadInput.value = '';
  document.querySelector('.img-upload__preview-picture').className = 'img-upload__preview-picture';
  document.querySelector('.img-upload__preview-picture').style = '';
  document.querySelector('.img-upload__preview').style = '';
  document.querySelector('.scale__control--value').value = '100%';
  if (document.querySelector('.effect-level__slider').className !== 'effect-level__slider') {
    document.querySelector('.effect-level__slider').noUiSlider.destroy();
  }
  textHashtags.value = '';
  textDescription.value = '';
  letNumberOfScale();
};

const onUserModalEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeImgUpload();
    document.removeEventListener('keydown', onUserModalEscKeydown);
  }
};

const openImgUpload = () => {
  imgUploadOverlay.classList.remove(CLASS_HIDDEN);
  document.body.classList.add(CLASS_MODAL_OPEN);

  document.addEventListener('keydown', onUserModalEscKeydown);
};

imgUploadInput.addEventListener('change', () => {
  openImgUpload();
});

imgUploadCancel.addEventListener('click', () => {
  closeImgUpload();
  document.removeEventListener('keydown', onUserModalEscKeydown);
});

/* Validation */

const reportAndSetCustomValidity = (message, inputForm) => {
  inputForm.setCustomValidity(message);
  inputForm.reportValidity();
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
  } else if (textHashtags.value === '') {
    message = '';
  } else {
    for (const tag of hashtags) {
      message = re.test(tag) ? message : ERROR_MESSAGES[2];
    }
  }

  reportAndSetCustomValidity(message, textHashtags);
});

textDescription.addEventListener('blur', () => {
  let message = '';
  const textDescriptionMaxSymbols = 140;

  message = textDescription.value.length > textDescriptionMaxSymbols ? ERROR_MESSAGES[3] : '';

  reportAndSetCustomValidity(message, textDescription);
});

/* Submitting */

const successWindowTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorWindowTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const showSuccessWindow = () => {
  const successWindow = successWindowTemplate.cloneNode(true);
  document.body.appendChild(successWindow);
  document.addEventListener('keydown', onSuccessEscKeydown);
  document.addEventListener('click', onSuccessClickDown);
}
const showErrorWindow = () => {
  const errorWindow = errorWindowTemplate.cloneNode(true);
  document.body.appendChild(errorWindow);
  document.addEventListener('keydown', onErrorEscKeydown);
  document.addEventListener('click', onErrorClickDown);
}
const onSuccessEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    document.body.removeChild(document.querySelector('.success'));
    document.removeEventListener('keydown', onSuccessEscKeydown);
    document.removeEventListener('click', onSuccessClickDown);
  }
};
const onErrorEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    document.body.removeChild(document.querySelector('.error'));
    document.removeEventListener('keydown', onErrorEscKeydown);
    document.removeEventListener('click', onErrorClickDown);
  }
};
const onSuccessClickDown = (evt) => {
  if (evt.target === document.querySelector('.success__inner')) {
    evt.preventDefault();
  } else {
    document.body.removeChild(document.querySelector('.success'));
    document.removeEventListener('click', onSuccessClickDown);
    document.removeEventListener('keydown', onSuccessEscKeydown);
  }
}
const onErrorClickDown = (evt) => {
  if (evt.target === document.querySelector('.error__inner')) {
    evt.preventDefault();
  } else {
    document.body.removeChild(document.querySelector('.error'));
    document.removeEventListener('click', onErrorClickDown);
    document.removeEventListener('keydown', onErrorEscKeydown);
  }
}

const setFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
  
    const formData = new FormData(evt.target);
  
    fetch(
      'https://23.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body: formData,
      },
    ).then((response) => {
       if (response.ok) {
        onSuccess();
        showSuccessWindow();
       } else {
        onSuccess();
        showErrorWindow();
       }
     })
     .catch(() => {
       onSuccess();
       showErrorWindow();
     })


  });
}

export {setFormSubmit, closeImgUpload};