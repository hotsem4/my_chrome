'use strict';

const upLineName = document.querySelector('#upLineName');
const userName = localStorage.getItem('userName');

upLineName.innerHTML = `<b>${userName}'s Home</b>`;
