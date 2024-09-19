const Scale = {
  STEP: 25,
  MAX: 100,
  MIN: 25,
  DEFAULT: 100
};

const picturePreview = document.querySelector('.img-upload__preview img');
const increaseScaleButton = document.querySelector('.scale__control--bigger');
const decreaseScaleButton = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');

const setScale = (value) => {
  picturePreview.style.transform = `scale(${value / Scale.DEFAULT})`;
  scaleValue.value = `${value}%`;
};

const onDecreaseScaleButton = () => {
  const currentValue = parseInt(scaleValue.value, 10);

  let newValue = currentValue - Scale.STEP;
  if (newValue < Scale.MIN) {
    newValue = Scale.MIN;
  }

  setScale(newValue);
};

const onIncreaseScaleButton = () => {
  const currentValue = parseInt(scaleValue.value, 10);

  let newValue = currentValue + Scale.STEP;
  if (newValue > Scale.MAX) {
    newValue = Scale.MAX;
  }

  setScale(newValue);
};

const resetScale = () => setScale(Scale.DEFAULT);

increaseScaleButton.addEventListener('click', onIncreaseScaleButton);
decreaseScaleButton.addEventListener('click', onDecreaseScaleButton);

export { resetScale };
