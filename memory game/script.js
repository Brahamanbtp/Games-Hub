// Game Variables
const cardsArray = [
    { name: 'pokemon1', img: 'pokemon1.png' },
    { name: 'pokemon2', img: 'pokemon2.png' },
    { name: 'pokemon3', img: 'pokemon3.png' },
    { name: 'pokemon4', img: 'pokemon4.png' },
    { name: 'pokemon5', img: 'pokemon5.png' },
    { name: 'pokemon6', img: 'pokemon6.png' },
    { name: 'pokemon7', img: 'pokemon7.png' },
    { name: 'pokemon8', img: 'pokemon8.png' },
    { name: 'pokemon9', img: 'pokemon9.png' },
    { name: 'pokemon10', img: 'pokemon10.png' },
    { name: 'pokemon11', img: 'pokemon11.png' },
    { name: 'pokemon12', img: 'pokemon12.png' }
];

// DOM Elements
const game = document.getElementById('game');
const restartBtn = document.querySelector('.restart');
const attemptsDisplay = document.querySelector('.attempts-count');
const minutesDisplay = document.querySelector('.minutes');
const secondsDisplay = document.querySelector('.seconds');

// Sound effects
const flipSound = document.getElementById('flip-sound');
const matchSound = document.getElementById('match-sound');

// Game Variables
let firstGuess = '';
let secondGuess = '';
let count = 0;
let attempts = 0;
let matchedCards = 0;
let timeStarted = false;
let seconds = 0;
let minutes = 0;
let interval;

// Shuffle and Double the Cards
let gameGrid = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());

// Initialize Game
function initGame() {
    game.innerHTML = '';
    gameGrid.forEach((item) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = item.name;

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const front = document.createElement('div');
        front.classList.add('front');

        const back = document.createElement('div');
        back.classList.add('back');
        back.style.backgroundImage = `url(${item.img})`;

        cardInner.appendChild(front);
        cardInner.appendChild(back);
        card.appendChild(cardInner);
        game.appendChild(card);
    });
}

// Start Timer
function startTimer() {
    interval = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        secondsDisplay.textContent = seconds < 10 ? '0' + seconds : seconds;
        minutesDisplay.textContent = minutes < 10 ? '0' + minutes : minutes;
    }, 1000);
}

// Reset Timer
function resetTimer() {
    clearInterval(interval);
    seconds = 0;
    minutes = 0;
    secondsDisplay.textContent = '00';
    minutesDisplay.textContent = '00';
}

// Reset Game
restartBtn.addEventListener('click', () => {
    resetTimer();
    timeStarted = false;
    attempts = 0;
    matchedCards = 0;
    attemptsDisplay.textContent = attempts;
    initGame();
});

// Card Click Event
game.addEventListener('click', function (event) {
    const clicked = event.target.closest('.card');
    if (!clicked || clicked.classList.contains('selected') || clicked.classList.contains('match')) return;

    if (!timeStarted) {
        timeStarted = true;
        startTimer();
    }

    flipSound.play();  // Play flip sound
    clicked.classList.add('selected');
    count++;

    if (count === 1) {
        firstGuess = clicked.dataset.name;
    } else {
        secondGuess = clicked.dataset.name;
        attempts++;
        attemptsDisplay.textContent = attempts;

        if (firstGuess === secondGuess) {
            matchSound.play();  // Play match sound
            setTimeout(match, 500);
        } else {
            setTimeout(resetGuesses, 1000);
        }
        count = 0;
    }
});

// Match Function
function match() {
    const selectedCards = document.querySelectorAll('.selected');
    selectedCards.forEach(card => {
        card.classList.add('match');
        card.classList.remove('selected');
    });
    matchedCards += 2;
    if (matchedCards === gameGrid.length) {
        clearInterval(interval);  // Stop timer when game is completed
    }
}

// Reset Guesses
function resetGuesses() {
    const selectedCards = document.querySelectorAll('.selected');
    selectedCards.forEach(card => card.classList.remove('selected'));
}

// Start the Game
initGame();
