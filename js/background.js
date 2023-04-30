'use strict';

console.log('enend');
let images = ['Are_you_okay.png', 'beautiful_sleep.png', 'sleep_of_night.png'];
let images50 = [
  'Are_you_okay_op50.png',
  'beautiful_sleep_op50.png',
  'sleep_of_night_op50.png',
];

var randomIndex = Math.floor(Math.random() * images.length);
var selectedImage = images[randomIndex];
let selectedImage50 = images50[randomIndex];

document.body.style.backgroundImage = `url("/image/${selectedImage}")`;
document.querySelector(
  '#windows'
).style.backgroundImage = `url("/image/${selectedImage50}")`;
