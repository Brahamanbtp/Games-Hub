let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const resultMessage_p = document.getElementById('result-message');
const rock_div = document.getElementById('rock');
const paper_div = document.getElementById('paper');
const scissors_div = document.getElementById('scissors');
const leaderboardBtn = document.getElementById('leaderboard-btn');
const leaderboard = document.getElementById('leaderboard');
const closeLeaderboardBtn = document.getElementById('close-leaderboard');
const userLeaderboard_p = document.getElementById('user-leaderboard');
const compLeaderboard_p = document.getElementById('comp-leaderboard');

// Computer choice function
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * 3)];
}

// Convert text to title case
function convertCase(choice) {
    if (choice === 'paper') return 'Paper';
    if (choice === 'scissors') return 'Scissors';
    return 'Rock';
}

// Handle Win
function win(user, computer) {
    userScore++;
    userScore_span.textContent = userScore;
    resultMessage_p.textContent = `${convertCase(user)} beats ${convertCase(computer)}. You win!`;
    updateLeaderboard();
}

// Handle Lose
function lose(user, computer) {
    computerScore++;
    computerScore_span.textContent = computerScore;
    resultMessage_p.textContent = `${convertCase(computer)} beats ${convertCase(user)}. You lose!`;
    updateLeaderboard();
}

// Handle Draw
function draw(user, computer) {
    resultMessage_p.textContent = `It's a draw! You both chose ${convertCase(user)}.`;
}

// Main game logic
function game(userChoice) {
    const computerChoice = getComputerChoice();
    switch (userChoice + computerChoice) {
        case 'paperrock':
        case 'rockscissors':
        case 'scissorspaper':
            win(userChoice, computerChoice);
            break;
        case 'rockpaper':
        case 'scissorsrock':
        case 'paperscissors':
            lose(userChoice, computerChoice);
            break;
        default:
            draw(userChoice, computerChoice);
            break;
    }
}

// Event listeners for choices
rock_div.addEventListener('click', () => game('rock'));
paper_div.addEventListener('click', () => game('paper'));
scissors_div.addEventListener('click', () => game('scissors'));

// Leaderboard button functionality
leaderboardBtn.addEventListener('click', () => {
    leaderboard.classList.remove('hidden');
});

// Close leaderboard
closeLeaderboardBtn.addEventListener('click', () => {
    leaderboard.classList.add('hidden');
});

// Update leaderboard
function updateLeaderboard() {
    userLeaderboard_p.textContent = `User: ${userScore}`;
    compLeaderboard_p.textContent = `Computer: ${computerScore}`;
}
