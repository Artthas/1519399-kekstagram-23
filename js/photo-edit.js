const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');
let scaleNumber = 1;
scaleControlSmaller.addEventListener('click', (evt) => {
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
const EFFECT_NAMES = [
  'chrome',
  'sepia',
  'marvin',
  'phobos',
  'heat',
];
const EFFECT_STYLES = {
  chrome: { name: 'grayscale', measure: '' },
  sepia: { name: 'sepia', measure: '' },
  marvin: { name: 'invert', measure: '%' },
  phobos: { name: 'blur', measure: 'px' },
  heat: { name: 'brightness', measure: '' },
};

imgUploadEffects.addEventListener('change', (evt) => {
  let options;
  if (imgUploadPreviewPicture.classList.length > 1) {
    sliderElement.noUiSlider.destroy();
    imgUploadPreviewPicture.style = '';
  }
  imgUploadPreviewPicture.className = 'img-upload__preview-picture';
  for (let i = 0; i < EFFECT_NAMES.length; i++) {
    let effectClass = 'effects__preview--';
    if (EFFECT_NAMES[i] === evt.target.value) {
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
  if (evt.target.value === EFFECT_NAMES[0] || evt.target.value === EFFECT_NAMES[1]) {
    options = {
      range: {
        min: 0,
        max: 1,
      },
    };
  } else if (evt.target.value === EFFECT_NAMES[2]) {
    options = {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    };
  } else if (evt.target.value === EFFECT_NAMES[3] || evt.target.value === EFFECT_NAMES[4]) {
    options = {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
    };
  }

  if (imgUploadPreviewPicture.classList.length !== 1) {
    sliderElement.noUiSlider.updateOptions(options);
    sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
      let name;
      let measure;
      effectLevelValue.value = unencoded[handle];
      if (evt.target.value === EFFECT_NAMES[0]) {
        name = EFFECT_STYLES.chrome.name;
        measure = EFFECT_STYLES.chrome.measure;
      } else if (evt.target.value === EFFECT_NAMES[1]) {
        name = EFFECT_STYLES.sepia.name;
        measure = EFFECT_STYLES.sepia.measure;
      } else if (evt.target.value === EFFECT_NAMES[2]) {
        name = EFFECT_STYLES.marvin.name;
        measure = EFFECT_STYLES.marvin.measure;
      } else if (evt.target.value === EFFECT_NAMES[3]) {
        name = EFFECT_STYLES.phobos.name;
        measure = EFFECT_STYLES.phobos.measure;
      } else if (evt.target.value === EFFECT_NAMES[4]) {
        name = EFFECT_STYLES.heat.name;
        measure = EFFECT_STYLES.heat.measure;
      }
      imgUploadPreviewPicture.style = `filter: ${name}(${effectLevelValue.value}${measure})`;
    });
  }
});
