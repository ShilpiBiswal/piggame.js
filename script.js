'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnnew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');

let scores, currentscore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentscore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentscore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnroll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      //add dice to current score
      currentscore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentscore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});
btnhold.addEventListener('click', function () {
  if (playing) {
  }
  //1.Add current score to active player's score
  scores[activePlayer] += currentscore;
  //scores[1]=scores[1]+currentscore
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  //2.Check if player's score is >=100
  if (scores[activePlayer] >= 100) {
    //Finish the game
    playing = false;
    diceEl.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--active');
  } else {
    //Switch to next player
    switchPlayer();
  }
});
btnnew.addEventListener('click', init);
