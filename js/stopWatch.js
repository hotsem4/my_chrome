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
};
