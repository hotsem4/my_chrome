'use strict';

function setClock() {
  let dateInfo = new Date();
  let hour = modifyNumber(dateInfo.getHours());
  let min = modifyNumber(dateInfo.getMinutes());
  let sec = modifyNumber(dateInfo.getSeconds());
  let year = dateInfo.getFullYear();
  let month = dateInfo.getMonth() + 1; // Since it returns monthIndex, add 1 to it.
  let date = dateInfo.getDay();
  let dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date];
  document.getElementById('time').innerHTML = hour + ':' + min;
  document.getElementById(
    'date'
  ).innerHTML = `${month}월 ${date}일 (${dayOfWeek})`;
  document.getElementById(
    'mainDate'
  ).innerHTML = `${year}년 ${month}월 ${date}일 (${dayOfWeek})`;
  document.getElementById('mainTime').innerHTML = `${hour}:${min}:${sec}`;
}

function modifyNumber(time) {
  if (parseInt(time) < 10) {
    return '0' + time;
  } else return time;
}

window.onload = function () {
  let timer_sec;
  let timer_min;
  let timer_hour;

  let timer = 0;

  //click start button
  document.getElementById('start').addEventListener('click', function () {
    //console.log(timer);
    if (timer > 0) {
      return;
    }

    var sec = parseInt(document.getElementById('sec').innerText);
    var min = parseInt(document.getElementById('min').innerText);
    var hour = parseInt(document.getElementById('hour').innerText);

    //start seconds
    timer_sec = setInterval(function () {
      //console.log(i);
      sec++;
      if (sec == 60) {
        sec = '00';
      } else if (sec < 10) {
        sec = '0' + sec;
      }
      document.getElementById('sec').innerText = sec;
    }, 1000);

    //start minutes
    timer_min = setInterval(function () {
      min++;

      if (min == 60) {
        min = 0;
      } else if (min < 10) {
        min = '0' + min;
      }

      document.getElementById('min').innerText = min;
    }, 60000);

    //start hours
    timer_hour = setInterval(function () {
      //console.log(hour);
      hour++;

      if (hour < 10) {
        hour = '0' + hour;
      }

      document.getElementById('hour').innerText = hour;
    }, 3600000);

    timer++;
    //console.log(timer);
  });

  //click stop button
  document.getElementById('stop').addEventListener('click', function () {
    stop();
  });

  function stop() {
    clearInterval(timer_sec);
    clearInterval(timer_min);
    clearInterval(timer_hour);

    timer--;
    if (timer < 0) timer = 0;
  }

  //click clear button
  document.getElementById('clear').addEventListener('click', function () {
    stop();

    document.getElementById('sec').innerText = '00';
    document.getElementById('min').innerText = '00';
    document.getElementById('hour').innerText = '00';
  });

  setClock();
  setInterval(setClock, 1000); //Execute setClock function every second
};
