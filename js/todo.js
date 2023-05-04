'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const itemList = JSON.parse(localStorage.getItem('itemList')) || [];
  const checkedArr = JSON.parse(localStorage.getItem('checkedArr')) || [];
  const inputButton = document.querySelector('.input__button');
  const todoForm = document.querySelector('.todoForm');
  inputButton.addEventListener('click', addItem);
  todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('들어감?');
    addItem();
  });
  function addItem(event) {
    let item = document.querySelector('.item').value;
    if (item === '') {
      alert('Ma!! Dasi Ipryeok Haera!!'); // 마!! 다시 입력해라!!
      return; // Return without creating new li element
    }
    itemList.push(item);
    checkedArr.push(0);
    document.querySelector('.item').value = '';
    document.querySelector('.item').focus();
    localStorage.setItem('itemList', JSON.stringify(itemList));
    localStorage.setItem('checkedArr', JSON.stringify(checkedArr));
    showList();
  }

  function showList() {
    console.log('go');
    let list = '<ul>';
    console.log(list);
    for (let i = 0; i < itemList.length; i++) {
      list +=
        '<li class="' +
        (checkedArr[i] ? 'checked' : '') +
        '">' +
        itemList[i] +
        ' ' +
        "<span class='close' id=" +
        i +
        '>' +
        '\u00D7' +
        '</span></li>';
    }
    list += '</ul>';
    console.log(list);
    document.querySelector('.item__list').innerHTML = list;

    let deleteButtons = document.querySelectorAll('.close');
    for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener('click', deleteItem);
    }
    return;
  }

  function deleteItem() {
    let id = this.getAttribute('id');
    itemList.splice(id, 1);
    checkedArr.splice(id, 1);
    localStorage.setItem('itemList', JSON.stringify(itemList));
    localStorage.setItem('checkedArr', JSON.stringify(checkedArr));
    showList();
  }

  let checkList = document.querySelector('.item__list');
  checkList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
      event.target.classList.toggle('checked');

      const li = event.target;
      const id = Array.prototype.indexOf.call(li.parentNode.children, li);
      checkedArr[id] = checkedArr[id] ? 0 : 1;
      localStorage.setItem('checkedArr', JSON.stringify(checkedArr));
      showList();
    }
  });

  showList(); // call showList function on page load to display the saved items
});

// 문제 1: 항목 삭제 시 check가 초기화 되는 문제가 있었음.
/*
해당 문제에 대해선 localStorage를 이용해 checkedArr을 저장함으로써 문제를 해결했다.
*/
// 문제 2: 한글 입력 후 enter 입력 시 addItem이 두번 출력 되는 문제가 있었음.
