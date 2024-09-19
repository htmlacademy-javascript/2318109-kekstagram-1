const VALID_TADS_NOTATION = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_TAGS_COUNT = 5;
const ERROR_TEXT = 'Неправильно заполненно поле хештегов';

const form = document.querySelector('.img-upload__form');
const hashtagInput = form.querySelector('.text__hashtags');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass:'img-upload__field-wrapper__error-text'
});

const isValidTag = (tag) => VALID_TADS_NOTATION.test(tag);

const isValidTagsCount = (tags) => tags.length <= MAX_TAGS_COUNT;

const isUniqTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (tags) => {
  const newTags = tags
    .trim()
    .split(' ')
    .filter((newtag) => newtag.trim());
  return isUniqTags(newTags) && isValidTagsCount(newTags) && newTags.every(isValidTag);
};

pristine.addValidator(hashtagInput, validateTags, ERROR_TEXT);

const isValid = () => pristine.validate();

export { isValid };
