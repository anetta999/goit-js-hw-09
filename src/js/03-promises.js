import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

Notiflix.Notify.init({
  timeout: 6000,
});

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.currentTarget.elements;
  const numberedDelay = Number(delay.value);
  const numberedStep = Number(step.value);
  const numberedAmount = Number(amount.value);

  if (numberedAmount <= 0 || numberedDelay <= 0 || numberedStep < 0) {
    Notiflix.Notify.failure('The entered value should be greater then 0');
    return;
  }

  createPromises(numberedAmount, numberedDelay, numberedStep);

  evt.currentTarget.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function createPromises(chosenAmount, chosenDelay, step) {
  for (let i = 1; i <= chosenAmount; i += 1) {
    if (i === 1) {
      chosenDelay -= step;
    }
    chosenDelay += step;
    createPromise(i, chosenDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

// createPromise(2, 1500)
// .then(({ position, delay }) => {
//   console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
// })
// .catch(({ position, delay }) => {
//   console.log(`❌ Rejected promise ${position} in ${delay}ms`);
// });
