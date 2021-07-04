const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');
let scaleNumber = 1;
scaleControlSmaller.addEventListener('click', () => {
    if (scaleControlValue.value === '25%') {
      evt.preventDefault();
    } else {
      scaleControlValue.value = parseFloat(scaleControlValue.value);
      scaleControlValue.value -= 25;
      scaleControlValue.value += '%';
      scaleNumber -= 0.25;
      imgUploadPreview.style = `transform: scale(${scaleNumber})`;
    }
});

scaleControlBigger.addEventListener('click', (evt) => {
    if (scaleControlValue.value === '100%') {
      evt.preventDefault();
    } else {
      scaleControlValue.value = parseFloat(scaleControlValue.value);
      scaleControlValue.value = Number(scaleControlValue.value) + Number(25);
      scaleControlValue.value += '%';
      scaleNumber += 0.25;
      imgUploadPreview.style = `transform: scale(${scaleNumber})`;
    }
});

/* Effects */

const sliderElement = document.querySelector('.effect-level__slider');
const imgUploadEffects = document.querySelector('.img-upload__effects');
const imgUploadPreviewPicture = document.querySelector('.img-upload__preview-picture');
const effectLevelValue = document.querySelector('.effect-level__value');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const effectsItemFirst = document.querySelector('.effects__item-first');
const effectNames = [
  'chrome',
  'sepia',
  'marvin',
  'phobos',
  'heat'
]

imgUploadEffects.addEventListener('change', (evt) => {
  for (let i = 0; i < effectNames.length; i++) {
    let effectClass = 'effects__preview--';
    effectClass += effectNames[i];
    for (let j = 0; j < imgUploadPreviewPicture.classList.length; j++) {
      if (imgUploadPreviewPicture.classList[j] === effectClass) {
        imgUploadPreviewPicture.classList.remove(effectClass);
        sliderElement.noUiSlider.destroy();
      }
    }
  }
  for (let i = 0; i < effectNames.length; i++) {
    let effectClass = 'effects__preview--';
    if (effectNames[i] === evt.target.value) {
      effectClass += evt.target.value;
      imgUploadPreviewPicture.classList.add(effectClass);
      noUiSlider.create(sliderElement, {
        range: {
            min: 0,
            max: 1,
        },
        start: 1,
        step: 0.1,
        connect: 'lower',
      });
    }
  }
  if (evt.target.value === effectNames[0] || evt.target.value === effectNames[1]) {
    sliderElement.noUiSlider.updateOptions({
      range: {
          min: 0,
          max: 1,
      },
      step: 0.1,
    });
  } else if (evt.target.value === effectNames[2]) {
    sliderElement.noUiSlider.updateOptions({
      range: {
          min: 0,
          max: 100,
      },
      start: 100,
      step: 1,
    });
  } else if (evt.target.value === effectNames[3] || evt.target.value === effectNames[4]) {
    sliderElement.noUiSlider.updateOptions({
      range: {
          min: 0,
          max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }
  sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
    effectLevelValue.value = unencoded[handle];
    if (evt.target.value === effectNames[0]) {
      imgUploadPreviewPicture.style = '';
      imgUploadPreviewPicture.style = `filter: grayscale(${effectLevelValue.value})`;
    } else if (evt.target.value === effectNames[1]) {
      imgUploadPreviewPicture.style = '';
      imgUploadPreviewPicture.style = `filter: sepia(${effectLevelValue.value})`;
    } else if (evt.target.value === effectNames[2]) {
      imgUploadPreviewPicture.style = '';
      imgUploadPreviewPicture.style = `filter: invert(${effectLevelValue.value}%)`;
    } else if (evt.target.value === effectNames[3]) {
      imgUploadPreviewPicture.style = '';
      imgUploadPreviewPicture.style = `filter: blur(${effectLevelValue.value}px)`;
    } else if (evt.target.value === effectNames[4]) {
      imgUploadPreviewPicture.style = '';
      imgUploadPreviewPicture.style = `filter: brightness(${effectLevelValue.value})`;
    } else {
      imgUploadPreviewPicture.style = '';
    }
  });
});

effectsItemFirst.removeEventListener('change', () => {});