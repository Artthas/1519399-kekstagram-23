function getRandomInRange(min, max) {
  if (typeof(min) === 'number' && typeof(max) === 'number') {
    if (min >= 0 && max > 0) {
      if (min < max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      return 'min больше или равен max';
    }
    return 'min или max не является положительным числом';
  }
  return 'min или max не является целым числом';
}

function checkMaxLengthString(string, length) {
  if (string.length < length) {
    return true;
  }
  return false;
}

getRandomInRange(0, 10);
checkMaxLengthString('Привет', 10);
