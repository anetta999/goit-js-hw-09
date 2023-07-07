import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
// console.log(Notiflix);

const selectors = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (options.defaultDate >= selectedDates[0]) {
      selectors.button.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      selectors.button.disabled = false;
    }
  },
};

const calendar = flatpickr('#datetime-picker', options);
let timerID = null;

selectors.button.disabled = true;
selectors.button.addEventListener('click', runTimer);

function runTimer(evt) {
  evt.target.disabled = true;

  timerID = setInterval(() => {
    const currentDate = new Date();
    // console.log(currentDate);
    const targetDate = calendar.selectedDates[0];
    // console.log(targetDate);
    const deltaTime = targetDate - currentDate;
    const time = convertMs(deltaTime);
    // console.log(time);

    updateTimerInterface(time);
  }, 1000);
  if (calendar.selectedDates[0] - new Date() <= 0) {
    clearInterval(timerID);
    evt.target.disabled = false;
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerInterface({ days, hours, minutes, seconds }) {
  selectors.days.textContent = `${days}`;
  selectors.hours.textContent = `${hours}`;
  selectors.minutes.textContent = `${minutes}`;
  selectors.seconds.textContent = `${seconds}`;
}
