import { isEscapeKey } from './utils.js';

const body = document.querySelector('body');
const successMessageTemplate = body.querySelector('#success')
  .content
  .querySelector('.success');
const errorMessageTemplate = body.querySelector('#error')
  .content
  .querySelector('.error');

const isSuccessMessage = (message) => {
  if(message === successMessageTemplate) {
    return successMessageTemplate;
  } else {
    return errorMessageTemplate;
  }
};

const closeMessage = () => {
  const message = document.querySelector('.message');
  message.remove();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

const renderMessage = (message) => {
  isSuccessMessage(message);
  const messageCloseButton = message.querySelector('button');

  messageCloseButton.addEventListener('click', () => closeMessage());

  message.addEventListener('click', (evt) => {
    if(evt.target.matches('.message')) {
      closeMessage();
    }
  });

  document.addEventListener('keydown', onDocumentKeydown, {once:true});

  body.insertAdjacentElement('beforeend', message);
};

const initSuccessMessage = () => {
  renderMessage(successMessageTemplate);
};

const initErrorMessage = () => {
  renderMessage(errorMessageTemplate);
};

export { initSuccessMessage, initErrorMessage };
