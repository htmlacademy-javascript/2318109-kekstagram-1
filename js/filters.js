import { debounce } from './utils.js';
import { updateThumbnails } from './thumbnails.js';

const PICTURE_COUNT = 10;
const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filtersElement = document.querySelector('.img-filters');
let data = [];

const sortByRandom = (array) => array.slice().sort(() => Math.random() - 0.5);

const sortByComments = (pictureA, pictureB) =>
  pictureB.comments.length - pictureA.comments.length;

const onFiltersElementClick = (evt) => {
  evt.preventDefault();
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }

  filtersElement
    .querySelector('.img-filters__button--active')
    .classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');

  if (evt.target.id === Filters.DISCUSSED) {
    const newData = data.slice().sort(sortByComments);
    updateThumbnails(newData);

    return;
  }

  if (evt.target.id === Filters.RANDOM) {
    updateThumbnails(sortByRandom(data).slice(0, PICTURE_COUNT));

    return;
  }

  updateThumbnails(data);
};

const initFilters = (pictures) => {
  data = pictures.slice();
  filtersElement.classList.remove('img-filters--inactive');
  filtersElement.addEventListener('click', debounce(onFiltersElementClick));
};

export { initFilters };

