import {isEscEvent, removeBigPictureListener} from './util.js';

const picturesContainer = document.querySelector('.pictures');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const bigPicture = document.querySelector('.big-picture');
const commentsCount = bigPicture.querySelector('.comments-count');
const likesCount = bigPicture.querySelector('.likes-count');
const img = bigPicture.querySelector('img');
const socialCommentTemplate = bigPicture.querySelector('.social__comment');
const socialCommentList = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const closeBigPictureOnClick = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  const newSocialCommentList = bigPicture.querySelectorAll('.social__comment');
  for (let i = newSocialCommentList.length - 1; i > 1; i--) {
    socialCommentList.removeChild(newSocialCommentList[i]);
  }
  removeBigPictureListener();
};
const closeBigPictureOnKeyDown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
  }
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  const newSocialCommentList = bigPicture.querySelectorAll('.social__comment');
  for (let i = newSocialCommentList.length - 1; i > 1; i--) {
    socialCommentList.removeChild(newSocialCommentList[i]);
  }
  removeBigPictureListener();
};

const showPhotoFullSize = (photos) => (evt) => {
  if (evt.target.nodeName === 'IMG') {
    bigPicture.classList.remove('hidden');
    const photoNumber = evt.target.getAttribute('index');
    img.src = photos[photoNumber].url;
    likesCount.textContent = photos[photoNumber].likes;
    commentsCount.textContent = photos[photoNumber].comments.length;
    socialCaption.textContent = photos[photoNumber].description;
    for (let i = 0; i < photos[photoNumber].comments.length; i++) {
      const socialComment = socialCommentTemplate.cloneNode(true);
      socialComment.querySelector('.social__picture').src = photos[photoNumber].comments[i].avatar;
      socialComment.querySelector('.social__picture').alt = photos[photoNumber].comments[i].name;
      socialComment.querySelector('.social__text').textContent = photos[photoNumber].comments[i].message;
      socialCommentList.appendChild(socialComment);
    }
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    document.body.classList.add('modal-open');
    bigPictureCancel.addEventListener('click', closeBigPictureOnClick);
    document.addEventListener('keydown', closeBigPictureOnKeyDown);
  }
};

export {showPhotoFullSize, picturesContainer, bigPictureCancel, closeBigPictureOnClick, closeBigPictureOnKeyDown};
