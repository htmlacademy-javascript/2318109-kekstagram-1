import { MODAL_OPEN_CLASS } from './constants.js';
import { HIDDEN_CLASS } from './constants.js';
import { isEscapeKey } from './utils.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { isValid } from './validation.js';

const body = document.querySelector('body');
const pictureInputFile = body.querySelector('#upload-file');
const pictureModalCloseBtn = body.querySelector('#upload-cancel');
const pictureModal = body.querySelector('.img-upload__overlay');
const commentInput = body.querySelector('.text__description');
const hashtagInput = body.querySelector('.text__hashtags');

const clearPictureForm = () => {
  pictureInputFile.value = '';
  commentInput.value = '';
  hashtagInput.value = '';
  resetScale();
  resetEffects();
  isValid();
};

const closeModal = () => {
  clearPictureForm();
  pictureModal.classList.add(HIDDEN_CLASS);
  body.classList.remove(MODAL_OPEN_CLASS);
};

const openModal = () => {
  pictureModal.classList.remove(HIDDEN_CLASS);
  body.classList.add(MODAL_OPEN_CLASS);
  pictureModalCloseBtn.addEventListener('click', onPictureModalCloseBtnClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const removeEventListeners = () => {
  pictureModalCloseBtn.removeEventListener('click', onPictureModalCloseBtnClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isTextInputFocused = () =>
  document.activeElement === commentInput ||
  document.activeElement === hashtagInput;

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextInputFocused()) {
    evt.preventDefault();
    closeModal();
    removeEventListeners();
  }
}

function onPictureModalCloseBtnClick() {
  closeModal();
  removeEventListeners();
}

const onPictureInputFileChange = () => {
  openModal();
};

const openInputFileModal = () => {
  pictureInputFile.addEventListener('change', onPictureInputFileChange);
};

export { openInputFileModal, closeModal};
