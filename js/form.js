import { isValid } from './validation.js';
import { sendData } from './api.js';
import { closeModal } from './modal.js';
import { isEscapeKey } from './utils.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикуется...'
};

const body = document.querySelector('body');
const form = body.querySelector('.img-upload__form');
const pictureSubmitBtn = form.querySelector('.img-upload__submit');
const successMessageTemplate = body.querySelector('#success')
  .content
  .querySelector('.success');
const errorMessageTemplate = body.querySelector('#error')
  .content
  .querySelector('.error');

const closeMessage = () => {
  const message = document.querySelector('.message');
  document.removeEventListener('keydown', onDocumentKeydown);
  message.remove();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

const renderMessage = (message) => {
  const messageElement = message.cloneNode(true);
  const messageCloseButton = messageElement.querySelector('button');

  messageCloseButton.addEventListener('click', () => closeMessage());

  messageElement.addEventListener('click', (evt) => {
    if(evt.target.matches('.message')) {
      closeMessage();
    }
  });
  document.addEventListener('keydown', onDocumentKeydown);

  body.insertAdjacentElement('beforeend', messageElement);
};

const blockSubmitButton = () => {
  pictureSubmitBtn.disabled = true;
  pictureSubmitBtn.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  pictureSubmitBtn.disabled = false;
  pictureSubmitBtn.textContent = SubmitButtonText.IDLE;
};

const formSendData = (evt) => {
  if(isValid) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(closeModal)
      .then(() => {
        renderMessage(successMessageTemplate);
      })
      .catch(() => {
        renderMessage(errorMessageTemplate);
      })
      .finally(unblockSubmitButton);
  }
};

function onFormSubmitBtn (evt) {
  evt.preventDefault();
  formSendData(evt);
}

const submitForm = () => {
  form.addEventListener('submit', onFormSubmitBtn);
};

export { submitForm };
