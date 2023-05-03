'use strict';

const images = [
  'Are_you_okay.png',
  'beautiful_sleep.png',
  'sleep_of_night.png',
];
const images50 = [
  'Are_you_okay_op50.png',
  'beautiful_sleep_op50.png',
  'sleep_of_night_op50.png',
];

const randomIndex = Math.floor(Math.random() * images.length);
const selectedImage = images[randomIndex];
const selectedImage50 = images50[randomIndex];

document.body.style.backgroundImage = `url("image/${selectedImage}")`;
document.querySelector(
  '#windows'
).style.backgroundImage = `url("image/${selectedImage50}")`;
