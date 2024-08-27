import { isEscapeKey } from './utils.js';
import { initComments, destroyComments } from './comments.js';
import { HIDDEN_CLASS } from './constants.js';

const MODAL_OPEN_CLASS = 'modal-open';

const body = document.querySelector('body');
const bigPicture = body.querySelector('.big-picture');
const pictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

const renderMainPictureData = ({url, likes, comments, description}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const closeBigPicture = () => {
  bigPicture.classList.add(HIDDEN_CLASS);
  body.classList.remove(MODAL_OPEN_CLASS);
  destroyComments();
};

const removeEventListeners = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
  pictureCloseButton.removeEventListener('click', onPictureCloseButtonClick);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
    removeEventListeners();
  }
}

function onPictureCloseButtonClick() {
  closeBigPicture();
  removeEventListeners();
}

const openBigPicture = (data) => {
  bigPicture.classList.remove(HIDDEN_CLASS);
  body.classList.add(MODAL_OPEN_CLASS);

  pictureCloseButton.addEventListener('click', onPictureCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);

  renderMainPictureData(data);
  initComments(data.comments);
};

export { openBigPicture };
