const checkingStringLength = (str, length) => length >= str.length;
checkingStringLength('meow', 2);

const isPalindrome = (str) => str.replaceAll(' ', '').toUpperCase() === str.split('').reverse().join('').replaceAll(' ', '').toUpperCase();
isPalindrome('А роза уПала на лапУ АзоРа');


const isNumber = (str) => {
  const num = `${str}`.split('')
    .filter((item) => !isNaN(item)).join('').replaceAll(' ', '');
  return (parseInt(num, 10)) ? num : NaN;
};
isNumber('2023');

