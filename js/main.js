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

const getRandomInteger = (min, max) => {
  const minInteger = Math.ceil(Math.min(min, max));
  const maxInteger = Math.floor(Math.max(min, max));
  const result = Math.random() * (maxInteger - minInteger + 1) + minInteger;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generateComments = () => ({
  id: getRandomInteger(1, 200),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createPhotos = () => ({
  id: getRandomInteger(1, 25),
  url: `photos/${getRandomInteger(1, 25)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length : getRandomInteger(1, 6)}, generateComments)
});

const getPhotos = Array.from({length: 25}, createPhotos);

console.log(getPhotos);
