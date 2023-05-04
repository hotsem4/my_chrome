// import BLOCKS from './block.js';

// //DOM
// const playground = document.querySelector('.playground > ul');
// const gameText = document.querySelector('.game-text');
// const scoreDisplay = document.querySelector('.score');
// const restartButton = document.querySelector('.game-text > button');
// //setting
// const GAME_ROWS = 20;
// const GAME_COLS = 10;

// // variables
// let score = 0;
// let duration = 500;
// let downInterval;
// let tempMovingItem;

// const movingItem = {
//   type: '',
//   direction: 3,
//   top: 0,
//   left: 0,
// };

// init();

// //function
// function init() {
//   tempMovingItem = { ...movingItem };
//   for (let i = 0; i < 20; i++) {
//     prependNewLine();
//   }
//   generateNewBlock();
// }
// /**노드 생성*/
// function prependNewLine() {
//   const li = document.createElement('li');
//   const ul = document.createElement('ul');
//   for (let j = 0; j < 10; j++) {
//     const maxtrix = document.createElement('li');
//     ul.prepend(maxtrix);
//   }
//   li.prepend(ul);
//   playground.prepend(li);
// }
// /**렌더링 함수 */
// function renderBlocks(moveType = '') {
//   const { type, direction, top, left } = tempMovingItem;
//   const movingBlocks = document.querySelectorAll('.moving'); // 움직이고 있는 블럭들의 클래스에는 .moving이 존재함.
//   movingBlocks.forEach((moving) => {
//     moving.classList.remove(type, 'moving');
//   });
//   BLOCKS[type][direction].some((block) => {
//     const x = block[0] + left;
//     const y = block[1] + top;

//     const target = playground.childNodes[y]
//       ? playground.childNodes[y].childNodes[0].childNodes[x]
//       : null;
//     const isAvailable = checkEmpty(target);
//     if (isAvailable) {
//       target.classList.add(type, 'moving');
//     } else {
//       tempMovingItem = { ...movingItem };
//       if (moveType === 'retry') {
//         clearInterval(downInterval);
//         showGameoverText();
//       }
//       // setTimeout을 걸지 않을 경우 밑바닥이 아닌 옆으로 이동해서 다시 랜더링 되는 현상이 있음
//       setTimeout(() => {
//         renderBlocks('retry');
//         if (moveType === 'top') {
//           seizeBlock();
//         }
//       }, 0);
//       //renderBlocks();
//       return true;
//     }
//   });
//   movingItem.left = left;
//   movingItem.top = top;
//   movingItem.direction = direction;
// }
// /**가장 밑으로 떨어졌을 때 바닥인지 check 블럭 위도 check */
// function seizeBlock() {
//   const movingBlocks = document.querySelectorAll('.moving');
//   movingBlocks.forEach((moving) => {
//     moving.classList.remove('moving');
//     moving.classList.add('seized');
//   });
//   checkMatch();
// }
// /**한 층이 완성되면 줄 삭제 함수 */

// function checkMatch() {
//   const childNodes = playground.childNodes;
//   childNodes.forEach((child) => {
//     let matched = true;
//     child.children[0].childNodes.forEach((li) => {
//       if (!li.classList.contains('seized')) {
//         matched = false;
//       }
//     });
//     if (matched) {
//       child.remove();
//       prependNewLine();
//       score++;
//       scoreDisplay.innerText = score;
//       if (score % 5 === 0) {
//         // % 연산자를 사용해서 5의 배수인지 확인
//         duration -= 30; // 맞다면 -10
//         console.log(duration);
//         clearInterval(downInterval);
//         downInterval = setInterval(() => {
//           moveBlock('top', 1);
//         }, duration);
//       }
//     }
//   });
//   generateNewBlock();
// }

// function generateNewBlock() {
//   clearInterval(downInterval);
//   downInterval = setInterval(() => {
//     moveBlock('top', 1);
//   }, duration);

//   const blockArray = Object.entries(BLOCKS);
//   const randomIndex = Math.floor(Math.random() * blockArray.length);

//   movingItem.type = blockArray[randomIndex][0];
//   movingItem.top = 0;
//   movingItem.left = 3;
//   movingItem.direction = 0;
//   tempMovingItem = { ...movingItem };
//   renderBlocks();
// }

// /**빈 공간에 들어가면 안되기 때문에 block처리 */
// function checkEmpty(target) {
//   if (!target || target.classList.contains('seized')) {
//     return false;
//   }
//   return true;
// }

// function moveBlock(moveType, amount) {
//   tempMovingItem[moveType] += amount;
//   renderBlocks(moveType);
// }

// function changeDirection() {
//   const direction = tempMovingItem.direction;
//   direction === 3
//     ? (tempMovingItem.direction = 0)
//     : (tempMovingItem.direction += 1);
//   renderBlocks();
// }

// function dropBlocks() {
//   clearInterval(downInterval);
//   downInterval = setInterval(() => {
//     moveBlock('top', 1);
//   }, 10);
// }

// function showGameoverText() {
//   gameText.style.display = 'flex';
// }

// // event handling
// document.addEventListener('keydown', (e) => {
//   switch (e.keyCode) {
//     case 39:
//       moveBlock('left', 1);
//       break;

//     case 37:
//       moveBlock('left', -1);
//       break;

//     case 40:
//       moveBlock('top', 1);
//       break;

//     case 38:
//       changeDirection();
//       break;

//     case 32:
//       dropBlocks();
//       break;

//     default:
//       break;
//   }
//   console.log(e);
// });

