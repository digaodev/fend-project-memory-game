/*
 * Create a list that holds all of your cards
 */
const cardsList = [
  'fa-diamond',
  'fa-diamond',
  'fa-paper-plane-o',
  'fa-paper-plane-o',
  'fa-anchor',
  'fa-anchor',
  'fa-bolt',
  'fa-bolt',
  'fa-cube',
  'fa-cube',
  'fa-leaf',
  'fa-leaf',
  'fa-bicycle',
  'fa-bicycle',
  'fa-bomb',
  'fa-bomb'
];

let cardsOpened;
let moves;
let seconds;
let matchesLeft;
let timer;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// init();

function init() {
  cardsOpened = [];
  moves = 0;
  seconds = 0;
  matchesLeft = 8;

  document.querySelector('.deck').classList.remove('disabled', 'pre-game');

  document.querySelector('.btn-start').classList.add('hide');

  stopTimer();
  startTimer();

  shuffle(cardsList);

  const cardsHTML = cardsList
    .map((card, index) => {
      return `
        <li class="card"
          data-card-type="${card}"
          id="card-${index}">
                <i class="fa ${card}"></i>
        </li>
    `;
    })
    .join('');

  const deck = document.querySelector('.deck');
  deck.innerHTML = cardsHTML;

  const cardsElem = Array.from(document.querySelectorAll('.card'));
  cardsElem.map(elem => {
    elem.addEventListener('click', respondToTheClick);
  });

  const restartElem = document.querySelector('.restart');
  restartElem.addEventListener('click', init);

  updateMoves();
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function respondToTheClick(evt) {
  showCard(evt.target);

  const card = {
    id: evt.target.id,
    cardName: evt.target.dataset.cardType
  };

  if (cardsOpened.length > 0) {
    addToCardsOpened(card);
    if (findMatches(card) === 2) {
      //found match
      setCardsMatched();
    } else {
      // did not found match
      resetCardsUnmatched();
    }
    moves += 1;

    updateMoves();
  } else {
    // first card opened
    addToCardsOpened(card);
  }

  if (moves === 10) {
    updateRating();
  } else if (moves === 16) {
    updateRating();
  } else if (moves === 20) {
    updateRating();
  }

  if (matchesLeft === 0) {
    finishGame();
  }
}

function addToCardsOpened(newCard) {
  document.querySelector(`#${newCard.id}`).classList.add('disabled');
  cardsOpened = [...cardsOpened, newCard];
}

function removeFromCardsOpened(newCard) {
  cardsOpened = [...cardsOpened, newCard];
}

function findMatches(card) {
  if (cardsOpened.length > 0) {
    return cardsOpened.filter(
      selectedCard => card.cardName === selectedCard.cardName
    ).length;
  }
}

function showCard(elem) {
  if (!elem.classList.contains('show')) {
    elem.classList.add('show', 'open');
  }
}

function updateMoves() {
  const movesElem = document.querySelector('.moves');
  movesElem.innerHTML = moves;
}

function updateRating() {
  const movesElem = document.querySelectorAll('.fa-star');
  movesElem[0].classList.add('hide');
}

function setCardsMatched() {
  cardsOpened.map(card => {
    const elemID = `#${card.id}`;
    document.querySelector(elemID).classList.remove('open');
    document.querySelector(elemID).classList.add('match');
  });

  cardsOpened = [];
  matchesLeft -= 1;
}

function resetCardsUnmatched() {
  document.querySelector('.deck').classList.add('disabled');

  setTimeout(() => {
    cardsOpened.map(card => {
      const elemID = `#${card.id}`;
      document
        .querySelector(elemID)
        .classList.remove('show', 'open', 'disabled');
    });

    cardsOpened = [];

    document.querySelector('.deck').classList.remove('disabled');
  }, 1000);
}

function finishGame() {
  setTimeout(() => {
    alert('You win! Your moves: ' + moves);
  }, 500);

  stopTimer();

  cardsOpened = [];
  moves = 0;
  seconds = 0;
  matchesLeft = 8;

  document.querySelector('.deck').classList.add('disabled', 'pre-game');
}

function startTimer() {
  timer = setInterval(addTimer, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function addTimer() {
  const timerElem = document.querySelector('.timer');
  timerElem.innerHTML = ++seconds;
}
