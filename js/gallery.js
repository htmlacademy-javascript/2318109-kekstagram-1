import { renderThumbnails } from './thumbnails.js';
import { openBigPicture } from './big-picture.js';

const thumbnailsContainer = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  renderThumbnails(pictures);

  thumbnailsContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }

    const picture = pictures.find(
      (item) => item.id === +thumbnail.dataset.thumbnailId
    );

    openBigPicture(picture);
  });
};

export { renderGallery };
