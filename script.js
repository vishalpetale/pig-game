'use strict';

// Selecting Element
const score0El = document.querySelector('#score-0');
const score1El = document.getElementById('score-1');
const diceEl = document.querySelector('.dice');

const current0 = document.getElementById('current-0');
const current1 = document.getElementById('current-1');

const btnNew = document.querySelector('.btn-new');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');

const player0 = document.querySelector('.player-0');
const player1 = document.querySelector('.player-1');

// Starting Condition
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let score, currentScore, activePlayer, playing;

function init() {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  for (let i = 0; i < 2; i++) {
    document.getElementById(`current-${i}`).textContent = 0;
    document.getElementById(`score-${i}`).textContent = 0;
    score[i] = 0;
    document.querySelector(`.player-${i}`).classList.remove('player-active');
    document.querySelector(`.player-${i}`).classList.remove('player-winner');
  }

  player0.classList.add('player-active');
}
init();

function switchPlayers() {
  currentScore = 0;
  document.getElementById(`current-${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player-active');
  player1.classList.toggle('player-active');
}
// Roll dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //   console.log(dice);
    //   display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `/img/dice-${dice}.png`;

    //   Check for roll 1: if true, switch to other player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to other player
      switchPlayers();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add('player-winner');
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove('player-active');

      diceEl.classList.add('hidden');
    } else {
      switchPlayers();
    }
  }
});

// Reset Button
btnNew.addEventListener('click', init);
