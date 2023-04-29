'use strict';

let display = document.getElementById('display');
let calculated = false; // append할 때 결과값이 있는 상태인지 확인하기 위한 변수

function append(value) {
  // display에 값 추가
  if (calculated) {
    // 계산 값이 display에 있을 경우 초기화
    display.value = ''; // 버퍼 초기화
    calculated = false;
  }
  display.value += value;
}

function clearDisplay() {
  // C
  display.value = '';
}

function deleteLast() {
  // backspace
  let expression = display.value;
  display.value = expression.substring(0, expression.length - 1);
}

function calculate(value) {
  let expression = display.value;
  console.log('Input expression: ', expression);

  // 괄호 검사
  let count = 0;
  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === '(') {
      count++;
    } else if (expression[i] === ')') {
      count--;
    }
    if (count < 0) {
      console.log('Unbalanced parentheses error');
      return;
    }
  }
  if (count !== 0) {
    console.log('Unbalanced parentheses error');
    return;
  }

  // 공식 페이지에 따르면 eval을 사용하게 될 경우 웹페이지나 확장 프로그램의 권한으로 사용자의 기기에 악의적인 코드를 수행하는 결과를 초래할 수 있다고 함.
  // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/eval#eval%EC%9D%84_%EC%A0%88%EB%8C%80_%EC%82%AC%EC%9A%A9%ED%95%98%EC%A7%80_%EB%A7%90_%EA%B2%83!
  // Evaluate the expression and display the result
  // var result = eval(expression);
  // display.value = result;
  // calculated = true;
  // Evaluate the expression and display the result

  //Function 생성자를 사용할 경우 전역 범위로 한정된 함수만 생성.
  let result;
  try {
    const fn = new Function(`return ${expression}`);
    result = fn();
  } catch (error) {
    console.log('Invalid expression:', error.message);
    return;
  }
  display.value = result;
  calculated = true;

  console.log('Result: ', result);
}
// 키 입력 트리거
document.addEventListener('keydown', function (event) {
  const key = event.key;
  if (/^[0-9.+\-*/()]$/.test(key)) {
    event.preventDefault(); // Prevent default action of key press
    append(key);
  } else if (key === 'Backspace') {
    event.preventDefault();
    deleteLast();
  } else if (key === 'Enter') {
    event.preventDefault();
    calculate();
  }
});
