import { getPhotos } from './data.js';

const thumbnailsContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const pictureThumbnails = getPhotos();

const thumbnailsFragment = document.createDocumentFragment();

pictureThumbnails.forEach(({likes, comments, url}) => {
  const thumbnailElement = thumbnailTemplate.cloneNode(true);
  thumbnailElement.querySelector('.picture__likes').textContent = likes;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
  thumbnailElement.querySelector('.picture__img').src = url;
  thumbnailsFragment.appendChild(thumbnailElement);
});

thumbnailsContainer.appendChild(thumbnailsFragment);

const getThumbnails = () => thumbnailsContainer;

export { getThumbnails };
