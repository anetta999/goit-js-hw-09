const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
console.log(startBtn);
console.log(stopBtn);
let timerId;

startBtn.addEventListener('click', changeBodyBackgroundColor);
function changeBodyBackgroundColor(evt) {
  if (evt.target !== evt.currentTarget) {
    return;
  }

  timerID = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }, 1000);
}

stopBtn.addEventListener('click', stopChangingColor);
function stopChangingColor(evt) {
  if (evt.target !== evt.currentTarget) {
    return;
  }

  clearInterval(timerID);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
