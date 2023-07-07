const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
console.log(startBtn);
console.log(stopBtn);
let timerId = null;

startBtn.addEventListener('click', changeBodyBackgroundColor);
function changeBodyBackgroundColor(evt) {
  evt.target.disabled = true;
  stopBtn.disabled = false;

  timerID = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

stopBtn.addEventListener('click', stopChangingColor);
function stopChangingColor(evt) {
  evt.target.disabled = true;

  clearInterval(timerID);
  startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
