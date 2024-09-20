import { isEscapeKey } from './utils.js';

const body = document.querySelector('body');
const successMessageTemplate = body.querySelector('#success')
  .content
  .querySelector('.success');
const errorMessageTemplate = body.querySelector('#error')
  .content
  .querySelector('.error');

const closeMessage = () => {
  const message =
  document.querySelector('.success') || document.querySelector('.error');

  message.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

const onMessageCloseButtonClick = () => {
  closeMessage();
};

const onOutsideMessageClick = (evt) => {
  if(evt.target.matches('.message')) {
    closeMessage();
  }
};

const initSuccessMessage = () => {
  const successMessage = successMessageTemplate;
  const successMessageButton = successMessageTemplate.querySelector('button');

  body.insertAdjacentElement('beforeend', successMessage);

  successMessage.addEventListener('click', onOutsideMessageClick);
  document.addEventListener('keydown', onDocumentKeydown);
  successMessageButton.addEventListener('click', onMessageCloseButtonClick);
};

const initErrorMessage = () => {
  const errorMessage = errorMessageTemplate;
  const errorMessageButton = errorMessageTemplate.querySelector('button');

  body.insertAdjacentElement('beforeend', errorMessage);

  errorMessage.addEventListener('click', onOutsideMessageClick);
  document.addEventListener('keydown', onDocumentKeydown);
  errorMessageButton.addEventListener('click', onMessageCloseButtonClick);
};

export { initSuccessMessage, initErrorMessage };
