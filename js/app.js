/*
 * Create a list that holds all of your cards
 */
const cards = [
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
let cardsMatched = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
shuffle(cards);

const cardsHTML = cards
  .map((card, index) => {
    return `
        <li class="card"
          data-card-type="${card}"
          id="${index}">
                <i class="fa ${card}"></i>
        </li>
    `;
  })
  .join('');

const deck = document.querySelector('.deck');

deck.innerHTML = cardsHTML;

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
deck.addEventListener('click', respondToTheClick);

function respondToTheClick(evt) {
  const selectedCard = evt.target;

  if (evt.target !== this) {
    toggleShowCard(evt.target);
    toggleOpenCard(evt.target);

    if (!isCardOpened(selectedCard)) {
      addToCardsOpened(evt.target);
    } else {
      removeFromCardsOpened(evt.target);
    }
  }

  console.log(cardsOpened);
}

function isCardOpened(card) {
  if (cardsOpened.length > 0) {
    return !!cardsOpened.find(selectedCard => card.id === selectedCard.id);
  }
}

function addToCardsOpened(card) {
  if (card.id) {
    cardsOpened = [
      ...cardsOpened,
      { id: card.id, card: card.dataset.cardType }
    ];
  }
}

function removeFromCardsOpened(card) {
  cardsOpened = cardsOpened.filter(filteredCard => card.id !== filteredCard.id);
}

function toggleShowCard(elem) {
  elem.classList.toggle('show');
}

function toggleOpenCard(elem) {
  elem.classList.toggle('open');
}
