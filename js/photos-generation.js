const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderSimilarPhotos = (pictureArray) => {
  const pictureListFragment = document.createDocumentFragment();

  for (let i = 0; i < pictureArray.length; i++) {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').setAttribute('index', `${pictureArray[i].id}`);
    pictureElement.querySelector('.picture__img').src = pictureArray[i].url;
    pictureElement.querySelector('.picture__likes').textContent = pictureArray[i].likes;
    pictureElement.querySelector('.picture__comments').textContent = pictureArray[i].comments.length;
    pictureListFragment.appendChild(pictureElement);
  }
  pictureList.appendChild(pictureListFragment);
};

export {renderSimilarPhotos, pictureList};
