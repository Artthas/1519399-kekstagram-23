const descriptions = ['акула', 'кот', 'собака', 'лес', 'море', 'тайга', 'кит', 'бурундук'];
const commentNames = ['Александр', 'Владимир', 'Владислав', 'Андрей', 'Алексей', 'Сергей', 'Роман'];
const commentAvatars = [];
const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const PHOTOS_AMOUNT = 25;

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

getRandomInRange(0, 10);
checkMaxLengthString('Привет', 10);

for (let i = 0; commentAvatars.length < 6; i++) {
  commentAvatars[i] = `img/avatar-${i + 1}.svg`;
}

const getRandomArrayElement = (elements) => {
  const indexArray = elements[getRandomInRange(0, elements.length - 1)];
  return indexArray;
};

const createComment = (j) => ({
  id: j + 1,
  avatar: `img/avatar-${getRandomInRange(1, 6)}.svg`,
  message: getRandomArrayElement(COMMENT_MESSAGES),
  name: getRandomArrayElement(commentNames),
});

const createPhoto = (i) => {
  const number = 6;
  const comments = new Array(number).fill(null).map((element, j) => createComment(j));
  return {
    id: i + 1,
    url: `photos/${i + 1}.jpg`,
    description: getRandomArrayElement(descriptions),
    likes: getRandomInRange(15, 200),
    comments,
  };
};

const similarPhotos = new Array(PHOTOS_AMOUNT).fill(null).map((element, i) => createPhoto(i));

similarPhotos;
