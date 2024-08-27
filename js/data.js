import { getRandomInteger,
  getRandomArrayElement,
  createIndexGenerator } from './utils.js';

const PICTURES_COUNT = 25;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const AVATAR_COUNT = 6;
const COMMENTS_COUNT = 10;

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
  'Золотой закат над горизонтом океана.',
  'Уютная деревенская улица с цветущими садами.',
  'Древний замок на вершине холма.',
  'Легкий утренний туман над озером.',
  'Яркий городской рынок в вечернее время.',
  'Величественные горы, покрытые снегом.',
  'Модный городской ландшафт с небоскребами.',
  'Восход солнца на пляже с золотым песком.',
  'Спокойное сельское поле с размытой линией горизонта.',
  'Творческое уличное искусство на стенах зданий.',
  'Густой лес в осенний период с яркими листьями.',
  'Очаровательная старинная библиотека с деревянными полками.',
  'Современное кафе с стильным интерьером.',
  'Счастливые дети, играющие в парке.',
  'Элегантный балетный спектакль на сцене.',
  'Прекрасный вид на мост, соединяющий два берега реки.',
  'Динамичные уличные сцены на ночном фестивале.',
  'Старинный маяк на краю утеса.',
  'Красивый зимний пейзаж с замороженным озером.',
  'Тихий внутренний дворик с фонтаном.',
  'Корабли в порту на фоне заката.',
  'Романтичный вечерний ужин на террасе с видом на море.',
  'Живописный пейзаж с лавандовыми полями.',
  'Модные обувные витрины в центре города.',
  'Величественные архитектурные детали исторического здания.'
];

const createCommentId = createIndexGenerator();
const createPictureId = createIndexGenerator();
const createPicturePathId = createIndexGenerator();

const createMessage = () => Array.from({ length: getRandomInteger(1, 2) }, () => getRandomArrayElement(MESSAGES)).join(' ');

const createComments = () => ({
  id: createCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES)
});

const createPictures = () => ({
  id: createPictureId(),
  url: `photos/${createPicturePathId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
  comments: Array.from({length : getRandomInteger(1, COMMENTS_COUNT)}, createComments)
});

const getPicturesData = () => Array.from({length: PICTURES_COUNT}, createPictures);

export { getPicturesData };
