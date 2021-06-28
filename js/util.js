function getRandomInRange(min, max) {
  if (typeof(min) === 'number' && typeof(max) === 'number') {
    if (min >= 0 && max > 0) {
      return (min < max) ? Math.floor(Math.random() * (max - min + 1)) + min : 'min больше или равен max';
    }
    return 'min или max не является положительным числом';
  }
  return 'min или max не является целым числом';
}

function checkMaxLengthString(string, length) {
  return string.length < length;
}

const getRandomArrayElement = (elements) => {
  const indexArray = elements[getRandomInRange(0, elements.length - 1)];
  return indexArray;
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export {getRandomInRange, checkMaxLengthString, getRandomArrayElement, isEscEvent};
