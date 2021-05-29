function getRandomInRange(min, max) {
  if (typeof(min) == number && typeof(max) == number) {
    if (min >= 0 && max > 0) {
      if (min < max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      console.log("min больше или равен max");
      return;
    }
    console.log("min или max не является положительным числом");
    return;
  }
  console.log("min или max не является целым числом");
  return;
}

function checkMaxLengthString(string, length) {
  if (string.length < length) {
    return true;
  }
  return false;
}
