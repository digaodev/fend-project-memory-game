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

let cardsOpened = [];
let moves = 0;
let matchesLeft = 8;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
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

  console.log('cardsOpened1 = ', cardsOpened);

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
    addToMoves();
  } else {
    // first card opened
    addToCardsOpened(card);
  }
  console.log('cardsOpened2 = ', cardsOpened);
}

function addToCardsOpened(newCard) {
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

function addToMoves() {
  const movesElem = document.querySelector('.moves');
  moves += 1;
  movesElem.innerHTML = moves;
}

function setCardsMatched() {
  // const elemClass = `.${card.cardName}`;
  // console.log('elemClass', elemClass);
  // let elems = Array.from(document.querySelectorAll(elemClass));

  // elems.map(elem => {
  //   elem.classList.remove('open');
  //   elem.classList.add('match');
  // });
  cardsOpened.map(card => {
    const elemID = `#${card.id}`;
    document.querySelector(elemID).classList.remove('open');
    document.querySelector(elemID).classList.add('match');
  });

  cardsOpened = [];
}

function resetCardsUnmatched() {
  document.querySelector('.deck').classList.add('disabled');

  setTimeout(() => {
    cardsOpened.map(card => {
      const elemID = `#${card.id}`;
      document.querySelector(elemID).classList.remove('show', 'open');
    });

    cardsOpened = [];

    document.querySelector('.deck').classList.remove('disabled');
  }, 1000);
}
