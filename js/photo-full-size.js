import {isEscEvent, removeBigPictureListener} from './util.js';

const picturesContainer = document.querySelector('.pictures');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const bigPicture = document.querySelector('.big-picture');
const commentsCount = bigPicture.querySelector('.comments-count');
const likesCount = bigPicture.querySelector('.likes-count');
const img = bigPicture.querySelector('img');
const socialCommentList = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialCommentTemplate = document.querySelector('#social__comment')
  .content
  .querySelector('.social__comment');

const onCommentsLoaderClick = () => {
  const hiddenComments = socialCommentList.querySelectorAll('.hidden');
  for (let i = 0; i <= 4; i++) {
    if (socialCommentList.querySelectorAll('.hidden').length === 0) {
      commentsLoader.classList.add('hidden');
      break;
    } else {
      hiddenComments[i].classList.remove('hidden');
    }
  }
  const number = bigPicture.querySelectorAll('.social__comment').length - socialCommentList.querySelectorAll('.hidden').length;
  socialCommentCount.textContent = `${number} из ${bigPicture.querySelectorAll('.social__comment').length} комментариев`;
};
const onBigPictureCancelClick = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  const newSocialCommentList = bigPicture.querySelectorAll('.social__comment');
  socialCommentCount.textContent = '';
  commentsLoader.classList.remove('hidden');
  for (let i = newSocialCommentList.length - 1; i >= 0; i--) {
    socialCommentList.removeChild(newSocialCommentList[i]);
  }
  removeBigPictureListener();
};
const onBigPictureEscKeyDown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    const newSocialCommentList = bigPicture.querySelectorAll('.social__comment');
    socialCommentCount.textContent = '';
    for (let i = newSocialCommentList.length - 1; i >= 0; i--) {
      socialCommentList.removeChild(newSocialCommentList[i]);
    }
    removeBigPictureListener();
  }
};

const onImgClick = (photos) => (evt) => {
  if (evt.target.nodeName === 'IMG') {
    bigPicture.classList.remove('hidden');
    const photoNumber = evt.target.getAttribute('index');
    img.src = photos[photoNumber].url;
    likesCount.textContent = photos[photoNumber].likes;
    commentsCount.textContent = photos[photoNumber].comments.length;
    socialCaption.textContent = photos[photoNumber].description;
    for (let i = 0; i < photos[photoNumber].comments.length; i++) {
      const socialComment = socialCommentTemplate.cloneNode(true);
      const socialCommentArray = bigPicture.querySelectorAll('.social__comment');
      socialComment.querySelector('.social__picture').src = photos[photoNumber].comments[i].avatar;
      socialComment.querySelector('.social__picture').alt = photos[photoNumber].comments[i].name;
      socialComment.querySelector('.social__text').textContent = photos[photoNumber].comments[i].message;
      if (socialCommentArray.length >= 5) {
        socialComment.classList.add('hidden');
      }
      socialCommentList.appendChild(socialComment);
    }
    if (bigPicture.querySelectorAll('.social__comment').length <= 5) {
      commentsLoader.classList.add('hidden');
    }
    socialCommentCount.textContent = `${bigPicture.querySelectorAll('.social__comment').length - socialCommentList.querySelectorAll('.hidden').length} из ${bigPicture.querySelectorAll('.social__comment').length} комментариев`;
    document.body.classList.add('modal-open');
    bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
    document.addEventListener('keydown', onBigPictureEscKeyDown);
    commentsLoader.addEventListener('click', onCommentsLoaderClick);
  }
};

const onImgKeyDown = (photos) => (evt) => {
  if (evt.target.nodeName === 'A') {
    if (evt.key === 'Enter') {
      bigPicture.classList.remove('hidden');
      const photoNumber = evt.target.querySelector('img').getAttribute('index');
      img.src = photos[photoNumber].url;
      likesCount.textContent = photos[photoNumber].likes;
      commentsCount.textContent = photos[photoNumber].comments.length;
      socialCaption.textContent = photos[photoNumber].description;
      for (let i = 0; i < photos[photoNumber].comments.length; i++) {
        const socialComment = socialCommentTemplate.cloneNode(true);
        const socialCommentArray = bigPicture.querySelectorAll('.social__comment');
        socialComment.querySelector('.social__picture').src = photos[photoNumber].comments[i].avatar;
        socialComment.querySelector('.social__picture').alt = photos[photoNumber].comments[i].name;
        socialComment.querySelector('.social__text').textContent = photos[photoNumber].comments[i].message;
        if (socialCommentArray.length >= 5) {
          socialComment.classList.add('hidden');
        }
        socialCommentList.appendChild(socialComment);
      }
      if (bigPicture.querySelectorAll('.social__comment').length <= 5) {
        commentsLoader.classList.add('hidden');
      }
      socialCommentCount.textContent = `${bigPicture.querySelectorAll('.social__comment').length - socialCommentList.querySelectorAll('.hidden').length} из ${bigPicture.querySelectorAll('.social__comment').length} комментариев`;
      document.body.classList.add('modal-open');
      bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
      document.addEventListener('keydown', onBigPictureEscKeyDown);
      commentsLoader.addEventListener('click', onCommentsLoaderClick);
    }
  }
};

export {onImgClick, onImgKeyDown, picturesContainer, bigPictureCancel, onBigPictureCancelClick, onBigPictureEscKeyDown, commentsLoader, onCommentsLoaderClick};
