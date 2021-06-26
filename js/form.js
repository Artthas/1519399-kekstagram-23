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
};
  
function closeImgUpload () {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    imgUploadInput.value = '';

    document.removeEventListener('keydown', onUserModalEscKeydown);
};

imgUploadInput.addEventListener('change', () => {
    openImgUpload();
});

imgUploadCancel.addEventListener('click', () => {
    closeImgUpload();
});

    /* Validation */

const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const re = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
const firstSymbol = '#';

textHashtags.addEventListener('blur', () => {
    const textHashtagsString = textHashtags.value.split(' ');
    let hashtag;

    for (let i = textHashtagsString.length; i >= 0; i--) {
        hashtag = textHashtagsString[i - 1];
        
        if (re.test(hashtag) == false) {
            if (firstSymbol != hashtag[0]) {
                textHashtags.setCustomValidity('хэш-тег начинается с символа # (решётка)');
            } else if (hashtag.length < 2) {
                textHashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки');
            } else if (hashtag.length > 20) {
                textHashtags.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
            } else {
                textHashtags.setCustomValidity('строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.');
            }
        } else if (textHashtagsString.length > 5) {
            textHashtags.setCustomValidity('нельзя указать больше пяти хэш-тегов');
        } else if (textHashtagsString.length > 1) {
            for (let j = textHashtagsString.length; j >= 0; j--) {
                if (hashtag == textHashtagsString[j - 2]) {
                    textHashtags.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
                }
            }
        } else {
            textHashtags.setCustomValidity('');
        }
    }

    textHashtags.reportValidity();
});

textDescription.addEventListener('blur', () => {
    if (textDescription.value.length > 140) {
        textDescription.setCustomValidity('длина комментария не может составлять больше 140 символов');
    } else {
        textDescription.setCustomValidity('');
    }
    textDescription.reportValidity();
});