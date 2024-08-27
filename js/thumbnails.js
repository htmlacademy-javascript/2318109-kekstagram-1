const thumbnailsContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createThumbnail = ({likes, comments, url, id}) => {
  const thumbnailElement = thumbnailTemplate.cloneNode(true);
  thumbnailElement.querySelector('.picture__likes').textContent = likes;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
  thumbnailElement.querySelector('.picture__img').src = url;
  thumbnailElement.dataset.thumbnailId = id;

  return thumbnailElement;
};

const renderThumbnails = (pictures) => {
  const thumbnailsFragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    thumbnailsFragment.append(thumbnail);
  });

  thumbnailsContainer.append(thumbnailsFragment);
};

export { renderThumbnails };
