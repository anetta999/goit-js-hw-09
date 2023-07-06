import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

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
  },
};

const calendar = flatpickr('#datetime-picker', options);

selectors.button.addEventListener('click', setTimer);

function setTimer(evt) {
  // console.log(calendar.selectedDates[0]);
  const currentDate = options.defaultDate;
  console.log(currentDate);
  const selectedDate = calendar.selectedDates[0];
  console.log(selectedDate);
  const deltaTime = selectedDate - currentDate;
  console.log(deltaTime);
  if (deltaTime < 0) {
    alert('"Please choose a date in the future"');
    evt.target.disabled = true;
  } else if (deltaTime > 0) {
    evt.target.disabled = false;
  }
  const convertedDeltaTime = convertMs(deltaTime);
  console.log(convertedDeltaTime);

  setInterval(() => {
    selectors.days.textContent = convertedDeltaTime.days;
    selectors.hours.textContent = convertedDeltaTime.hours;
    selectors.minutes.textContent = convertedDeltaTime.minutes;
    selectors.seconds.textContent = convertedDeltaTime.seconds;
  }, 1000);
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
