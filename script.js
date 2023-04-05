'use strict';

//Initial all HTML Elements
const message = document.querySelector('.message');
const numberHTML = document.querySelector('.number');
const scoreHTML = document.querySelector('.score');
const highScoreHTML = document.querySelector('.highscore');

// Our Seacret Number
let randomNumber = Math.trunc(Math.random() * 21);

// Score Variable
let scoreNumber = 20;
let highScoreNumber = 0;

//Function if you WON
const wonTheGame = function () {
  message.textContent = 'Right Number';
  document.querySelector('body').classList.add('won');
  numberHTML.textContent = randomNumber;
};

//Function if you lost
const loseTheGame = function () {
  message.textContent = 'You Lost the Game!';
  scoreHTML.textContent = 0;
};

//Function if you input the Wrong number
const wrongNumberInput = function (text) {
  message.textContent = `The Number is to ${text}.`;
  scoreNumber--;
  scoreHTML.textContent = scoreNumber;
};

const restartTheGame = function (restartArt) {
  if (document.querySelector('body').classList.contains('won')) {
    document.querySelector('body').classList.remove('won');
    if (scoreNumber > highScoreNumber && restartArt === `OHS`) {
      highScoreNumber = scoreNumber;
      highScoreHTML.textContent = highScoreNumber;
    }
  }
  if (restartArt === `MHS`) {
    highScoreNumber = 0;
    highScoreHTML.textContent = highScoreNumber;
  }
  scoreNumber = 20;
  scoreHTML.textContent = scoreNumber;
  numberHTML.textContent = '?';
  document.querySelector('.guess').value = '';
  randomNumber = Math.trunc(Math.random() * 21);
  message.textContent = 'Start guessing...';
};

//Function for Cheking he Inpu Value
const checkTheInput = function () {
  //Get the Input Value and Convert it to a Number.
  const numberGuessString = document.querySelector('.guess').value;
  const numberGuess = Number(numberGuessString);
  //Check if the Input was a Number
  if (numberGuessString !== numberGuess.toString()) {
    message.textContent = 'No Number!';
  }
  //Check if the Input Was the Random number
  else if (numberGuess === randomNumber) {
    wonTheGame();
  }
  //Check if the Input was hihger then the Random Number
  else if (numberGuess > randomNumber && numberGuess <= 20) {
    if (scoreNumber > 1) {
      wrongNumberInput('high');
    } else {
      loseTheGame();
    }
  }
  //Check if the Input was Lower then the Random Number
  else if (numberGuess < randomNumber && numberGuess >= 0) {
    if (scoreNumber > 1) {
      wrongNumberInput('low');
    } else {
      loseTheGame();
    }
  } else {
    message.textContent = 'The Number is out of Scope';
  }
};

document.querySelector('.btn.check').addEventListener('click', checkTheInput());

document.querySelector('.menu-btn').addEventListener('click', function () {
  document.querySelector('body').classList.add('open-menu');
});
//Menu Buttons
document
  .querySelector('.btn.restart-soft')
  .addEventListener('click', function () {
    restartTheGame(`OHS`);
    document.querySelector('body').classList.remove('open-menu');
  });

document.querySelector('.btn.c-menu').addEventListener('click', function () {
  document.querySelector('body').classList.remove('open-menu');
});

window.addEventListener(
  'keydown',
  function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }

    switch (event.key) {
      case 'Escape':
        if (document.querySelector(`body`).classList.contains(`open-menu`)) {
          document.querySelector('body').classList.remove('open-menu');
        }
        break;
      case `Enter`:
        if (!document.querySelector(`body`).classList.contains(`open-menu`)) {
          checkTheInput();
        }
        break;
      case ' ':
        if (!document.querySelector(`body`).classList.contains(`open-menu`)) {
          restartTheGame(`OHS`);
        }
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  },
  true
);
