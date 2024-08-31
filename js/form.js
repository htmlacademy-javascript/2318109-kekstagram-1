import { MODAL_OPEN_CLASS } from './constants.js';
import { HIDDEN_CLASS } from './constants.js';
import { isEscapeKey } from './utils.js';
import { validate } from './validation.js';

const body = document.querySelector('body');
const pictureInputFile = body.querySelector('#upload-file');
const picturePopupCloseBtn = body.querySelector('#upload-cancel');
const picturePopup = body.querySelector('.img-upload__overlay');
const pictureSubmitBtn = body.querySelector('.img-upload__submit');
const commentInput = body.querySelector('.text__description');
const hashtagInput = body.querySelector('.text__hashtags');

const isTextInputFocused = () =>
  document.activeElement === commentInput ||
  document.activeElement === hashtagInput;

const clearPictureForm = () => {
  pictureInputFile.value = '';
  commentInput.value = '';
  hashtagInput.value = '';
};

const disabledSubmitBtn = () => {
  if (validate()) {
    pictureSubmitBtn.disabled = false;
  } else {
    pictureSubmitBtn.disabled = true;
  }
};

const closePopup = () => {
  clearPictureForm();
  picturePopup.classList.add(HIDDEN_CLASS);
  body.classList.remove(MODAL_OPEN_CLASS);
};

const openPopup = () => {
  picturePopup.classList.remove(HIDDEN_CLASS);
  body.classList.add(MODAL_OPEN_CLASS);

  picturePopupCloseBtn.addEventListener('click', onPicturePopupCloseBtnClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const submitForm = () => {
  commentInput.addEventListener('input', onDisabledFormSubmitBtn);
  hashtagInput.addEventListener('input', onDisabledFormSubmitBtn);
  pictureSubmitBtn.addEventListener('submit', onFormSubmitBtn);
};

const openInputFileModal = () => {
  pictureInputFile.addEventListener('change', onPictureInputFileChange);
};

const removeEventListeners = () => {
  picturePopupCloseBtn.removeEventListener('click', onPicturePopupCloseBtnClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  pictureSubmitBtn.removeEventListener('submit', onFormSubmitBtn);
  commentInput.removeEventListener('input', onDisabledFormSubmitBtn);
  hashtagInput.removeEventListener('input', onDisabledFormSubmitBtn);
};

function onFormSubmitBtn(evt) {
  evt.preventDefault();
}

function onDisabledFormSubmitBtn() {
  disabledSubmitBtn();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextInputFocused()) {
    evt.preventDefault();
    closePopup();
    removeEventListeners();
  }
}

function onPictureInputFileChange() {
  openPopup();
}

function onPicturePopupCloseBtnClick() {
  closePopup();
}

submitForm();

export { openInputFileModal };
