const form = document.querySelector('#loginInputDiv');
const userName = document.querySelector('#userNameInput');
const arrowButton = document.querySelector('#arrow-button');
const loginBackground = document.querySelector('#loginBackground');
const helloMessage = document.querySelector('#helloMessage');
const helloSpanTag = document.querySelector('#helloMessage');

function showArrow() {
  var input = document.querySelector("input[type='text']");
  var button = document.querySelector('#arrow-button');
  if (input.value) {
    button.style.display = 'block';
    button.addEventListener('click', function () {
      localStorage.setItem('userName', input.value);
      //   window.location.href = 'cal.html'; // Redirect to cal.html
    });
  } else {
    button.style.display = 'none';
  }
}
form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log(userName.value);
  localStorage.setItem('userName', userName.value);
});

// function to handle arrow button click event
function handleArrowClick(event) {
  event.preventDefault();
  // hide loginBackground and show helloMessage
  loginBackground.style.display = 'none';
  helloMessage.innerHTML = `Hello ${userName.value}!`;

  helloMessage.style.display = 'flex';
  // set timeout to move to next page after 3 seconds
  setTimeout(() => {
    window.location.href = 'cal.html';
  }, 3000);
}

// add event listener to arrow button
arrowButton.addEventListener('click', handleArrowClick);