// restartButton.addEventListener('click', () => {
//   playground.innerHTML = '';
//   gameText.style.display = 'none';
//   score = 0;
//   scoreDisplay.innerHTML = 0;
//   init();
// });

import BLOCKS from './block.js';

//DOM
const playground = document.querySelector('.playground > ul');
const gameText = document.querySelector('.game-text');
const scoreDisplay = document.querySelector('.score');
const restartButton = document.querySelector('.game-text > button');
//setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

// variables
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;

const movingItem = {
  type: '',
  direction: 3,
  top: 0,
  left: 0,
};

init();

//function
function init() {
  tempMovingItem = { ...movingItem };
  for (let i = 0; i < 20; i++) {
    prependNewLine();
  }
  generateNewBlock();
}
/**노드 생성*/
function prependNewLine() {
  const li = document.createElement('li');
  const ul = document.createElement('ul');
  for (let j = 0; j < 10; j++) {
    const maxtrix = document.createElement('li');
    ul.prepend(maxtrix);
  }
  li.prepend(ul);
  playground.prepend(li);
}
/**렌더링 함수 */
function renderBlocks(moveType = '') {
  const { type, direction, top, left } = tempMovingItem;
  const movingBlocks = document.querySelectorAll('.moving'); // 움직이고 있는 블럭들의 클래스에는 .moving이 존재함.
  movingBlocks.forEach((moving) => {
    moving.classList.remove(type, 'moving');
  });
  BLOCKS[type][direction].some((block) => {
    const x = block[0] + left;
    const y = block[1] + top;

    const target = playground.childNodes[y]
      ? playground.childNodes[y].childNodes[0].childNodes[x]
      : null;
    const isAvailable = checkEmpty(target);
    if (isAvailable) {
      target.classList.add(type, 'moving');
    } else {
      tempMovingItem = { ...movingItem };
      if (moveType === 'retry') {
        clearInterval(downInterval);
        showGameoverText();
      }
      // setTimeout을 걸지 않을 경우 밑바닥이 아닌 옆으로 이동해서 다시 랜더링 되는 현상이 있음
      setTimeout(() => {
        renderBlocks('retry');
        if (moveType === 'top') {
          seizeBlock();
        }
      }, 0);
      //renderBlocks();
      return true;
    }
  });
  movingItem.left = left;
  movingItem.top = top;
  movingItem.direction = direction;
}
/**가장 밑으로 떨어졌을 때 바닥인지 check 블럭 위도 check */
function seizeBlock() {
  const movingBlocks = document.querySelectorAll('.moving');
  let gameOver = false;

  movingBlocks.forEach((moving) => {
    if (moving.getBoundingClientRect().top <= 0) {
      gameOver = true;
      return;
    }
    moving.classList.remove('moving');
    moving.classList.add('seized');
  });

  if (gameOver) {
    clearInterval(downInterval);
    showGameoverText();
    return;
  }

  checkMatch();
}

/**한 층이 완성되면 줄 삭제 함수 */

function checkMatch() {
  const childNodes = playground.childNodes;
  childNodes.forEach((child) => {
    let matched = true;
    child.children[0].childNodes.forEach((li) => {
      if (!li.classList.contains('seized')) {
        matched = false;
      }
    });
    if (matched) {
      child.remove();
      prependNewLine();
      score++;
      scoreDisplay.innerText = score;
      if (score % 5 === 0) {
        // % 연산자를 사용해서 5의 배수인지 확인
        duration -= 30; // 맞다면 -10
        console.log(duration);
        clearInterval(downInterval);
        downInterval = setInterval(() => {
          moveBlock('top', 1);
        }, duration);
      }
    }
  });
  generateNewBlock();
}

function generateNewBlock() {
  clearInterval(downInterval);
  downInterval = setInterval(() => {
    moveBlock('top', 1);
  }, duration);

  const blockArray = Object.entries(BLOCKS);
  const randomIndex = Math.floor(Math.random() * blockArray.length);

  movingItem.type = blockArray[randomIndex][0];
  movingItem.top = 0;
  movingItem.left = 3;
  movingItem.direction = 0;
  tempMovingItem = { ...movingItem };
  renderBlocks();
}

/**빈 공간에 들어가면 안되기 때문에 block처리 */
function checkEmpty(target) {
  if (!target || target.classList.contains('seized')) {
    return false;
  }
  return true;
}

function moveBlock(moveType, amount) {
  tempMovingItem[moveType] += amount;
  renderBlocks(moveType);
}

function changeDirection() {
  const direction = tempMovingItem.direction;
  direction === 3
    ? (tempMovingItem.direction = 0)
    : (tempMovingItem.direction += 1);
  renderBlocks();
}

function dropBlocks() {
  clearInterval(downInterval);
  downInterval = setInterval(() => {
    moveBlock('top', 1);
  }, 5);
}

function showGameoverText() {
  gameText.style.display = 'flex';
}
let spacebarEnabled = true;

document.addEventListener('keydown', (e) => {
  switch (e.keyCode) {
    case 39:
      moveBlock('left', 1);
      break;

    case 37:
      moveBlock('left', -1);
      break;

    case 40:
      moveBlock('top', 1);
      break;

    case 38:
      changeDirection();
      break;

    case 32:
      if (spacebarEnabled) {
        dropBlocks();
        spacebarEnabled = false;
        setTimeout(() => {
          spacebarEnabled = true;
        }, 200); // Adjust the delay as needed
      }
      break;

    default:
      break;
  }
  console.log(e);
});

restartButton.addEventListener('click', () => {
  playground.innerHTML = '';
  gameText.style.display = 'none';
  score = 0;
  scoreDisplay.innerHTML = 0;
  init();
});
