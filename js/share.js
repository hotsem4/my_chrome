const red_circle = document.querySelector('#red_circle');

red_circle.addEventListener('mouseenter', () => {
  red_circle.innerHTML = `<i class="fa-solid fa-xmark" style="color: #000000"></i>`;
});
red_circle.addEventListener('mouseleave', () => {
  red_circle.innerHTML = '';
});
