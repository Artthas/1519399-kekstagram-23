const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const EFFECT_STYLES = {
  chrome: { name: 'grayscale', measure: '' },
  sepia: { name: 'sepia', measure: '' },
  marvin: { name: 'invert', measure: '%' },
  phobos: { name: 'blur', measure: 'px' },
  heat: { name: 'brightness', measure: '' },
};
let numberOfScale = 1;

const letNumberOfScale = () => {
  numberOfScale = 1;
};

function scaleImage(maxValue, isEnlarge, evt) {
  scaleControlValue.value = parseFloat(scaleControlValue.value);
  if (scaleControlValue.value === maxValue) {
    evt.preventDefault();
  } else if (isEnlarge === '+') {
    scaleControlValue.value = Number(scaleControlValue.value) + Number(25);
    numberOfScale += 0.25;
  } else if (isEnlarge === '-') {
    scaleControlValue.value -= 25;
    numberOfScale -= 0.25;
  }
  scaleControlValue.value += '%';
  imgUploadPreview.style = `transform: scale(${numberOfScale})`;
}

scaleControlSmaller.addEventListener('click', (evt) => {
  scaleImage('25', '-', evt);
});

scaleControlBigger.addEventListener('click', (evt) => {
  scaleImage('100', '+', evt);
});

/* Effects */

const sliderElement = document.querySelector('.effect-level__slider');
const imgUploadEffects = document.querySelector('.img-upload__effects');
const imgUploadPreviewPicture = document.querySelector('.img-upload__preview-picture');
const effectLevelValue = document.querySelector('.effect-level__value');

imgUploadEffects.addEventListener('change', (evt) => {
  const effects = Object.keys(EFFECT_STYLES);
  const options = {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  };
  if (imgUploadPreviewPicture.classList.length > 1) {
    sliderElement.noUiSlider.destroy();
    imgUploadPreviewPicture.style = '';
  }
  imgUploadPreviewPicture.className = 'img-upload__preview-picture';
  for (let i = 0; i < effects.length; i++) {
    let effectClass = 'effects__preview--';
    if (effects[i] === evt.target.value) {
      effectClass += evt.target.value;
      imgUploadPreviewPicture.classList.add(effectClass);
      noUiSlider.create(sliderElement, options);
    }
  }
  if (evt.target.value === effects[0] || evt.target.value === effects[1]) {
    options.range.max = 1;
  } else if (evt.target.value === effects[2]) {
    options.range.max = 100;
    options.start = 100;
    options.step = 1;
  } else if (evt.target.value === effects[3] || evt.target.value === effects[4]) {
    options.range.max = 3;
    options.start = 3;
  }

  if (imgUploadPreviewPicture.classList.length !== 1) {
    sliderElement.noUiSlider.updateOptions(options);
    sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
      effectLevelValue.value = unencoded[handle];
      const { name, measure } = EFFECT_STYLES[evt.target.value];
      imgUploadPreviewPicture.style = `filter: ${name}(${effectLevelValue.value}${measure})`;
    });
  }
});

export {letNumberOfScale};
