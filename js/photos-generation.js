const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderSimilarPhotos = (pictureArray) => {
  const pictureListFragment = document.createDocumentFragment();

  pictureArray.forEach(({url, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureListFragment.appendChild(pictureElement);
  });
  pictureList.appendChild(pictureListFragment);
};

export {renderSimilarPhotos};
