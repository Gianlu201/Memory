const cardsImages = ['🎁', '🎈', '🏀'];
let totalCards = 0;
const playGround = document.getElementById('playGround');
let discoveredCards = [];
const movesDoneLabel = document.querySelector('#moves span');
let movesDoneCounter = 0;
const maxMovesLabel = document.querySelector('#moves span:last-of-type');
let maxMovesCounter = 5;

document.addEventListener('load', init());

function init() {
  playGround.innerHTML = '';
  upgradeMoves();
  maxMovesLabel.innerText = maxMovesCounter;
  dealCards(shuffleCards(cardsImages));

  // set time start
  // set done moves to zero
}

function shuffleCards(arr) {
  const cardSet = arr.concat(arr);
  const shuffledCardSet = [];
  for (let i = 0; i < arr.length * 2; i++) {
    const randomIndex = Math.floor(Math.random() * cardSet.length);
    shuffledCardSet.push(cardSet[randomIndex]);
    cardSet.splice(randomIndex, 1);
  }

  totalCards = shuffledCardSet.length;
  return shuffledCardSet;
}

function dealCards(arr) {
  arr.forEach((element) => {
    const myDiv = document.createElement('div');
    myDiv.className = 'card covered';

    const myDiv2 = document.createElement('div');
    myDiv2.className = 'front';
    myDiv2.innerText = element;
    myDiv.appendChild(myDiv2);

    const myDiv3 = document.createElement('div');
    myDiv3.className = 'back';
    myDiv.appendChild(myDiv3);

    playGround.appendChild(myDiv);

    myDiv.addEventListener('click', function () {
      cardClicked(myDiv);
    });
  });
}

function cardClicked(element) {
  discoveredCards = document.querySelectorAll('.card.discovered');
  switch (discoveredCards.length) {
    case 0:
      element.classList.replace('covered', 'discovered');
      break;
    case 1:
      element.classList.replace('covered', 'discovered');
      discoveredCards = document.querySelectorAll('.card.discovered');
      checkCards(discoveredCards);
      break;
    default:
      break;
  }
}

function checkCards(arrCards) {
  if (arrCards[0].innerText === arrCards[1].innerText) {
    setTimeout(() => {
      arrCards.forEach((card) => {
        card.classList.replace('discovered', 'hidden');
      });
    }, 1000);
    const foundCards = document.querySelectorAll('#playGround .hidden');
    if (foundCards.length === totalCards - 2) {
      setTimeout(() => {
        endGame('Win');
      }, 1100);
    }
  } else {
    setTimeout(() => {
      arrCards.forEach((card) => {
        card.classList.replace('discovered', 'covered');
      });
    }, 1000);
  }
  movesDoneCounter++;
  upgradeMoves();
}

function endGame(str) {
  switch (str) {
    case 'Win':
      alert('Complimenti hai completato il gioco');
      break;
    case 'GameOver':
      alert('Troppe mosse, andrà meglio la prossima volta');
      break;
    default:
      alert('Errore');
      break;
  }
}

function upgradeMoves() {
  movesDoneLabel.innerText = movesDoneCounter;
  if (maxMovesCounter - movesDoneCounter <= 1) {
    movesDoneLabel.style.color = 'red';
  }
  if (movesDoneCounter == maxMovesLabel.innerText) {
    setTimeout(() => {
      endGame('GameOver');
    }, 1100);
  }
}
