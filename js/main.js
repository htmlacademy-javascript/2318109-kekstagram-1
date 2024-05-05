const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Анатолий',
  'Андрей',
  'Екатерина',
  'Николь',
  'Михаил',
  'Виктор',
  'Мария',
  'Илья'
];
const DESCRIPTIONS = [
  'Черный черный кот',
  'Закат на берегу моря',
  'Вкусное шоколадное мороженко',
  'Кусты сирени',
  'Одинокое дерево'
];
const MAX_PHOTOS_COUNT = 25;
const MIN_COMMENT_ID = 1;
const MAX_COMMENT_ID = 200;
const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 6;
const MIN_PHOTO_ID = 1;
const MAX_PHOTO_ID = 25;
const MIN_PHOTO_NUMBER = 1;
const MAX_PHOTO_NUMBER = 25;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const MIN_COMMENTS_COUNT = 1;
const MAX_COMMENTS_COUNT = 6;

const getRandomInteger = (min, max) => {
  const minInteger = Math.ceil(Math.min(min, max));
  const maxInteger = Math.floor(Math.max(min, max));
  const result = Math.random() * (maxInteger - minInteger + 1) + minInteger;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generateComments = () => ({
  id: getRandomInteger(MIN_COMMENT_ID, MAX_COMMENT_ID),
  avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createPhotos = () => ({
  id: getRandomInteger(MIN_PHOTO_ID, MAX_PHOTO_ID),
  url: `photos/${getRandomInteger(MIN_PHOTO_NUMBER, MAX_PHOTO_NUMBER)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
  comments: Array.from({length : getRandomInteger(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT)}, generateComments)
});

const getPhotos = () => Array.from({length: MAX_PHOTOS_COUNT}, createPhotos);

getPhotos();


