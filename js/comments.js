import { HIDDEN_CLASS } from './constants.js';

const COMMENTS_STEP = 5;

const commentsCount = document.querySelector('.social__comment-count');
const commentsList = document.querySelector('.social__comments');
const commentsLoaderBtn = document.querySelector('.comments-loader');

let commentsCounter = COMMENTS_STEP;
let commentsData = [];

const clearCommentsList = () => {
  commentsList.innerHTML = '';
};

const clearCommentsCount = () => {
  commentsCount.innerHTML = '';
};

const getCommentsCountTemplate = () =>
  `${Math.min(
    commentsCounter,
    commentsData.length
  )} из <span class='comments-count'>${
    commentsData.length
  }</span> комментариев`;

const getCommentTemplate = ({
  avatar,
  message,
  name,
}) => `<li class='social__comment'>
  <img class='social__picture' src=${avatar} alt='Аватар ${name}' width='35' height='35'>
  <p class='social__text'>${message}</p>
</li>`;

const renderComments = () => {
  clearCommentsCount();
  commentsCount.insertAdjacentHTML('afterbegin', getCommentsCountTemplate());
  const commentsTemplates = commentsData
    .slice(0, commentsCounter)
    .map((comment) => getCommentTemplate(comment));
  clearCommentsList();
  commentsList.insertAdjacentHTML('afterbegin', commentsTemplates);
};

const hiddenCommentsLoaderBtn = () => {
  commentsLoaderBtn.removeEventListener('click', onCommentsLoaderBtnClick);
  commentsLoaderBtn.classList.add(HIDDEN_CLASS);
};

function onCommentsLoaderBtnClick() {
  commentsCounter += COMMENTS_STEP;
  renderComments();

  if (commentsCounter >= commentsData.length) {
    hiddenCommentsLoaderBtn();
  }
}

const initComments = (data) => {
  commentsData = data.slice();
  commentsCounter =
    commentsData.length <= commentsCounter
      ? commentsData.length
      : commentsCounter;
  renderComments();

  if (commentsCounter >= commentsData.length) {
    commentsLoaderBtn.classList.add(HIDDEN_CLASS);
  } else {
    commentsLoaderBtn.addEventListener('click', onCommentsLoaderBtnClick);
  }
};

const destroyComments = () => {
  commentsData = [];
  commentsCounter = COMMENTS_STEP;
  commentsLoaderBtn.removeEventListener('click', onCommentsLoaderBtnClick);
  commentsLoaderBtn.classList.remove(HIDDEN_CLASS);
};

export { initComments, destroyComments };
