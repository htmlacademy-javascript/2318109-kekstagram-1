import { HIDDEN_CLASS } from './constants.js';

const EFFECTS = [
  {
    name: 'none',
    styleEffect: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  {
    name: 'chrome',
    styleEffect: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    styleEffect: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'marvin',
    styleEffect: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'phobos',
    styleEffect: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  {
    name: 'heat',
    styleEffect: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
];

const defaultEffect = EFFECTS[0];

const picturePreview = document.querySelector('.img-upload__preview img');
const effectsElement = document.querySelector('.img-upload__effects');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const sliderElement = sliderContainerElement.querySelector('.effect-level__slider');
const valueElement = sliderContainerElement.querySelector('.effect-level__value');

const showSlider = () => {
  sliderContainerElement.classList.remove(HIDDEN_CLASS);
};

const hideSlider = () => {
  sliderContainerElement.classList.add(HIDDEN_CLASS);
};

noUiSlider.create(sliderElement, {
  range: {
    min: defaultEffect.min,
    max: defaultEffect.max,
  },
  start: defaultEffect.max,
  step: defaultEffect.step,
  connect: 'lower'
});
hideSlider();

const updateSlider = (effect) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: effect.min,
      max: effect.max
    },
    start: effect.max,
    step: effect.step
  });
};

const changeEffectLevel = (effect) => {
  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
    picturePreview.style.filter = `${effect.styleEffect}(${valueElement.value}${effect.unit})`;
  });
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }

  const chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  picturePreview.className = `effects__preview--${chosenEffect.name}`;

  updateSlider(chosenEffect);
  if (chosenEffect.name === 'none') {
    hideSlider();
  } else {
    showSlider();
  }

  changeEffectLevel(chosenEffect);

  if (chosenEffect.name === 'none') {
    picturePreview.style.filter = '';
  }
};

const resetEffects = () => {
  sliderElement.noUiSlider.set(defaultEffect.max);
  picturePreview.style.filter = '';
  picturePreview.className = 'effects__preview--none';
  hideSlider();
};

effectsElement.addEventListener('change', onEffectsChange);

export { resetEffects };
