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

const ID = [];
const URL = [];
const DESCRIPTION = ['акула', 'кот', 'собака', 'лес', 'море', 'тайга', 'кит', 'бурундук'];
const LIKES = [];
const COMMENTS_NAME = ['Александр', 'Владимир', 'Владислав', 'Андрей', 'Алексей', 'Сергей', 'Роман'];
const COMMENTS_AVATAR = [];
const COMMENTS_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

for (let i = 0; ID.length < 25; i++) {
  ID[i] = i + 1;
  URL[i] = `photos/${i + 1}.jpg`;
}
for (let i = 0; LIKES.length < 200; i++) {
  LIKES[i] = i + 15;
}
for (let i = 0; COMMENTS_AVATAR.length < 6; i++) {
  COMMENTS_AVATAR[i] = `img/avatar-${i + 1}.svg`;
}

const getRandomArrayElement = (elements) => {
  const indexArray = elements[getRandomInRange(0, elements.length - 1)];
  elements.splice(indexArray, 1);
  return indexArray;
};

const createPhoto = () => {
  const copiedId = ID.slice();
  const copiedUrl = URL.slice();
  const copiedDescription = DESCRIPTION.slice();
  const copiedLikes = LIKES.slice();
  const copiedCommentsAvatar = COMMENTS_AVATAR.slice();
  const copiedCommentsMessage = COMMENTS_MESSAGE.slice();
  const copiedCommentsName = COMMENTS_NAME.slice();

  return {
    id: getRandomArrayElement(copiedId),
    url: getRandomArrayElement(copiedUrl),
    description: getRandomArrayElement(copiedDescription),
    likes: getRandomArrayElement(copiedLikes),
    comments: {
      id: Math.floor(Math.random()),
      avatar: getRandomArrayElement(copiedCommentsAvatar),
      message: getRandomArrayElement(copiedCommentsMessage),
      name: getRandomArrayElement(copiedCommentsName),
    },
  };
};

const PHOTOS_AMOUNT = 25;

const similarPhotos = new Array(PHOTOS_AMOUNT).fill(null).map(() => createPhoto());

similarPhotos();
