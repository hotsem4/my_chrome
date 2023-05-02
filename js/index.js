'use strict';

const upLineName = document.querySelector('#upLineName');
const userName = localStorage.getItem('userName');
const homeRedCircle = document.querySelector('.homeRedCircle');

upLineName.innerHTML = `<b>${userName}'s Home</b>`;

homeRedCircle.addEventListener('click', () => {
  localStorage.removeItem('userName');
});
