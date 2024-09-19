let data = [];

const thumbnailsContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createThumbnails = (pictures) => {
  pictures.forEach((picture) => {
    const thumbnailElement = thumbnailTemplate.cloneNode(true);
    thumbnailElement.querySelector('.picture__likes').textContent = picture.likes;
    thumbnailElement.querySelector('.picture__comments').textContent = picture.comments.length;
    thumbnailElement.querySelector('.picture__img').src = picture.url;
    thumbnailElement.dataset.thumbnailId = picture.id;
    thumbnailsContainer.appendChild(thumbnailElement);
  });
};

const updateThumbnails = (pictures) => {
  data = pictures.slice();
  const thumbnails = document.querySelectorAll('.picture');
  thumbnails.forEach((item) => item.remove());

  createThumbnails(data);
};

const renderThumbnails = (pictures) => {
  data = pictures.slice();
  createThumbnails(data);

  updateThumbnails(data);
};

export { renderThumbnails, updateThumbnails };
