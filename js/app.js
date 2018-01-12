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
let ratings;
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
  ratings = 3;
  matchesLeft = 8;

  // enable the board at the start of the game
  document.querySelector('.deck').classList.remove('disabled', 'pre-game');

  document.querySelector('#btnStartGame').classList.add('hide');

  document.querySelector('.modal').style.display = 'none';

  // reset the timer
  stopTimer();
  startTimer();

  shuffle(cardsList);

  // create the html snippet to insert in the DOM
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

  const deck = (document.querySelector('.deck').innerHTML = cardsHTML);

  // add a click handler to every card on the board
  const cardsElem = Array.from(document.querySelectorAll('.card'));
  cardsElem.map(elem => {
    elem.addEventListener('click', respondToTheClick);
  });

  document.querySelector('.restart').addEventListener('click', init);

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

// handler that controls the logic of the game at each card click
function respondToTheClick(evt) {
  showCard(evt.target);

  const card = {
    id: evt.target.id,
    cardName: evt.target.dataset.cardType
  };

  if (cardsOpened.length > 0) {
    addToCardsOpened(card);
    if (findMatches(card) === 2) {
      //found a card match
      setCardsMatched();
    } else {
      // did not found a card match
      resetCardsUnmatched();
    }
    moves += 1;

    updateMoves();

    // control the ratings based on the number of player moves
    if (moves === 10) {
      ratings -= 1;
      updateRating();
      console.log('ratings: ', ratings);
    } else if (moves === 16) {
      ratings -= 1;
      updateRating();
      console.log('ratings: ', ratings);
    } else if (moves === 20) {
      ratings -= 1;
      updateRating();
      console.log('ratings: ', ratings);
    }

    // control the end game
    if (matchesLeft === 0) {
      finishGame();
    }
  } else {
    // first card is opened, no need to check for match
    addToCardsOpened(card);
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
  document.querySelector('.moves').innerHTML = moves;
}

function updateRating() {
  document.querySelectorAll('.fa-star')[0].remove();
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

function startTimer() {
  timer = setInterval(addTimer, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function addTimer() {
  document.querySelector('.timer').innerHTML = ++seconds;
}

// construct and show the summary modal when game ends
function finishGame() {
  setTimeout(() => {
    let summaryElem = document.createDocumentFragment();

    let movesElem = document.createElement('p');
    movesElem.textContent = `You did ${moves} moves to finish the game.`;
    summaryElem.appendChild(movesElem);

    let timerElem = document.createElement('p');
    timerElem.textContent = `You took ${seconds} seconds to finish the game.`;
    summaryElem.appendChild(timerElem);

    let ratingsElem = document.createElement('p');
    if (ratings > 1) {
      ratingsElem.textContent = `Your rating is ${ratings} stars.`;
    } else {
      ratingsElem.textContent = `Your rating is ${ratings} star.`;
    }
    summaryElem.appendChild(ratingsElem);

    let modalBodyElem = document.querySelector('.modal-body');
    modalBodyElem.textContent = '';
    modalBodyElem.appendChild(summaryElem);

    document.querySelector('.modal').style.display = 'block';
  }, 500);

  stopTimer();

  document.querySelector('.deck').classList.add('disabled', 'pre-game');
}

function closeModal() {
  document.querySelector('.modal').style.display = 'none';
}
