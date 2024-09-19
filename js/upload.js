import { isValid } from './validation.js';
import { sendData } from './api.js';
import { isEscapeKey } from './utils.js';
import { MODAL_OPEN_CLASS, HIDDEN_CLASS } from './constants.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { initSuccessMessage, initErrorMessage } from './messages.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикуется...'
};

const body = document.querySelector('body');
const form = body.querySelector('.img-upload__form');
const pictureModal = form.querySelector('.img-upload__overlay');
const picturePreview = form.querySelector('.img-upload__preview img');
const pictureUploadInput = form.querySelector('.img-upload__input');
const pictureUploadCloseBtn = form.querySelector('.img-upload__cancel');
const commentInput = form.querySelector('.text__description');
const hashtagInput = form.querySelector('.text__hashtags');
const pictureSubmitBtn = form.querySelector('.img-upload__submit');

const blockSubmitButton = () => {
  pictureSubmitBtn.disabled = true;
  pictureSubmitBtn.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  pictureSubmitBtn.disabled = false;
  pictureSubmitBtn.textContent = SubmitButtonText.IDLE;
};

const clearPictureForm = () => {
  pictureUploadInput.value = '';
  commentInput.value = '';
  hashtagInput.value = '';
  resetScale();
  resetEffects();
  isValid();
};

const removeEventListeners = () => {
  pictureUploadCloseBtn.removeEventListener('click', onPictureUploadCloseBtnClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const closeModal = () => {
  pictureModal.classList.add(HIDDEN_CLASS);
  body.classList.remove(MODAL_OPEN_CLASS);

  removeEventListeners();
  clearPictureForm();
};

const openModal = () => {
  pictureModal.classList.remove(HIDDEN_CLASS);
  body.classList.add(MODAL_OPEN_CLASS);

  pictureUploadCloseBtn.addEventListener('click', onPictureUploadCloseBtnClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  const errorMessage = body.querySelector('.error');
  const isTextInputFocused = () =>
    document.activeElement === commentInput ||
    document.activeElement === hashtagInput;

  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (isTextInputFocused()) {
      evt.stopPropagation();
    } else if (!errorMessage) {
      closeModal();
    }
  }
}

function onPictureUploadCloseBtnClick() {
  closeModal();
}

const initUploadPictureModal = () => {
  pictureUploadInput.addEventListener('change', () => {
    const file = pictureUploadInput.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      picturePreview.src = URL.createObjectURL(file);
      openModal();

      form.addEventListener('submit', (evt) => {
        evt.preventDefault();

        if(isValid) {
          blockSubmitButton();
          sendData(new FormData(evt.target))
            .then(closeModal)
            .then(initSuccessMessage)
            .catch(initErrorMessage)
            .finally(unblockSubmitButton);
        }
      });
    }
  });

};

export { initUploadPictureModal };
