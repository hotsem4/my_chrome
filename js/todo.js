'use strict';

document.addEventListener('DOMContentLoaded', () => {
  let itemList = JSON.parse(localStorage.getItem('itemList')) || [];
  let checkedArr = JSON.parse(localStorage.getItem('checkedArr')) || [];
  let inputButton = document.querySelector('.input__button');
  let inputField = document.querySelector('.item');
  inputButton.addEventListener('click', addItem);
  inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      /*
        원래 시도는 엔터를 입력해도 추가가 되게 하고 싶었으나 한글의 경우 addItem이 두번 호출되는 문제가 있었음
        결국 해결하지 못하고 enter 기능을 제한하는 것으로 합의...
        */
      event.preventDefault();
    }
  });

  function addItem(event) {
    event.preventDefault();
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
