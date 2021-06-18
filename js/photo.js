import {getRandomInRange, getRandomArrayElement} from './util.js';

const DESCRIPTIONS = ['акула', 'кот', 'собака', 'лес', 'море', 'тайга', 'кит', 'бурундук'];
const COMMENT_NAMES = ['Александр', 'Владимир', 'Владислав', 'Андрей', 'Алексей', 'Сергей', 'Роман'];
const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const PHOTOS_AMOUNT = 25;

const createComment = (j) => ({
  id: j + 1,
  avatar: `img/avatar-${getRandomInRange(1, 6)}.svg`,
  message: getRandomArrayElement(COMMENT_MESSAGES),
  name: getRandomArrayElement(COMMENT_NAMES),
});

const createPhoto = (i) => {
  const number = 6;
  const comments = new Array(number).fill(null).map((element, j) => createComment(j));
  return {
    id: i + 1,
    url: `photos/${i + 1}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInRange(15, 200),
    comments,
  };
};

const getSimilarPhotos = () => new Array(PHOTOS_AMOUNT).fill(null).map((element, i) => createPhoto(i));

export {getSimilarPhotos};
